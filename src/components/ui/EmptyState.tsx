interface EmptyStateProps {
  message: string
  className?: string
}

/**
 * 빈 상태 컴포넌트
 * 데이터가 없을 때 표시하는 컴포넌트입니다.
 */
export const EmptyState = ({ message, className = '' }: EmptyStateProps) => {
  return (
    <div
      className={`rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-center text-xs text-slate-400 ${className}`}
    >
      {message}
    </div>
  )
}
