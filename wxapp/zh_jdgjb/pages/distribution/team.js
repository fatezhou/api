var app = getApp();

Page({
    data: {
        index: 0
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.refresh();
    },
    refresh: function(t) {
        var n = this, o = n.data.index, a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MyTeam",
            data: {
                user_id: a
            },
            success: function(t) {
                if (0 == o) {
                    for (var a in t.data.one) t.data.one[a].time = app.ormatDate(t.data.one[a].time).slice(0, 10), 
                    t.data.one[a].ji = "一级下线";
                    n.setData({
                        list: t.data.one
                    });
                }
                if (1 == o) {
                    for (var e in t.data.two) t.data.two[e].time = app.ormatDate(t.data.two[e].time).slice(0, 16), 
                    t.data.two[e].ji = "二级下线";
                    n.setData({
                        list: t.data.two
                    });
                }
            }
        });
    },
    whole2: function(t) {
        this.setData({
            index: 0
        }), this.refresh();
    },
    whole3: function(t) {
        this.setData({
            index: 1
        }), this.refresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});