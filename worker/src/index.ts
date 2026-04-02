import OpenAI from 'openai';

export interface Env {
  OPENAI_API_KEY: string;
  EDUSPARK_KV: KVNamespace;
  AI: any; // Cloudflare AI binding
}

// CORS 响应头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 路由分发
      if (path === '/api/lesson-plans/generate' && request.method === 'POST') {
        return await handleLessonPlan(request, env);
      }
      
      if (path === '/api/grading/analyze' && request.method === 'POST') {
        return await handleGrading(request, env);
      }
      
      if (path === '/api/health' && request.method === 'GET') {
        return jsonResponse({ status: 'healthy', service: 'eduspark-api' });
      }

      return jsonResponse({ error: 'Not Found' }, 404);
    } catch (error) {
      console.error('Error:', error);
      return jsonResponse({ error: 'Internal Server Error' }, 500);
    }
  },
};

// 教案生成处理
async function handleLessonPlan(request: Request, env: Env): Promise<Response> {
  const body = await request.json() as {
    subject: string;
    grade: string;
    topic: string;
    instructions?: string;
    duration?: string;
  };

  const { subject, grade, topic, instructions = '', duration = '45 minutes' } = body;

  // 生成缓存键
  const cacheKey = `lesson:${subject}:${grade}:${topic}:${instructions}:${duration}`;
  
  // 尝试从缓存获取
  const cached = await env.EDUSPARK_KV.get(cacheKey);
  if (cached) {
    return jsonResponse({ success: true, data: cached, cached: true });
  }

  const prompt = `You are an experienced ${subject} curriculum designer. Please create a detailed lesson plan for ${grade} students about "${topic}".

Lesson duration: ${duration}
Additional requirements: ${instructions || 'None'}

**Requirements:**
1. Structure must follow: **Learning Objectives** -> **Required Materials** -> **Detailed Teaching Steps** (Introduction, Explanation, Activity, Summary) -> **Assessment Methods** -> **Differentiation Strategies**.
2. Teaching steps should be specific, with estimated time and example teacher prompts for each step.
3. Language should be professional, clear, avoiding theoretical jargon, emphasizing practicality.
4. Include a simple classroom interactive activity.

Please output the lesson plan in Markdown format.

**Output in English.**`;

  const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert educational curriculum designer specializing in K-12 education.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 2500,
  });

  const result = response.choices[0].message.content || '';
  
  // 缓存结果 (24小时)
  await env.EDUSPARK_KV.put(cacheKey, result, { expirationTtl: 86400 });

  return jsonResponse({ success: true, data: result });
}

// 作业批改处理
async function handleGrading(request: Request, env: Env): Promise<Response> {
  const body = await request.json() as {
    content: string;
    assignment_type: 'essay' | 'short_answer' | 'math';
    subject?: string;
  };

  const { content, assignment_type, subject = 'English' } = body;

  const typeDescriptions: Record<string, string> = {
    essay: 'essay writing',
    short_answer: 'short answer questions',
    math: 'math problem solving',
  };

  const assignmentDesc = typeDescriptions[assignment_type] || 'assignment';

  const prompt = `You are a thoughtful and encouraging ${subject} teacher. Please provide grading feedback on the following student ${assignmentDesc}:

**Student Work:**
${content}

**Please provide feedback in the following structure:**

1. **Overall Score**: Give a score from 1-10, with a brief overall comment.
2. **Strengths**: Point out 1-2 specific strengths.
3. **Areas for Improvement**: Point out 1-2 most important specific issues, and provide **specific revision suggestions**.
4. **Teacher Comments**: Generate 2-3 **positive, specific, ready-to-use comments** that can be directly used on the student's work. Keep the tone encouraging.

**Output Format (JSON):**
{
    "score": 8,
    "overall_comment": "...",
    "strengths": ["...", "..."],
    "improvements": [
        {"issue": "...", "suggestion": "..."}
    ],
    "teacher_comments": ["...", "...", "..."]
}

**Output in English.**`;

  const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an expert K-12 teacher who provides constructive, encouraging feedback.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const result = response.choices[0].message.content || '{}';

  return jsonResponse({ success: true, data: result });
}

// JSON 响应辅助函数
function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}