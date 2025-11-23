'use client'
// components/SyncButton.tsx
import { useState } from 'react'
import { useBudgetStore } from '@/lib/store'

export default function SyncButton() {
  const { budget, syncStatus, setSyncStatus, isOnline } = useBudgetStore()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    if (!isOnline) {
      alert('Cannot sync while offline. Please check your connection.')
      return
    }

    setIsSyncing(true)

    try {
      const response = await fetch('/api/budget/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(budget)
      })

      if (!response.ok) {
        throw new Error('Sync failed')
      }

      const data = await response.json()
      setSyncStatus('synced')
      
      // Update syncedAt timestamp
      useBudgetStore.setState(state => ({
        budget: { ...state.budget, syncedAt: new Date(data.timestamp) }
      }))

      console.log('✅ Synced successfully:', data)
    } catch (error) {
      console.error('❌ Sync error:', error)
      alert('Failed to sync. Please try again.')
    } finally {
      setIsSyncing(false)
    }
  }

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'synced':
        return 'bg-green-500'
      case 'sync-pending':
        return 'bg-yellow-500'
      case 'local-only':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = () => {
    switch (syncStatus) {
      case 'synced':
        return 'Synced'
      case 'sync-pending':
        return 'Pending Sync'
      case 'local-only':
        return 'Local Only'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Status Indicator */}
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        <span className="text-sm text-gray-700">{getStatusText()}</span>
      </div>

      {/* Sync Button */}
      <button
        onClick={handleSync}
        disabled={isSyncing || !isOnline || syncStatus === 'synced'}
        className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
          isSyncing || !isOnline || syncStatus === 'synced'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSyncing ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Syncing...
          </span>
        ) : (
          'Sync Now'
        )}
      </button>
    </div>
  )
}