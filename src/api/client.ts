import axios from 'axios'

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// 응답 인터셉터 (응답 데이터를 가로채서 가공)
axiosInstance.interceptors.response.use(
  /**
   * HTTP 상태 코드가 2xx 범위일 때 실행됩니다. (성공 응답)
   *
   * @param response - Axios 응답 객체 (서버 응답 원본)
   */
  (response) => response,

  /**
   * HTTP 상태 코드가 2xx 범위를 벗어날 때 실행됩니다. (네트워크 에러 등)
   *
   * @param error - Axios 에러 객체
   */
  (error) => {
    console.error('Axios Interceptor Error:', error)

    // 네트워크 오류, 타임아웃, 404, 500 등
    return Promise.reject(error)
  },
)

export default axiosInstance
