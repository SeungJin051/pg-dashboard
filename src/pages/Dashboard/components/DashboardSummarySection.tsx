import { StatCard } from '@/components/ui'
import { formatAmount } from '@/utils'
import { DashboardSummary } from '../hooks/useDashboardData'

interface DashboardSummarySectionProps {
  summary: DashboardSummary
}

/**
 * 대시보드 상단 요약 정보를 표시하는 섹션 컴포넌트
 * 총 거래 금액, 총 거래 건수, 성공/실패/취소 건수를 카드 형태로 표시합니다.
 */
export const DashboardSummarySection = ({ summary }: DashboardSummarySectionProps) => {
  return (
    <section>
      <header className="mb-4 space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Allpays 결제 대시보드</h1>
        <p className="text-xs text-slate-500">최근 결제/가맹점 관련 데이터를 확인하세요.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* 총 거래 금액 (KRW + USD) */}
        <StatCard
          label="총 거래 금액"
          value={
            <div className="space-y-1">
              <div className="text-sm text-slate-900 sm:text-base">
                {formatAmount(summary.totalAmountKRW)}
                <span className="ml-1 text-xs font-normal text-slate-400">KRW</span>
              </div>
              <div className="text-sm text-slate-900 sm:text-base">
                {formatAmount(summary.totalAmountUSD)}
                <span className="ml-1 text-xs font-normal text-slate-400">USD</span>
              </div>
            </div>
          }
        />

        {/* 총 거래 건수 */}
        <StatCard label="총 결제" value={summary.totalCount} unit="건" color="blue" />

        {/* 성공 건수 */}
        <StatCard label="결제 성공" value={summary.successCount} unit="건" color="emerald" />

        {/* 실패 건수 */}
        <StatCard label="결제 실패" value={summary.failedCount} unit="건" color="rose" />

        {/* 취소 건수 */}
        <StatCard label="환불 완료" value={summary.cancelledCount} unit="건" color="amber" />
      </div>
    </section>
  )
}
