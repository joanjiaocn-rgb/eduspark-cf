# Cloudflare 部署指南

## 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                      │
│                   (React 静态前端)                        │
│                      免费 + 全球CDN                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Cloudflare Workers                     │
│              (Serverless API + AI调用)                   │
│              免费额度: 10万次请求/天                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Cloudflare AI Gateway / OpenAI              │
│              (AI API 调用 + 缓存优化)                     │
└─────────────────────────────────────────────────────────┘
```

## 优势

- **全免费起步**：Pages + Workers 免费额度充足
- **全球加速**：275+ 边缘节点
- **AI 集成**：Cloudflare AI Gateway 可缓存 AI 响应，降低成本
- **无服务器**：无需管理服务器，自动扩缩容

## 部署步骤

### 1. 准备工作

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login
```

### 2. 部署 Worker (后端 API)

```bash
cd worker

# 安装依赖
npm install

# 创建 KV 命名空间
wrangler kv:namespace create "EDUSPARK_KV"

# 更新 wrangler.toml 中的 kv_namespaces id

# 设置环境变量 (OpenAI API Key)
wrangler secret put OPENAI_API_KEY

# 本地测试
npm run dev

# 部署
npm run deploy
```

部署后会得到一个 Worker URL，例如：`https://eduspark-api.your-account.workers.dev`

### 3. 配置自定义域名 (可选)

在 Cloudflare Dashboard:
1. Workers & Pages → 你的 Worker
2. Settings → Triggers → Custom Domains
3. 添加 `api.eduspark.app`

### 4. 部署前端 (Cloudflare Pages)

```bash
cd frontend

# 安装依赖
npm install

# 创建 .env.production 文件
echo "VITE_API_URL=https://api.eduspark.app" > .env.production

# 构建
npm run build

# 部署到 Pages
wrangler pages deploy dist
```

或者连接 GitHub 自动部署:
1. Cloudflare Dashboard → Pages
2. Create a project → Connect to Git
3. 选择你的 GitHub 仓库
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `frontend`

### 5. 配置自定义域名

1. Cloudflare Pages → 你的项目
2. Custom domains → 添加 `eduspark.app`

## 环境变量配置

### Worker 环境变量 (Secrets)

在 Cloudflare Dashboard 或命令行设置:

```bash
wrangler secret put OPENAI_API_KEY
```

### 前端环境变量

创建 `frontend/.env.production`:

```
VITE_API_URL=https://api.eduspark.app
```

## 费用估算

### Cloudflare 免费额度

| 服务 | 免费额度 | 超出费用 |
|------|---------|---------|
| Workers | 100,000 请求/天 | $0.50/百万请求 |
| Pages | 无限静态请求 | 免费 |
| KV | 100,000 读/天, 1000 写/天 | $0.50/百万读 |
| AI Gateway | 100,000 请求/天 | $0.10/百万请求 |

### OpenAI API 费用

| 模型 | 输入 | 输出 |
|------|------|------|
| GPT-4o-mini | $0.15/1M tokens | $0.60/1M tokens |

估算: 1000 次教案生成 ≈ $1-2

## 监控与日志

### 查看 Worker 日志

```bash
wrangler tail
```

### Analytics

- Cloudflare Dashboard → Workers → Analytics
- 查看请求量、CPU 时间、错误率

## 优化建议

### 1. 启用 AI Gateway 缓存

在 Worker 代码中，相同输入可以直接返回缓存结果，减少 OpenAI API 调用。

### 2. 使用 Cloudflare Images (可选)

如果需要处理学生上传的作业图片:
- 使用 Cloudflare Images 进行存储和优化
- 或使用 R2 对象存储

### 3. 添加 Rate Limiting

在 Worker 中添加请求频率限制，防止滥用:

```typescript
// 基于 IP 的限流
const RATE_LIMIT = 10; // 每分钟最多10次
```

## 故障排查

### Worker 部署失败

```bash
# 检查配置
wrangler config list

# 验证 wrangler.toml
wrangler deploy --dry-run
```

### API 调用失败

1. 检查 Worker 日志: `wrangler tail`
2. 验证 OPENAI_API_KEY 是否正确设置
3. 检查 CORS 配置

### 前端无法连接 API

1. 检查 `VITE_API_URL` 是否正确
2. 验证 CORS 配置允许前端域名
3. 检查浏览器控制台网络请求

## 下一步

1. 注册 Cloudflare 账号
2. 购买域名 (eduspark.app)
3. 按上述步骤部署
4. 配置监控和告警

需要我帮你完成具体的部署步骤吗？
