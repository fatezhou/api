var app = getApp(), util = require("../../utils/util.js"), utils = require("../../utils/utils.js"), _location = "";

Page({
  data: {
    bomb: !1,
    hot: false,
    hotList: [],
    showLoading: !0,
  },
  onLoad: function (n) {
    var i = this;
    app.getUrl(i), app.getSystem(i), app.getUserInfo(function (e) {
      i.setData({
        userInfo: e
      });
      var t = decodeURIComponent(n.scene);
      if (null != t) var a = t;
      if (null != n.upper_partner) a = n.upper_partner;
      app.util.request({
        url: "entry/wxapp/MySx",
        data: {
          user_id: e.id
        },
        success: function (t) {
          0 == t.data && "undefined" != a && app.util.request({
            url: "entry/wxapp/Binding",
            cachetime: "0",
            data: {
              fx_user: e.id,
              user_id: a
            },
            success: function (t) { }
          });
        }
      });
    }), i.setData({
      rande: app.globalData.rande,
      start: app.util.time(),
      end: app.util.addDate(app.util.time(), 28)
    }), i.refresh();
  },
  date: function (t) {
    var e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), n = wx.getStorageSync("day"), i = app.util.time();
    if ("" == e) {
      var o = app.util.time();
      wx.setStorageSync("datein", o);
    } else if (e < i) o = i; else o = e;
    if ("" == a) var s = app.util.addDate(i, 1); else {
      var r = app.util.addDate(i, 1);
      if (a < r) s = r; else s = a;
    }
    n = app.util.day(s, o);
    wx.setStorageSync("day1", o), wx.setStorageSync("day2", s), wx.setStorageSync("day", n),
      this.setData({
        datein: o,
        dateout: s,
        time: n,
        current_date: o
      });
  },
  refresh: function (t) {
    var a = this;
    app.util.request({
      url: "entry/wxapp/GetNav",
      cachetime: "0",
      success: function (t) {
        // 民宿 摄影 咖啡 早餐按钮
        if (5 <= t.data.length) var e = t.data.splice(t.data.length - 5, 5); else e = t.data;
        a.setData({
          nav: e
        });
      }
    }), app.util.request({
      url: "entry/wxapp/GetSystem",
      cachetime: "0",
      success: function (t) {
        // 平台信息
        wx.setStorageSync("platform", t.data), wx.setNavigationBarTitle({
          title: t.data.pt_name
        });
      }
    }), app.util.request({
      url: "entry/wxapp/getad",
      cachetime: "0",
      data: {
        type: 4            // 开屏广告
      },
      success: function (t) {
        if (t.data.length > 0) {
          for (var i = 0; i < t.data.length - 1; i++) {
            for (var j = 0; j < t.data.length - 1 - i; j++) {
              if (Number(t.data[j].orderby) > Number(t.data[j + 1].orderby)) {
                var temp = t.data[j];
                t.data[j] = t.data[j + 1];
                t.data[j + 1] = temp;
              }
            }
          }
        }

        a.data.rande;
        0 < t.data.length && a.setData({
          getad: t.data,
          bomb: !0
        });
      }
    }), app.util.request({
      url: "entry/wxapp/getad",
      cachetime: "0",
      data: {
        type: 5         // 瀑布流
      },
      success: function (t) {
        if (t.data.length > 0) {
          for (var i = 0; i < t.data.length - 1; i++) {
            for (var j = 0; j < t.data.length - 1 - i; j++) {
              if (Number(t.data[j].orderby) > Number(t.data[j + 1].orderby)) {
                var temp = t.data[j];
                t.data[j] = t.data[j + 1];
                t.data[j + 1] = temp;
              }
            }
          }

          a.setData({
            hot: true,
            hotList: t.data
          })
        }
      }
    }), a.date();
  },
  guanbi: function (t) {
    this.setData({
      bomb: !1
    }), app.globalData.rande = 0;
  },
  search: function (t) {
    wx.navigateTo({
      url: "search",
      success: function (t) { },
      fail: function (t) { },
      complete: function (t) { }
    });
  },
  skip: function (t) {
    var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.appid, n = t.currentTarget.dataset.wb_src;
    if ("../register/register" == e && this.Membership(), "" != e && "../register/register" != e) {
      var i = e.replace(/[^0-9]/gi, "");
      e = e.replace(/(\d+|\s+)/g, "");
      console.info(e)
      console.info(i)
      if(i == 23){
        wx.navigateTo({
          url: '../photography_list/photography_list?hotel_id=' + String(i)
        });
        return
      }
      wx.navigateTo({
        url: String(e) + String(i)
      });
    } else "" != a ? wx.navigateToMiniProgram({
      appId: a,
      success: function (t) { }
    }) : "" != n && wx.navigateTo({
      url: "link?link=" + n
    });
  },
  copyright: function (t) {
    var e = this.data.platform.tz_appid;
    wx.navigateToMiniProgram({
      appId: e,
      success: function (t) { }
    });
  },
  bindDateChange1: function (t) {
    var e = t.detail.value, a = this.data.dateout, n = (this.data.current_date, app.getTime2Time(a, e));
    if (e >= a) {
      // 入住时间一定小于退房时间
      a = e
      a = (Date.parse(a)) + 86400000
      a = utils.formatTime(new Date(a))
      a = a.substring(0, 10)
      console.info(a)
      n = (this.data.current_date, app.getTime2Time(a, e));
      this.setData({
        dateout:a
      });
    }
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", n),
      this.setData({
        datein: t.detail.value,
        time: n
      });
  },
  bindDateChange2: function (t) {
    var e = this.data.datein, a = t.detail.value, n = app.getTime2Time(a, e);
    if (e >= a) {
      // 入住时间一定小于退房时间
      e = a
      e = (Date.parse(e)) - 86400000
      e = utils.formatTime(new Date(e))
      e = e.substring(0, 10)
      console.info(e)
      n = (this.data.current_date, app.getTime2Time(a, e));
      this.setData({
        datein: e
      });
    }
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", n),
      this.setData({
        dateout: t.detail.value,
        time: n
      });
  },
  wode: function (t) {
    wx.reLaunch({
      url: "../logs/logs"
    });
  },
  info: function (t) {
    wx.reLaunch({
      url: "../info/index"
    });
  },
  content: function (t) {
    var e = this.data.platform;
    1 == app.getUserinfo() && (2 == e.type ? wx.getLocation({
      type: "wgs84",
      success: function (t) {
        var e = t.latitude, a = t.longitude;
        _location = e + "," + a, wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude),
          wx.navigateTo({
            url: "../hotel_list/hotel_list?nearby=0"
          });
      },
      fail: function (t) {
        wx.hideLoading(), _location = 1, wx.showModal({
          title: "授权提示",
          content: "您取消了位置授权，小程序将无法正常使用，如需再次授权，请在我的-授权管理中进行授权，再次进入小程序即可",
          showCancel: !0,
          cancelText: "取消",
          cancelColor: "#333",
          confirmText: "确定",
          confirmColor: "#333",
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        });
      }
    }) : wx.navigateTo({
      url: "../hotel_list/hotel_info?hotel_id=" + e.seller_id + "&type=1"
    }));
  },
  location: function (t) {
    wx.showLoading({
      title: "搜索附近酒店"
    }), 1 == app.getUserinfo() && wx.getLocation({
      type: "wgs84",
      success: function (t) {
        var e = t.latitude, a = t.longitude;
        _location = e + "," + a, wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude),
          wx.navigateTo({
            url: "../hotel_list/hotel_list?nearby=1"
          });
      },
      fail: function (t) {
        wx.hideLoading(), _location = 1, wx.showModal({
          title: "授权提示",
          content: "您取消了本次授权，小程序将无法正常使用，请点击确定或者在我的-授权管理中进行授权，再次重新进入小程序即可",
          showCancel: !0,
          cancelText: "取消",
          cancelColor: "#333",
          confirmText: "确定",
          confirmColor: "#333",
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        });
      }
    });
  },
  getUserInfo: function (t) {
    app.globalData.userInfo = t.detail.userInfo, this.setData({
      userInfo: t.detail.userInfo,
      hasUserInfo: !0
    });
  },
  onShow: function () {
    var e = this;
    e.date(), app.getUserInfo(function (t) {
      e.setData({
        users: t
      });
    });
  },
  onPullDownRefresh: function () {
    this.refresh(), wx.stopPullDownRefresh();
  },
  Membership: function (t) {
    var e = this.data, a = e.users, n = e.platform.open_member;
    1 == n && null != n ? "" == a.zs_name || null == a.zs_name ? wx.navigateTo({
      url: "../register/register"
    }) : wx.navigateTo({
      url: "../logs/member"
    }) : wx.showModal({
      title: "温馨提示",
      content: "平台未开放注册会员,请联系平台管理员"
    });
  },
  onReachBottom: function () { },
  onUnload: function () { },
  onShareAppMessage: function () {
    return {
      imageUrl:'https://api4.minidope.com/attachment/images/2/2018/share/share.jpg',
    }
   }
});