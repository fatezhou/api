var app = getApp();

Page({
    data: {
        ac_index: -1
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.getUserInfo(function(t) {
            a.setData({
                userInfo: t,
                color: wx.getStorageSync("platform").color
            });
        }), app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/getad",
            cachetime: "0",
            data: {
                type: 3
            },
            success: function(t) {
                a.data.rande;
                0 < t.data.length && a.setData({
                    getad: t.data,
                    bomb: !0
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Czhd",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    Czhd: t.data
                });
            }
        });
    },
    money: function(t) {
        this.setData({
            money: t.detail.value
        });
    },
    recharge_list: function(t) {
        this.setData({
            ac_index: t.currentTarget.dataset.index,
            money: t.currentTarget.dataset.money
        });
    },
    qita: function(t) {
        this.setData({
            ac_index: -1
        });
    },
    chongzhi: function(t) {
        var e = this.data.money, a = "";
        if (null != e && 0 != e || (a = "请输入充值金额"), "" != a) wx.showModal({
            content: a
        }); else {
            var n = this.data.Czhd, o = [];
            for (var i in n) e >= Number(n[i].full) && o.push(Number(n[i].full));
            if (0 < o.length) {
                var c = app.max(o);
                for (var u in n) if (c == n[u].full) var r = n[u].reduction;
            } else r = 0;
            var s = wx.getStorageSync("userInfo").id, p = app.OpenId;
            app.util.request({
                url: "entry/wxapp/SaveRecharge",
                data: {
                    user_id: s,
                    cz_money: e,
                    zs_money: r
                },
                success: function(t) {
                    var a = t.data;
                    app.util.request({
                        url: "entry/wxapp/Pay2",
                        cachetime: "0",
                        data: {
                            openid: p,
                            money: e,
                            cz_id: a
                        },
                        method: "POST",
                        success: function(t) {
                            wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: t.data.signType,
                                paySign: t.data.paySign,
                                success: function(t) {
                                    wx.showToast({
                                        title: "支付成功"
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1500);
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    jilu: function(t) {
        wx.navigateTo({
            url: "jilu"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});