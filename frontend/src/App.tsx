import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import LessonPlan from './pages/LessonPlan'
import Grading from './pages/Grading'
import './App.css'

type Page = 'dashboard' | 'lesson-plan' | 'grading'

// Cloudflare Worker API 地址
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.eduspark.app'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
      {currentPage === 'lesson-plan' && <LessonPlan onBack={() => navigateTo('dashboard')} />}
      {currentPage === 'grading' && <Grading onBack={() => navigateTo('dashboard')} />}
    </div>
  )
}

export default App