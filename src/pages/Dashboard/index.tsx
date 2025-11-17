import { DashboardMerchantTableSection } from './components/DashboardMerchantTableSection'
import { DashboardStatusAndPayTypeSection } from './components/DashboardStatusAndPayTypeSection'
import { DashboardSummarySection } from './components/DashboardSummarySection'
import { useDashboardData } from './hooks/useDashboardData'

/**
 * 대시보드 페이지 컴포넌트
 */
export const DashboardPage = () => {
  const {
    isLoading,
    error,
    summary,
    byStatus,
    byPayType,
    payments,
    paymentStatusMap,
    paymentTypeMap,
    merchantNameMap,
  } = useDashboardData()

  if (isLoading) {
    return (
      <div className="px-6 py-4 text-sm text-gray-600">대시보드 데이터를 불러오는 중입니다...</div>
    )
  }

  if (error) {
    return (
      <div className="px-6 py-4 text-sm text-red-600">
        대시보드 데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  return (
    <div className="mx-auto  space-y-8">
      <DashboardSummarySection summary={summary} />
      <DashboardStatusAndPayTypeSection byStatus={byStatus} byPayType={byPayType} />
      <DashboardMerchantTableSection
        payments={payments}
        paymentStatusMap={paymentStatusMap}
        paymentTypeMap={paymentTypeMap}
        merchantNameMap={merchantNameMap}
      />
    </div>
  )
}
