// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetbox'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// Global cache to prevent multiple connections in development
let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Budget Schema
const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  income: { type: Number, default: 0 },
  monthlyBills: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  transport: { type: Number, default: 0 },
  subscriptions: { type: Number, default: 0 },
  miscellaneous: { type: Number, default: 0 },
  lastModified: { type: Date, default: Date.now },
  syncedAt: { type: Date, default: Date.now }
})

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
})

export const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema)
export const User = mongoose.models.User || mongoose.model('User', userSchema)