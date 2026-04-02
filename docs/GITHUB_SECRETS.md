# GitHub Secrets 配置指南

## 需要配置的 Secrets

在 GitHub 仓库设置中添加以下 Secrets:

### 必需

1. **CLOUDFLARE_API_TOKEN**
   - 值: `8e2346015c8dc8f669e08a23d1d365d6`
   - 用途: Cloudflare API 认证

2. **OPENAI_API_KEY**
   - 值: 你的 OpenAI API Key
   - 用途: AI 功能调用

### 可选

3. **VITE_API_URL**
   - 值: Worker 部署后的 URL
   - 示例: `https://eduspark-api.your-account.workers.dev`
   - 用途: 前端调用后端 API

## 配置步骤

1. 打开 GitHub 仓库页面
2. 点击 Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. 添加上述 secrets

## 自动部署流程

### Worker 部署
- 触发条件: `worker/` 目录有代码推送到 main 分支
- 部署目标: Cloudflare Workers
- 访问地址: `https://eduspark-api.your-account.workers.dev`

### Pages 部署
- 触发条件: `frontend/` 目录有代码推送到 main 分支
- 部署目标: Cloudflare Pages
- 访问地址: `https://eduspark.pages.dev` (或自定义域名)

## 首次部署前准备

### 1. 创建 KV 命名空间

```bash
cd worker
npx wrangler kv:namespace create "EDUSPARK_KV"
```

获取到 id 后，更新 `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "EDUSPARK_KV"
id = "your-actual-kv-id"
```

### 2. 设置 OpenAI API Key

```bash
cd worker
npx wrangler secret put OPENAI_API_KEY
```

### 3. 创建 Pages 项目

在 Cloudflare Dashboard:
1. Pages → Create a project
2. 选择 "Direct upload"
3. 项目名: `eduspark`

## 验证部署

部署完成后，访问:
- 前端: `https://eduspark.pages.dev`
- API: `https://eduspark-api.your-account.workers.dev/api/health`
