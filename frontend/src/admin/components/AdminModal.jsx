/**
 * AdminModal — generic modal with backdrop
 *
 * Props:
 *   isOpen:   boolean
 *   title:    string
 *   onClose:  () => void
 *   children: ReactNode
 */
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function AdminModal({ isOpen, title, onClose, children }) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#00334a]/8">
          <h2 className="font-bold text-primary text-base">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:bg-[#F7F9FB] transition-colors duration-150"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
