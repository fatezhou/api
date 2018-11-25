var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        app.getUserInfo(function(n) {}), app.getSystem(this);
    },
    bindGetUserInfo: function(n) {
        "getUserInfo:ok" == n.detail.errMsg ? wx.navigateBack({
            delta: 1
        }) : wx.showModal({
            title: "温馨提示",
            content: "您拒绝了信息授权，将无法正常使用小程序"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});