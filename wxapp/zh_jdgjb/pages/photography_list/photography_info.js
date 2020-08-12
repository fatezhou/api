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

    coordinatesList:[{
      name: 'Oneday Jolly',
      coordinates: '24.438510,118.087326',
      address: '厦门市思明区大学路沙坡尾20-2',
      id: [146, 147, 153]
    }, {
      name: 'Oneday大理',
      coordinates: '25.605676,100.251998',
      address: '大理白族自治州下关机场路滨海大道洱海天域别墅区C75',
      id: [143, 144]
    }, {
      name: 'Oneday岛屿',
      coordinates: '24.424934,118.131153',
      address: '厦门市思明区天泉东里23号',
      id: [121, 122]
    }, {
      name: 'Oneday海眠',
      coordinates: '24.425970,118.129240',
      address: '厦门市思明区天泉西里21号',
      id: [123]
    }, {
      name: 'Oneday薄荷',
      coordinates: '24.437365,118.124252',
      address: '厦门市思明区龙虎',
      id: [124, 125]
    }, {
      name: 'Oneday北岛',
      coordinates: '38.881490,121.561338',
      address: '大连市沙河口区富华街30号oneday北岛',
      id: [126, 127]
    }, {
      name: 'Oneday up on air',
      coordinates: '22.990424,113.297671',
      address: '广州市番禺区谢村站地铁口旁',
      id: [137]
    }],
  },
  onLoad: function (a) {
    console.info(a)
    var t = this;
    // 魔改start
    a.coordinates = function(){
      let y = t.data.coordinatesList.filter(function (cres) {
        for (let i in cres.id) {
          if (cres.id[i] == a.room_id) {
            return true
          }
        }
        return false
      })
      return y.length > 0 ? y[0].coordinates : a.coordinates
    }()
    // 魔改end
    app.getUrl(t), app.getSystem(t);
    a.hotel_id;
    var e = a.room_id, n = (new Date().toLocaleDateString().replace(/\//g, "-"), a.coordinates), o = a.tel, i = a.address, r = a.name, s = a.price, yjcost = a.yjcost, latitude = Number(n.split(",")[0]), longitude = Number(n.split(",")[1]);
    t.data.markers[0].latitude = latitude
    t.data.markers[0].longitude = longitude
    t.data.markers[0].name = r
    t.data.singleroom[0] = app.globalData.room
    console.info(e)
    if (e == 143 || e == 144 || e == 72 || e == 112 || e == 113 || e == 114 || e == 115 || e == 116 || e == 117 || e == 118 || e == 131 || e == 132 || e == 133 || e == 134 || e == 146 || e == 147 || e == 149 || e == 150 || e == 151 || e == 152 || e == 153 || e == 154 || e == 191 || e == 192 || e == 207 || e == 208 || e == 215 || e == 240){
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
      imageUrl: 'https://oneday.youyueworld.com/attachment/images/2/2018/share/share.jpg',
    }
  }
});