import { paths } from '@/constants/paths'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = () => {
  const location = useLocation()

  return (
    // 데스크탑 사이드바
    <aside className="hidden md:flex w-60 flex-col border-r border-gray-200 bg-white px-4 py-6">
      <nav className="flex flex-col gap-1">
        {paths.map((path) => {
          const isActive = location.pathname === path.to

          return (
            <Link
              key={path.to}
              to={path.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {path.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
