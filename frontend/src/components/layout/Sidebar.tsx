import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Brain,
  Network,
  Volume2,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import { useAuthStore } from '@/stores'
import { getInitials } from '@/utils/helpers'
import { NAV_ITEMS } from '@/utils/constants'

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Brain,
  Network,
  Volume2,
}

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <span className="text-base font-semibold text-gray-900">Educhat</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive =
            location.pathname === `/${item.id}` ||
            (item.id === 'dashboard' && location.pathname === '/')

          return (
            <button
              key={item.id}
              onClick={() => navigate(`/${item.id === 'dashboard' ? '' : item.id}`)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-200 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold flex-shrink-0">
              {user?.name ? getInitials(user.name) : 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-item w-full text-gray-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
