import { Pagination, Select } from '@/components/ui'
import type { Merchant } from '@/types/api'
import { BIZ_TYPE } from '@/constants'
import type {
  MerchantBizTypeFilter,
  MerchantSalesSummary,
  MerchantSortOption,
} from '../hooks/useMerchantsPageData'
import { MerchantCard } from './MerchantCard'

interface MerchantListSectionProps {
  paginatedMerchants: Merchant[]
  merchantStatusMap: Record<string, string>
  merchantSalesSummaryMap: Record<string, MerchantSalesSummary>
  totalCount: number
  page: number
  totalPages: number
  onPageChange: (direction: 'prev' | 'next') => void
  sortOption: MerchantSortOption
  setSortOption: (option: MerchantSortOption) => void
  bizTypeFilter: MerchantBizTypeFilter
  setBizTypeFilter: (value: MerchantBizTypeFilter) => void
  availableBizTypes: string[]
}

export const MerchantListSection = ({
  paginatedMerchants,
  merchantStatusMap,
  merchantSalesSummaryMap,
  totalCount,
  page,
  totalPages,
  onPageChange,
  sortOption,
  setSortOption,
  bizTypeFilter,
  setBizTypeFilter,
  availableBizTypes,
}: MerchantListSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="px-1 text-sm font-semibold text-slate-900">가맹점 목록</h2>

        {/* 가맹점 목록 필터/정렬 바 */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={sortOption}
              onChange={(value) => setSortOption(value as MerchantSortOption)}
              options={[
                { value: 'RECENT_DESC', label: '최근 거래순' },
                { value: 'SALES_DESC', label: '매출 높은순' },
                { value: 'COUNT_DESC', label: '거래 건수순' },
              ]}
              className="min-w-[120px]"
            />
            <Select
              value={bizTypeFilter === 'ALL' ? '' : bizTypeFilter}
              onChange={(value) => setBizTypeFilter((value || 'ALL') as MerchantBizTypeFilter)}
              options={[
                { value: '', label: '전체 업종' },
                ...availableBizTypes.map((biz) => ({
                  value: biz,
                  label: BIZ_TYPE[biz]?.label ?? biz,
                })),
              ]}
              className="min-w-[120px]"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedMerchants.map((merchant) => (
          <MerchantCard
            key={merchant.mchtCode}
            merchant={merchant}
            merchantStatusMap={merchantStatusMap}
            merchantSalesSummaryMap={merchantSalesSummaryMap}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  )
}
