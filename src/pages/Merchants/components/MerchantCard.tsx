import { useNavigate } from 'react-router-dom'
import { Badge, Card, CardContent, CardHeader } from '@/components/ui'
import type { Merchant } from '@/types/api'
import type { MerchantSalesSummary } from '../hooks/useMerchantsPageData'
import { formatAmount } from '@/utils'
import { BIZ_TYPE, MERCHANT_STATUS_BADGE_VARIANT } from '@/constants'

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

interface MerchantCardProps {
  merchant: Merchant
  merchantStatusMap: Record<string, string>
  merchantSalesSummaryMap: Record<string, MerchantSalesSummary>
}

export const MerchantCard = ({
  merchant,
  merchantStatusMap,
  merchantSalesSummaryMap,
}: MerchantCardProps) => {
  const navigate = useNavigate()
  const statusLabel = merchantStatusMap[merchant.status] ?? merchant.status
  const statusVariant = (MERCHANT_STATUS_BADGE_VARIANT[merchant.status] ??
    'default') as BadgeVariant

  const bizConfig = BIZ_TYPE[merchant.bizType] ?? {
    label: merchant.bizType,
    borderColor: 'border-l-slate-300',
  }

  const summary = merchantSalesSummaryMap[merchant.mchtCode]

  const totalLabel = (() => {
    if (!summary) {
      return '0원'
    }

    const parts: string[] = []
    if (summary.totalAmountKRW > 0) {
      parts.push(`${formatAmount(summary.totalAmountKRW)}원`)
    }
    if (summary.totalAmountUSD > 0) {
      parts.push(`${formatAmount(summary.totalAmountUSD)} USD`)
    }
    return parts.length > 0 ? parts.join(' / ') : '0원'
  })()

  const totalCountLabel = (() => {
    if (!summary) {
      return '0건'
    }
    const total = summary.totalCountKRW + summary.totalCountUSD
    return `${total.toLocaleString()}건`
  })()

  return (
    <Card
      className={`h-full border-l-4 cursor-pointer transition-shadow hover:shadow-md hover:-translate-y-0.5 ${bizConfig.borderColor}`}
      onClick={() => navigate(`/merchants/${merchant.mchtCode}`)}
    >
      <CardHeader className="flex items-center justify-between">
        <div className="text-base font-semibold text-slate-900">{merchant.mchtName}</div>
        <Badge variant={statusVariant} className="text-xs">
          {statusLabel}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">가맹점 코드</span>
          <span className="font-mono text-[11px] text-slate-700">{merchant.mchtCode}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">업종</span>
          <span className="text-slate-700">{bizConfig.label}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">총 매출</span>
          <span className="text-slate-700">{totalLabel}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">거래 건수</span>
          <span className="text-slate-700">{totalCountLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
