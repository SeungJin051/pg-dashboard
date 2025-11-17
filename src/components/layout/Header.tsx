import { paths } from '@/constants/paths'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 px-8 bg-white h-16 flex items-center justify-between">
      <div className="flex items-center gap-5 mx-auto w-full justify-between">
        <span className="font-semibold text-xl tracking-wide">Allpays</span>

        {/* 모바일 햄버거 메뉴 */}
        <Bars3Icon
          className="w-6 h-6 md:hidden cursor-pointer"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="메뉴 열기"
        />

        {/* 모바일 내비게이션 */}
        <nav
          className={`
            ${menuOpen ? 'flex flex-col gap-4 absolute top-16 left-0 w-full bg-white border-b py-4 px-8 z-50' : 'hidden'}
            md:hidden
          `}
          onClick={() => setMenuOpen(false)}
        >
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
      </div>
    </header>
  )
}
