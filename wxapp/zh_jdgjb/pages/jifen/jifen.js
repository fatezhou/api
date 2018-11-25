var app = getApp();

Page({
    data: {
        none_list: !1,
        page: 1,
        goods_list: []
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.refresh(), a.reload();
    },
    refresh: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getad",
            cachetime: "0",
            data: {
                type: 2
            },
            success: function(t) {
                0 < t.data.length && a.setData({
                    nav: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/JfTypeList",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    type_list: t.data
                });
            }
        });
    },
    reload: function(t) {
        var a = this, e = a.data.page, n = a.data.goods_list;
        app.util.request({
            url: "entry/wxapp/JfGoodsList",
            cachetime: "0",
            data: {
                page: e
            },
            success: function(t) {
                0 < t.data.length ? (a.setData({
                    page: e + 1
                }), n = n.concat(t.data), a.setData({
                    goods_list: n
                })) : a.setData({
                    none_list: !0
                });
            }
        });
    },
    jifeninfo: function(t) {
        wx.navigateTo({
            url: "jifeninfo?id=" + t.currentTarget.dataset.id
        });
    },
    index: function(t) {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    record: function(t) {
        wx.navigateTo({
            url: "scoredetails"
        });
    },
    exchange: function(t) {
        wx.navigateTo({
            url: "exchange"
        });
    },
    type_list: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "score_classifation?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            goods_list: []
        }), t.refresh(), t.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});