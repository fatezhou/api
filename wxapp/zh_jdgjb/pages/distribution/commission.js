var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var n = this;
        app.getUrl(n), app.getSystem(n), n.refresh();
    },
    refresh: function(t) {
        var n = this, o = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/CountCommission",
            data: {
                user_id: o
            },
            success: function(t) {
                n.setData({
                    statistics: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});