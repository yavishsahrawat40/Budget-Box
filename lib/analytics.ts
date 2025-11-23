// lib/analytics.ts
import { BudgetData, Analytics, CategoryData } from './type'

export function calculateAnalytics(budget: BudgetData): Analytics {
  const { income, monthlyBills, food, transport, subscriptions, miscellaneous } = budget

  // Calculate total expenses
  const totalExpenses = monthlyBills + food + transport + subscriptions + miscellaneous

  // Burn Rate: expenses / income (as percentage)
  const burnRate = income > 0 ? (totalExpenses / income) * 100 : 0

  // Savings Potential
  const savingsPotential = income - totalExpenses

  // Month-End Prediction (simple: current savings * 1)
  // In real app, this would factor in spending trends
  const monthEndPrediction = savingsPotential

  // Category Breakdown for Pie Chart
  const categoryBreakdown: CategoryData[] = [
    { name: 'Monthly Bills', value: monthlyBills, percentage: income > 0 ? (monthlyBills / income) * 100 : 0 },
    { name: 'Food', value: food, percentage: income > 0 ? (food / income) * 100 : 0 },
    { name: 'Transport', value: transport, percentage: income > 0 ? (transport / income) * 100 : 0 },
    { name: 'Subscriptions', value: subscriptions, percentage: income > 0 ? (subscriptions / income) * 100 : 0 },
    { name: 'Miscellaneous', value: miscellaneous, percentage: income > 0 ? (miscellaneous / income) * 100 : 0 },
  ].filter(cat => cat.value > 0) // Only show categories with values

  // Anomaly Detection (Rule-based)
  const anomalies: string[] = []

  if (income > 0) {
    const foodPercent = (food / income) * 100
    const subsPercent = (subscriptions / income) * 100

    if (foodPercent > 40) {
      anomalies.push(`⚠️ Food expenses are ${foodPercent.toFixed(1)}% of your income — consider reducing dining out.`)
    }

    if (subsPercent > 30) {
      anomalies.push(`⚠️ Subscriptions are ${subsPercent.toFixed(1)}% of your income — review and cancel unused services.`)
    }

    if (savingsPotential < 0) {
      anomalies.push(`🚨 Your expenses exceed your income by ₹${Math.abs(savingsPotential).toFixed(2)}. Urgent action needed!`)
    }

    if (burnRate > 90 && savingsPotential >= 0) {
      anomalies.push(`⚠️ You're spending ${burnRate.toFixed(1)}% of your income. Try to save at least 10%.`)
    }
  }

  return {
    burnRate,
    savingsPotential,
    monthEndPrediction,
    categoryBreakdown,
    anomalies
  }
}