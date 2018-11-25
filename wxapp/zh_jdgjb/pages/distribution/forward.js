var app = getApp();

Page({
    data: {
        hidden3: !1,
        hidden4: !0,
        button: !0,
        cash_zhi2: !1,
        cash_zhi: !1
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), wx.hideShareMenu();
        var e = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/GetFxSet",
            success: function(t) {
                a.setData({
                    GetFxSet: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/CountCommission",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                a.setData({
                    price: t.data.ktx
                });
            }
        });
    },
    bindblur: function(t) {
        var a = this.data.GetFxSet.tx_rate, e = t.detail.value, n = e * (a / 100), o = e - n;
        o = o.toFixed(2), n = n.toFixed(2), this.setData({
            tx_cost: e,
            sxf: n,
            sj_cost: o
        });
    },
    formSubmit: function(t) {
        var a = this, e = Number(a.data.platform.zd_money), n = a.data.sj_cost, o = (a.data.sxf, 
        Number(a.data.price)), i = t.detail.value.name, u = a.data.tx_cost, s = t.detail.value.account_number, c = t.detail.value.account_number_two, r = (a.data.user_id, 
        "");
        "" == u || u <= 0 ? r = "请输入提现金额" : o < u ? r = "不能超过可提现金额" : u < e ? r = "没有到提现门槛" : "" == i ? r = "请输入姓名" : "" == s ? r = "请输入微信账号" : "" == c ? r = "请再次输入微信账号" : s != c && (r = "账号输入有误，请重述"), 
        "" != r ? wx.showModal({
            title: "温馨提示",
            content: r
        }) : app.util.request({
            url: "entry/wxapp/Yjtx",
            data: {
                account: c,
                tx_cost: u,
                sj_cost: n,
                user_name: i,
                user_id: wx.getStorageSync("userInfo").id
            },
            success: function(t) {
                1 == t.data && (wx.showToast({
                    title: "发起提现申请"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500));
            }
        });
    },
    inform: function(t) {
        wx.navigateTo({
            url: "inform?status=2"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});