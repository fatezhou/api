var app = getApp();

Page({
    data: {
        code: !1
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/OrderCode",
            data: {
                order_id: t.id
            },
            success: function(t) {
                a.setData({
                    bath: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/orderdetails",
            data: {
                order_id: t.id
            },
            success: function(t) {
                var e = t.data;
                e.arrival_time = e.arrival_time.slice(5, 7) + "月" + e.arrival_time.slice(8, 10) + "日", 
                e.departure_time = e.departure_time.slice(5, 7) + "月" + e.departure_time.slice(8, 10) + "日", 
                a.setData({
                    order_info: e
                });
            }
        });
    },
    confirmorder: function(t) {
        var e = app.OpenId, a = this.data.order_info;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: e,
                money: a.total_cost,
                order_id: a.id
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
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败"
                        });
                    }
                });
            }
        });
    },
    order_more: function(t) {
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id + "&type=1"
        });
    },
    see_more: function(t) {
        2 == this.data.platform.type ? wx.navigateTo({
            url: "../hotel_list/hotel_list"
        }) : wx.navigateTo({
            url: "../index/index"
        });
    },
    cancel_order: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.hb_id;
        1 == t.currentTarget.dataset.classify ? app.util.request({
            url: "entry/wxapp/CancelOrder",
            data: {
                order_id: e,
                hb_id: a
            },
            success: function(t) {
                wx.showToast({
                    title: "订单已取消"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        }) : wx.showModal({
            title: "",
            content: "钟点房不可以取消"
        });
    },
    apply: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.type;
        wx.showModal({
            title: "温馨提示",
            content: "是否申请退款？",
            success: function(t) {
                t.confirm ? 1 == a ? app.util.request({
                    url: "entry/wxapp/ApplyOrder",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "申请成功"
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : 2 == a ? app.util.request({
                    url: "entry/wxapp/YeRefund",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        wx.showToast({
                            title: "申请成功"
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1500);
                    }
                }) : 3 == a && wx.showModal({
                    title: "",
                    content: "到店付不支持退款"
                }) : t.cancel;
            }
        });
    },
    code: function(t) {
        var e = this, a = e.data.code;
        1 == a ? e.setData({
            code: !1
        }) : e.setData({
            code: !0
        });
    },
    sele_address: function(t) {
        var i = this.data.order_info, n = i.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = Number(n[0]), a = Number(n[1]);
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    name: i.seller_name,
                    address: i.seller_address
                });
            }
        });
    },
    go_eveluate: function(t) {
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