import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/client'
import type { ApiResponse, MchtStatus, PaymentStatus, PaymentType } from '@/types/api'

// React Query 쿼리 키
export const commonCodeKeys = {
  all: ['commonCodes'] as const,
  list: () => [...commonCodeKeys.all, 'all'] as const,
}

// 공통 코드 사전 타입
// 결제 상태, 결제 수단, 가맹점 상태 코드를 배열과 맵 형태로 제공
export interface CommonCodeDictionaries {
  // 코드 배열 원본 (API 응답 그대로)
  paymentStatuses: PaymentStatus[] // 결제 상태 코드 목록
  paymentTypes: PaymentType[] // 결제 수단 코드 목록
  merchantStatuses: MchtStatus[] // 가맹점 상태 코드 목록

  // 코드 -> 설명 매핑
  paymentStatusMap: Record<string, string> // 결제 상태 코드로 설명 조회
  paymentTypeMap: Record<string, string> // 결제 수단 코드로 설명 조회
  merchantStatusMap: Record<string, string> // 가맹점 상태 코드로 설명 조회
}

/**
 * 공통 코드 조회 훅
 * 결제 상태, 결제 수단, 가맹점 상태 코드를 한 번에 조회합니다.
 */
export const useCommonCodes = () =>
  useQuery<CommonCodeDictionaries>({
    queryKey: commonCodeKeys.list(),
    queryFn: async () => {
      // 세 가지 공통 코드를 병렬로 조회
      const [paymentStatusRes, paymentTypeRes, mchtStatusRes] = await Promise.all([
        apiClient.get<ApiResponse<PaymentStatus[]>>('/common/payment-status/all'),
        apiClient.get<ApiResponse<PaymentType[]>>('/common/paymemt-type/all'),
        apiClient.get<ApiResponse<MchtStatus[]>>('/common/mcht-status/all'),
      ])

      // API 응답에서 데이터 추출
      const paymentStatuses = paymentStatusRes.data.data
      const paymentTypes = paymentTypeRes.data.data
      const merchantStatuses = mchtStatusRes.data.data

      // 결제 상태 코드 -> 설명 매핑 생성
      const paymentStatusMap: Record<string, string> = {}
      paymentStatuses.forEach((item) => {
        paymentStatusMap[item.code] = item.description
      })

      // 결제 수단 코드 -> 설명 매핑 생성
      const paymentTypeMap: Record<string, string> = {}
      paymentTypes.forEach((item) => {
        paymentTypeMap[item.type] = item.description
      })

      // 가맹점 상태 코드 -> 설명 매핑 생성
      const merchantStatusMap: Record<string, string> = {}
      merchantStatuses.forEach((item) => {
        merchantStatusMap[item.code] = item.description
      })

      // 배열과 맵을 모두 반환하여 다양한 용도로 사용 가능하도록 함
      return {
        paymentStatuses,
        paymentTypes,
        merchantStatuses,
        paymentStatusMap,
        paymentTypeMap,
        merchantStatusMap,
      }
    },

    staleTime: Infinity,
  })
