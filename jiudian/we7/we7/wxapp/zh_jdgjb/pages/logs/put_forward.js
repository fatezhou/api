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
        app.getUrl(a), app.getSystem(a), wx.hideShareMenu(), app.util.request({
            url: "entry/wxapp/TxMoney",
            cachetime: "0",
            data: {
                seller_id: t.seller_id
            },
            success: function(t) {
                a.setData({
                    price: t.data
                });
            }
        }), a.setData({
            seller_id: t.seller_id
        });
    },
    bindblur: function(t) {
        var a = this.data.platform.tx_sxf, e = t.detail.value, n = e * (a / 100), o = e - n;
        o = o.toFixed(2), n = n.toFixed(2), this.setData({
            tx_cost: e,
            sxf: n,
            sj_cost: o
        });
    },
    formSubmit: function(t) {
        var a = this, e = a.data.seller_id, n = Number(a.data.platform.zd_money), o = a.data.sj_cost, i = (a.data.sxf, 
        Number(a.data.price)), s = t.detail.value.name, u = a.data.tx_cost, d = t.detail.value.account_number, c = t.detail.value.account_number_two, l = (a.data.user_id, 
        "");
        "" == u || u <= 0 ? l = "请输入提现金额" : i < u ? l = "不能超过可提现金额" : u < n ? l = "没有到提现门槛" : "" == s ? l = "请输入姓名" : "" == d ? l = "请输入微信账号" : "" == c ? l = "请再次输入微信账号" : d != c && (l = "账号输入有误，请重述"), 
        "" != l ? wx.showModal({
            title: "温馨提示",
            content: l
        }) : app.util.request({
            url: "entry/wxapp/SaveTxApply",
            data: {
                name: s,
                seller_id: e,
                tx_cost: u,
                sj_cost: o,
                username: d
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