var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/attachurl",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: t.seller_id
            },
            success: function(t) {
                t.data.img = t.data.img.split(","), a.setData({
                    hotel: t.data
                });
            }
        });
    },
    phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    dizhi: function(t) {
        var a = this, e = Number(a.data.hotel.coordinates.split(",")[0]), n = Number(a.data.hotel.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: e,
            longitude: n,
            name: a.data.hotel.name,
            address: a.data.hotel.address
        });
    },
    previewImage: function(t) {
        var a = this.data.url, e = [], n = t.currentTarget.dataset.index, i = this.data.hotel.img;
        for (var o in i) e.push(a + i[o]);
        wx.previewImage({
            current: a + i[n],
            urls: e
        });
    },
    setclip: function(t) {
        wx.setClipboardData({
            data: "1.0版本",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});