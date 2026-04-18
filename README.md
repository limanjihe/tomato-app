# 番茄钟 - Tomato App

一个基于 Electron + React + TypeScript 开发的番茄工作法桌面应用，支持 Windows 和 Ubuntu 系统。

## 功能特性

- ⏱️ **番茄钟计时**：25分钟专注工作，5分钟短休息
- 🔄 **循环模式**：每4个番茄后进入15分钟长休息
- 📝 **任务管理**：创建、编辑、删除待办任务
- 📊 **数据统计**：查看每日、每周的番茄完成情况
- 🎨 **简洁界面**：基于 Ant Design 的美观 UI
- 🔔 **系统通知**：计时结束时的提醒

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI 组件**：Ant Design 5
- **状态管理**：Zustand (含 persist 本地存储)
- **桌面框架**：Electron
- **构建工具**：Vite
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
   ```

3. **Electron 运行时依赖**
   ```bash
   sudo apt-get install -y libgtk-3-0 libnss3 libasound2 libgbm1
   ```

## 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/limanjihe/tomato-app.git
cd tomato-app
```

### 2. 安装项目依赖

#### Windows 系统（推荐使用国内镜像）
```bash
# 设置 Electron 镜像（可选，加速下载）
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/

# 安装依赖
npm install
```

#### Ubuntu / Linux 系统
```bash
npm install
```

### 3. 构建 Electron 主进程
```bash
npm run build:electron
```

### 4. 开发模式
```bash
npm run dev
```

### 5. 构建应用

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

## 安装过程记录与问题解决

### 初始问题分析

在 Windows 系统上安装此项目时，可能会遇到以下问题：

#### 问题1：better-sqlite3 编译失败

**错误信息：**
```
No prebuilt binaries found (target=25.7.0 runtime=node arch=x64 libc= platform=win32)
gyp ERR! find VS - missing any VC++ toolset
```

**原因：**
- Node.js 版本过新 (v25.7.0)，better-sqlite3 没有对应的预编译二进制文件
- 缺少 Visual C++ Build Tools，无法从源码编译

**解决方案：**
- 移除 better-sqlite3 依赖
- 改用 Zustand 的 persist 中间件，使用 localStorage 进行本地存储
- 这样就不需要编译原生模块，也不需要安装 Visual C++ Build Tools

**实施步骤：**
1. 从 `package.json` 的 `dependencies` 中移除 `"better-sqlite3": "^11.5.0"`
2. 更新 README 中的技术栈说明
3. 提交代码更改

---

#### 问题2：npm install 权限错误 (EPERM)

**错误信息：**
```
Error: EPERM: operation not permitted, rmdir '.../node_modules/...'
```

**原因：**
- 文件被其他进程占用（编辑器、杀毒软件等）
- Windows 文件锁定机制

**解决方案：**
1. 关闭所有打开的编辑器（VS Code 等）
2. 关闭可能占用文件的终端
3. 临时关闭杀毒软件的实时扫描（可选）
4. 删除 `node_modules` 和 `package-lock.json` 后重试
5. 如仍有问题，以管理员身份运行终端

---

#### 问题3：Electron 下载失败 (ECONNRESET)

**错误信息：**
```
RequestError: read ECONNRESET
```

**原因：**
- 网络连接不稳定
- Electron 二进制文件较大（~100MB+）
- 从国外源下载速度慢

**解决方案：使用国内镜像源

**解决方案：使用国内镜像源**

设置 Electron 镜像环境变量：
```bash
# Windows (Git Bash / WSL)
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/

# Windows (PowerShell)
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"

# Windows (CMD)
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/

# Linux / macOS
export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
```

设置后再运行 `npm install`

---

### 成功安装步骤总结（Windows）

1. **准备环境**
   - 安装 Node.js (推荐 v18/v20 LTS)
   - 安装 Git

2. **克隆项目**
   ```bash
   git clone https://github.com/limanjihe/tomato-app.git
   cd tomato-app
   ```

3. **设置镜像（可选，推荐）**
   ```bash
   export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **构建主进程**
   ```bash
   npm run build:electron
   ```

6. **启动开发模式**
   ```bash
   npm run dev
   ```

---

## 常见问题

### npm install 遇到权限错误 (EPERM)
- 关闭所有打开的编辑器或终端
- 以管理员身份运行终端
- 删除 `node_modules` 和 `package-lock.json` 后重试
- 参考上方"安装过程记录"中的详细解决方案

### Electron 下载失败 (ECONNRESET)
- 设置国内镜像源：`export ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/`
- 网络不稳定时多试几次
- 参考上方"安装过程记录"中的详细解决方案

### 修改后没有生效
检查是否在开发模式下，Vite 支持热模块替换 (HMR)，大多数更改会自动刷新。

### 应用窗口没有显示
- 检查终端是否有错误信息
- 确认 Vite 开发服务器是否已启动（http://localhost:5173）
- 尝试重新运行 `npm run dev`

## 许可证

MIT License
