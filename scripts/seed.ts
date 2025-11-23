// scripts/seed.ts
// Run this with: npx ts-node scripts/seed.ts

import 'dotenv/config'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetbox'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Create demo user
    const existingUser = await User.findOne({ email: 'hire-me@anshumat.org' })
    
    if (existingUser) {
      console.log('ℹ️  Demo user already exists')
    } else {
      await User.create({
        email: 'hire-me@anshumat.org',
        password: 'HireMe@2025!',
        name: 'Demo User'
      })
      console.log('✅ Created demo user: hire-me@anshumat.org')
    }

    console.log('✅ Seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()