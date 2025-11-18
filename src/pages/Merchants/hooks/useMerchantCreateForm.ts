import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { mockMerchantApi, type MockMerchant } from '@/api/mockMerchantApi'

// zod 스키마
const merchantCreateSchema = z.object({
  mchtCode: z.string().min(1, '가맹점 코드를 입력해주세요.'),
  mchtName: z.string().min(1, '가맹점명을 입력해주세요.'),
  status: z.string().min(1, '상태를 입력해주세요.'),
  bizType: z.string().min(1, '업종을 입력해주세요.'),
  bizNo: z.string().min(1, '사업자번호를 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  phone: z.string().min(1, '연락처를 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
})

export type MerchantCreateFormValues = z.infer<typeof merchantCreateSchema>

// 가맹점 등록 훅
export const useMerchantCreateForm = () => {
  const [mockMerchants, setMockMerchants] = useState<MockMerchant[]>([])

  const form = useForm<MerchantCreateFormValues>({
    resolver: zodResolver(merchantCreateSchema),
    defaultValues: {
      mchtCode: '',
      mchtName: '',
      status: '',
      bizType: '',
      bizNo: '',
      address: '',
      phone: '',
      email: '',
    },
  })

  useEffect(() => {
    mockMerchantApi
      .list()
      .then(setMockMerchants)
      .catch((error) => {
        console.error('[MerchantCreate] mock list error', error)
      })
  }, [])

  const { handleSubmit, reset } = form

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log('[MerchantCreate] submit values', values)
      await mockMerchantApi.create(values)
      const next = await mockMerchantApi.list()
      setMockMerchants(next)

      toast.success('가맹점 등록 요청이 완료되었습니다.')
      reset()
    } catch (error) {
      console.error('[MerchantCreate] submit error', error)
      toast.error('가맹점 등록 요청 중 오류가 발생했습니다.')
    }
  })

  return {
    form,
    onSubmit,
    mockMerchants,
  }
}
