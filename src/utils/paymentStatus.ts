/**
 * 결제 상태 코드에 따른 배지 variant를 반환합니다.
 * @param status - 결제 상태 코드 (예: 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED')
 * @returns Badge variant ('success' | 'error' | 'warning' | 'info' | 'default')
 */
export const getPaymentStatusBadgeVariant = (
  status: string,
): 'success' | 'error' | 'warning' | 'info' | 'default' => {
  if (status === 'SUCCESS') {
    return 'success'
  }
  if (status === 'FAILED') {
    return 'error'
  }
  if (status === 'CANCELLED') {
    return 'warning'
  }
  if (status === 'PENDING') {
    return 'info'
  }
  return 'default'
}
