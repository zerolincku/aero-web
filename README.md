<div align="center">

  ![React Admin](/doc/img.png)

  # Aero Cloud Admin Template

  一个基于 React 19 + TypeScript + Vite 的现代化管理系统模板

  [![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan.svg)](https://tailwindcss.com/)

</div>

---

## 📖 项目简介

  **Aero Cloud Admin Template** 是一个功能完整、界面美观的现代化管理系统模板。它采用 React 19 + TypeScript + Vite + Tailwind CSS，为开发者提供了一个开箱即用的后台管理系统基础工程。

### ✨ 核心特性

- 🎨 **现代化 UI 设计** - 基于 Tailwind CSS 4.x 和 shadcn/ui 组件库
- 🚀 **极速开发体验** - 使用 Vite 构建，HMR 秒级响应
- 🌓 **深色模式支持** - 内置主题切换，支持明暗模式
- 🔍 **快捷搜索** - 支持 ⌘K (Windows: Ctrl+K) 快捷键全局搜索
- 📱 **完全响应式** - 适配桌面端、平板和移动设备
- 🔐 **权限管理** - 路由级别的权限控制
- 🌐 **国际化支持** - 内置 react-i18next，支持中英文切换
- 📊 **数据可视化** - 丰富的仪表板和数据展示组件
- 🎯 **状态管理** - 基于 Zustand 的轻量级状态管理

---

## 🎯 功能演示

### 仪表板 (Dashboard)

![Dashboard](/doc/img_1.png)

提供关键指标概览和交互式状态管理演示。

### 用户管理 (Users)

![Users](/doc/img_2.png)

完整的用户列表管理，支持：
- 🔍 实时搜索过滤
- 📄 分页显示
- 👤 用户头像和信息展示
- 🎯 角色和状态标签
- ➕ 添加用户功能

### 系统设置 (Settings)

![Settings](/doc/img.png)

提供：
- 👤 个人信息管理
- 🎨 外观主题切换（Light/Dark/System）
- 🌈 主题颜色自定义
- 🚪 安全退出功能

---

## 🛠️ 技术栈

### 核心框架
- **React 19.2.0** - 最新的 React 版本
- **TypeScript 5.9** - 类型安全的 JavaScript 超集
- **Vite 7.2** - 新一代前端构建工具

### UI 组件与样式
- **Tailwind CSS 4.1** - 原子化 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的高质量组件库
- **Lucide React** - 精美的图标库
- **tw-animate-css** - Tailwind 动画扩展

### 状态管理与路由
- **Zustand 5.0** - 轻量级状态管理库
- **React Router DOM 7.12** - React 路由解决方案

### HTTP 客户端
- **Axios** - Promise based HTTP 客户端

### 开发工具
- **ESLint 9.39** - JavaScript/TypeScript 代码检查
- **PostCSS** - CSS 转换工具
- **TypeScript ESLint** - TypeScript 的 ESLint 插件

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm/yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd react-admin
```

2. **安装依赖**
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
pnpm run dev
```

4. **访问应用**
```
http://localhost:5173
```

### 可用命令

```bash
# 开发模式启动
pnpm run dev

# 生产环境构建
pnpm run build

# 预览生产构建
pnpm run preview

# 代码检查
pnpm run lint

# TypeScript 类型检查
tsc --noEmit

# 单元测试
pnpm run test
```

---

## 📁 项目结构

```
react-admin/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 配置和请求封装
│   │   └── axios.ts    # Axios 实例配置
│   ├── assets/         # 资源文件
│   ├── components/     # 可复用组件
│   │   ├── ui/         # shadcn/ui 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── label.tsx
│   │   ├── Layout.tsx          # 主布局组件
│   │   ├── Sidebar.tsx         # 侧边栏导航
│   │   ├── ThemeController.tsx # 主题控制器
│   │   ├── Toaster.tsx        # Toast 通知组件
│   │   └── Loading.tsx         # 加载组件
│   ├── lib/            # 工具函数
│   │   ├── routes.tsx  # 路由定义
│   │   └── utils.ts    # 通用工具函数
│   ├── config/         # 模板配置中心（品牌名、默认配置）
│   │   └── app.ts
│   ├── i18n/           # 国际化资源与初始化
│   │   └── index.ts
│   ├── pages/          # 页面组件
│   │   ├── Dashboard.tsx    # 仪表板
│   │   ├── Users.tsx        # 用户管理
│   │   ├── Settings.tsx      # 系统设置
│   │   ├── Login.tsx         # 登录页
│   │   └── NotFound.tsx      # 404 页面
│   ├── store/          # 状态管理
│   │   └── useStore.ts # Zustand store
│   ├── test/           # 测试文件
│   ├── index.css       # 全局样式
│   └── main.tsx        # 应用入口
├── doc/                # 文档和截图
│   ├── img.png
│   ├── img_1.png
│   └── img_2.png
├── .gitignore
├── .editorconfig
├── components.json     # shadcn/ui 配置
├── eslint.config.js    # ESLint 配置
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── pnpm-lock.yaml      # 依赖锁定文件
├── tsconfig.json       # TypeScript 配置
├── tsconfig.app.json   # 应用 TypeScript 配置
├── tsconfig.node.json  # Node TypeScript 配置
└── vite.config.ts      # Vite 配置
```

---

## 🎨 核心功能详解

### 1. 认证系统

项目实现了基于 Zustand 的认证状态管理：

```typescript
// 登录流程
1. 访问首页 → 检测未登录 → 重定向到登录页
2. 输入邮箱 → 点击登录 → 更新认证状态
3. 自动跳转到 Dashboard
4. 受保护路由自动拦截未登录访问
```

**特性：**
- ✅ 路由级别的权限保护
- ✅ 自动登录状态检测
- ✅ 安全退出功能
- ✅ 用户信息持久化

### 2. 主题系统

支持三种主题模式：
- **Light** - 明亮模式
- **Dark** - 深色模式
- **System** - 跟随系统设置

支持 5 种主题颜色：
- Zinc (默认)
- Red
- Blue
- Green
- Orange

**快捷键：**
- 无需手动切换，系统自动保存偏好

### 3. 快捷搜索

按下 `⌘K` (Mac) 或 `Ctrl+K` (Windows) 打开全局搜索框。

**功能：**
- 📄 搜索所有路由页面
- 🎯 键盘上下键导航
- ⏎ 回车键快速跳转
- 🔍 实时过滤结果

### 4. 用户管理

完整的 CRUD 界面演示：
- 📋 用户列表展示
- 🔍 实时搜索过滤
- 📄 分页显示（10/20/50 每页）
- 👤 用户头像生成
- 🏷️ 角色和状态标签
- ➕ 添加用户（模拟）

### 5. 状态管理

使用 Zustand 进行全局状态管理，包括：
- 🔐 认证状态
- 🎨 主题设置
- 🍞 Toast 通知
- 👤 用户信息
- 🔢 演示计数器

---

## 🔧 配置说明

### 环境变量

在项目根目录创建 `.env` 文件：

```bash
# API 基础地址
VITE_API_BASE_URL=http://localhost:3000/api
```

也可以直接从模板复制：

```bash
cp .env.example .env
```

### API 代理配置

修改 `vite.config.ts` 添加代理：

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-backend-api.com',
        changeOrigin: true,
      }
    }
  }
})
```

### TypeScript 配置

项目使用两个 TypeScript 配置文件：
- `tsconfig.app.json` - 应用代码配置
- `tsconfig.node.json` - 构建工具配置

### 模板配置中心

模板品牌与默认设置集中在：

`src/config/app.ts`

可在这里统一修改品牌名、默认主题色、登录路由等模板级配置。

---

## 🎯 开发路线图

### ✅ 已完成
- [x] 基础 UI 组件库
- [x] 登录认证系统
- [x] 主题切换功能
- [x] 快捷搜索
- [x] 用户管理页面
- [x] 仪表板
- [x] 系统设置
- [x] 响应式布局
- [x] 国际化支持 (i18n)
- [x] 单元测试基线（路由守卫 / i18n / Sidebar 交互）

### 🚧 计划中
- [ ] 真实 API 集成
- [ ] 更多页面组件
- [ ] 数据可视化图表
- [ ] 表单验证
- [ ] 权限管理系统
- [ ] E2E 测试
- [ ] 性能优化

---

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 编写有意义的提交信息

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

本项目感谢以下开源项目：

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide](https://lucide.dev/)

---

## 📞 联系方式

- 作者: Lin Changkun
  - 项目链接: [https://github.com/yourusername/aero-cloud-admin-template](https://github.com/yourusername/aero-cloud-admin-template)
  - 问题反馈: [Issues](https://github.com/yourusername/aero-cloud-admin-template/issues)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made with ❤️ by Lin Changkun

</div>
