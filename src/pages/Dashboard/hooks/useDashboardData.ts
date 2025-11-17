import type { Payment } from '@/types/api'
import { usePayments } from '@/hooks/usePayments'
import { useMerchants } from '@/hooks/useMerchants'
import { useCommonCodes } from '@/hooks/useCommonCodes'

// 상단 요약 카드용 데이터
export interface DashboardSummary {
  totalAmountKRW: number
  totalAmountUSD: number
  totalCount: number
  successCount: number
  failedCount: number
  cancelledCount: number
}

// 결제 상태별 건수 데이터
export interface DashboardByStatusItem {
  code: string
  label: string
  count: number
}

// 결제 수단별 건수 데이터
export interface DashboardByPayTypeItem {
  type: string
  label: string
  count: number
}

// 반환하는 최종 결과 타입
export interface UseDashboardDataResult {
  isLoading: boolean
  error: unknown
  payments: Payment[]
  summary: DashboardSummary
  byStatus: DashboardByStatusItem[]
  byPayType: DashboardByPayTypeItem[]
  paymentStatusMap: Record<string, string>
  paymentTypeMap: Record<string, string>
  merchantNameMap: Record<string, string>
}

const toNumber = (amount: string) => Number.parseFloat(amount ?? '0')

/**
 * 대시보드 전용 데이터 집계 훅
 *
 * - 거래 내역(usePayments)
 * - 가맹점 목록(useMerchants)
 * - 공통 코드(useCommonCodes)
 *
 * 세 가지 훅을 조합해서,
 * 카드/차트/테이블에서 바로 사용할 수 있는 형태로 가공해 반환합니다.
 */
export const useDashboardData = (): UseDashboardDataResult => {
  // 거래 내역 데이터
  const { data: payments = [], isLoading: paymentsLoading, error: paymentsError } = usePayments()

  // 가맹점 데이터
  const {
    data: merchants = [],
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useMerchants()

  // 결제 상태/수단/가맹점 상태 공통 코드
  const { data: commonCodes, isLoading: codesLoading, error: codesError } = useCommonCodes()

  const isLoading = paymentsLoading || merchantsLoading || codesLoading
  const error = paymentsError || merchantsError || codesError

  const paymentStatusMap = commonCodes?.paymentStatusMap ?? {}
  const paymentTypeMap = commonCodes?.paymentTypeMap ?? {}

  // 전체 집계 데이터 (상단 요약 카드용)
  const summary: DashboardSummary = (() => {
    let totalAmountKRW = 0
    let totalAmountUSD = 0
    let successCount = 0
    let failedCount = 0
    let cancelledCount = 0

    for (const p of payments) {
      const amount = toNumber(p.amount)
      if (p.currency === 'KRW') {
        totalAmountKRW += amount
      } else if (p.currency === 'USD') {
        totalAmountUSD += amount
      }

      if (p.status === 'SUCCESS') {
        successCount++
      } else if (p.status === 'FAILED') {
        failedCount++
      } else if (p.status === 'CANCELLED') {
        cancelledCount++
      }
    }

    return {
      totalAmountKRW,
      totalAmountUSD,
      totalCount: payments.length,
      successCount,
      failedCount,
      cancelledCount,
    }
  })()

  // 결제 상태별 건수 집계
  const byStatus: DashboardByStatusItem[] = (() => {
    const counts: Record<string, number> = {}
    for (const p of payments) {
      counts[p.status] = (counts[p.status] ?? 0) + 1
    }

    return Object.entries(counts).map(([code, count]) => ({
      code,
      label: paymentStatusMap[code] ?? code,
      count,
    }))
  })()

  // 결제 수단별 건수 집계
  const byPayType: DashboardByPayTypeItem[] = (() => {
    const counts: Record<string, number> = {}
    for (const p of payments) {
      counts[p.payType] = (counts[p.payType] ?? 0) + 1
    }

    return Object.entries(counts).map(([type, count]) => ({
      type,
      label: paymentTypeMap[type] ?? type,
      count,
    }))
  })()

  // 가맹점 코드 -> 가맹점명 매핑 (테이블에서 사용)
  const merchantNameMap: Record<string, string> = {}
  for (const m of merchants) {
    merchantNameMap[m.mchtCode] = m.mchtName
  }

  return {
    isLoading,
    error,
    payments,
    summary,
    byStatus,
    byPayType,
    paymentStatusMap,
    paymentTypeMap,
    merchantNameMap,
  }
}
