var app = getApp();

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      id: 1,
      latitude: '',
      longitude: '',
      name: ''
    }],
    enablezoom: false,

    singleroom: [],
  },
  onLoad: function (a) {
    console.info(a)
    var t = this;
    app.getUrl(t), app.getSystem(t);
    a.hotel_id;
    var e = a.room_id, n = (new Date().toLocaleDateString().replace(/\//g, "-"), a.coordinates), o = a.tel, i = a.address, r = a.name, s = a.price, yjcost = a.yjcost, latitude = Number(n.split(",")[0]), longitude = Number(n.split(",")[1]);
    t.data.markers[0].latitude = latitude
    t.data.markers[0].longitude = longitude
    t.data.markers[0].name = r
    t.data.singleroom[0] = app.globalData.room
    console.info(e)
    if (e == 143 || e == 144 || e == 72 || e == 112 || e == 113 || e == 114 || e == 115 || e == 116 || e == 117 || e == 118 || e == 131 || e == 132 || e == 133 || e == 134){
      t.setData({
        price: s
      })
    }else{
      t.setData({
        price: parseFloat(parseFloat(s) + 100).toFixed(2)
      })
    }
    t.setData({
      tel: o,
      coordinates: n,
      address: i,
      name: r,
      // price: parseFloat(parseFloat(s) + 100).toFixed(2),
      // price: s,
      hotel_id: a.hotel_id,
      latitude: latitude,
      longitude: longitude,
      markers: t.data.markers,
      singleroom: t.data.singleroom,
      grade: wx.getStorageSync("platform").open_member
    }), app.util.request({
      url: "entry/wxapp/RoomDetails",
      cachetime: "0",
      data: {
        room_id: e
      },
      success: function (a) {
        "" != a.data.img && (a.data.img = a.data.img.split(",")), t.setData({
          room: a.data
        });
      }
    });
  },
  phone: function (a) {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    });
  },
  dizhi: function (a) {
    var t = this, e = Number(t.data.coordinates.split(",")[0]), n = Number(t.data.coordinates.split(",")[1]);
    wx.openLocation({
      latitude: e,
      longitude: n,
      name: t.data.name,
      address: t.data.address
    });
  },
  previewImage: function (a) {
    var t = this.data.url, e = [], n = a.currentTarget.dataset.index, o = this.data.room.img;
    for (var i in o) e.push(t + o[i]);
    wx.previewImage({
      current: t + o[n],
      urls: e
    });
  },
  setclip: function (a) {
    wx.setClipboardData({
      data: "1.0版本",
      success: function (a) {
        wx.getClipboardData({
          success: function (a) { }
        });
      }
    });
  },
  formSubmit: function (t) {
    var a = t.detail.formId, e = this.data.grade, i = this.data.userInfo;
    if (1 == e && "" == i.zs_name) wx.showModal({
      content: "您需要注册会员",
      success: function (t) {
        t.confirm && wx.navigateTo({
          url: "../register/register"
        });
      }
    }); else {
      var r = wx.getStorageSync("day1"), d = wx.getStorageSync("day2");
      console.info(t.detail.target.dataset)
      1 == app.time_title(r, d) && (1 == t.detail.target.dataset.classify ? wx.navigateTo({
        url: "../photography_list/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a
      }) : wx.navigateTo({
        url: "hour_room?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a + "&cost=" + t.detail.target.dataset.cost + "&rz_time=" + t.detail.target.dataset.rz_time
      }));
    }
  },
  bindgetuserinfo: function (t) {
    "getUserInfo:fail auth deny" == t.detail.errMsg && wx.showModal({
      title: "",
      content: "您拒绝了个人信息授权，无法正常使用小程序"
    });
  },
  onReady: function () { },
  onShow: function () {
    var a = this;
    app.getUserInfo(function (t) {
      a.setData({
        userInfo: t
      });
    });
   },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      imageUrl: 'https://api4.minidope.com/attachment/images/2/2018/share/share.jpg',
    }
  }
});