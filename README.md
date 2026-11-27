# AI 荐书小程序 · Gate T0 交接工程

> 这是 **Gate T0** 的最小工程，不是业务代码。
> 目标：打通微信生态开发环境，交付一个可被 Codex 独立接管的 Hello 工程。
> 业务开发（荐书流程、荣誉体系、运营活动、数据模型、云函数）全部留给接手方。

## 1. 项目信息

| 项 | 值 |
|---|---|
| 小程序名称 | AI 荐书 |
| AppID | `wxbbf097fce15927bc`（已写入 `project.config.json`，可公开） |
| 主体 | 个人主体 |
| 云开发环境 ID | `book-pick-2026-d1go0q67ue516cbcb`（环境名 `book-pick-2026`，个人版，生效中，到期 2027-05-27 23:59:59，地域上海） |
| 技术栈 | 微信原生小程序 + TypeScript 编译插件 |
| 云函数 | `cloudfunctions/hello`（仅做连通验证） |

## 2. 目录结构

```text
project.config.json       项目配置（AppID、TS 编译插件、云函数根目录）
app.ts / app.wxss         全局入口
app.json                  页面注册与窗口配置
pages/index/              Hello 首页（.ts / .wxml / .wxss / .json）
typings/global.d.ts       本地类型声明
tsconfig.json             TypeScript 类型检查配置
cloudfunctions/hello/     最小云函数（连通验证）
.gitignore
README.md
```

## 3. 本地运行

1. 打开 **微信开发者工具** → 导入项目 → 选择本目录。
2. AppID 已配置，无需修改；如工具提示使用测试号，确认 `project.config.json` 的 `appid` 字段为上面的值。
3. 点击「编译」，模拟器应显示 **Hello / AI 荐书** 首页与交接检查清单。
4. 类型检查（可选，需 Node.js）：

   ```bash
   npm install
   npm run typecheck
   ```

> TypeScript 由微信开发者工具的 `useCompilerPlugins: ["typescript"]` 自动编译，`npm run typecheck` 只做静态类型检查，不产出运行文件。

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
2. 右键 `cloudfunctions/hello` → 上传并部署（云端安装依赖）。
3. 在云开发控制台 → 云函数 → `hello` → 测试，传入 `{}`，应返回：

   ```json
   { "ok": true, "message": "Hello from cloud function", "env": "book-pick-2026-d1go0q67ue516cbcb", "time": "..." }
   ```

4. 云函数日志中应出现 `[hello] called with event:`。

> Gate T0 边界：只做这一次真实调用验证。**不创建数据库集合，不写业务逻辑。**

### 查找路径（供接手方复核）

- 微信开发者工具 → 顶部工具栏「云开发」→ 云开发控制台 → 环境概览页显示环境 ID。
- 或：云开发控制台 → 右上角「设置」→「环境名称 / 环境 ID」。

## 5. GitHub 交接

仓库：`（待创建，地址写入此处）`

接手方独立验证步骤：

1. 从 GitHub 克隆仓库。
2. 阅读本 README，按第 3、4 节配置环境。
3. 用微信开发者工具独立编译并运行 Hello 首页。
4. 修改 `pages/index/index.ts` 中 `headline` 的一处文字。
5. 再次编译，确认修改生效。
6. 确认 `cloudfunctions/hello` 可独立部署并返回结果。

只有以上 6 步全部通过，才算具备可持续开发条件。

## 6. 安全约束

- 云开发密钥、管理员口令 **不得** 写入仓库。
- AppID 属于公开项目配置，可入库；环境 ID 与云函数配置属于交接信息，记录在本文档中。
- `project.private.config.json` 与 `node_modules/` 已加入 `.gitignore`。
- 真机预览需项目负责人用手机微信扫码，接手方无法代劳。

## 7. 明确不做的事

- 不创建业务数据库集合。
- 不写荐书、荣誉、活动等业务代码。
- 不配置支付、登录、内容审核。
- 不在本工程内引入跨端框架（Taro / uni-app）或浏览器 API。
