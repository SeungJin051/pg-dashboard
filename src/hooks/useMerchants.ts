import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/client'
import type { ApiResponse, Merchant } from '@/types/api'

// React Query 쿼리 키
export const merchantKeys = {
  all: ['merchants'] as const,
  list: () => [...merchantKeys.all, 'list'] as const,
}

/**
 * 가맹점 조회 훅
 * 모든 가맹점을 조회
 */
export const useMerchants = () =>
  useQuery({
    queryKey: merchantKeys.list(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Merchant[]>>('/merchants/list')
      return response.data.data
    },

    staleTime: 1000 * 60 * 60, // 1시간 동안 캐시 유지
  })
