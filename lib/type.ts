// lib/types.ts

export interface BudgetData {
  id?: string
  userId: string
  income: number
  monthlyBills: number
  food: number
  transport: number
  subscriptions: number
  miscellaneous: number
  lastModified: Date
  syncedAt?: Date | null
}

export interface User {
  email: string
  password: string
  name?: string
}

export type SyncStatus = 'local-only' | 'sync-pending' | 'synced'

export interface Analytics {
  burnRate: number // expenses / income
  savingsPotential: number // income - total expenses
  monthEndPrediction: number
  categoryBreakdown: CategoryData[]
  anomalies: string[]
}

export interface CategoryData {
  name: string
  value: number
  percentage: number
}