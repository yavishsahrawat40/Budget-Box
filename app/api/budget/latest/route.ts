// app/api/budget/latest/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB, Budget } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      )
    }

    const budget = await Budget.findOne({ userId }).sort({ syncedAt: -1 })

    if (!budget) {
      return NextResponse.json({
        success: true,
        message: 'No budget found',
        data: null
      })
    }

    return NextResponse.json({
      success: true,
      data: budget
    })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch budget' },
      { status: 500 }
    )
  }
}