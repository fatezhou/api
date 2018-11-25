var app = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/orderdetails",
            data: {
                order_id: e.id
            },
            success: function(e) {
                var t = e.data;
                t.arrival_time = t.arrival_time.slice(5, 7) + "月" + t.arrival_time.slice(8, 10) + "日", 
                t.departure_time = t.departure_time.slice(5, 7) + "月" + t.departure_time.slice(8, 10) + "日", 
                t.time = app.ormatDate(t.time), 20 <= t.seller_address.length && (t.seller_address = t.seller_address.slice(0, 20) + "..."), 
                a.setData({
                    order_info: t
                });
            }
        });
    },
    confirmorder: function(e) {
        var t = app.OpenId, a = this.data.order_info;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: t,
                money: a.total_cost,
                order_id: a.id
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "支付失败"
                        });
                    }
                });
            }
        });
    },
    order_more: function(e) {
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id
        });
    },
    see_more: function(e) {
        2 == that.data.platform.type ? wx.navigateTo({
            url: "../hotel_list/hotel_list"
        }) : wx.navigateTo({
            url: "../index/index"
        });
    },
    cancel_order: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.hb_id;
        app.util.request({
            url: "entry/wxapp/CancelOrder",
            data: {
                order_id: t,
                hb_id: a
            },
            success: function(e) {
                wx.showToast({
                    title: "订单已取消"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    apply: function(e) {
        var t = e.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/ChangeOrder",
            data: {
                order_id: t,
                status: 5
            },
            success: function(e) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    refuse: function(e) {
        var t = e.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/ChangeOrder",
            data: {
                order_id: t,
                status: 8
            },
            success: function(e) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    Refund: function(e) {
        var t = e.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/Refund",
            data: {
                order_id: t
            },
            success: function(e) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    YjRefund: function(e) {
        this.setData({
            YjRefund: !0
        });
    },
    refoned_money: function(e) {
        var t = this, a = t.data.order_info.yj_cost;
        e.detail.value <= a ? t.setData({
            refoned_money: e.detail.value
        }) : t.setData({
            refoned_money: a
        });
    },
    cancel: function(e) {
        this.setData({
            YjRefund: !1
        });
    },
    confirm: function(e) {
        var t = this, a = t.data.order_info.id, n = t.data.refoned_money;
        if (null == n) var i = t.data.order_indo.yj_cost; else i = n;
        app.util.request({
            url: "entry/wxapp/YjRefund",
            data: {
                order_id: a,
                money: i
            },
            success: function(e) {
                1 == e.data ? (wx.showToast({
                    title: "申请成功"
                }), t.setData({
                    YjRefund: !1
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500)) : (wx.showToast({
                    title: "退款失败"
                }), t.setData({
                    YjRefund: !1
                }));
            }
        });
    },
    sele_address: function(e) {
        var n = this.data.order_info, i = n.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(e) {
                var t = Number(i[0]), a = Number(i[1]);
                wx.openLocation({
                    latitude: t,
                    longitude: a,
                    name: n.seller_name,
                    address: n.seller_address
                });
            }
        });
    },
    go_eveluate: function(e) {
        wx.navigateTo({
            url: "evaluate?seller_id=" + this.data.order_info.seller_id + "&order_id=" + this.data.order_info.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});