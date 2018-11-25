var app = getApp();

Page({
    data: {
        page: 1,
        score_detail: []
    },
    onLoad: function(a) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        var e = wx.getStorageSync("userInfo").id;
        t.setData({
            user_id: e
        }), t.refresh();
    },
    refresh: function(a) {
        var e = this, t = e.data.user_id, n = e.data.score_detail, o = e.data.page;
        app.util.request({
            url: "entry/wxapp/MyScoreDetails",
            data: {
                user_id: t,
                page: o
            },
            success: function(a) {
                if (0 < a.data.length) {
                    for (var t in n = n.concat(a.data), a.data) a.data[t].time = app.ormatDate(a.data[t].time).slice(0, 16);
                    e.setData({
                        page: o + 1,
                        score_detail: n
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            score_detail: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});