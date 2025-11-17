import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/client'
import type { ApiResponse, Payment } from '@/types/api'

// React Query 쿼리 키
export const paymentKeys = {
  all: ['transactions'] as const,
  list: () => [...paymentKeys.all, 'list'] as const,
}

/**
 * 거래 내역 조회 훅
 * 모든 거래 내역을 조회
 */
export const usePayments = () =>
  useQuery({
    queryKey: paymentKeys.list(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Payment[]>>('/payments/list')
      return response.data.data
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  })
