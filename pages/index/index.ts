interface IndexData {
  hello: string;
  productName: string;
  headline: string;
  caption: string;
  appId: string;
  envLabel: string;
  envReady: boolean;
  checklist: Array<{ id: string; text: string; ok: boolean }>;
}

Page<IndexData, {}>({
  data: {
    hello: 'Hello',
    productName: 'AI 荐书',
    headline: 'Gate T0 环境打通验证',
    caption: '这个首页用于证明工程可编译、可运行、可交接。',
    appId: 'wxbbf097fce15927bc',
    envReady: false,
    envLabel: '云环境未配置（待填入 Env ID）',
    checklist: [
      { id: 'ts', text: 'TypeScript 编译', ok: true },
      { id: 'appid', text: 'AppID 已写入项目配置', ok: true },
      { id: 'cloud', text: '云函数连通验证', ok: false },
    ],
  },

  onLoad() {
    // Gate T0 只做最小验证，不创建业务集合、不写业务逻辑。
    // 云环境 ID 属于本地私有配置，由 README 说明如何填入。
  },
});
