/** 거래 내역 API 응답 타입 */
export interface Payment {
  paymentCode: string
  mchtCode: string
  amount: string
  currency: string
  payType: string
  status: string
  paymentAt: string // ISO 8601 날짜 문자열
}

// 결제 상태 코드 (common/payment-status)
export interface PaymentStatus {
  code: string
  description: string
}

// 결제 수단 코드 (common/payment-type)
export interface PaymentType {
  type: string
  description: string
}
