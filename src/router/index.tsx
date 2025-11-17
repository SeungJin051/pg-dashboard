import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/pages/Dashboard'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  )
}
