import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/pages/Dashboard'
import { MerchantsPage } from '@/pages/Merchants'
import { MerchantDetailPage } from '@/pages/Merchants/Detail'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/merchants" element={<MerchantsPage />} />
      <Route path="/merchants/:mchtCode" element={<MerchantDetailPage />} />
    </Routes>
  )
}
