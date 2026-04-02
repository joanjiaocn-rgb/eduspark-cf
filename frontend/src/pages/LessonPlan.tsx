import { useState } from 'react'
import { ArrowLeft, Loader2, Copy, Download } from 'lucide-react'
import { API_BASE_URL } from '../App'

interface LessonPlanProps {
  onBack: () => void
}

const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art', 'Music', 'Physical Education']
const grades = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']

function LessonPlan({ onBack }: LessonPlanProps) {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    instructions: '',
    duration: '45 minutes'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [isCached, setIsCached] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setIsCached(false)
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/lesson-plans/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setResult(data.data)
        setIsCached(data.cached || false)
      } else {
        setError(data.error || 'Failed to generate lesson plan')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const downloadAsText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lesson-plan-${formData.topic.replace(/\s+/g, '-').toLowerCase()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold text-slate-800">EduSpark</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left: Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="mb-6">
              <span className="text-sm font-medium text-primary-600">Step 1</span>
              <h1 className="text-2xl font-bold text-slate-800 mt-1">Tell AI about your lesson</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Grade Level *</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Select a grade</option>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Core Topic / Keywords *</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Photosynthesis, World War II, Quadratic Equations"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Lesson Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                  <option value="90 minutes">90 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Instructions (Optional)</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="e.g., 'focus on critical thinking', 'include group activities', '5E model'"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.subject || !formData.grade || !formData.topic}
                className="w-full py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Lesson Plan
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Result Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {!result ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">Your AI-generated lesson plan will appear here</h3>
                <p className="text-slate-500">Fill in the form and click generate to get started</p>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">Generated Lesson Plan</span>
                    {isCached && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Cached
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      title="Copy All"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={downloadAsText}
                      className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-auto">
                  <div className="prose prose-slate max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
                      {result}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border-t border-red-100">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default LessonPlan