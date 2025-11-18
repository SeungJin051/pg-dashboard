import { Card, CardContent, CardHeader, Input } from '@/components/ui'
import { useMerchantCreateForm } from '../hooks'

/** 가맹점 등록 폼 컴포넌트 */
export const MerchantCreateForm = () => {
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    onSubmit,
    mockMerchants,
  } = useMerchantCreateForm()

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4 text-xs sm:grid-cols-2">
            <Input
              id="mchtCode"
              label="가맹점 코드"
              placeholder="예: MCHT001"
              {...register('mchtCode')}
              errorMessage={errors.mchtCode?.message}
            />

            <Input
              id="mchtName"
              label="가맹점명"
              placeholder="예: 올페이 카페"
              {...register('mchtName')}
              errorMessage={errors.mchtName?.message}
            />

            <Input
              id="status"
              label="상태"
              placeholder="예: ACTIVE"
              {...register('status')}
              errorMessage={errors.status?.message}
            />

            <Input
              id="bizType"
              label="업종"
              placeholder="예: FNB"
              {...register('bizType')}
              errorMessage={errors.bizType?.message}
            />

            <Input
              id="bizNo"
              label="사업자번호"
              placeholder="예: 123-45-67890"
              {...register('bizNo')}
              errorMessage={errors.bizNo?.message}
            />

            <Input
              id="address"
              label="주소"
              placeholder="예: 서울특별시 ..."
              {...register('address')}
              errorMessage={errors.address?.message}
            />

            <Input
              id="phone"
              label="연락처"
              placeholder="예: 02-1234-5678"
              {...register('phone')}
              errorMessage={errors.phone?.message}
            />

            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="예: owner@example.com"
              {...register('email')}
              errorMessage={errors.email?.message}
            />

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? '등록 요청 중...' : '가맹점 등록하기'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* MockAPI 결과 간단 뷰 */}
      {mockMerchants.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="mb-2">
            <div className="text-xs font-semibold text-slate-900">Mock 가맹점 등록 결과</div>
          </CardHeader>
          <CardContent className="space-y-2 text-[11px]">
            {mockMerchants.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5"
              >
                <div>
                  <div className="font-semibold text-slate-900">{m.mchtName}</div>
                  <div className="text-[10px] text-slate-500">
                    {m.mchtCode} · {m.bizType} · {m.status}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400">
                  {new Date(m.createdAt).toLocaleString('ko-KR')}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}
