'use client';

import { LessonPlan } from '@/app/types';

interface LessonDisplayProps {
  lessonPlan: LessonPlan;
}

export default function LessonDisplay({ lessonPlan }: LessonDisplayProps) {
  return (
    <div className="p-6 space-y-8">
      {/* 核心问题 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">核心问题</h3>
        <p className="text-gray-700 italic bg-blue-50 p-4 rounded-lg">{lessonPlan.essentialQuestion}</p>
      </section>

      {/* 学习目标 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">学习目标</h3>
        <ul className="list-disc list-inside space-y-2">
          {lessonPlan.learningObjectives.map((obj, index) => (
            <li key={index} className="text-gray-700">{obj}</li>
          ))}
        </ul>
      </section>

      {/* 词汇表 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">关键词汇</h3>
        <div className="flex flex-wrap gap-2">
          {lessonPlan.vocabulary.map((word, index) => (
            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {word}
            </span>
          ))}
        </div>
      </section>

      {/* 教学材料 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">教学材料</h3>
        <ul className="list-disc list-inside space-y-1">
          {lessonPlan.materials.map((mat, index) => (
            <li key={index} className="text-gray-700">{mat}</li>
          ))}
        </ul>
      </section>

      {/* 技术需求 */}
      {lessonPlan.technology.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">技术需求</h3>
          <ul className="list-disc list-inside space-y-1">
            {lessonPlan.technology.map((tech, index) => (
              <li key={index} className="text-gray-700">{tech}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 教学流程 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">教学流程</h3>
        <div className="space-y-4">
          {lessonPlan.procedure.map((step, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {step.time}
                </span>
                <span className="font-medium text-gray-800">{step.activity}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">教师活动</p>
                  <p className="text-sm text-gray-700">{step.teacherActions}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-800 mb-1">学生活动</p>
                  <p className="text-sm text-gray-700">{step.studentActions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 差异化教学 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">差异化教学</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">学习困难学生</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {lessonPlan.differentiation.forStruggling.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">进阶学生</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {lessonPlan.differentiation.forAdvanced.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-medium text-pink-800 mb-2">英语学习者</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {lessonPlan.differentiation.forELL.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 评估 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">评估方式</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">形成性评估</h4>
            <ul className="list-disc list-inside space-y-1">
              {lessonPlan.assessment.formative.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">总结性评估</h4>
            <p className="text-gray-700">{lessonPlan.assessment.summative}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">评分标准</h4>
            <ul className="list-disc list-inside space-y-1">
              {lessonPlan.assessment.rubrics.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 家庭作业 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">家庭作业</h3>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{lessonPlan.homework}</p>
      </section>

      {/* 扩展活动 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">扩展活动</h3>
        <ul className="list-disc list-inside space-y-2">
          {lessonPlan.extensions.map((ext, index) => (
            <li key={index} className="text-gray-700">{ext}</li>
          ))}
        </ul>
      </section>

      {/* 跨学科连接 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">跨学科连接</h3>
        <ul className="list-disc list-inside space-y-2">
          {lessonPlan.crossCurricular.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </section>

      {/* 教师备注 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">教师备注</h3>
        <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg">{lessonPlan.teacherNotes}</p>
      </section>
    </div>
  );
}
