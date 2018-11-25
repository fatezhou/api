var app = getApp();

Page({
    data: {
        page: 1,
        unreceive: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t), t.reload();
    },
    reload: function(e) {
        var a = this, n = a.data.page, o = a.data.unreceive, t = wx.getStorageSync("userInfo").id;
        t = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/GetSponsorCoupon",
            cachetime: "0",
            data: {
                page: n,
                user_id: t
            },
            success: function(e) {
                if (0 < e.data.length) {
                    for (var t in a.setData({
                        page: n + 1
                    }), o = o.concat(e.data), e.data) e.data[t].end_time = e.data[t].end_time.slice(0, 10), 
                    e.data[t].start_time = e.data[t].start_time.slice(0, 10), e.data[t].cost = Number(e.data[t].cost).toFixed(0);
                    a.setData({
                        unreceive: o
                    });
                }
            }
        });
    },
    receive: function(e) {
        var t = this, a = e.currentTarget.id, n = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/ReceiveCoupons",
            cachetime: "0",
            data: {
                user_id: n,
                coupons_id: a
            },
            success: function(e) {
                1 != e.data ? wx.showToast({
                    mask: !0,
                    title: e.data
                }) : (t.setData({
                    page: 1,
                    unreceive: []
                }), t.reload(), wx.showToast({
                    title: "领取成功"
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            unreceive: []
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});