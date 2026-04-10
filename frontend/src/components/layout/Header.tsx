import { Bell, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useChatStore } from '@/stores'

interface HeaderProps {
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const { selectedSubject, selectedClass } = useChatStore()
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
        
        {/* Title / Context */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedSubject && selectedClass ? (
              <span>
                {selectedSubject.name} - {selectedClass.name}
              </span>
            ) : (
              'Welcome back!'
            )}
          </h2>
          <p className="text-sm text-gray-500">
            {selectedSubject 
              ? 'Ready to learn something new today?' 
              : 'Select a subject to get started'}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className={`transition-all duration-300 ${showSearch ? 'w-64' : 'w-auto'}`}>
            {showSearch ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="input pl-9 pr-9"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
