interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  className?: string
}

const variantClasses = {
  default: 'bg-slate-50 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  error: 'bg-rose-50 text-rose-700',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-blue-50 text-blue-700',
}

/**
 * 배지 컴포넌트
 * 상태나 카테고리를 표시하는 배지입니다.
 */
export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
