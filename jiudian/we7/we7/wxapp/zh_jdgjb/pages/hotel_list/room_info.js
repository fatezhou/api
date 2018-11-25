var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        a.hotel_id;
        var e = a.room_id, n = (new Date().toLocaleDateString().replace(/\//g, "-"), a.coordinates), o = a.tel, i = a.address, r = a.name, s = a.price;
        t.setData({
            tel: o,
            coordinates: n,
            address: i,
            name: r,
            price: s
        }), app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: e
            },
            success: function(a) {
                "" != a.data.img && (a.data.img = a.data.img.split(",")), t.setData({
                    room: a.data
                });
            }
        });
    },
    phone: function(a) {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
        });
    },
    dizhi: function(a) {
        var t = this, e = Number(t.data.coordinates.split(",")[0]), n = Number(t.data.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: e,
            longitude: n,
            name: t.data.name,
            address: t.data.address
        });
    },
    previewImage: function(a) {
        var t = this.data.url, e = [], n = a.currentTarget.dataset.index, o = this.data.room.img;
        for (var i in o) e.push(t + o[i]);
        wx.previewImage({
            current: t + o[n],
            urls: e
        });
    },
    setclip: function(a) {
        wx.setClipboardData({
            data: "1.0版本",
            success: function(a) {
                wx.getClipboardData({
                    success: function(a) {}
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