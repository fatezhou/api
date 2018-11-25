var app = getApp();

Page({
    data: {
        none_list: !1,
        page: 1,
        goods_list: []
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.setData({
            type_id: t.id
        }), a.reload();
    },
    reload: function(t) {
        var a = this, e = a.data.page, o = a.data.type_id, n = a.data.goods_list;
        app.util.request({
            url: "entry/wxapp/JfGoodsList",
            cachetime: "0",
            data: {
                page: e,
                type_id: o
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            goods_list: []
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});