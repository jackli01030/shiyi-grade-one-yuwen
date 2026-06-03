# 十一的一年级语文

面向小学一年级孩子和家长的语文同步互动学习站。项目使用 Next.js App Router、React、TypeScript 和 Tailwind CSS，所有学习进度默认保存在本地浏览器，不接入广告、支付、第三方追踪或云端账号系统。

## 功能

- 首页：今日学习、继续上次、拼音、识字、阅读、写字、口语、家长中心入口
- 课程地图：一年级上册、下册完整课程目录
- 课时页：今天学什么、我会认、我会写、我来练
- 拼音乐园：拼音卡、拼读配对、拼读小火车
- 识字花园：按册和完整课文目录筛选生字卡
- 写字练习：静态田字格、拼音、组词、家长确认
- 课文阅读：本地课文导入、录音与回放、家长确认
- 口语交际：真实场景卡片和家长观察清单
- 家长中心：学习记录、复习队列、JSON 导入导出、重置本地数据

## 运行

```bash
npm install
npm run dev
```

开发服务器默认地址：

```text
http://localhost:3000
```

## iPad 局域网访问

如果笔记本和 iPad 在同一个 Wi-Fi，可以让笔记本作为本地服务器：

```bash
npm run dev -- --hostname 0.0.0.0
```

查看笔记本局域网 IP：

```bash
ipconfig getifaddr en0
```

然后在 iPad 浏览器打开：

```text
http://你的笔记本IP:3000
```

学习进度会优先写入笔记本服务器的 `data/progress.json`。这个文件不会提交到 GitHub；如果服务器不可用，前端才会退回浏览器本地保存。

## 检查

```bash
npm test
npm run typecheck
npm run build
```

## GitHub Pages 部署

推送到 `main` 分支后，GitHub Actions 会自动运行测试、类型检查和静态构建，并发布到 GitHub Pages。

首次使用时，在 GitHub 仓库的 `Settings` -> `Pages` 中，将 `Build and deployment` 的 `Source` 设为 `GitHub Actions`。部署完成后访问：

```text
https://jackli01030.github.io/shiyi-grade-one-yuwen/
```

GitHub Pages 是静态站点，不提供 `/api/progress` 服务。线上学习进度会保存在浏览器本地；本地开发服务器仍可使用 `data/progress.json`。

工作流发布时会在 GitHub Actions 的临时构建目录里移除 `app/api`，只导出静态页面，不会改动仓库源码。

## 内容说明

内置内容只包含课程目录、学习目标、生字、词语和练习模板，不硬编码教材 PDF、教材插图或整篇课文原文。完整课文内容可由家长在阅读页本地导入，导入内容只保存在浏览器 localStorage。

## 数据与隐私

- 学习记录保存在浏览器本地
- 录音只用于本机回放
- 不上传儿童姓名、录音或学习记录
- 不包含后端数据库和云端账号系统

## 许可证

本项目采用 MIT License，详见 [LICENSE](./LICENSE)。
