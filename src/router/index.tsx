import { Route, Routes } from 'react-router-dom'

import { DashboardPage } from '../pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  )
}
