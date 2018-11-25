var app = getApp();

Page({
    data: {
        hotel: []
    },
    onLoad: function(t) {
        app.getUrl(this), app.getSystem(this);
    },
    search_hotel: function(t) {
        var e = this, a = t.detail.value;
        "" != a ? app.util.request({
            url: "entry/wxapp/JdList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                e.setData({
                    hotel: t.data
                });
            }
        }) : e.setData({
            hotel: []
        });
    },
    search_result: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        this.setData({
            hotel: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});