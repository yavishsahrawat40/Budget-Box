'use client'
// app/budget/page.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BudgetForm from '@/components/BudgetForm'
import Dashboard from '@/components/Dashboard'
import OfflineIndicator from '@/components/OfflineIndicator'
import SyncButton from '@/components/SyncButton'

export default function BudgetPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/')
      return
    }

    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen">
      <OfflineIndicator />

      {/* Header */}
      <header className="glass-panel border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-tr from-blue-500/20 to-purple-500/20 border border-blue-500/20">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">BudgetBox</h1>
                <p className="text-xs text-gray-400">Welcome, {user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <SyncButton />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-0">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BudgetForm userId={user.id} />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Dashboard />
          </div>
        </div>
      </main>
    </div>
  )
}