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
        {/* 총 거래 금액 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-base font-medium tracking-wide text-slate-400">총 거래 금액</p>
          <div className="mt-2 space-y-1">
            <p className="text-xl font-semibold text-slate-900">
              {formatAmount(summary.totalAmountKRW)}
              <span className="ml-1 text-xs font-normal text-slate-400">KRW</span>
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {formatAmount(summary.totalAmountUSD)}
              <span className="ml-1 text-xs font-normal text-slate-400">USD</span>
            </p>
          </div>
        </div>

        {/* 총 거래 건수 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-base font-medium tracking-wide text-slate-400">총 결제</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            {summary.totalCount.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-400">건</span>
          </p>
        </div>

        {/* 성공 건수 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-base font-medium tracking-wide text-slate-400">결제 성공</p>
          <p className="mt-2 text-xl font-semibold text-emerald-600">
            {summary.successCount.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-400">건</span>
          </p>
        </div>

        {/* 실패 건수 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-base font-medium tracking-wide text-slate-400">결제 실패</p>
          <p className="mt-2 text-xl font-semibold text-rose-500">
            {summary.failedCount.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-400">건</span>
          </p>
        </div>

        {/* 취소 건수 */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-base font-medium tracking-wide text-slate-400">환불 완료</p>
          <p className="mt-2 text-xl font-semibold text-rose-400">
            {summary.cancelledCount.toLocaleString()}
            <span className="ml-1 text-xs font-normal text-slate-400">건</span>
          </p>
        </div>
      </div>
    </section>
  )
}
