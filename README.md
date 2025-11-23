# 💰 BudgetBox

A modern, offline-first budget tracking application built with Next.js 16, featuring real-time analytics, smart insights, and a premium glassmorphism UI.

## ✨ Features

- **🔒 Offline-First Architecture**: Works seamlessly without internet connection using IndexedDB
- **💾 Auto-Save**: Every keystroke is automatically saved locally
- **📊 Smart Analytics**: Real-time budget insights with burn rate, savings potential, and month-end predictions
- **🎨 Premium UI**: Modern dark theme with glassmorphism effects and smooth animations
- **🔄 Cloud Sync**: Sync your data to MongoDB when online
- **📱 Responsive Design**: Works beautifully on desktop and mobile devices
- **🔐 User Authentication**: Secure login and signup system
- **📈 Visual Charts**: Interactive pie charts for category breakdown

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Database**: MongoDB (with Mongoose)
- **Local Storage**: IndexedDB (via LocalForage)
- **Charts**: Recharts
- **Font**: Google Fonts (Outfit)

## 📋 Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd budget-box
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/budgetbox
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/budgetbox
   ```

4. **Seed the database (optional)**

   ```bash
   npx ts-node scripts/seed.ts
   ```

   This creates a demo user:

   - Email: `hire-me@anshumat.org`
   - Password: `HireMe@2025!`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
budget-box/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   └── budget/          # Budget CRUD endpoints
│   ├── budget/              # Budget page
│   ├── signup/              # Signup page
│   ├── globals.css          # Global styles & theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Login page
├── components/              # React components
│   ├── BudgetForm.tsx       # Budget input form
│   ├── Dashboard.tsx        # Analytics dashboard
│   ├── OfflineIndicator.tsx # Online/offline status
│   └── SyncButton.tsx       # Cloud sync control
├── lib/                     # Utilities & helpers
│   ├── analytics.ts         # Budget analytics logic
│   ├── localDB.ts           # IndexedDB wrapper
│   ├── mongodb.ts           # MongoDB connection
│   ├── store.ts             # Zustand state management
│   ├── type.ts              # TypeScript types
│   └── utils.ts             # Utility functions
├── scripts/                 # Utility scripts
│   └── seed.ts              # Database seeding
└── public/                  # Static assets
```

## 🎯 Usage

### First Time Setup

1. **Sign Up**: Create a new account or use the demo credentials
2. **Enter Budget**: Fill in your monthly income and expenses
3. **View Analytics**: See real-time insights on your spending

### Key Features

#### Budget Form

- Monthly Income
- Monthly Bills (Rent, EMI, utilities)
- Food (Groceries + dining)
- Transport (Fuel, cab, commute)
- Subscriptions (OTT, SaaS, apps)
- Miscellaneous expenses

#### Dashboard Metrics

- **Burn Rate**: Percentage of income spent
- **Savings Potential**: Amount available to save (or deficit)
- **Month-End Prediction**: Projected balance at month end
- **Category Breakdown**: Visual pie chart of spending
- **Insights & Alerts**: Smart recommendations based on your budget

### Offline Mode

The app works completely offline:

- All data is stored in IndexedDB
- Changes are auto-saved locally
- Sync to cloud when you're back online

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run lint         # Run ESLint
npx ts-node scripts/seed.ts  # Seed database
```

## 🎨 Design System

### Color Palette

- **Background**: Deep blue/slate (`#0f172a`)
- **Primary**: Blue (`#3b82f6`)
- **Secondary**: Purple (`#8b5cf6`)
- **Success**: Emerald (`#10b981`)
- **Warning**: Orange (`#f59e0b`)
- **Error**: Rose (`#ef4444`)

### Typography

- **Font Family**: Outfit (Google Fonts)
- **Weights**: 400, 500, 600, 700

### UI Components

- **Glassmorphism**: Semi-transparent panels with backdrop blur
- **Animations**: Smooth transitions and floating effects
- **Responsive**: Mobile-first design approach

## 🔐 Authentication

The app uses a simple authentication system:

- Passwords are stored in MongoDB (Note: In production, use proper hashing like bcrypt)
- User sessions are managed via localStorage
- Protected routes redirect to login if not authenticated

## 📊 Analytics Engine

The analytics engine calculates:

- **Burn Rate**: `(totalExpenses / income) * 100`
- **Savings Potential**: `income - totalExpenses`
- **Month-End Prediction**: Based on current spending patterns
- **Anomaly Detection**: Identifies unusual spending patterns

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS
- Google Cloud

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 👨‍💻 Author

Built with ❤️ by Yavish

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful data visualization
