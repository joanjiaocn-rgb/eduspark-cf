import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '@/app/types';

// Cloudflare Edge Runtime
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    // 从环境变量获取 OpenAI API Key
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API Key 未配置' },
        { status: 500 }
      );
    }

    // 构建提示词
    const prompt = buildPrompt(formData);

    // 调用 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `你是一名经验丰富的北美中小学教师，精通CCSS、NGSS等教学标准。请根据用户输入生成详细、实用、有吸引力的教案。教案必须：
            1. 符合北美教学标准
            2. 包含明确的学习目标
            3. 详细的教学步骤
            4. 多样化的评估方法
            5. 差异化教学建议
            6. 使用生动有趣的教学方法
            
            请以JSON格式返回教案，结构如下：
            {
              "title": "教案标题",
              "grade": "年级",
              "subject": "学科",
              "topic": "主题",
              "duration": 45,
              "date": "生成日期",
              "standard": "主要标准",
              "learningObjectives": ["目标1", "目标2"],
              "essentialQuestion": "核心问题",
              "materials": ["材料1", "材料2"],
              "technology": ["技术1"],
              "vocabulary": ["词汇1"],
              "differentiation": {
                "forStruggling": ["建议1"],
                "forAdvanced": ["建议1"],
                "forELL": ["建议1"]
              },
              "procedure": [
                {
                  "time": "5分钟",
                  "activity": "活动描述",
                  "teacherActions": "教师行为",
                  "studentActions": "学生行为"
                }
              ],
              "assessment": {
                "formative": ["形成性评估1"],
                "summative": "总结性评估",
                "rubrics": ["评分标准1"]
              },
              "homework": "家庭作业",
              "extensions": ["扩展活动"],
              "crossCurricular": ["跨学科连接"],
              "teacherNotes": "教师备注"
            }`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'AI 服务调用失败' },
        { status: 500 }
      );
    }

    const completion = await response.json();
    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'AI 返回内容为空' },
        { status: 500 }
      );
    }

    const lessonPlan = JSON.parse(content);
    
    // 添加ID和日期
    lessonPlan.id = Date.now().toString();
    lessonPlan.date = new Date().toISOString().split('T')[0];

    return NextResponse.json({ lessonPlan });
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    return NextResponse.json(
      { error: '生成教案时出错' },
      { status: 500 }
    );
  }
}

function buildPrompt(formData: FormData): string {
  return `
请为以下要求生成一个详细的教案：

年级：${formData.grade}
学科：${formData.subject}
主题：${formData.topic}
课时：${formData.duration}分钟

学习目标：
${formData.objectives.map(obj => `• ${obj}`).join('\n')}

教学标准：
${formData.standards.map(std => `• ${std}`).join('\n')}

教学材料：
${formData.materials.map(mat => `• ${mat}`).join('\n')}

技术要求：
${formData.technology.map(tech => `• ${tech}`).join('\n')}

特殊需求：${formData.specialNeeds}
语言水平：${formData.languageLevel}
评估类型：${formData.assessmentType}

其他要求：${formData.customInstructions}

请生成一个完整、实用、有吸引力的教案，确保符合北美教学标准，包含差异化教学策略，并使用创新的教学方法。
`;
}
