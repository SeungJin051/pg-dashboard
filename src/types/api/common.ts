// API 공통 응답 구조
export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

// 페이지네이션 메타 정보
export interface PaginationMeta {
  page: number
  size: number
  totalCount: number
}

// 페이지네이션 응답 구조
export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  meta: PaginationMeta
}>

// 코드 + 이름 조회 응답
export interface CodeName {
  code: string
  name: string
}

// 단건 조회 응답 구조
export type DetailResponse<T> = ApiResponse<T>

// 리스트 조회 응답 구조
export type ListResponse<T> = ApiResponse<T[]>
