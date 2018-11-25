var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp();

Page({
    data: {
        time: "06:00",
        pay_num: 1
    },
    onLoad: function(t) {
        var e = this;
        app.getUrl(e), app.getSystem(e);
        var a = app.hours_time(app.util.time() + " " + e.data.time, t.rz_time);
        e.setData({
            start: app.util.time(),
            end_time: a,
            form_d: t.form_d,
            room_id: t.room_id,
            hotel_id: t.hotel_id,
            end: app.util.addDate(app.util.time(), 28),
            cost: Number(t.cost).toFixed(2),
            rz_time: t.rz_time
        }), e.refresh();
    },
    refresh: function(t) {
        var e = this, a = e.data.room_id, o = e.data.hotel_id;
        app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: a
            },
            success: function(t) {
                e.setData({
                    room: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: o
            },
            success: function(t) {
                e.setData({
                    hotel: t.data
                });
            }
        });
    },
    bindTimeChange: function(t) {
        var e = t.detail.value, a = this.data.start + " " + e, o = this.data.rz_time, i = app.hours_time(a, o);
        this.setData({
            time: t.detail.value,
            end_time: i
        });
    },
    formSubmit: function(t) {
        var e = this, a = e.data.form_d;
        var i = t.detail.formId, o = e.data.hotel, d = t.detail.value.code, r = e.data.room, n = e.data.cost, s = e.data.cost, c = (e.data.cost, 
        t.detail.value.name), p = t.detail.value.tel, u = e.data.time, m = e.data.end_time, l = o.id, _ = r.id, f = wx.getStorageSync("userInfo").id, y = o.name, h = o.address, S = o.coordinates, v = e.data.start + " " + u, g = m, w = (e.data.cost, 
        r.name), x = r.size, b = e.data.cost, D = r.logo, T = e.data.reduction_price, z = e.data.platform, P = "";
        if ("" == c) P = "请填写入住人姓名"; else if ("" == p) P = "请填写联系电话"; else if ("" == d && 1 == z.is_sfz) P = "请填写您的身份证号"; else if (2 == z.is_sfz) d = "";
        var q = e.data.pay_num;
        "" != P ? (wx.showModal({
            title: "",
            content: P
        }), e.setData({
            pay_num: 1
        })) : "" == P && 1 == q && (e.setData({
            pay_num: 0
        }), app.util.request({
            url: "entry/wxapp/AddOrder",
            data: {
                name: c,
                tel: p,
                price: n,
                dd_time: u,
                seller_id: l,
                room_id: _,
                user_id: f,
                coupons_id: 0,
                seller_name: y,
                seller_address: h,
                coordinates: S,
                arrival_time: v,
                departure_time: g,
                num: 1,
                room_type: w,
                bed_type: x,
                days: 1,
                dis_cost: b,
                yj_cost: 0,
                yhq_cost: 0,
                total_cost: s,
                room_logo: D,
                yyzk_cost: T,
                hb_id: 0,
                hb_cost: 0,
                from_id: a,
                classify: 2,
                type: 1,
                code: d
            },
            method: "POST",
            success: function(t) {
                var e = t.data, a = t.data;
                e = void 0 === e ? "undefined" : _typeof(e);
                var o = app.OpenId;
                "string" != e ? app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: o,
                        money: s,
                        order_id: a
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
                                wx.redirectTo({
                                    url: "../order/order?activeIndex=0&index=0"
                                });
                                var e = wx.getStorageSync("userInfo").openid;
                                app.util.request({
                                    url: "entry/wxapp/Message",
                                    cachetime: "0",
                                    data: {
                                        form_id: i,
                                        openid: e,
                                        order_id: a
                                    },
                                    method: "POST",
                                    success: function(t) {}
                                });
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "支付失败"
                                }), wx.redirectTo({
                                    url: "../order/order?activeIndex=1&index=1"
                                });
                            }
                        });
                    }
                }) : wx.showModal({
                    content: t.data
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});