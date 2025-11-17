import { QueryClient } from '@tanstack/react-query'

// QueryClient 인스턴스 생성
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 쿼리 실패시 1회 재시도
      refetchOnWindowFocus: false, // 브라우저 창 포커스 시 자동 재요청 비활성화
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    },
  },
})
