var app = getApp();

Page({
    data: {
        page: 1,
        statistics: []
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.refresh();
    },
    refresh: function(t) {
        var e = this, n = e.data.statistics, i = e.data.page, a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/Yjlist",
            data: {
                user_id: a,
                page: i
            },
            success: function(t) {
                if (0 < t.data.length) {
                    for (var a in n = n.concat(t.data), t.data) t.data[a].time = app.ormatDate(t.data[a].time);
                    e.setData({
                        statistics: n,
                        page: i + 1
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.refresh();
    }
});