// lib/localDB.ts
import localforage from 'localforage'
import { BudgetData } from './type'

// Configure IndexedDB
const budgetDB = localforage.createInstance({
  name: 'BudgetBox',
  storeName: 'budgets',
  description: 'Local-first budget storage'
})

export const localDB = {
  // Save budget to IndexedDB
  async saveBudget(userId: string, budget: BudgetData): Promise<void> {
    try {
      await budgetDB.setItem(`budget_${userId}`, budget)
      console.log('✅ Saved to IndexedDB:', budget)
    } catch (error) {
      console.error('❌ Error saving to IndexedDB:', error)
      throw error
    }
  },

  // Load budget from IndexedDB
  async loadBudget(userId: string): Promise<BudgetData | null> {
    try {
      const budget = await budgetDB.getItem<BudgetData>(`budget_${userId}`)
      console.log('📂 Loaded from IndexedDB:', budget)
      return budget
    } catch (error) {
      console.error('❌ Error loading from IndexedDB:', error)
      return null
    }
  },

  // Clear budget (for logout)
  async clearBudget(userId: string): Promise<void> {
    try {
      await budgetDB.removeItem(`budget_${userId}`)
      console.log('🗑️ Cleared IndexedDB for user:', userId)
    } catch (error) {
      console.error('❌ Error clearing IndexedDB:', error)
    }
  },

  // Check if budget exists
  async hasBudget(userId: string): Promise<boolean> {
    try {
      const budget = await budgetDB.getItem(`budget_${userId}`)
      return budget !== null
    } catch (error) {
      return false
    }
  }
}