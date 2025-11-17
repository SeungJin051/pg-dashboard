interface PaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (direction: 'prev' | 'next') => void
  className?: string
}

/**
 * 페이지네이션 컴포넌트
 * 페이지 정보와 이전/다음 버튼을 제공합니다.
 */
export const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  className = '',
}: PaginationProps) => {
  return (
    <div
      className={`flex items-center justify-between px-1 text-xs text-slate-500 sm:px-0 ${className}`}
    >
      <span>
        페이지 {currentPage} / {totalPages} (총 {totalCount.toLocaleString()}건)
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
          className="rounded-full border border-slate-200 px-3 py-1 disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
          className="rounded-full border border-slate-200 px-3 py-1 disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
