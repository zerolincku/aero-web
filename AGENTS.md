# AGENTS.md

本文件定义了在本仓库内工作的智能代理规范，目标是让修改可控、可验证、可维护。

## 1. 项目概览

- 项目名：`aero-cloud-admin-template`
- 项目类型：云管后台前端模板
- 技术栈：
  - React 19 + TypeScript 5 + Vite 7
  - Tailwind CSS 4 + Radix UI
  - Zustand（状态管理）
  - React Router 7（默认 `hash` 模式）
  - i18next（`en` / `zh-CN`）
  - Vitest + Testing Library
- 核心能力：
  - 登录态与路由守卫
  - API 统一封装与错误标准化
  - 主题模式与主题色切换
  - 快捷搜索（`Cmd/Ctrl + K`）
  - Dashboard / Hosts / Regions-AZ / Users / Orgs / Settings 示例页

## 2. 环境与命令

- Node.js：`>= 20`
- pnpm：`>= 8`（CI 使用 pnpm 10）
- 包管理器：仅使用 `pnpm`
- 常用命令：
  - `pnpm dev`
  - `pnpm build`
  - `pnpm lint`
  - `pnpm test`
  - `pnpm test:watch`
  - `pnpm exec tsc -b`

## 3. 关键目录与职责

- 应用入口与路由：
  - `src/App.tsx`
  - `src/lib/routes.tsx`
  - `src/config/router.ts`
- 状态与鉴权：
  - `src/store/useStore.ts`
  - `src/auth/session.ts`
  - `src/api/modules/auth.ts`
- API 基础层：
  - `src/api/axios.ts`
  - `src/api/client.ts`
  - `src/api/error.ts`
- 页面与组件：
  - `src/pages/`
  - `src/components/`
  - `src/components/ui/`
- 国际化：
  - `src/i18n/index.ts`
  - `src/i18n/dev-check.ts`
  - `src/i18n/locales/`
- 测试：
  - `src/test/setup.ts`
  - `src/test/*.test.ts(x)`
- 部署：
  - `.github/workflows/deploy-pages.yml`

## 4. 代理工作原则

- 仅做与需求相关的最小改动，避免顺手重构。
- 优先复用现有基础设施（`apiClient`、`useStore`、`routes`、`ui` 组件）。
- 非明确要求下，不改变现有布局、导航结构、状态模型与路由策略。
- 遵守模块边界：
  - 请求与拦截器逻辑放在 `src/api/*`
  - token 存取与未授权事件放在 `src/auth/session.ts`
  - 业务鉴权状态放在 `useStore` 的 auth slice

## 5. 常见任务执行清单

### A. 新增/修改页面或路由

1. 在 `src/pages/` 新增或修改页面。
2. 在 `src/lib/routes.tsx` 注册路由与导航信息。
3. 确认 Sidebar 与 breadcrumb 展示是否符合预期。
4. 补齐 `en` / `zh-CN` 文案 key。
5. 如涉及路由守卫或导航行为，补充或更新测试。

### B. 鉴权流程变更

1. 统一从 `src/auth/session.ts` 操作 token。
2. 请求鉴权/401 逻辑保持在 `src/api/axios.ts`。
3. 页面态登录状态由 `useStore` 维护。
4. 跳转行为走 `src/config/router.ts` 的工具函数。
5. 必跑 `src/test/app-auth.test.tsx` 与全量测试。

### C. 接入后端接口

1. 优先在 `src/api/modules/*` 中添加 typed API。
2. 页面中不要直接写裸 `axios`。
3. 统一走 `normalizeApiError` / `ApiRequestError`。
4. 分页接口使用现有 `PageResponse<T>` 与适配工具。

### D. 文案/国际化调整

1. 同时维护 `en` 和 `zh-CN`。
2. 新文案尽量使用 `t('xxx')`，避免硬编码。
3. 开发环境关注 i18n key mismatch / missing key 警告。

## 6. 提交前质量门槛

代码变更后至少执行：

- `pnpm lint`
- `pnpm test`
- `pnpm build`（涉及构建、路由、样式、配置时必须跑）

若命令失败，输出具体错误与影响范围，不要口头宣称“已完成”。

## 7. 已知约束与坑位

- 当前 `eslint-plugin-react` 与 `eslint-plugin-react-hooks` 最新版本尚不支持 ESLint 10。
  - 结论：`eslint` 与 `@eslint/js` 暂保持在 v9。
- `App` 挂载时会执行 `syncAuthFromStorage()`。
  - 测试认证场景时，需构造真实 session/token，不能只改 `isAuthenticated` 布尔值。
- 默认路由模式是 `hash`，除非显式设置 `VITE_ROUTER_MODE=browser`。

## 8. 部署注意事项

- GitHub Pages 工作流会使用：
  - `vite build --base="/<repo-name>/"`
  - 并复制 `dist/index.html` 为 `dist/404.html`
- 调整路由、basename 或静态资源路径时，必须考虑 Pages 部署场景。

## 9. 非必要不做

- 不做架构级迁移（路由/状态/测试框架替换）。
- 不做大范围视觉体系重写。
- 不做与需求无关的依赖大升级。
