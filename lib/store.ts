// lib/store.ts
import { create } from 'zustand'
import { BudgetData, SyncStatus } from './type'

interface BudgetStore {
  budget: BudgetData
  syncStatus: SyncStatus
  isOnline: boolean
  
  // Actions
  setBudget: (budget: Partial<BudgetData>) => void
  setSyncStatus: (status: SyncStatus) => void
  setIsOnline: (online: boolean) => void
  updateField: (field: keyof BudgetData, value: number) => void
}

const defaultBudget: BudgetData = {
  userId: '',
  income: 0,
  monthlyBills: 0,
  food: 0,
  transport: 0,
  subscriptions: 0,
  miscellaneous: 0,
  lastModified: new Date(),
  syncedAt: null
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budget: defaultBudget,
  syncStatus: 'local-only',
  isOnline: true,

  setBudget: (budget) => 
    set((state) => ({
      budget: { ...state.budget, ...budget, lastModified: new Date() },
      syncStatus: 'sync-pending'
    })),

  setSyncStatus: (status) => 
    set({ syncStatus: status }),

  setIsOnline: (online) => 
    set({ isOnline: online }),

  updateField: (field, value) =>
    set((state) => {
      // Only update numeric budget fields
      if (typeof state.budget[field] === 'number') {
        return {
          budget: {
            ...state.budget,
            [field]: value,
            lastModified: new Date()
          },
          syncStatus: 'sync-pending'
        }
      }
      return state
    })
}))