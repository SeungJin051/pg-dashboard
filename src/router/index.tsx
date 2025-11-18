import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/pages/Dashboard'
import { MerchantsPage, MerchantDetailPage } from '@/pages/Merchants'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/merchants" element={<MerchantsPage />} />
      <Route path="/merchants/:mchtCode" element={<MerchantDetailPage />} />
    </Routes>
  )
}
