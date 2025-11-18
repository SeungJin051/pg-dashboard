import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: number | string | ReactNode
  unit?: string
  color?: 'default' | 'emerald' | 'rose' | 'amber' | 'blue'
  className?: string
}

const colorClasses = {
  default: 'text-slate-900',
  emerald: 'text-emerald-600',
  rose: 'text-rose-500',
  amber: 'text-amber-600',
  blue: 'text-blue-600',
}

/**
 * 통계 카드 컴포넌트
 * 라벨과 값을 표시하는 통계 카드입니다.
 */
export const StatCard = ({
  label,
  value,
  unit,
  color = 'default',
  className = '',
}: StatCardProps) => {
  const valueColorClass = colorClasses[color]
  const isSimpleValue = typeof value === 'number' || typeof value === 'string'

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white px-5 py-4 ${className}`}>
      <p className="text-base font-medium tracking-wide text-slate-400">{label}</p>
      {isSimpleValue ? (
        <p className={`mt-2 text-lg font-semibold sm:text-xl ${valueColorClass}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="ml-1 text-xs font-normal text-slate-400">{unit}</span>}
        </p>
      ) : (
        <div className={`mt-2 text-sm font-semibold sm:text-base ${valueColorClass}`}>{value}</div>
      )}
    </div>
  )
}
