/** 가맹점 정보 API 응답 타입 */
export interface MockMerchant {
  id: string
  mchtCode: string
  mchtName: string
  status: string
  bizType: string
  bizNo: string
  address: string
  phone: string
  email: string
  createdAt: string
}

const STORAGE_KEY = 'mock_merchants'

const loadMerchants = (): MockMerchant[] => {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    return JSON.parse(raw) as MockMerchant[]
  } catch {
    return []
  }
}

const saveMerchants = (list: MockMerchant[]) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

/** 로컬스토리지 Mock API */
export const mockMerchantApi = {
  async list(): Promise<MockMerchant[]> {
    return loadMerchants()
  },

  async create(payload: Omit<MockMerchant, 'id' | 'createdAt'>): Promise<MockMerchant> {
    const current = loadMerchants()
    const now = new Date().toISOString()
    const created: MockMerchant = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: now,
      ...payload,
    }
    const next = [created, ...current]
    saveMerchants(next)

    // 네트워크 지연
    await new Promise((resolve) => setTimeout(resolve, 400))

    return created
  },
}
