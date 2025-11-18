import { useState } from 'react'
import { EmptyState } from '@/components/ui'
import { useMerchantsPageData } from '../hooks'
import { MerchantListSection, MerchantSalesRankingSection, MerchantCreateForm } from '../components'

export const MerchantsPage = () => {
  const [activeTab, setActiveTab] = useState<'LIST' | 'CREATE'>('LIST')
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
      {/* 상단 탭: 목록 / 등록 */}
      <div className="border-b border-slate-200">
        <div className="flex gap-4 px-1 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('LIST')}
            className={`border-b-2 px-1 py-2 ${
              activeTab === 'LIST'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            가맹점 목록
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('CREATE')}
            className={`border-b-2 px-1 py-2 ${
              activeTab === 'CREATE'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            가맹점 등록하기
          </button>
        </div>
      </div>

      {activeTab === 'LIST' ? (
        <>
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
        </>
      ) : (
        <>
          <h1 className="px-1 text-lg font-semibold text-slate-900">가맹점 등록하기</h1>
          <MerchantCreateForm />
        </>
      )}
    </div>
  )
}
