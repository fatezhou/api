var app = getApp();

Page({
    data: {
        page: 1,
        exchange_list: [],
        exchange_type: !1
    },
    onLoad: function(e) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.refresh();
    },
    refresh: function(e) {
        var t = this, n = t.data.exchange_list, s = t.data.page, a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/Dhmx",
            data: {
                user_id: a,
                page: s
            },
            success: function(e) {
                if (0 < e.data.length) {
                    for (var a in t.setData({
                        page: s + 1
                    }), n = n.concat(e.data), e.data) e.data[a].time = e.data[a].time.slice(0, 15);
                    t.setData({
                        exchange_list: n
                    });
                }
            }
        });
    },
    exchange_info: function(e) {
        var a = this, t = a.data.exchange_type;
        1 == t && a.setData({
            exchange_type: !1
        });
        var n = a.data.exchange_list[e.currentTarget.dataset.index];
        "" != n.kd_name ? (1 == t ? a.setData({
            exchange_type: !1
        }) : a.setData({
            exchange_type: !0
        }), a.setData({
            exchange_info: n
        })) : a.setData({
            exchange_type: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            exchange_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});