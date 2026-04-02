import { useState } from 'react'
import { ArrowLeft, Loader2, Copy, Upload, FileText, Image as ImageIcon } from 'lucide-react'
import { API_BASE_URL } from '../App'

interface GradingProps {
  onBack: () => void
}

type AssignmentType = 'essay' | 'short_answer' | 'math'
type UploadMode = 'image' | 'text'

interface GradingResult {
  score: number
  overall_comment: string
  strengths: string[]
  improvements: Array<{ issue: string; suggestion: string }>
  teacher_comments: string[]
}

function Grading({ onBack }: GradingProps) {
  const [uploadMode, setUploadMode] = useState<UploadMode>('text')
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('essay')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GradingResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/grading/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          assignment_type: assignmentType,
          subject: 'English'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Parse JSON response from AI
        try {
          const parsed = JSON.parse(data.data)
          setResult(parsed)
        } catch {
          // If not valid JSON, treat as text
          setResult({
            score: 0,
            overall_comment: data.data,
            strengths: [],
            improvements: [],
            teacher_comments: []
          })
        }
      } else {
        setError(data.error || 'Failed to analyze assignment')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyFeedback = () => {
    if (!result) return
    const feedback = `
Score: ${result.score}/10
${result.overall_comment}

Strengths:
${result.strengths.map(s => `- ${s}`).join('\n')}

Areas for Improvement:
${result.improvements.map(i => `- ${i.issue}: ${i.suggestion}`).join('\n')}

Teacher Comments:
${result.teacher_comments.map(c => `- ${c}`).join('\n')}
    `.trim()
    navigator.clipboard.writeText(feedback)
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
        {!result ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h1 className="text-2xl font-bold text-slate-800 mb-6">Grade Student Assignment</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload Mode Tabs */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUploadMode('text')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      uploadMode === 'text'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      Paste Text
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('image')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      uploadMode === 'image'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Upload Image
                    </div>
                  </button>
                </div>

                {/* Content Input */}
                {uploadMode === 'text' ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Student Work *</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste the student's assignment here..."
                      rows={10}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Image *</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">Drag and drop an image here, or click to browse</p>
                      <p className="text-sm text-slate-400">Supported: PNG, JPG</p>
                    </div>
                    <p className="text-sm text-amber-600 mt-2">⚠️ Image upload with OCR coming soon. Please use text paste for now.</p>
                  </div>
                )}

                {/* Assignment Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Assignment Type</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'essay', label: 'Essay' },
                      { value: 'short_answer', label: 'Short Answer' },
                      { value: 'math', label: 'Math Problem' }
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex-1 cursor-pointer ${
                          assignmentType === type.value
                            ? 'ring-2 ring-primary-500 bg-primary-50'
                            : 'hover:bg-slate-50'
                        } border border-slate-200 rounded-xl p-4 transition-all`}
                      >
                        <input
                          type="radio"
                          name="assignmentType"
                          value={type.value}
                          checked={assignmentType === type.value}
                          onChange={(e) => setAssignmentType(e.target.value as AssignmentType)}
                          className="sr-only"
                        />
                        <span className="font-medium text-slate-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="w-full py-4 bg-edu-green text-white font-semibold rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get AI Feedback
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary-600">
                    {result.score}/10
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Overall Score</p>
                    <p className="text-sm text-slate-600">{result.overall_comment}</p>
                  </div>
                </div>
                <button
                  onClick={copyFeedback}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy All Feedback
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Strengths */}
                {result.strengths.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-edu-green rounded-full"></span>
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-edu-green mt-1">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {result.improvements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                      {result.improvements.map((item, idx) => (
                        <li key={idx} className="bg-amber-50 rounded-lg p-4">
                          <p className="font-medium text-slate-800 mb-1">{item.issue}</p>
                          <p className="text-sm text-slate-600">💡 {item.suggestion}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Teacher Comments */}
                {result.teacher_comments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Sample Comments (Ready to Use)
                    </h3>
                    <div className="space-y-3">
                      {result.teacher_comments.map((comment, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-50 rounded-lg border-l-4 border-primary-500 cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => navigator.clipboard.writeText(comment)}
                        >
                          <p className="text-slate-700">{comment}</p>
                          <p className="text-xs text-slate-400 mt-2">Click to copy</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between">
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  ← Grade Another
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Grading