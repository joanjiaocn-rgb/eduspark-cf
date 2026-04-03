# Cloudflare Pages 构建设置

## 问题
Cloudflare Pages Git 集成默认使用 `npm ci`，但我们的配置已经修复。

## 解决方案

### 方法 1: 在 Cloudflare Dashboard 中修改构建设置

1. 登录 https://dash.cloudflare.com
2. 进入 **Pages** → 选择 `eduspark` 项目
3. 点击 **Settings** → **Build & deployments**
4. 修改构建设置：
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Build output directory**: `frontend/dist`
   - **Root directory**: (留空或设置为 `/`)

### 方法 2: 使用 wrangler 直接部署（绕过 Git 集成）

```bash
# 安装 wrangler
npm install -g wrangler

# 登录
wrangler login

# 构建前端
cd frontend
npm install
npm run build

# 部署到 Pages
wrangler pages deploy dist --project-name=eduspark
```

### 方法 3: 重新创建 Pages 项目

1. 删除现有的 Pages 项目
2. 重新创建，选择 **Direct Upload** 而不是 Git 集成
3. 使用 GitHub Actions 自动部署（已配置好）

## 推荐
使用 **方法 3** 重新创建 Pages 项目，选择 Direct Upload 模式，让 GitHub Actions 处理部署。
