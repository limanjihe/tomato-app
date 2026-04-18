# 番茄钟 - Tomato App

一个基于 Electron + React + TypeScript 开发的番茄工作法桌面应用，支持 Windows 和 Ubuntu 系统。

## 功能特性

- ⏱️ **番茄钟计时**：25分钟专注工作，5分钟短休息
- 🔄 **循环模式**：每4个番茄后进入15-30分钟长休息
- 📝 **任务管理**：创建、编辑、删除待办任务
- 📊 **数据统计**：查看每日、每周的番茄完成情况
- 🎨 **简洁界面**：基于 Ant Design 的美观 UI
- 🔔 **系统通知**：计时结束时的提醒

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI 组件**：Ant Design 5
- **状态管理**：Zustand
- **桌面框架**：Electron
- **构建工具**：Vite
- **本地数据库**：better-sqlite3
- **日期处理**：Day.js

## 环境要求

### Windows 系统

#### 必需软件
1. **Node.js** (推荐 v18.x 或 v20.x LTS)
   - 下载地址：https://nodejs.org/
   - 验证安装：`node --version` 和 `npm --version`

2. **Git**
   - 下载地址：https://git-scm.com/download/win
   - 验证安装：`git --version`

3. **Visual C++ Build Tools** (for better-sqlite3)
   - 方式一：使用 winget 安装
     ```powershell
     winget install Microsoft.VisualStudio.2022.BuildTools
     ```
   - 方式二：下载安装
     - 访问 https://visualstudio.microsoft.com/visual-cpp-build-tools/
     - 下载并安装 "Desktop development with C++" 工作负载

#### 可选软件
- **Windows Terminal** (推荐)：https://aka.ms/terminal

### Ubuntu 系统

#### 必需软件
1. **Node.js** (推荐 v18.x 或 v20.x LTS)
   ```bash
   # 使用 NodeSource 仓库安装
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # 验证安装
   node --version
   npm --version
   ```

2. **Git**
   ```bash
   sudo apt-get install -y git

   # 验证安装
   git --version
   ```

3. **构建工具** (for better-sqlite3 和 Electron)
   ```bash
   sudo apt-get install -y build-essential python3 make gcc g++
   ```

4. **Electron 依赖**
   ```bash
   sudo apt-get install -y libgtk-3-0 libnss3 libasound2 libgbm1
   ```

5. **打包依赖** (for AppImage/deb)
   ```bash
   # AppImage
   sudo apt-get install -y fuse libfuse2

   # deb 包
   sudo apt-get install -y dpkg fakeroot
   ```

## 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/limanjihe/tomato-app.git
cd tomato-app
```

### 2. 安装项目依赖
```bash
npm install
```

### 3. 开发模式
```bash
npm run dev
```

### 4. 构建应用

```bash
# Windows
npm run dist:win

# Ubuntu / Linux
npm run dist:linux

# 仅构建不打包
npm run build
```

## 项目结构

```
tomato-app/
├── electron/          # Electron 主进程代码
│   ├── main.ts        # 主进程入口
│   └── preload.ts     # 预加载脚本
├── src/               # React 渲染进程代码
│   ├── components/    # React 组件
│   ├── store/         # Zustand 状态管理
│   ├── utils/         # 工具函数
│   ├── types/         # TypeScript 类型定义
│   ├── App.tsx        # 根组件
│   └── main.tsx       # 渲染进程入口
├── assets/            # 静态资源 (图标等)
├── dist/              # 编译输出
├── release/           # 打包输出
├── index.html         # HTML 模板
├── vite.config.ts     # Vite 配置
├── tsconfig.json      # TypeScript 配置
├── package.json       # 项目依赖
└── README.md          # 项目说明
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发模式 (Vite + Electron) |
| `npm run dev:vite` | 仅启动 Vite 开发服务器 |
| `npm run dev:electron` | 仅启动 Electron |
| `npm run build` | 构建整个应用 |
| `npm run build:vite` | 仅构建渲染进程 |
| `npm run build:electron` | 仅构建主进程 |
| `npm run preview` | 预览 Vite 构建结果 |
| `npm run pack` | 打包应用 (不生成安装包) |
| `npm run dist` | 构建并打包当前平台 |
| `npm run dist:win` | 构建 Windows 安装包 |
| `npm run dist:linux` | 构建 Linux 安装包 |

## 使用说明

1. 点击「开始」按钮启动番茄钟
2. 专注工作25分钟
3. 听到提示音后休息5分钟
4. 每完成4个番茄，享受一次长休息
5. 在「任务」标签页添加待办任务
6. 在「统计」标签页查看你的效率数据

## 常见问题

### Windows 下 better-sqlite3 安装失败
确保已安装 Visual C++ Build Tools，然后尝试：
```bash
npm install --global windows-build-tools
npm rebuild better-sqlite3
```

### Ubuntu 下 Electron 无法启动
确保已安装依赖：
```bash
sudo apt-get install libgtk-3-0 libnss3 libasound2 libgbm1
```

### 修改后没有生效
检查是否在开发模式下，Vite 支持热模块替换 (HMR)，大多数更改会自动刷新。

## 许可证

MIT License
