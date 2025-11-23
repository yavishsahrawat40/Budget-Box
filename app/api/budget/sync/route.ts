// app/api/budget/sync/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB, Budget } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { userId, income, monthlyBills, food, transport, subscriptions, miscellaneous } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    // Find existing budget or create new one
    const budget = await Budget.findOneAndUpdate(
      { userId },
      {
        userId,
        income: income || 0,
        monthlyBills: monthlyBills || 0,
        food: food || 0,
        transport: transport || 0,
        subscriptions: subscriptions || 0,
        miscellaneous: miscellaneous || 0,
        lastModified: new Date(body.lastModified || Date.now()),
        syncedAt: new Date()
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Budget synced successfully',
      timestamp: budget.syncedAt,
      data: budget
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync budget' },
      { status: 500 }
    )
  }
}