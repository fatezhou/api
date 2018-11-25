var app = getApp();

Page({
    data: {
        share: !1,
        backgrod: !1
    },
    onLoad: function(t) {
        var o = this;
        app.getUrl(o), app.getSystem(o), wx.getUserInfo({
            success: function(t) {
                var a = t.userInfo, e = a.nickName, n = a.avatarUrl;
                a.gender, a.province, a.city, a.country;
                o.setData({
                    nickName: e,
                    avatarUrl: n
                });
            }
        });
    },
    refresh: function(t) {
        var e = this, a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MySx",
            data: {
                user_id: a
            },
            success: function(t) {
                0 == t.data.user_id ? e.setData({
                    name: wx.getStorageSync("platform").pt_name
                }) : e.setData({
                    name: t.data.name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyCode",
            data: {
                user_id: a
            },
            success: function(t) {
                e.setData({
                    code: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/CountCommission",
            data: {
                user_id: a
            },
            success: function(t) {
                e.setData({
                    statistics: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyTeam",
            data: {
                user_id: a
            },
            success: function(t) {
                var a = t.data.one.length + t.data.two.length;
                e.setData({
                    length: a
                });
            }
        });
    },
    forward: function(t) {
        wx.navigateTo({
            url: "forward"
        });
    },
    commission: function(t) {
        wx.navigateTo({
            url: "commission"
        });
    },
    team: function(t) {
        wx.navigateTo({
            url: "team"
        });
    },
    detauled: function(t) {
        wx.navigateTo({
            url: "detauled"
        });
    },
    qr_code: function(t) {
        var a = this;
        0 == a.data.share ? a.setData({
            share: !0
        }) : a.setData({
            share: !1
        });
    },
    Preservation: function(t) {
        var a = this;
        0 == a.data.backgrod ? a.setData({
            backgrod: !0,
            share: !1
        }) : a.setData({
            backgrod: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = this, e = wx.getStorageSync("userInfo").id, n = wx.getStorageSync("userInfo").name;
        if ("button" === t.from) return {
            title: n + " 邀请你来看一看",
            path: "zh_jdgjb/pages/index/index?upper_partner=" + e,
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "none"
                }), a.setData({
                    share: !1
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "分享失败",
                    icon: "none"
                }), a.setData({
                    share: !1
                });
            }
        };
    }
});