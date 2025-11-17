import { useState } from 'react'
import { DEFAULT_SORT_OPTION, TABLE_PAGE_SIZE } from '@/constants'
import { Payment } from '@/types/api'

/**
 * 정렬 옵션 타입
 * - DATE_DESC: 최신순 (기본값)
 * - DATE_ASC: 오래된순
 * - AMOUNT_DESC: 금액 높은순
 * - AMOUNT_ASC: 금액 낮은순
 */
export type SortOption = 'DATE_DESC' | 'DATE_ASC' | 'AMOUNT_DESC' | 'AMOUNT_ASC'

/**
 * 필터 옵션 타입
 */
export type FilterOption = 'ALL' | string

/**
 * 결제 테이블의 페이지네이션, 정렬, 필터링을 관리하는 커스텀 훅
 *
 * @param payments - 결제 내역 배열
 * @returns 페이지네이션, 정렬, 필터링 관련 상태 및 함수들
 */
export const usePaymentTable = (payments: Payment[]) => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT_OPTION)
  const [payTypeFilter, setPayTypeFilter] = useState<FilterOption>('ALL')
  const [statusFilter, setStatusFilter] = useState<FilterOption>('ALL')

  const pageSize = TABLE_PAGE_SIZE

  // 결제 수단 목록 추출 (중복 제거 및 정렬)
  const payTypes = Array.from(new Set(payments.map((p) => p.payType))).sort()

  // 결제 상태 목록 추출 (중복 제거 및 정렬)
  const statuses = Array.from(new Set(payments.map((p) => p.status))).sort()

  // 필터링된 결제 내역
  const filtered = payments.filter((p) => {
    if (payTypeFilter !== 'ALL' && p.payType !== payTypeFilter) {
      return false
    }
    if (statusFilter !== 'ALL' && p.status !== statusFilter) {
      return false
    }
    return true
  })

  // 정렬된 결제 내역
  const sorted = [...filtered].sort((a, b) => {
    // 날짜 기준 정렬
    if (sort === 'DATE_DESC') {
      return new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
    }
    if (sort === 'DATE_ASC') {
      return new Date(a.paymentAt).getTime() - new Date(b.paymentAt).getTime()
    }

    // 금액 기준 정렬
    const amountA = Number.parseFloat(a.amount ?? '0')
    const amountB = Number.parseFloat(b.amount ?? '0')
    if (sort === 'AMOUNT_DESC') {
      return amountB - amountA
    }
    return amountA - amountB
  })

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const currentRows = sorted.slice(startIndex, startIndex + pageSize)

  /**
   * 페이지 변경 핸들러
   * @param direction - 'prev' 또는 'next'
   */
  const handleChangePage = (direction: 'prev' | 'next') => {
    setPage((prev) => {
      if (direction === 'prev') {
        return Math.max(1, prev - 1)
      }
      return Math.min(totalPages, prev + 1)
    })
  }

  return {
    page: currentPage,
    totalPages,
    pageSize,
    totalCount: sorted.length,
    currentRows,
    sort,
    setSort,
    payTypeFilter,
    setPayTypeFilter,
    statusFilter,
    setStatusFilter,
    payTypes,
    statuses,
    handleChangePage,
    setPage,
  }
}
