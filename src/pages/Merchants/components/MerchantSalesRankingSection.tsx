import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardContent, EmptyState } from '@/components/ui'
import { formatAmount } from '@/utils'
import { MerchantSalesRankingItem } from '../hooks'

interface MerchantSalesRankingSectionProps {
  ranking: MerchantSalesRankingItem[]
}

export const MerchantSalesRankingSection = ({ ranking }: MerchantSalesRankingSectionProps) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-4 space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">Allpays 가맹점</h1>
        <p className="text-xs text-slate-500">가맹점 매출 순위/정보를 확인하세요.</p>
      </div>
      <Card>
        <CardHeader className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">가맹점 매출 순위 (Top 5)</div>
          <div className="text-xs text-slate-400">성공 거래 기준 누적 매출</div>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          {ranking.length === 0 ? (
            <EmptyState message="매출 데이터가 없습니다." />
          ) : (
            ranking.slice(0, 5).map((item, index) => {
              const amountParts: string[] = []
              if (item.totalAmountKRW > 0) {
                amountParts.push(`${formatAmount(item.totalAmountKRW)}원`)
              }
              if (item.totalAmountUSD > 0) {
                amountParts.push(`${formatAmount(item.totalAmountUSD)} USD`)
              }
              const amountLabel = amountParts.length > 0 ? amountParts.join(' / ') : '0원'
              const totalCount = item.totalCountKRW + item.totalCountUSD

              return (
                <div
                  key={item.mchtCode}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-50 bg-slate-50/60 px-3 py-2 transition hover:bg-slate-100"
                  onClick={() => navigate(`/merchants/${item.mchtCode}`)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-center text-xs font-semibold text-slate-400">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.mchtName}</div>
                      <div className="text-[11px] text-slate-400">{item.mchtCode}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-900">{amountLabel}</div>
                    <div className="text-[11px] text-slate-400">
                      {totalCount.toLocaleString()}건
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
