var app = getApp();

Page({
    data: {
        titel: [ "全部", "待付款", "待入住" ],
        page: 1,
        order_list: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t), app.getUserInfo(function(e) {});
        var a = e.activeIndex, r = e.index;
        t.setData({
            activeIndex: a,
            index: r
        }), t.refresh();
    },
    refresh: function(e) {
        var i = this, n = i.data.page, s = i.data.order_list, o = i.data.index, t = wx.getStorageSync("userInfo").id;
        app.today_time();
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: t,
                page: n
            },
            success: function(e) {
                if (0 < e.data.length) {
                    i.setData({
                        page: n + 1
                    }), s = s.concat(e.data);
                    var t = [], a = [];
                    for (var r in s) s[r].arrival_time = s[r].arrival_time.slice(5, 7) + "月" + s[r].arrival_time.slice(8, 10) + "日", 
                    s[r].departure_time = s[r].departure_time.slice(5, 7) + "月" + s[r].departure_time.slice(8, 10) + "日", 
                    1 == s[r].status && t.push(s[r]), 2 == s[r].status && a.push(s[r]);
                    0 == o ? i.setData({
                        order_list: s
                    }) : 1 == o ? i.setData({
                        order_list: t
                    }) : 2 == o && i.setData({
                        order_list: a
                    });
                }
            }
        });
    },
    tabClick: function(e) {
        this.setData({
            activeIndex: e.currentTarget.dataset.index,
            index: e.currentTarget.dataset.index,
            page: 1,
            order_list: []
        }), this.refresh();
    },
    order_info: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "orderinfo?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            index: 0,
            activeIndex: 0,
            page: 1,
            order_list: []
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {
        app.getUserInfo(function(e) {});
    },
    onPullDownRefresh: function() {
        this.setData({
            index: 0,
            page: 1,
            order_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    },
    onShareAppMessage: function() {}
});