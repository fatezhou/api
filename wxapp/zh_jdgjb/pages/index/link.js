var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var o = this;
        app.getUrl(o), app.getSystem(o), o.setData({
            src: n.link
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});