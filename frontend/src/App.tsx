import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import LessonPlan from './pages/LessonPlan'
import Grading from './pages/Grading'
import './App.css'

type Page = 'dashboard' | 'lesson-plan' | 'grading'

// Cloudflare Worker API 地址
// 开发环境使用 localhost，生产环境使用 Workers 地址
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

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