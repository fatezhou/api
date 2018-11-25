var app = getApp();

Page({
    data: {
        page: 1,
        score_detail: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t), t.refresh();
    },
    refresh: function(e) {
        var a = this, n = a.data.score_detail, t = a.data.seller_id, o = a.data.page;
        app.util.request({
            url: "entry/wxapp/SellerTxList",
            data: {
                seller_id: t
            },
            success: function(e) {
                if (0 < e.data.length) {
                    for (var t in n = n.concat(e.data), e.data) e.data[t].time = e.data[t].time.slice(0, 16);
                    a.setData({
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