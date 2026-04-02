# EduSpark - Cloudflare 版本

EduSpark - Your AI Teaching Assistant, Ready in Seconds.

## Cloudflare 架构

- **前端**: Cloudflare Pages (React + Vite)
- **API**: Cloudflare Workers (Serverless)
- **AI**: Cloudflare AI Gateway + OpenAI
- **存储**: Cloudflare KV (用户数据缓存)

## 项目结构

```
eduspark-cf/
├── frontend/          # Cloudflare Pages 前端
├── worker/            # Cloudflare Worker API
├── docs/             # 文档
└── README.md
```

## 部署

### 1. 部署 Worker (后端 API)

```bash
cd worker
npm install
wrangler login
wrangler deploy
```

### 2. 部署前端 (Cloudflare Pages)

```bash
cd frontend
npm install
npm run build
# 或使用 wrangler
wrangler pages deploy dist
```

## 环境变量

在 Cloudflare Dashboard 设置:

- `OPENAI_API_KEY` - OpenAI API 密钥
- `AI_GATEWAY_ENDPOINT` - (可选) Cloudflare AI Gateway 端点

## 开发

```bash
# 启动 Worker 本地开发
cd worker
npm run dev

# 启动前端本地开发
cd frontend
npm run dev
```

## License

MIT
