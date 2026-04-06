'use client';

import { useState } from 'react';
import GradeSelector from './GradeSelector';
import SubjectSelector from './SubjectSelector';
import { FormData } from '@/app/types';

interface LessonFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  onUpdate: () => void;
  hasLesson: boolean;
}

export default function LessonForm({ onSubmit, isLoading, onUpdate, hasLesson }: LessonFormProps) {
  const [formData, setFormData] = useState<FormData>({
    grade: 'Grade 3',
    subject: 'Mathematics',
    topic: '',
    duration: 45,
    objectives: [],
    standards: [],
    materials: [],
    technology: [],
    specialNeeds: '',
    languageLevel: 'Intermediate',
    assessmentType: 'Formative',
    customInstructions: '',
  });

  const [tempObjective, setTempObjective] = useState('');
  const [tempStandard, setTempStandard] = useState('');
  const [tempMaterial, setTempMaterial] = useState('');
  const [tempTech, setTempTech] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addObjective = () => {
    if (tempObjective.trim()) {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, tempObjective.trim()]
      });
      setTempObjective('');
    }
  };

  const addStandard = () => {
    if (tempStandard.trim()) {
      setFormData({
        ...formData,
        standards: [...formData.standards, tempStandard.trim()]
      });
      setTempStandard('');
    }
  };

  const addMaterial = () => {
    if (tempMaterial.trim()) {
      setFormData({
        ...formData,
        materials: [...formData.materials, tempMaterial.trim()]
      });
      setTempMaterial('');
    }
  };

  const addTech = () => {
    if (tempTech.trim()) {
      setFormData({
        ...formData,
        technology: [...formData.technology, tempTech.trim()]
      });
      setTempTech('');
    }
  };

  const removeItem = (type: keyof FormData, index: number) => {
    const items = [...formData[type] as string[]];
    items.splice(index, 1);
    setFormData({ ...formData, [type]: items });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* 年级和学科选择 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              年级
            </label>
            <GradeSelector
              value={formData.grade}
              onChange={(value) => setFormData({ ...formData, grade: value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学科
            </label>
            <SubjectSelector
              value={formData.subject}
              onChange={(value) => setFormData({ ...formData, subject: value })}
            />
          </div>
        </div>

        {/* 主题 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            教学主题
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例如：光合作用、分数运算、美国独立战争"
            required
          />
        </div>

        {/* 课时 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            课时长度（分钟）
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 45 })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="15"
            max="120"
            step="5"
          />
        </div>

        {/* 学习目标 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            学习目标
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tempObjective}
              onChange={(e) => setTempObjective(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：学生能够理解分数的基本概念"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
            />
            <button
              type="button"
              onClick={addObjective}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              添加
            </button>
          </div>
          <div className="space-y-1">
            {formData.objectives.map((obj, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                <span className="text-sm">{obj}</span>
                <button
                  type="button"
                  onClick={() => removeItem('objectives', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 教学标准 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            教学标准（CCSS/NGSS等）
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tempStandard}
              onChange={(e) => setTempStandard(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：CCSS.MATH.CONTENT.3.NF.A.1"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStandard())}
            />
            <button
              type="button"
              onClick={addStandard}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              添加
            </button>
          </div>
          <div className="space-y-1">
            {formData.standards.map((std, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                <span className="text-sm font-mono">{std}</span>
                <button
                  type="button"
                  onClick={() => removeItem('standards', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 教学材料 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            教学材料
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tempMaterial}
              onChange={(e) => setTempMaterial(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：白板、马克笔、工作表"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
            />
            <button
              type="button"
              onClick={addMaterial}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              添加
            </button>
          </div>
          <div className="space-y-1">
            {formData.materials.map((mat, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                <span className="text-sm">{mat}</span>
                <button
                  type="button"
                  onClick={() => removeItem('materials', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 技术要求 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            技术要求
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tempTech}
              onChange={(e) => setTempTech(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="例如：投影仪、平板电脑、互联网"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              添加
            </button>
          </div>
          <div className="space-y-1">
            {formData.technology.map((tech, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                <span className="text-sm">{tech}</span>
                <button
                  type="button"
                  onClick={() => removeItem('technology', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 特殊需求 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            特殊教育需求
          </label>
          <textarea
            value={formData.specialNeeds}
            onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="描述学生的特殊需求（如：学习障碍、天赋学生、注意力不足等）"
          />
        </div>

        {/* 语言水平 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            学生语言水平
          </label>
          <select
            value={formData.languageLevel}
            onChange={(e) => setFormData({ ...formData, languageLevel: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Beginner">初级</option>
            <option value="Intermediate">中级</option>
            <option value="Advanced">高级</option>
            <option value="Native">母语水平</option>
          </select>
        </div>

        {/* 评估类型 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评估类型
          </label>
          <select
            value={formData.assessmentType}
            onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Formative">形成性评估</option>
            <option value="Summative">总结性评估</option>
            <option value="Both">两者结合</option>
            <option value="Project">项目评估</option>
          </select>
        </div>

        {/* 自定义要求 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            其他要求
          </label>
          <textarea
            value={formData.customInstructions}
            onChange={(e) => setFormData({ ...formData, customInstructions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="其他特殊要求或教学风格偏好..."
          />
        </div>
      </div>

      {/* 按钮组 */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成教案中...
            </>
          ) : (
            '生成教案'
          )}
        </button>
        
        {hasLesson && (
          <button
            type="button"
            onClick={onUpdate}
            disabled={isLoading}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors disabled:opacity-50"
          >
            重新生成
          </button>
        )}
      </div>
    </form>
  );
}
