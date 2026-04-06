'use client';

import { LessonPlan } from '@/app/types';
import { exportToPDF, exportToWord, exportToPPT } from '@/app/utils/exportUtils';

interface ExportButtonsProps {
  lessonPlan: LessonPlan;
}

export default function ExportButtons({ lessonPlan }: ExportButtonsProps) {
  const handleExport = async (format: 'pdf' | 'word' | 'ppt') => {
    try {
      switch (format) {
        case 'pdf':
          await exportToPDF(lessonPlan);
          break;
        case 'word':
          await exportToWord(lessonPlan);
          break;
        case 'ppt':
          await exportToPPT(lessonPlan);
          break;
      }
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">导出教案</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleExport('pdf')}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">导出为 PDF</span>
        </button>
        
        <button
          onClick={() => handleExport('word')}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">导出为 Word</span>
        </button>
        
        <button
          onClick={() => handleExport('ppt')}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">导出为 PPT</span>
        </button>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => navigator.clipboard.writeText(JSON.stringify(lessonPlan, null, 2))}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          复制JSON
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          打印教案
        </button>
      </div>
    </div>
  );
}
