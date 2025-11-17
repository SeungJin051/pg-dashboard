/**
 * 금액을 포맷팅합니다.
 * @param value - 포맷팅할 숫자 값 (number 또는 string)
 * @returns 포맷팅된 문자열 (예: "1,234,567")
 */
export const formatAmount = (value: number | string): string => {
  const numValue = typeof value === 'string' ? Number.parseFloat(value ?? '0') : value
  if (Number.isNaN(numValue) || !Number.isFinite(numValue)) {
    return '0'
  }
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(numValue)
}

/**
 * 날짜를 포맷팅합니다.
 * @param dateString - ISO 8601 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (예: "2024. 1. 1. 오후 3:00:00")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('ko-KR')
}
