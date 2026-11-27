# Codex 交接说明 · AI 荐书小程序（Gate T0 已交付）

> 一句话：**环境已打通，仓库可独立运行。请先按第 4 节 6 步独立验收，通过后开始 MVP 业务开发。**
> 交付日期：2026-11-27 ｜ 交付方：WorkBuddy ｜ 工程基线提交：`5759f39`（本文件为 `main` 最新提交）

---

## 0. 你现在要做什么（30 秒版）

```bash
git clone https://github.com/abshawn/book-picks.git
cd book-picks
npm install
npm run typecheck && npm run build
```

然后用微信开发者工具导入本目录 → 编译 → 改一处文字 → **再 `npm run build`** → 再编译确认生效 → 点首页「调用 hello 云函数」确认返回 `ok: true`。详细判定标准见第 4 节。

**第 4 步是 Gate T0 的核心**：验证的是「项目能否脱离 WorkBuddy 独立运转」，不是「Hello 页面能不能打开」。

---

## 1. 仓库与环境

| 项 | 值 |
|---|---|
| 仓库 | `https://github.com/abshawn/book-picks`（Public，主分支 `main`） |
| 已推送提交 | `b99a619` → `6ef9f67` → `bddd04c` → `5759f39` → 本交接文档提交 |
| 小程序名称 | AI 荐书 |
| AppID | `wxbbf097fce15927bc`（已写入 `project.config.json`，公开配置） |
| 主体 | 个人主体 |
| 云开发环境 ID | `book-pick-2026-d1go0q67ue516cbcb`（环境名 `book-pick-2026`） |
| 云环境状态 | 个人版 / 生效中 / 上海 / 到期 **2027-05-27 23:59:59** |
| 技术栈 | 微信原生小程序 + TypeScript（不使用 Taro / uni-app / 浏览器 API） |
| 云函数 | `cloudfunctions/hello`（**仅**连通验证，无业务逻辑） |

环境 ID 是交接信息、不是密钥，可写进文档与代码；密钥和管理员口令一律不入库。

---

## 2. 最重要的一条：编译链路（别踩这个坑）

**微信开发者工具的 TypeScript 编译插件在本工程不可靠，已关闭 `useCompilerPlugins`。**

- `.ts` 是源码，**`.js` 才是微信运行时实际加载的文件**，且 `.js` 已提交入库。
- 修改任何 `.ts` 后，**必须运行 `npm run build`**，再点开发者工具「编译」。只改 `.ts` 不 build，改动不会生效。
- 不要重新打开微信 TS 编译插件，不要删除或忽略 `.js`，不要改掉 `tsconfig.json` 的产出配置。

脚本：

| 命令 | 作用 |
|---|---|
| `npm run typecheck` | `tsc --noEmit`，只做静态类型检查 |
| `npm run build` | `tsc --noEmit false --noEmitOnError false`，产出 `app.js`、`pages/index/index.js` |

**为什么要这么改**：首次用插件打开项目时，它生成了空的 `pages/index/index.js`（`data: {}`）且完全没有 `app.js`，模拟器里表现为「标签都在、数据全空」——页面能打开但什么都没渲染。所以本工程改用本地 `tsc` 作为唯一可信的产出链路，`.js` 随代码入库，保证换一台机器 clone 下来就能跑。

> 自检：`grep -c "onCloudCall" pages/index/index.js` 与 `grep -c "cloud.init" app.js` 都应为 1。

---

## 3. 目录结构

```text
HANDOFF.md                本交接说明
README.md                 运行、云环境配置、安全约束
docs/真机预览-GateT0-2026-11-27.jpg   真机验证证据
project.config.json       AppID、云函数根目录（未启用 TS 插件）
app.ts / app.js           全局入口（源码 + build 产物，含 wx.cloud.init）
pages/index/              Hello 首页（.ts/.js + .wxml/.wxss/.json）
cloudfunctions/hello/     最小云函数，返回 { ok, message, env, time }
typings/global.d.ts       本地类型声明
tsconfig.json             TypeScript 配置
```

---

## 4. 独立验收清单（6 步，逐步判定）

| # | 操作 | 通过标准 |
|---|---|---|
| 1 | `git clone` 仓库，`git log --oneline` 查看历史 | 拉到完整工程；根目录含 `HANDOFF.md`、`docs/`、`app.js`、`pages/index/index.js` |
| 2 | `npm install` → `npm run typecheck` → `npm run build` | 两条命令退出码均为 0；两个 `.js` 存在且含 `onCloudCall` / `cloud.init` |
| 3 | 微信开发者工具导入本目录（AppID 已配好，勿改成测试号）→ 点「编译」 | console 零错误；首页显示 Hello / AI 荐书 / AppID / 云环境 / 交接检查清单 / 「调用 hello 云函数」按钮 |
| 4 | 修改 `pages/index/index.ts` 里 `headline` 一处文字 → **`npm run build`** → 再编译 | 页面文字确实变化。**只改 `.ts` 不 build 时页面不变是预期行为**，不是 bug |
| 5 | 部署 `cloudfunctions/hello`（IDE 内右键「上传并部署：云端安装依赖」）→ 点首页按钮 | 返回 `{ "ok": true, "message": "Hello from cloud function", "env": "book-pick-2026-...", "time": "..." }`；清单第 3 项变 ✓ |
| 6 | 写一份简短的后续开发约定，开始 MVP | 约定至少覆盖：分支策略、改 `.ts` 必 build、云函数部署流程、不擅自创建业务集合 |

6 步全过，Gate T0 才算关闭。任何一步失败，先按第 7 节格式回报，不要自行改环境配置绕过。

> 第 5 步的部署确认框需要在微信开发者工具里人工点「确认」；云函数已在云端 `Active`，若遇 `FailedOperation.UpdateFunctionCode`（函数 Creating 中），等几十秒重试即可，是并发冲突不是权限问题。

---

## 5. 已完成验证（供你复核，附证据）

| 项 | 结果 |
|---|---|
| IDE 编译 | 通过。当前页 `pages/index/index`，console 零错误 |
| 模拟器渲染 | 通过。Hello / AppID / 云环境 / 清单三项全绿 |
| 云函数真实调用（模拟器） | 通过。自动点击按钮后 `cloudState=success`，返回 `ok:true` / env / time |
| **真机预览** | **通过。见 `docs/真机预览-GateT0-2026-11-27.jpg`**：手机微信真机上首页完整渲染，清单三项全绿，且**在真机上点击按钮也真实返回** `{ ok:true, message:"Hello from cloud function", env:"book-pick-2026-d1go0q67ue516cbcb", time:"2026-11-27T10:19:30.868Z" }` |
| GitHub | 4 个提交全部推送到 `main`，仓库 Public 可访问 |

真机这一条是关键：证明云开发环境不只是模拟器通，实机上 `wx.cloud.callFunction` 链路也是通的。

---

## 6. 边界与已知约束

- **Gate T0 不是业务代码**：没有数据库集合、没有荐书流程、没有荣誉体系 / 活动 / 支付 / 登录 / 内容审核。业务开发全部由你接手。
- 云环境目前只做连通验证，**不要顺手创建业务集合**，除非需求已确认。
- 云环境 2027-05-27 到期；环境创建时默认为 PostgreSQL 模式，**数据库类型创建后不可切换**。
- 个人主体不能开微信支付，收款走公众号 / 第三方（项目既有决策，勿在代码里引入微信支付）。
- `project.private.config.json`、`node_modules/` 已忽略；密钥与管理员口令不得入库。
- 真机预览与发布需要项目负责人用手机微信扫码，你无法代劳。
- 推送偶发网络代理 502（`CONNECT tunnel failed` / `SSL unexpected eof`），重试即可，不是凭证问题。
- **业务需求 / 设计文档不在本仓库**：PRD、交互稿、视觉稿、开发与部署方案目前在项目侧的 `荐书小程序设计/` 目录，需项目负责人另行提供或复制进 `docs/`。开工前请先确认拿到以下材料：`荐书小程序-开发与部署方案.md`、`运营活动管理-PRD.md`、`荐书小程序-第一轮-修订版-核心体验方案与低保真原型.html`、`荐书小程序-Gate2-完整页面视觉设计.html`、`设计说明与待确认问题.md`、`荐书小程序-图标源文件.svg`。

---

## 7. 验收回执（完成后请回报）

请按这个格式回报，Gate T0 由项目负责人据此宣布通过：

```text
第 1 步 clone：PASS / FAIL —— 提交 hash
第 2 步 typecheck + build：PASS / FAIL —— 退出码、两个 .js 自检结果
第 3 步 IDE 编译：PASS / FAIL —— console 是否有错误、首页截图
第 4 步 改文字 + 再 build：PASS / FAIL —— 改前 / 改后文案
第 5 步 云函数真实调用：PASS / FAIL —— 完整返回 JSON
第 6 步 开发约定：PASS / FAIL —— 约定存放路径
```

若第 4 步失败，请重点说明 `pages/index/index.js` 是否被重新生成、时间戳有无变化——这是本工程最可能出问题的地方。

---

## 8. 分工（交接后）

| 工作内容 | 负责人 |
|---|---|
| 后续全部业务开发（荐书流程 / 荣誉 / 活动 / 数据模型 / 云函数） | Codex |
| 需求、技术决策、验收 | 当前项目对话 |
| 微信专项预览与发布（必要时人工扫码） | WorkBuddy / 项目负责人 |

Gate T0 通过后不再讨论开发工具选型，WorkBuddy 退出日常业务代码修改。
