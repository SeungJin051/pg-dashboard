import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, EmptyState } from '@/components/ui'
import { DashboardMerchantTableSection } from '@/pages/Dashboard/components/DashboardMerchantTableSection'
import { BIZ_TYPE, MERCHANT_STATUS_BADGE_VARIANT } from '@/constants'
import { useMerchantDetail } from '../hooks'
import { useCommonCodes, usePayments } from '@/hooks'

export const MerchantDetailPage = () => {
  const { mchtCode } = useParams<{ mchtCode: string }>()
  const { data, isLoading, error } = useMerchantDetail(mchtCode)
  const { data: payments = [], isLoading: paymentsLoading, error: paymentsError } = usePayments()
  const { data: commonCodes, isLoading: codesLoading, error: codesError } = useCommonCodes()

  if (isLoading) {
    return (
      <div className="px-6 py-4 text-sm text-gray-600">가맹점 상세 정보를 불러오는 중입니다...</div>
    )
  }

  if (error) {
    return (
      <div className="px-6 py-4 text-sm text-red-600">
        가맹점 상세 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto space-y-8">
        <EmptyState message="가맹점 상세 정보를 찾을 수 없습니다." />
      </div>
    )
  }

  const bizConfig = BIZ_TYPE[data.bizType] ?? {
    label: data.bizType,
    borderColor: 'border-l-slate-300',
  }

  const statusVariant = MERCHANT_STATUS_BADGE_VARIANT[data.status] ?? 'default'

  // 가맹점 상태 코드 한글 설명 매핑
  const merchantStatusMap = commonCodes?.merchantStatusMap ?? {}

  const merchantNameMap: Record<string, string> = {
    [data.mchtCode]: data.mchtName,
  }

  const filteredPayments = payments.filter((p) => p.mchtCode === data.mchtCode)

  const paymentStatusMap = commonCodes?.paymentStatusMap ?? {}
  const paymentTypeMap = commonCodes?.paymentTypeMap ?? {}

  return (
    <div className="mx-auto space-y-6">
      <h1 className="px-1 text-lg font-semibold text-slate-900">가맹점 상세</h1>

      <Card className={`border-l-4 ${bizConfig.borderColor}`}>
        <CardHeader className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-slate-900">{data.mchtName}</div>
            <div className="mt-1 text-xs text-slate-400">{data.mchtCode}</div>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs ${
              statusVariant === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : statusVariant === 'warning'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-50 text-slate-700'
            }`}
          >
            {merchantStatusMap[data.status] ?? data.status}
          </span>
        </CardHeader>
        <CardContent className="grid gap-3 text-xs text-slate-600 sm:grid-cols-2">
          <div className="space-y-1">
            <div className="text-slate-400">업종</div>
            <div className="text-slate-800">{bizConfig.label}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">사업자번호</div>
            <div className="text-slate-800">{data.bizNo}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">주소</div>
            <div className="text-slate-800">{data.address}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">연락처</div>
            <div className="text-slate-800">{data.phone}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">이메일</div>
            <div className="text-slate-800">{data.email}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-400">등록일</div>
            <div className="text-slate-800">{data.registeredAt}</div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        {paymentsError || codesError ? (
          <div className="px-1 text-xs text-red-600">
            가맹점 거래 내역을 불러오는 중 오류가 발생했습니다.
          </div>
        ) : paymentsLoading || codesLoading ? (
          <div className="px-1 text-xs text-slate-500">가맹점 거래 내역을 불러오는 중입니다...</div>
        ) : (
          <DashboardMerchantTableSection
            payments={filteredPayments}
            paymentStatusMap={paymentStatusMap}
            paymentTypeMap={paymentTypeMap}
            merchantNameMap={merchantNameMap}
          />
        )}
      </section>
    </div>
  )
}
