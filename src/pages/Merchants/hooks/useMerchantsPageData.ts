import { useEffect, useMemo, useState } from 'react'
import { useMerchants, useCommonCodes, usePayments } from '@/hooks'
import type { Merchant, Payment } from '@/types/api'
import { MERCHANT_TABLE_PAGE_SIZE } from '@/constants'

export interface UseMerchantsPageDataResult {
  isLoading: boolean
  error: unknown
  merchants: Merchant[]
  merchantStatusMap: Record<string, string>
  merchantSalesRanking: MerchantSalesRankingItem[]
  merchantSalesSummaryMap: Record<string, MerchantSalesSummary>
  filteredMerchants: Merchant[]
  sortOption: MerchantSortOption
  setSortOption: (option: MerchantSortOption) => void
  bizTypeFilter: MerchantBizTypeFilter
  setBizTypeFilter: (value: MerchantBizTypeFilter) => void
  availableBizTypes: string[]
  page: number
  totalPages: number
  totalCount: number
  pageSize: number
  paginatedMerchants: Merchant[]
  handleChangePage: (direction: 'prev' | 'next') => void
}

export interface MerchantSalesSummary {
  totalAmountKRW: number
  totalAmountUSD: number
  totalCountKRW: number
  totalCountUSD: number
}

export interface MerchantSalesRankingItem extends MerchantSalesSummary {
  mchtCode: string
  mchtName: string
}

export type MerchantSortOption = 'SALES_DESC' | 'RECENT_DESC' | 'COUNT_DESC' | 'BIZ_ASC'
export type MerchantBizTypeFilter = 'ALL' | string

/**
 * 가맹점 페이지 전용 데이터 훅
 *
 * - 가맹점 목록(useMerchants)
 * - 공통 코드(useCommonCodes)의 가맹점 상태 코드
 *
 * 두 훅을 조합해서 카드 렌더링에 바로 쓸 수 있는 형태로 반환합니다.
 */
const useMerchantAggregates = () => {
  const {
    data: merchants = [],
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useMerchants()

  const { data: commonCodes, isLoading: codesLoading, error: codesError } = useCommonCodes()

  const { data: payments = [], isLoading: paymentsLoading, error: paymentsError } = usePayments()

  const isLoading = merchantsLoading || codesLoading || paymentsLoading
  const error = merchantsError || codesError || paymentsError

  const merchantStatusMap = commonCodes?.merchantStatusMap ?? {}

  // 가맹점별 매출 합계/건수 집계 (성공 거래 기준)
  const salesByMerchant: Record<string, MerchantSalesSummary> = {}
  for (const p of payments as Payment[]) {
    if (p.status !== 'SUCCESS') {
      continue
    }
    const amount = Number.parseFloat(p.amount ?? '0')
    if (!Number.isFinite(amount)) {
      continue
    }

    const current = salesByMerchant[p.mchtCode] ?? {
      totalAmountKRW: 0,
      totalAmountUSD: 0,
      totalCountKRW: 0,
      totalCountUSD: 0,
    }

    if (p.currency === 'USD') {
      salesByMerchant[p.mchtCode] = {
        ...current,
        totalAmountUSD: current.totalAmountUSD + amount,
        totalCountUSD: current.totalCountUSD + 1,
      }
    } else {
      // 기본은 KRW로 집계 (그 외 통화도 일단 KRW 버킷에 포함)
      salesByMerchant[p.mchtCode] = {
        ...current,
        totalAmountKRW: current.totalAmountKRW + amount,
        totalCountKRW: current.totalCountKRW + 1,
      }
    }
  }

  const merchantSalesSummaryMap = salesByMerchant

  const merchantSalesRanking: MerchantSalesRankingItem[] = Object.entries(salesByMerchant)
    .map(([mchtCode, summary]) => {
      const merchant = merchants.find((m) => m.mchtCode === mchtCode)
      return {
        mchtCode,
        mchtName: merchant?.mchtName ?? mchtCode,
        ...summary,
      }
    })
    // 정렬은 KRW + USD 단순 합으로 내림차순
    .sort((a, b) => b.totalAmountKRW + b.totalAmountUSD - (a.totalAmountKRW + a.totalAmountUSD))

  return {
    isLoading,
    error,
    merchants,
    payments,
    merchantStatusMap,
    merchantSalesSummaryMap,
    merchantSalesRanking,
  }
}

const useMerchantListState = ({
  merchants,
  payments,
  merchantSalesSummaryMap,
}: {
  merchants: Merchant[]
  payments: Payment[]
  merchantSalesSummaryMap: Record<string, MerchantSalesSummary>
}) => {
  // 정렬/필터 상태
  const [sortOption, setSortOption] = useState<MerchantSortOption>('SALES_DESC')
  const [bizTypeFilter, setBizTypeFilter] = useState<MerchantBizTypeFilter>('ALL')
  const [page, setPage] = useState(1)

  // 업종 필터용 옵션
  const availableBizTypes = useMemo(
    () => Array.from(new Set(merchants.map((m) => m.bizType))).sort(),
    [merchants],
  )
  // 정렬/필터가 적용된 가맹점 목록 (카드 + 페이지네이션에 사용)
  const filteredMerchants = useMemo(() => {
    let list = merchants

    if (bizTypeFilter !== 'ALL') {
      list = list.filter((m) => m.bizType === bizTypeFilter)
    }

    const sorted = [...list].sort((a, b) => {
      const aSummary = merchantSalesSummaryMap[a.mchtCode]
      const bSummary = merchantSalesSummaryMap[b.mchtCode]

      if (sortOption === 'SALES_DESC') {
        const aTotal = (aSummary?.totalAmountKRW ?? 0) + (aSummary?.totalAmountUSD ?? 0)
        const bTotal = (bSummary?.totalAmountKRW ?? 0) + (bSummary?.totalAmountUSD ?? 0)
        return bTotal - aTotal
      }

      if (sortOption === 'COUNT_DESC') {
        const aCount = (aSummary?.totalCountKRW ?? 0) + (aSummary?.totalCountUSD ?? 0)
        const bCount = (bSummary?.totalCountKRW ?? 0) + (bSummary?.totalCountUSD ?? 0)
        return bCount - aCount
      }

      if (sortOption === 'BIZ_ASC') {
        return a.bizType.localeCompare(b.bizType)
      }

      // RECENT_DESC: 가장 최근 성공 거래 기준 (없으면 뒤로)
      const aLatest = payments
        .filter((p) => p.mchtCode === a.mchtCode && p.status === 'SUCCESS')
        .reduce((latest, p) => {
          return latest > p.paymentAt ? latest : p.paymentAt
        }, '')
      const bLatest = payments
        .filter((p) => p.mchtCode === b.mchtCode && p.status === 'SUCCESS')
        .reduce((latest, p) => {
          return latest > p.paymentAt ? latest : p.paymentAt
        }, '')

      if (!aLatest && !bLatest) {
        return 0
      }
      if (!aLatest) {
        return 1
      }
      if (!bLatest) {
        return -1
      }
      return bLatest.localeCompare(aLatest)
    })

    return sorted
  }, [bizTypeFilter, merchants, merchantSalesSummaryMap, payments, sortOption])

  // 페이지네이션 계산
  const pageSize = MERCHANT_TABLE_PAGE_SIZE
  const totalCount = filteredMerchants.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedMerchants = filteredMerchants.slice(startIndex, startIndex + pageSize)

  const handleChangePage = (direction: 'prev' | 'next') => {
    setPage((prev) => {
      if (direction === 'prev') {
        return Math.max(1, prev - 1)
      }
      return Math.min(totalPages, prev + 1)
    })
  }

  // 정렬/필터 변경 시 페이지를 첫 페이지로 리셋
  useEffect(() => {
    setPage(1)
  }, [sortOption, bizTypeFilter])

  return {
    filteredMerchants,
    sortOption,
    setSortOption,
    bizTypeFilter,
    setBizTypeFilter,
    availableBizTypes,
    page: currentPage,
    totalPages,
    totalCount,
    pageSize,
    paginatedMerchants,
    handleChangePage,
  }
}

export const useMerchantsPageData = (): UseMerchantsPageDataResult => {
  const {
    isLoading,
    error,
    merchants,
    payments,
    merchantStatusMap,
    merchantSalesSummaryMap,
    merchantSalesRanking,
  } = useMerchantAggregates()

  const listState = useMerchantListState({
    merchants,
    payments,
    merchantSalesSummaryMap,
  })

  return {
    isLoading,
    error,
    merchants,
    merchantStatusMap,
    merchantSalesRanking,
    merchantSalesSummaryMap,
    ...listState,
  }
}
