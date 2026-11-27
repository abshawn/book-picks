# AI 荐书小程序 · Gate T0 交接工程

> 这是 **Gate T0** 的最小工程，不是业务代码。
> 目标：打通微信生态开发环境，交付一个可被 Codex 独立接管的 Hello 工程。
> 业务开发（荐书流程、荣誉体系、运营活动、数据模型、云函数）全部留给接手方。
> **接手方请先读 [`HANDOFF.md`](./HANDOFF.md)：含 6 步独立验收清单、回执格式、编译链路注意事项与真机证据。**

## 1. 项目信息

| 项 | 值 |
|---|---|
| 小程序名称 | AI 荐书 |
| AppID | `wxbbf097fce15927bc`（已写入 `project.config.json`，可公开） |
| 主体 | 个人主体 |
| 云开发环境 ID | `book-pick-2026-d1go0q67ue516cbcb`（环境名 `book-pick-2026`，个人版，生效中，到期 2027-05-27 23:59:59，地域上海） |
| 技术栈 | 微信原生小程序 + TypeScript（`npm run build` 产出 `.js`） |
| 云函数 | `cloudfunctions/hello`（仅做连通验证） |

> **重要（编译链路）**：微信开发者工具的 TypeScript 编译插件在本工程上不可靠（首次打开曾生成空的 `app.js` 缺失 / `index.js` 空模板），已关闭 `useCompilerPlugins`。运行文件 `.js` 由本地 `npm run build`（`tsc`）产出并提交入库。接手方修改任何 `.ts` 后，**必须运行 `npm run build`** 再编译，否则改动的 `.ts` 不会生效。

## 2. 目录结构

```text
HANDOFF.md                Codex 交接说明（验收清单、回执格式）
README.md                 本文件
docs/                     真机预览证据图
project.config.json       项目配置（AppID、云函数根目录；未启用 TS 编译插件）
app.ts / app.js           全局入口（.ts 源码 + build 产出的 .js）
app.wxss / app.json       全局样式、页面注册与窗口配置
pages/index/              Hello 首页（.ts/.js 源码与产物 + .wxml/.wxss/.json）
typings/global.d.ts       本地类型声明
tsconfig.json             TypeScript 配置（类型检查 + build 产出）
cloudfunctions/hello/     最小云函数（连通验证）
.gitignore
```

## 3. 本地运行

1. 装依赖（需 Node.js）：`npm install`。
2. 构建运行文件：`npm run build`（产出 `app.js` 与 `pages/index/index.js`；这两个 `.js` 已提交入库，直接打开也可运行）。
3. 打开 **微信开发者工具** → 导入项目 → 选择本目录。
4. AppID 已配置，无需修改；如工具提示使用测试号，确认 `project.config.json` 的 `appid` 字段为上面的值。
5. 点击「编译」，模拟器应显示 **Hello / AI 荐书** 首页、交接检查清单与「调用 hello 云函数」按钮。

脚本说明：

- `npm run typecheck`：只做静态类型检查，不产出文件。
- `npm run build`：`tsc` 产出 `.js` 运行文件。**每次修改 `.ts` 后都要重新运行。**

## 4. 云开发环境配置

### 当前环境（已确认）

| 项 | 值 |
|---|---|
| 环境名称 | `book-pick-2026` |
| 环境 ID | `book-pick-2026-d1go0q67ue516cbcb` |
| 套餐 | 个人版（成长计划 6 个月免费环境） |
| 状态 | 生效中 |
| 创建时间 | 2026-11-27 14:52:45 |
| 到期时间 | 2027-05-27 23:59:59 |
| 地域 | 上海 |

> 到期时间距创建时间正好 6 个月，符合成长计划免费个人版环境口径（非 120 元代金券）。第 1 节已记录该 ID，为交接必需信息，不是密钥。

### 部署与验证步骤

1. 在微信开发者工具文件树中右键 `cloudfunctions` → 选择环境 `book-pick-2026`。
2. 右键 `cloudfunctions/hello` → 上传并部署（云端安装依赖；IDE 内需人工点确认）。
3. 点首页「调用 hello 云函数」按钮，或在云开发控制台 → 云函数 → `hello` → 测试，传入 `{}`，应返回：

   ```json
   { "ok": true, "message": "Hello from cloud function", "env": "book-pick-2026-d1go0q67ue516cbcb", "time": "..." }
   ```

4. 云函数日志中应出现 `[hello] called with event:`。

> 该链路已在模拟器与**真机**各验证一次，真机截图见 `docs/真机预览-GateT0-2026-11-27.jpg`。Gate T0 边界：只做连通验证。**不创建数据库集合，不写业务逻辑。**

### 查找路径（供接手方复核）

- 微信开发者工具 → 顶部工具栏「云开发」→ 云开发控制台 → 环境概览页显示环境 ID。
- 或：云开发控制台 → 右上角「设置」→「环境名称 / 环境 ID」。

## 5. GitHub 交接

仓库：`https://github.com/abshawn/book-picks`（Public，主分支 `main`）

接手方独立验证步骤：

1. 从 GitHub 克隆仓库。
2. 阅读本 README 与 `HANDOFF.md`，按第 3、4 节配置环境。
3. 用微信开发者工具独立编译并运行 Hello 首页。
4. 修改 `pages/index/index.ts` 中 `headline` 的一处文字，**运行 `npm run build`**，再编译，确认修改生效（只改 `.ts` 不 build 不会生效）。
5. 点首页「调用 hello 云函数」按钮，确认返回 `ok: true`（需 `cloudfunctions/hello` 已部署到当前环境）。
6. 独立部署 `cloudfunctions/hello` 并确认返回结果，随后建立开发规范开始 MVP。

只有以上步骤全部通过，才算具备可持续开发条件。逐步判定标准与验收回执格式见 `HANDOFF.md` 第 4、7 节。

## 6. 安全约束

- 云开发密钥、管理员口令 **不得** 写入仓库。
- AppID 属于公开项目配置，可入库；环境 ID 与云函数配置属于交接信息，记录在本文档中。
- `project.private.config.json` 与 `node_modules/` 已加入 `.gitignore`。
- 真机预览与发布需项目负责人用手机微信扫码；Gate T0 的真机预览已由负责人完成并留证，接手方无需重复。
- 业务需求与设计稿（PRD / 交互稿 / 视觉稿 / 部署方案）**不在本仓库**，需项目负责人另行提供，清单见 `HANDOFF.md` 第 6 节。

## 7. 明确不做的事

- 不创建业务数据库集合。
- 不写荐书、荣誉、活动等业务代码。
- 不配置支付、登录、内容审核。
- 不在本工程内引入跨端框架（Taro / uni-app）或浏览器 API。
