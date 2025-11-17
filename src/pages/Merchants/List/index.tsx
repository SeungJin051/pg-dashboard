import { EmptyState } from '@/components/ui'
import { useMerchantsPageData } from '../hooks'
import { MerchantListSection, MerchantSalesRankingSection } from '../components'

export const MerchantsPage = () => {
  const {
    merchants,
    isLoading,
    error,
    merchantStatusMap,
    merchantSalesRanking,
    merchantSalesSummaryMap,
    paginatedMerchants,
    totalCount,
    page,
    totalPages,
    handleChangePage,
    sortOption,
    setSortOption,
    bizTypeFilter,
    setBizTypeFilter,
    availableBizTypes,
  } = useMerchantsPageData()

  if (isLoading) {
    return (
      <div className="px-6 py-4 text-sm text-gray-600">가맹점 데이터를 불러오는 중입니다...</div>
    )
  }

  if (error) {
    return (
      <div className="px-6 py-4 text-sm text-red-600">
        가맹점 데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

  return (
    <div className="mx-auto space-y-6">
      {/* 가맹점 매출 순위 */}
      <MerchantSalesRankingSection ranking={merchantSalesRanking} />

      {(!merchants || merchants.length === 0) && (
        <div className="mx-auto space-y-8">
          <EmptyState message="가맹점 데이터가 없습니다." />
        </div>
      )}

      {merchants && merchants.length > 0 && (
        <MerchantListSection
          paginatedMerchants={paginatedMerchants}
          merchantStatusMap={merchantStatusMap}
          merchantSalesSummaryMap={merchantSalesSummaryMap}
          totalCount={totalCount}
          page={page}
          totalPages={totalPages}
          onPageChange={handleChangePage}
          sortOption={sortOption}
          setSortOption={setSortOption as any}
          bizTypeFilter={bizTypeFilter}
          setBizTypeFilter={setBizTypeFilter as any}
          availableBizTypes={availableBizTypes}
        />
      )}
    </div>
  )
}
