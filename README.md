# EduSpark - 北美教案生成器

专为北美中小学教师设计的 AI 教案生成工具。

## 功能特点

- 🤖 AI 智能生成教案
- 📚 符合北美教学标准 (CCSS/NGSS)
- 🎯 支持差异化教学
- 📄 多格式导出 (PDF/Word/PPT)
- 🌐 基于 Cloudflare Pages 部署

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API
- Cloudflare Pages

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的 OpenAI API Key

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 部署到 Cloudflare

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

### 3. 创建 Pages 项目

```bash
# 构建项目
npm run pages:build

# 部署
npm run pages:deploy
```

### 4. 配置环境变量

在 Cloudflare Dashboard 中，进入你的 Pages 项目设置，添加环境变量：

- `OPENAI_API_KEY`: 你的 OpenAI API Key

## 项目结构

```
eduspark/
├── app/
│   ├── api/generate-lesson/  # API 路由 (Edge Runtime)
│   ├── components/           # React 组件
│   ├── utils/               # 工具函数
│   ├── types.ts             # TypeScript 类型
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── globals.css          # 全局样式
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── wrangler.toml
```

## License

MIT
