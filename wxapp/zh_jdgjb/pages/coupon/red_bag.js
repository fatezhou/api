var app = getApp();

Page({
    data: {
        page: 1,
        red_bag: []
    },
    onLoad: function(e) {
        var a = this;
        app.getUrl(a), app.getSystem(a);
        var t = wx.getStorageSync("userInfo").id;
        a.setData({
            user_id: t
        }), a.refresh();
    },
    refresh: function(e) {
        var t = this, a = t.data.user_id, n = t.data.page, r = t.data.red_bag;
        app.util.request({
            url: "entry/wxapp/MyHb",
            data: {
                user_id: a,
                page: n
            },
            success: function(e) {
                if (0 < e.data.length) {
                    for (var a in r = r.concat(e.data), e.data) e.data[a].money = Number(e.data[a].money).toFixed(0);
                    t.setData({
                        red_bag: r,
                        page: n + 1
                    });
                }
            }
        });
    },
    receive_coupon: function(e) {
        var a = e.currentTarget.dataset.money, t = e.currentTarget.id, n = getCurrentPages();
        n[n.length - 1];
        n[n.length - 2].setData({
            red_bag: a,
            red_bag_id: t
        }), wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            red_bag: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});