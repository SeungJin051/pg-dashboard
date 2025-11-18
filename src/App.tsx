import { Toaster } from 'react-hot-toast'
import { MainLayout } from './components/layout/MainLayout'
import { AppRoutes } from './router'

function App() {
  return (
    <MainLayout>
      <AppRoutes />
      <Toaster position="bottom-center" />
    </MainLayout>
  )
}

export default App
