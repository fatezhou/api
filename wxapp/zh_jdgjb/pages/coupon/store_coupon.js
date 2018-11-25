var app = getApp();

Page({
    data: {
        item: [ "有效", "已使用", "已过期" ],
        seletive_index: 0,
        index: 0,
        page: 1,
        unreceive: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        var a = e.hotel_id;
        t.setData({
            hotel_id: a,
            price: e.money
        }), t.reload();
    },
    reload: function(e) {
        var o = this, r = app.today(), t = wx.getStorageSync("userInfo").id, s = o.data.index, u = o.data.unreceive, c = o.data.page;
        app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: t,
                page: c
            },
            success: function(e) {
                if (0 < e.data.length) {
                    o.setData({
                        page: c + 1
                    }), u = u.concat(e.data);
                    e.data;
                    var t = [], a = [], n = [];
                    for (var i in u) null != u[i].end_time && (u[i].end_time = u[i].end_time.slice(0, 10), 
                    u[i].start_time = u[i].start_time.slice(0, 10), u[i].cost = Number(u[i].cost).toFixed(0), 
                    r > u[i].end_time && t.push(u[i]), r <= u[i].end_time && 1 == u[i].state && a.push(u[i]), 
                    2 == u[i].state && n.push(u[i]));
                    0 == s ? o.setData({
                        unreceive: a
                    }) : 1 == s ? o.setData({
                        unreceive: n
                    }) : o.setData({
                        unreceive: t
                    });
                }
            }
        });
    },
    receive: function(e) {
        var t = e.currentTarget.id;
        0 == t ? wx.navigateTo({
            url: "../hotel_list/hotel_list"
        }) : wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + t
        });
    },
    not_user: function(e) {
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            coupon: 0,
            coupons_id: ""
        }), wx.navigateBack({
            delta: 1
        });
    },
    seletive_index: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            seletive_index: t,
            index: t,
            page: 1,
            unreceive: []
        }), this.reload();
    },
    receive_coupon: function(e) {
        var t = this.data.price, a = e.currentTarget.dataset.money, n = e.currentTarget.id, i = e.currentTarget.dataset.condition;
        if ("" == i) var o = 0; else o = i.replace(/[^0-9]/gi, "");
        if (Number(t) < Number(o)) wx.showToast({
            title: "不到使用条件"
        }); else if (null != t || null != o) {
            var r = getCurrentPages();
            r[r.length - 1];
            r[r.length - 2].setData({
                coupon: a,
                coupons_id: n,
                condition: o
            }), wx.navigateBack({
                delta: 1
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            seletive_index: 0,
            index: 0,
            page: 1,
            unreceive: []
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});