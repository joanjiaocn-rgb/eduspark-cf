# EduSpark Cloudflare 版本 - 技术架构

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Cloudflare Edge Network                    │
│  ┌─────────────┐         ┌─────────────┐                    │
│  │   Pages     │◄───────►│   Worker    │                    │
│  │  (React)    │   API   │   (API)     │                    │
│  └─────────────┘         └──────┬──────┘                    │
│                                 │                           │
│                        ┌────────┴────────┐                  │
│                        ▼                 ▼                  │
│                   ┌─────────┐      ┌──────────┐             │
│                   │   KV    │      │   AI     │             │
│                   │ (Cache) │      │ (OpenAI) │             │
│                   └─────────┘      └──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## 技术选型对比

| 组件 | Cloudflare 方案 | 传统方案 | 优势 |
|------|----------------|---------|------|
| 前端托管 | Cloudflare Pages | Vercel/Netlify | 同平台管理，边缘部署 |
| 后端 API | Cloudflare Workers | VPS/Server | 无服务器，自动扩缩容 |
| 数据缓存 | Cloudflare KV | Redis | 全球边缘缓存，零配置 |
| AI 调用 | AI Gateway | 直接调用 | 缓存、重试、成本优化 |
| 图片存储 | R2 (可选) | AWS S3 | 零 egress 费用 |

## 核心优化点

### 1. KV 缓存策略

```typescript
// 教案生成缓存
const cacheKey = `lesson:${subject}:${grade}:${topic}:${instructions}:${duration}`;
const cached = await env.EDUSPARK_KV.get(cacheKey);
if (cached) {
  return { success: true, data: cached, cached: true };
}

// 缓存 24 小时
await env.EDUSPARK_KV.put(cacheKey, result, { expirationTtl: 86400 });
```

**效果**: 相同教案请求直接走缓存，减少 90%+ 的 AI API 调用。

### 2. 边缘部署

- 静态资源: 275+ 边缘节点
- API 响应: 就近执行，延迟 < 50ms
- 无需配置 CDN，自动优化

### 3. 成本控制

| 项目 | 月费用 (1000用户) |
|------|------------------|
| Cloudflare (免费额度内) | $0 |
| OpenAI API | $5-20 |
| **总计** | **$5-20** |

对比传统 VPS 方案 ($20-50/月)，成本降低 60%+。

## 文件结构

```
eduspark-cf/
├── frontend/                 # Cloudflare Pages
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LessonPlan.tsx
│   │   │   └── Grading.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── worker/                   # Cloudflare Worker
│   ├── src/
│   │   └── index.ts         # 主入口 + API路由
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.toml
│
└── docs/
    ├── DEPLOY.md            # 部署指南
    └── ARCHITECTURE.md      # 本文件
```

## API 设计

### 1. 生成教案

```
POST /api/lesson-plans/generate
Content-Type: application/json

{
  "subject": "Mathematics",
  "grade": "Grade 7",
  "topic": "Quadratic Equations",
  "instructions": "Include real-world examples",
  "duration": "45 minutes"
}

Response:
{
  "success": true,
  "data": "# Lesson Plan...",
  "cached": false
}
```

### 2. 批改作业

```
POST /api/grading/analyze
Content-Type: application/json

{
  "content": "Student essay text...",
  "assignment_type": "essay",
  "subject": "English"
}

Response:
{
  "success": true,
  "data": {
    "score": 8,
    "overall_comment": "...",
    "strengths": [...],
    "improvements": [...],
    "teacher_comments": [...]
  }
}
```

## 安全考虑

### 1. API 密钥保护

- OpenAI API Key 存储在 Worker Secrets
- 前端无法直接访问
- 通过 Worker 代理所有 AI 调用

### 2. CORS 配置

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 生产环境限制具体域名
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

### 3. 速率限制 (建议添加)

```typescript
// 基于 IP 的简单限流
async function rateLimit(request: Request, env: Env): Promise<boolean> {
  const ip = request.headers.get('CF-Connecting-IP');
  const key = `rate:${ip}`;
  const count = parseInt(await env.EDUSPARK_KV.get(key) || '0');
  
  if (count > 10) return false; // 超过限制
  
  await env.EDUSPARK_KV.put(key, String(count + 1), { expirationTtl: 60 });
  return true;
}
```

## 扩展性

### 未来可添加功能

1. **用户认证**: Cloudflare Access 或自定义 JWT
2. **数据持久化**: D1 数据库 (SQLite on Edge)
3. **文件上传**: R2 对象存储
4. **实时功能**: Durable Objects + WebSocket
5. **A/B 测试**: Workers 内置分流

## 性能指标

### 目标

| 指标 | 目标 |
|------|------|
| 首屏加载 | < 1s |
| API 响应 | < 500ms (缓存命中 < 50ms) |
| 全球可用性 | 99.9% |
| AI 生成时间 | < 10s |

### 监控

- Cloudflare Analytics (内置)
- Worker 日志: `wrangler tail`
- 自定义指标通过 KV 存储

## 总结

Cloudflare 全栈方案为 EduSpark 提供了:

1. ✅ **低成本**: 免费额度充足，OpenAI 是主要成本
2. ✅ **高性能**: 全球边缘部署，就近响应
3. ✅ **易维护**: 无服务器，自动扩缩容
4. ✅ **可扩展**: 从 MVP 到生产无缝升级

## 下一步

1. 完成 Worker 和前端代码
2. 配置 Cloudflare 账号和域名
3. 部署并测试
4. 监控和优化

需要详细实现某个部分吗？
