// 酒店列表 点进去能看对应房间信息
var app = getApp(), loading = 2;

Page({
    data: {
        page: 1,
        hotel: [],
        timg: !1
    },
    onLoad: function(t) {
        var e = this;
        app.getUrl(e), app.getSystem(e), e.setData({
            start: app.util.time(),
            end: app.util.addDate(app.util.time(), 28)
        }), 1 == t.nearby ? e.setData({
            nearby: t.nearby,
            Recommend: 2,
            price_sorting: 0
        }) : e.setData({
            nearby: 0,
            Recommend: 1,
            price_sorting: 0
        });
        var a = wx.getStorageSync("platform");
        e.setData({
            platform: a,
            lat1: wx.getStorageSync("latitude"),
            lng1: wx.getStorageSync("longitude")
        }), 2 == location && wx.showLoading({
            title: "正在加载",
            complete: function() {},
            fail: function() {}
        }), e.refresh(), e.date();
    },
    date: function(t) {
        var e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), n = wx.getStorageSync("day"), i = app.util.time();
        if (wx.setStorageSync("datein", r), "" == e) {
            var r = app.util.time();
            wx.setStorageSync("datein", r);
        } else if (e < i) r = i; else r = e;
        if ("" == a) var o = app.util.addDate(i, 1); else {
            var s = app.util.addDate(i, 1);
            if (a < s) o = s; else o = a;
        }
        n = app.util.day(o, r);
        wx.setStorageSync("day1", r), wx.setStorageSync("day2", o), wx.setStorageSync("day", n), 
        this.setData({
            datein: r,
            dateout: o,
            time: n,
            current_date: r
        });
    },
    refresh: function(t) {
        var s = this, d = s.data.page, c = s.data.hotel, g = s.data.Recommend, p = s.data.price_sorting, l = s.data.nearby;
        app.util.request({
            url: "entry/wxapp/JdList",
            cachetime: "0",
            data: {
                page: d
            },
            success: function(t) {
                if (0 < t.data.length) {
                    s.setData({
                        page: d + 1,
                        none_more: !1
                    }), c = c.concat(t.data);
                    for (var e = 0; e < c.length; e++) {
                        var a = c[e].coordinates.split(",");
                        c[e].lat2 = a[0], c[e].lng2 = a[1];
                        var n = s.data.lat1, i = s.data.lng1, r = Number(a[0]), o = Number(a[1]);
                        c[e].distance = app.util.location(n, r, i, o);
                    }
                    1 == g ? s.setData({
                        hotel: c,
                        timg: !0
                    }) : (1 == p && s.setData({
                        hotel: c.sort(app.sort_price_order),
                        timg: !0
                    }), 2 == p && s.setData({
                        hotel: c.sort(app.sort_price_Reverse),
                        timg: !0
                    }), 1 == l && s.setData({
                        hotel: c.sort(app.sort_distance_order),
                        timg: !0
                    }), 2 == l && s.setData({
                        hotel: c.sort(app.sort_distance_Reverse),
                        timg: !0
                    }));
                } else s.setData({
                    none_more: !0,
                    timg: !0
                });
            }
        });
    },
    Recommend: function(t) {
        var e = this;
        e.data.Recommend;
        e.setData({
            price_sorting: 0,
            Recommend: 1,
            nearby: 0,
            page: 1,
            hotel: []
        }), e.refresh();
    },
    price_sorting: function(t) {
        var e = this, a = e.data.price_sorting;
        e.data.hotel;
        0 == a ? (e.setData({
            price_sorting: 2,
            Recommend: 2,
            nearby: 0,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh()) : 1 == a ? (e.setData({
            price_sorting: 2,
            Recommend: 2,
            nearby: 0,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh()) : 2 == a && (e.setData({
            price_sorting: 1,
            Recommend: 2,
            nearby: 0,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh());
    },
    nearby: function(t) {
        var e = this, a = e.data.nearby;
        e.data.hotel_b;
        0 == a ? (e.setData({
            price_sorting: 0,
            Recommend: 2,
            nearby: 2,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh()) : 1 == a ? (e.setData({
            price_sorting: 0,
            Recommend: 2,
            nearby: 2,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh()) : 2 == a && (e.setData({
            price_sorting: 0,
            Recommend: 2,
            nearby: 1,
            page: 1,
            hotel: [],
            timg: !1
        }), e.refresh());
    },
    bindDateChange1: function(t) {
        var e = t.detail.value, a = this.data.dateout, n = (this.data.current_date, app.getTime2Time(a, e));
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", n), 
        this.setData({
            datein: t.detail.value,
            time: n
        });
    },
    bindDateChange2: function(t) {
        var e = this.data.datein, a = t.detail.value, n = app.getTime2Time(a, e);
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", n), 
        this.setData({
            dateout: t.detail.value,
            time: n
        });
    },
    conlist: function(t) {
        wx.navigateTo({
            url: "hotel_info?hotel_id=" + t.currentTarget.dataset.id + "&type=1"
        });
    },
    search: function(t) {
        wx.navigateTo({
            url: "../index/search"
        });
    },
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(t) {}), this.date();
    },
    onHide: function() {},
    onUnload: function() {
        this.setData({
            location: 2
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            hotel: [],
            nearby: 0,
            Recommend: 1,
            price_sorting: 0
        }), this.refresh(), wx, wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            timg: !1
        }), this.refresh();
    }
});