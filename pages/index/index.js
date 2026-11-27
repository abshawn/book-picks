"use strict";
Page({
    data: {
        hello: 'Hello',
        productName: 'AI 荐书',
        headline: 'Gate T0 环境打通验证',
        caption: '这个首页用于证明工程可编译、可运行、可交接。',
        appId: 'wxbbf097fce15927bc',
        envReady: true,
        envLabel: 'book-pick-2026-d1go0q67ue516cbcb（个人版 · 生效中）',
        cloudState: 'idle',
        cloudResult: '',
        checklist: [
            { id: 'ts', text: 'TypeScript 编译', ok: true },
            { id: 'appid', text: 'AppID 已写入项目配置', ok: true },
            { id: 'cloud', text: '云函数连通验证', ok: false },
        ],
    },
    onCloudCall() {
        if (this.data.cloudState === 'loading')
            return;
        this.setData({ cloudState: 'loading', cloudResult: '调用中…' });
        wx.cloud.callFunction({
            name: 'hello',
            data: { from: 'Gate T0' },
            success: (res) => {
                const r = res.result;
                this.setData({
                    cloudState: r && r.ok ? 'success' : 'error',
                    cloudResult: JSON.stringify(r, null, 2),
                    'checklist[2].ok': !!(r && r.ok),
                });
            },
            fail: (err) => {
                this.setData({
                    cloudState: 'error',
                    cloudResult: err && err.errMsg ? err.errMsg : String(err),
                });
            },
        });
    },
});
