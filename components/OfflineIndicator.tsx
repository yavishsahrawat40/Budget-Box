'use client'
// components/OfflineIndicator.tsx
import { useEffect } from 'react'
import { useBudgetStore } from '@/lib/store'

export default function OfflineIndicator() {
  const { isOnline, setIsOnline } = useBudgetStore()

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setIsOnline])

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Online</span>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50">
      <div className="w-2 h-2 bg-white rounded-full"></div>
      <span className="text-sm font-medium">Offline Mode</span>
    </div>
  )
}