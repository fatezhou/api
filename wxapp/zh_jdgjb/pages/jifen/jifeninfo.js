var app = getApp();

Page({
    data: {
        edit: !1
    },
    onLoad: function(e) {
        var l = this;
        l.setData({
            id: e.id
        }), app.getUserInfo(function(e) {
            l.setData({
                userInfo: e,
                scores: Number(e.score)
            });
        }), app.getUrl(l), app.getSystem(l), app.util.request({
            url: "entry/wxapp/GoodsDetails",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                !function e(t) {
                    var a = t || [];
                    var o = Math.round(new Date().getTime() / 1e3);
                    var n = a - o || [];
                    l.setData({
                        clock: (s = n, i = Math.floor(s), d = Math.floor(i / 3600 / 24), r = Math.floor(i / 3600 % 24), 
                        c = Math.floor(i / 60 % 60), u = Math.floor(i % 60), d + "天" + r + "小时" + c + "分钟" + u + "秒")
                    });
                    var s, i, d, r, c, u;
                    n <= 0 ? l.setData({
                        clock: "已经截止"
                    }) : setTimeout(function() {
                        n -= 1e3, e(t);
                    }, 1e3);
                }(e.data.end_time), l.setData({
                    goods_detail: e.data,
                    score: Number(e.data.score)
                });
            }
        });
    },
    select_address: function(e) {
        var n = this;
        wx.chooseAddress({
            success: function(e) {
                var t = e.telNumber, a = e.userName, o = e.provinceName + e.cityName + e.countyName + e.detailInfo;
                n.setData({
                    tel: t,
                    name: a,
                    address: o,
                    edit: !0
                });
            }
        });
    },
    exchange: function(e) {
        var t = this, a = t.data.edit, o = t.data.goods_detail, n = t.data.tel, s = t.data.name, i = t.data.address, d = "";
        if (2 == o.type ? 0 == a ? d = "请选择收货地址" : "" == s || null == s ? d = "请填写姓名" : "" == n || null == n ? d = "请填写联系方式" : "" != i && null != i || (d = "请填写地址") : i = s = n = "", 
        "" != d) wx.showModal({
            title: "",
            content: d
        }); else {
            var r = wx.getStorageSync("userInfo").id, c = t.data.id, u = o.name, l = o.img, f = o.score, m = o.type, p = o.hb_moeny;
            app.util.request({
                url: "entry/wxapp/exchange",
                data: {
                    user_id: r,
                    good_id: c,
                    good_name: u,
                    good_img: l,
                    user_name: s,
                    user_tel: n,
                    address: i,
                    type: m,
                    integral: f,
                    hb_money: p
                },
                success: function(e) {
                    1 == e.data ? wx.showToast({
                        title: "兑换成功"
                    }) : wx.showToast({
                        title: "兑换失败"
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1500);
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});