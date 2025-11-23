'use client'
// components/BudgetForm.tsx
import { useEffect, useState } from 'react'
import { useBudgetStore } from '@/lib/store'
import { localDB } from '@/lib/localDB'

export default function BudgetForm({ userId }: { userId: string }) {
  const { budget, updateField, setBudget } = useBudgetStore()
  const [isLoading, setIsLoading] = useState(true)

  // Load budget from IndexedDB on mount
  useEffect(() => {
    const loadBudget = async () => {
      const savedBudget = await localDB.loadBudget(userId)
      if (savedBudget) {
        setBudget(savedBudget)
      } else {
        setBudget({ userId })
      }
      setIsLoading(false)
    }
    loadBudget()
  }, [userId, setBudget])

  // Auto-save to IndexedDB on every change
  useEffect(() => {
    if (!isLoading && budget.userId) {
      localDB.saveBudget(userId, budget)
    }
  }, [budget, userId, isLoading])

  const handleChange = (field: keyof typeof budget, value: string) => {
    const numValue = parseFloat(value) || 0
    updateField(field, numValue)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const fields = [
    { key: 'income' as const, label: 'Monthly Income', description: 'Your total monthly income' },
    { key: 'monthlyBills' as const, label: 'Monthly Bills', description: 'Rent, EMI, utilities' },
    { key: 'food' as const, label: 'Food', description: 'Groceries + dining out' },
    { key: 'transport' as const, label: 'Transport', description: 'Fuel, cab, commute' },
    { key: 'subscriptions' as const, label: 'Subscriptions', description: 'OTT, SaaS, apps' },
    { key: 'miscellaneous' as const, label: 'Miscellaneous', description: 'Other expenses' },
  ]

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📝</span> Monthly Budget
      </h2>
      
      <div className="space-y-5">
        {fields.map(({ key, label, description }) => (
          <div key={key} className="flex flex-col group">
            <label htmlFor={key} className="text-sm font-medium text-gray-300 mb-1.5 group-hover:text-blue-400 transition-colors">
              {label}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                id={key}
                type="number"
                min="0"
                step="0.01"
                value={budget[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full pl-8 pr-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600 text-white"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        <p className="text-xs text-blue-200 font-medium">
          Auto-saving changes locally
        </p>
      </div>
    </div>
  )
}