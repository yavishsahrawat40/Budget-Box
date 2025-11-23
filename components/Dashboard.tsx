'use client'
// components/Dashboard.tsx
import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useBudgetStore } from '@/lib/store'
import { calculateAnalytics } from '@/lib/analytics'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function Dashboard() {
  const { budget } = useBudgetStore()
  
  const analytics = useMemo(() => calculateAnalytics(budget), [budget])
  
  const totalExpenses = budget.monthlyBills + budget.food + budget.transport + 
                        budget.subscriptions + budget.miscellaneous

  // Don't show dashboard if no data
  if (budget.income === 0 && totalExpenses === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="glass-panel rounded-2xl p-8 text-center border-yellow-500/20 bg-yellow-500/5">
          <span className="text-4xl mb-4 block">📊</span>
          <p className="text-yellow-200 text-lg font-medium">
            Add your budget data to see analytics and insights
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Dashboard Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Burn Rate */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">🔥</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Burn Rate</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">
                {analytics.burnRate.toFixed(1)}%
              </p>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              of income spent
            </p>
            <div className="w-full bg-gray-700/50 h-1.5 rounded-full mt-4 overflow-hidden">
              <div 
                className={`h-full rounded-full ${analytics.burnRate > 85 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${Math.min(analytics.burnRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Savings Potential */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">💸</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Savings Potential</h3>
            </div>
            <p 
              className={`text-4xl font-bold ${
                analytics.savingsPotential >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
              title={`₹${Math.abs(analytics.savingsPotential).toFixed(2)}`}
            >
              {formatCurrency(Math.abs(analytics.savingsPotential))}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {analytics.savingsPotential >= 0 ? 'available to save' : 'deficit amount'}
            </p>
          </div>
        </div>

        {/* Month-End Prediction */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">📅</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Month-End Prediction</h3>
            </div>
            <p 
              className={`text-4xl font-bold ${
                analytics.monthEndPrediction >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
              title={`₹${Math.abs(analytics.monthEndPrediction).toFixed(2)}`}
            >
              {formatCurrency(Math.abs(analytics.monthEndPrediction))}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              projected {analytics.monthEndPrediction >= 0 ? 'balance' : 'shortfall'}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      {analytics.categoryBreakdown.length > 0 && (
        <div className="glass-panel rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.categoryBreakdown as any}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {analytics.categoryBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => `₹${value.toFixed(2)}`}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-gray-300 ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Anomalies / Warnings */}
      {analytics.anomalies.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-orange-500">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> 
            Insights & Alerts
          </h3>
          <div className="space-y-3">
            {analytics.anomalies.map((anomaly: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <p className="text-orange-200">{anomaly}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}