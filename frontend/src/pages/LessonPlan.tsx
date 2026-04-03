import { useState } from 'react'
import { ArrowLeft, Loader2, Copy, Download, Sparkles, CheckCircle, BookOpen, GraduationCap, Clock, Lightbulb } from 'lucide-react'
import { API_BASE_URL } from '../App'

interface LessonPlanProps {
  onBack: () => void
}

const subjects = [
  { value: '语文', label: '语文', icon: '📚' },
  { value: '数学', label: '数学', icon: '🔢' },
  { value: '英语', label: '英语', icon: '🔤' },
  { value: '物理', label: '物理', icon: '⚛️' },
  { value: '化学', label: '化学', icon: '🧪' },
  { value: '生物', label: '生物', icon: '🧬' },
  { value: '历史', label: '历史', icon: '📜' },
  { value: '地理', label: '地理', icon: '🌍' },
  { value: '政治', label: '政治', icon: '⚖️' },
  { value: '音乐', label: '音乐', icon: '🎵' },
  { value: '美术', label: '美术', icon: '🎨' },
  { value: '体育', label: '体育', icon: '⚽' },
]

const grades = [
  '幼儿园',
  '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
  '七年级', '八年级', '九年级',
  '高一', '高二', '高三'
]

function LessonPlan({ onBack }: LessonPlanProps) {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    topic: '',
    instructions: '',
    duration: '45'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [isCached, setIsCached] = useState(false)
  const [copied, setCopied] = useState(false)

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
        setError(data.error || '生成失败，请重试')
      }
    } catch (err) {
      setError('网络错误，请检查网络连接')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsText = () => {
    const blob = new Blob([result], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `教案-${formData.topic}-${formData.grade}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center gap-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">EduSpark</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              <span>AI 教案生成器</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">创建您的教案</h1>
            <p className="text-white/50">填写以下信息，AI 将为您生成专业教案</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Input Form */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    学科 *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: s.value })}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          formData.subject === s.value
                            ? 'bg-blue-500 border-blue-400 text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-2xl mb-1">{s.icon}</div>
                        <div className="text-xs">{s.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    年级 *
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="" className="bg-slate-800">选择年级</option>
                    {grades.map(g => (
                      <option key={g} value={g} className="bg-slate-800">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    教学主题 *
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="例如：光合作用、二次函数、唐诗宋词..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
                    <Clock className="w-4 h-4 text-green-400" />
                    课时长度
                  </label>
                  <div className="flex gap-3">
                    {['40', '45', '90'].map((min) => (
                      <button
                        key={min}
                        type="button"
                        onClick={() => setFormData({ ...formData, duration: min })}
                        className={`flex-1 py-3 rounded-xl border transition-all ${
                          formData.duration === min
                            ? 'bg-green-500 border-green-400 text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {min} 分钟
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    特殊要求（可选）
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="例如：需要小组讨论环节、重点培养学生的批判性思维..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.subject || !formData.grade || !formData.topic}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      AI 正在生成教案...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      生成教案
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Result Preview */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden min-h-[600px]">
              {!result ? (
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-blue-400/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI 生成的教案将显示在这里</h3>
                  <p className="text-white/50 max-w-sm">填写左侧表单并点击生成按钮，即可获得完整的教学教案</p>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white">生成的教案</span>
                      {isCached && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          已缓存
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                          copied 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        title="复制"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied && <span className="text-sm">已复制</span>}
                      </button>
                      <button
                        onClick={downloadAsText}
                        className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-all"
                        title="下载"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 overflow-auto">
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/80 bg-transparent p-0">
                        {result}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/20 border-t border-red-500/30">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LessonPlan