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

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
# Windows
npm run dist:win

# Linux
npm run dist:linux
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
│   ├── App.tsx        # 根组件
│   └── main.tsx       # 渲染进程入口
├── assets/            # 静态资源
├── dist/              # 编译输出
└── release/           # 打包输出
```

## 使用说明

1. 点击「开始」按钮启动番茄钟
2. 专注工作25分钟
3. 听到提示音后休息5分钟
4. 每完成4个番茄，享受一次长休息

## 许可证

MIT License
