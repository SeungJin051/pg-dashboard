// 가맹점 타입 매핑
export const BIZ_TYPE: Record<string, { label: string; borderColor: string }> = {
  CAFE: { label: '카페', borderColor: 'border-l-rose-400' },
  SHOP: { label: '스토어', borderColor: 'border-l-amber-500' },
  MART: { label: '마켓', borderColor: 'border-l-blue-500' },
  APP: { label: '서비스', borderColor: 'border-l-emerald-500' },
  TRAVEL: { label: '여행', borderColor: 'border-l-emerald-500' },
  EDU: { label: '교육', borderColor: 'border-l-emerald-500' },
  TEST: { label: '기타', borderColor: 'border-l-gray-500' },
}

// 가맹점 상태 배지 색상 매핑
export const MERCHANT_STATUS_BADGE_VARIANT: Record<
  string,
  'default' | 'success' | 'error' | 'warning'
> = {
  ACTIVE: 'success',
  READY: 'warning',
  CLOSED: 'default',
}
