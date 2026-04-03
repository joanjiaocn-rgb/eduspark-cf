import { FileText, PenTool, Sparkles, Zap, Shield, Clock, ArrowRight, Play } from 'lucide-react'

interface DashboardProps {
  onNavigate: (page: 'lesson-plan' | 'grading') => void
}

function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">EduSpark</span>
        </div>
        <button className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all backdrop-blur-sm">
          登录 / 注册
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="px-4 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>AI 驱动的教育助手</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            让备课
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> 轻松高效</span>
          </h1>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            利用 AI 技术，在几秒钟内生成专业教案、自动批改作业，让教师专注于真正重要的事 — 教学本身
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button 
              onClick={() => onNavigate('lesson-plan')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              开始创建教案
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 text-white/80 font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-all">
              了解更多
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
            {/* Lesson Plan Card */}
            <button
              onClick={() => onNavigate('lesson-plan')}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-500 text-left overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">AI 教案生成</h2>
                <p className="text-white/60 mb-6">输入主题，1 分钟内获得完整教案，包含教学目标、活动设计和评估方案</p>
                <div className="flex items-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                  立即体验
                  <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Grading Card */}
            <button
              onClick={() => onNavigate('grading')}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-green-400/50 transition-all duration-500 text-left overflow-hidden hover:shadow-2xl hover:shadow-green-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">智能作业批改</h2>
                <p className="text-white/60 mb-6">AI 自动批改作业，提供详细反馈和改进建议，节省 90% 批改时间</p>
                <div className="flex items-center text-green-400 font-semibold group-hover:gap-2 transition-all">
                  立即体验
                  <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 border-t border-white/10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/50">教师用户</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-white/50">教案生成</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/50">满意度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1 分钟</div>
              <div className="text-white/50">平均生成时间</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
              为什么选择 <span className="text-blue-400">EduSpark</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">极速生成</h3>
                <p className="text-white/60">利用先进的 AI 模型，几秒钟内生成高质量教案</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">专业可靠</h3>
                <p className="text-white/60">基于教育理论和最佳实践，确保教案质量</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">节省时间</h3>
                <p className="text-white/60">将备课时间从几小时缩短到几分钟</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">© 2025 EduSpark. 让教学更轻松。</p>
        </footer>
      </main>
    </div>
  )
}

export default Dashboard