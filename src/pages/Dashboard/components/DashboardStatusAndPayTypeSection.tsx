import { Card, CardHeader, CardContent, EmptyState } from '@/components/ui'
import { DashboardByStatusItem, DashboardByPayTypeItem } from '../hooks/useDashboardData'

interface DashboardStatusAndPayTypeSectionProps {
  byStatus: DashboardByStatusItem[]
  byPayType: DashboardByPayTypeItem[]
}

/**
 * 결제 상태별 및 결제 수단별 건수를 표시하는 섹션 컴포넌트
 */
export const DashboardStatusAndPayTypeSection = ({
  byStatus,
  byPayType,
}: DashboardStatusAndPayTypeSectionProps) => {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 결제 상태별 */}
      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-slate-900">결제 상태별 건수</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          {byStatus.map((item) => (
            <div key={item.code} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">
                {item.label} <span className="text-xs text-slate-400">({item.code})</span>
              </span>
              <span className="font-medium text-slate-900">{item.count.toLocaleString()}건</span>
            </div>
          ))}
          {byStatus.length === 0 && <EmptyState message="표시할 데이터가 없습니다." />}
        </CardContent>
      </Card>

      {/* 결제 수단별 */}
      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-slate-900">결제 수단별 건수</h2>
        </CardHeader>
        <CardContent className="space-y-2">
          {byPayType.map((item) => (
            <div key={item.type} className="flex items-center justify-between text-sm">
              <span className="text-slate-700">
                {item.label} <span className="text-xs text-slate-400">({item.type})</span>
              </span>
              <span className="font-medium text-slate-900">{item.count.toLocaleString()}건</span>
            </div>
          ))}
          {byPayType.length === 0 && <EmptyState message="표시할 데이터가 없습니다." />}
        </CardContent>
      </Card>
    </section>
  )
}
