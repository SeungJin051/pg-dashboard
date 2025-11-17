import type { Merchant } from '@/types/api'
import { useCommonCodes } from './useCommonCodes'
import { useMerchants } from './useMerchants'

export interface UseMerchantsWithStatusResult {
  isLoading: boolean
  error: unknown
  merchants: Merchant[]
  merchantStatusMap: Record<string, string>
}

/**
 * 가맹점 + 가맹점 상태 코드 조회 훅
 *
 * - 가맹점 목록(useMerchants)
 * - 공통 코드(useCommonCodes)의 가맹점 상태 코드
 *
 * 두 훅을 조합해서 가맹점 목록과 상태 맵을 함께 제공합니다.
 */
export const useMerchantsWithStatus = (): UseMerchantsWithStatusResult => {
  const {
    data: merchants = [],
    isLoading: merchantsLoading,
    error: merchantsError,
  } = useMerchants()

  const { data: commonCodes, isLoading: codesLoading, error: codesError } = useCommonCodes()

  const isLoading = merchantsLoading || codesLoading
  const error = merchantsError || codesError

  const merchantStatusMap = commonCodes?.merchantStatusMap ?? {}

  return {
    isLoading,
    error,
    merchants,
    merchantStatusMap,
  }
}
