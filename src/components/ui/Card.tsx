import type { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

/**
 * 카드 컴포넌트
 * 공통 카드 스타일을 제공합니다.
 */
export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white px-5 py-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends PropsWithChildren {
  className?: string
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return <div className={`mb-3 ${className}`}>{children}</div>
}

interface CardContentProps extends PropsWithChildren {
  className?: string
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return <div className={className}>{children}</div>
}
