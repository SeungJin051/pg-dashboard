import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/client'
import type { ApiResponse, MerchantDetail } from '@/types/api'

// React Query 쿼리 키
export const merchantDetailKeys = {
  all: ['merchantDetail'] as const,
  detail: (mchtCode: string) => [...merchantDetailKeys.all, mchtCode] as const,
}

/**
 * 가맹점 상세 조회 훅
 * 가맹점 코드를 통해 단일 가맹점 상세 정보를 조회합니다.
 */
export const useMerchantDetail = (mchtCode?: string) =>
  useQuery({
    queryKey: mchtCode ? merchantDetailKeys.detail(mchtCode) : merchantDetailKeys.all,
    enabled: Boolean(mchtCode),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<MerchantDetail>>(
        `/merchants/details/${mchtCode}`,
      )
      return response.data.data
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시
  })
