/** 가맹점 정보 API 응답 타입 */
export interface Merchant {
  mchtCode: string
  mchtName: string
  status: string
  bizType: string
}

// 가맹점 상세 (merchant detail)
export interface MerchantDetail extends Merchant {
  bizNo: string
  address: string
  phone: string
  email: string
  registeredAt: string
  updatedAt: string
}

// 가맹점 상태 코드 (common/mcht-status)
export interface MchtStatus {
  code: string
  description: string
}
