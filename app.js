"use strict";
App({
    globalData: {
        productName: 'AI 荐书',
    },
    onLaunch() {
        if (wx.cloud) {
            wx.cloud.init({
                env: 'book-pick-2026-d1go0q67ue516cbcb',
                traceUser: true,
            });
        }
    },
});
