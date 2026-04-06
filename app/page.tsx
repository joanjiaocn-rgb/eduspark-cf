'use client';

import { useState } from 'react';
import LessonForm from './components/LessonForm';
import LessonDisplay from './components/LessonDisplay';
import { LessonPlan, FormData } from './types';

export default function HomePage() {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handleGenerate = async (formData: FormData) => {
    setIsGenerating(true);
    setCurrentFormData(formData);
    
    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('生成失败');
      }

      const data = await response.json();
      setLessonPlan(data.lessonPlan);
    } catch (error) {
      console.error('Error:', error);
      alert('生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdate = async () => {
    if (currentFormData) {
      await handleGenerate(currentFormData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 头部 */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduSpark
              </h1>
              <p className="text-gray-600 mt-2">
                北美中小学教学教案生成工具
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                AI Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：表单区域 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                创建教案
              </h2>
              <LessonForm 
                onSubmit={handleGenerate}
                isLoading={isGenerating}
                onUpdate={handleUpdate}
                hasLesson={!!lessonPlan}
              />
            </div>
          </div>

          {/* 右侧：教案展示区域 */}
          <div className="lg:col-span-2">
            {lessonPlan ? (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">{lessonPlan.title}</h2>
                        <p className="opacity-90 mt-1">
                          {lessonPlan.grade} • {lessonPlan.subject} • {lessonPlan.duration}分钟
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                          {lessonPlan.standard}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <LessonDisplay lessonPlan={lessonPlan} />
                </div>

                {/* 导出按钮 */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <ExportButtons lessonPlan={lessonPlan} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    开始创建您的教案
                  </h3>
                  <p className="text-gray-600 mb-6">
                    在左侧填写教案要求，AI将为您生成符合北美教学标准的完整教案
                  </p>
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      符合北美教学标准
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      支持多格式导出
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      可重复编辑优化
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>© 2024 EduSpark. 专为北美中小学教师设计</p>
        <p className="mt-1">本工具符合 Common Core State Standards 和 北美教学标准</p>
      </footer>
    </div>
  );
}

// 导入 ExportButtons
import ExportButtons from './components/ExportButtons';
