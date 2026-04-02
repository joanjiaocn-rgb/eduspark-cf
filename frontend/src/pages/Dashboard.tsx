import { FileText, PenTool } from 'lucide-react'

interface DashboardProps {
  onNavigate: (page: 'lesson-plan' | 'grading') => void
}

function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold text-slate-800">EduSpark</span>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Login / Register
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Your AI Teaching Assistant,
            <br />
            <span className="text-primary-600">Ready in Seconds</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Save hours of prep time with AI-powered lesson planning and grading
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* Lesson Plan Card */}
          <button
            onClick={() => onNavigate('lesson-plan')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 text-left hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
              <FileText className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create a Lesson Plan</h2>
            <p className="text-slate-600 mb-6">From topic to structured plan in 1 minute</p>
            <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
              Start Creating
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>

          {/* Grading Card */}
          <button
            onClick={() => onNavigate('grading')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 text-left hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-edu-green/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-edu-green/30 transition-colors">
              <PenTool className="w-7 h-7 text-edu-green" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Grade Assignments</h2>
            <p className="text-slate-600 mb-6">Get AI feedback on essays & answers in 30s</p>
            <div className="flex items-center text-edu-green font-semibold group-hover:gap-2 transition-all">
              Start Grading
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex gap-12 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-800">1 min</div>
            <div className="text-sm text-slate-600">to generate lesson plan</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-800">30 sec</div>
            <div className="text-sm text-slate-600">to grade assignments</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-800">10,000+</div>
            <div className="text-sm text-slate-600">teachers using EduSpark</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard