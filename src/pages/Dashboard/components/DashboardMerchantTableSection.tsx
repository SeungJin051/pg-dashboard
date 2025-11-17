import { Select, Badge, EmptyState, Pagination } from '@/components/ui'
import { Payment } from '@/types/api'
import { formatDate, formatAmount, getPaymentStatusBadgeVariant } from '@/utils'
import { usePaymentTable, SortOption } from '../hooks/usePaymentTable'

interface DashboardMerchantTableSectionProps {
  payments: Payment[]
  paymentStatusMap: Record<string, string>
  paymentTypeMap: Record<string, string>
  merchantNameMap: Record<string, string>
}

/**
 * 거래 내역 테이블 섹션 컴포넌트
 * 모바일에서는 카드 형태로, 데스크탑에서는 테이블 형태로 표시됩니다.
 */
export const DashboardMerchantTableSection = ({
  payments,
  paymentStatusMap,
  paymentTypeMap,
  merchantNameMap,
}: DashboardMerchantTableSectionProps) => {
  const {
    page,
    totalPages,
    totalCount,
    currentRows,
    sort,
    setSort,
    payTypeFilter,
    setPayTypeFilter,
    statusFilter,
    setStatusFilter,
    payTypes,
    statuses,
    handleChangePage,
    setPage,
  } = usePaymentTable(payments)

  return (
    <section>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-900">거래 내역</h2>

        {/* 필터 및 정렬 컨트롤 */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* 정렬 옵션 */}
          <Select
            value={sort}
            onChange={(value) => {
              setSort(value as SortOption)
              setPage(1) // 정렬 변경 시 첫 페이지로 이동
            }}
            options={[
              { value: 'DATE_DESC', label: '최신순' },
              { value: 'DATE_ASC', label: '오래된순' },
              { value: 'AMOUNT_DESC', label: '금액 높은순' },
              { value: 'AMOUNT_ASC', label: '금액 낮은순' },
            ]}
          />

          {/* 결제 수단 필터 */}
          <Select
            value={payTypeFilter}
            onChange={(value) => {
              setPayTypeFilter(value)
              setPage(1) // 필터 변경 시 첫 페이지로 이동
            }}
            options={[
              { value: 'ALL', label: '전체 수단' },
              ...payTypes.map((type: string) => ({
                value: type,
                label: paymentTypeMap[type] ?? type,
              })),
            ]}
          />

          {/* 결제 상태 필터 */}
          <Select
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value)
              setPage(1) // 필터 변경 시 첫 페이지로 이동
            }}
            options={[
              { value: 'ALL', label: '전체 상태' },
              ...statuses.map((status: string) => ({
                value: status,
                label: paymentStatusMap[status] ?? status,
              })),
            ]}
          />
        </div>
      </div>

      {/* 모바일: 카드 리스트 */}
      <div className="space-y-3 md:hidden">
        {currentRows.map((row: Payment) => (
          <div
            key={row.paymentCode}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-slate-900">{row.paymentCode}</span>
              <span className="text-sm text-slate-400">{formatDate(row.paymentAt)}</span>
            </div>
            <div className="mb-1 flex justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">
                  {merchantNameMap[row.mchtCode] ?? row.mchtCode}
                </span>
                <span className="text-sm text-slate-400">{row.mchtCode}</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-slate-400">금액</span>
                <div className="text-sm font-semibold text-slate-900">
                  {formatAmount(row.amount)}
                  <span className="text-sm text-slate-400">{row.currency}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <Badge variant="default">{paymentTypeMap[row.payType] ?? row.payType}</Badge>
              <Badge variant={getPaymentStatusBadgeVariant(row.status)}>
                {paymentStatusMap[row.status] ?? row.status}
              </Badge>
            </div>
          </div>
        ))}
        {currentRows.length === 0 && <EmptyState message="표시할 거래 내역이 없습니다." />}
      </div>

      {/* 데스크탑: 테이블 */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">결제코드</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">가맹점</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-slate-500">금액</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500">통화</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500">수단</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-slate-500">상태</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-slate-500">결제 일시</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: Payment) => (
              <tr key={row.paymentCode} className="border-t border-slate-100">
                <td className="px-4 py-2 whitespace-nowrap text-slate-900">{row.paymentCode}</td>
                <td className="px-4 py-2 whitespace-nowrap text-slate-900">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">
                      {merchantNameMap[row.mchtCode] ?? row.mchtCode}
                    </span>
                    <span className="text-xs text-slate-400">{row.mchtCode}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-right text-slate-900">
                  {formatAmount(row.amount)}{' '}
                  <span className="text-xs text-slate-400">{row.currency}</span>
                </td>
                <td className="px-4 py-2 text-center text-slate-700">{row.currency}</td>
                <td className="px-4 py-2 text-center text-slate-700">
                  <Badge variant="default">{paymentTypeMap[row.payType] ?? row.payType}</Badge>
                </td>
                <td className="px-4 py-2 text-center">
                  <Badge variant={getPaymentStatusBadgeVariant(row.status)}>
                    {paymentStatusMap[row.status] ?? row.status}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-right text-slate-700">{formatDate(row.paymentAt)}</td>
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td className="px-4 py-4" colSpan={7}>
                  <EmptyState message="표시할 거래 내역이 없습니다." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={handleChangePage}
        className="mt-3"
      />
    </section>
  )
}
