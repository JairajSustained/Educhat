import { Menu, X } from 'lucide-react'
import { useChatStore } from '@/stores'

interface HeaderProps {
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const { selectedSubject, selectedClass } = useChatStore()

  return (
    <header className="bg-white border-b border-gray-200 px-5 py-3.5 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            {selectedSubject && selectedClass
              ? `${selectedSubject.name} — ${selectedClass.name}`
              : 'Dashboard'}
          </h2>
          <p className="text-xs text-gray-400">
            {selectedSubject ? 'Ready to study' : 'Select a subject to get started'}
          </p>
        </div>
      </div>
    </header>
  )
}
