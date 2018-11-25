var app = getApp();

Page({
    data: {
        dqdj: 0,
        speed: 0
    },
    last: function() {
        var t = this.data.dqdj;
        this.setData({
            dqdj: t - 1
        });
    },
    next: function() {
        var t = this.data.dqdj;
        this.setData({
            dqdj: t + 1
        });
    },
    swiperchange: function(t) {
        this.setData({
            dqdj: t.detail.current
        });
    },
    onLoad: function(t) {
        var d = this;
        app.getUrl(d), app.getSystem(d);
        var a = wx.getStorageSync("xtxx");
        this.setData({
            xtxx: a
        }), app.getUserInfo(function(s) {
            d.setData({
                userInfo: s
            }), app.util.request({
                url: "entry/wxapp/MyCost",
                data: {
                    user_id: s.id
                },
                success: function(t) {
                    d.setData({
                        level_cumulative: t.data
                    });
                }
            }), app.util.request({
                url: "entry/wxapp/memberlist",
                cachetime: "0",
                success: function(t) {
                    d.setData({
                        navs: t.data
                    });
                    for (var a = t.data.length, e = 0; e < t.data.length; e++) if (t.data[e].id == s.level_id) {
                        var n = (e + 1) / a;
                        n = (n *= 100).toFixed(0), d.setData({
                            dqdj: e,
                            speed: n,
                            price: t.data[e].value
                        });
                    }
                    d.setData({
                        imgarr: t.data
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});