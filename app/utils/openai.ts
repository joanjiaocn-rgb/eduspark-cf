import OpenAI from 'openai';

export function createOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    dangerouslyAllowBrowser: false,
  });
}

export async function generateLessonPlan(params: {
  subject: string;
  grade: string;
  topic: string;
  duration?: string;
  objectives?: string;
  style?: string;
}) {
  const openai = createOpenAIClient();

  const prompt = `
请为以下课程编写一份详细的教案：

【基本信息】
- 学科：${params.subject}
- 年级：${params.grade}
- 课题：${params.topic}
- 课时：${params.duration || '45分钟'}
${params.objectives ? `- 教学目标：${params.objectives}` : ''}

【教学风格要求】
${getStyleInstruction(params.style || 'standard')}

【教案结构要求】
请按照以下结构编写教案：

1. **教学目标**
   - 知识与技能目标
   - 过程与方法目标
   - 情感态度与价值观目标

2. **教学重难点**
   - 教学重点
   - 教学难点

3. **教学准备**
   - 教师准备
   - 学生准备
   - 教学资源

4. **教学过程**
   - 导入环节（5-10分钟）
   - 新知探究（15-20分钟）
   - 巩固练习（10-15分钟）
   - 课堂小结（3-5分钟）
   - 作业布置（2-3分钟）

5. **板书设计**

6. **教学反思**

请确保教案内容具体、可操作，符合${params.grade}学生的认知水平。
`;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4',
    messages: [
      {
        role: 'system',
        content: '你是一位经验丰富的教育专家，擅长编写高质量、结构化的教案。你的教案应该详细、实用，符合中国课程标准。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  return completion.choices[0]?.message?.content || '';
}

function getStyleInstruction(style: string): string {
  const instructions: Record<string, string> = {
    standard: '按照标准教案格式编写',
    interactive: '注重互动和参与，设计小组活动和讨论环节',
    project: '采用项目式学习(PBL)方法，设计实践性任务',
    flipped: '设计翻转课堂模式，包含课前预习和课堂深化',
    inquiry: '采用探究式学习，引导学生自主发现和解决问题',
  };
  return instructions[style] || instructions.standard;
}
