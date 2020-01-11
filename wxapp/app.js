App({
    globalData: {
      defaultCity: null,
      defaultCounty: null,
      
        userInfo: null,
        rande: 1,
        room:null,

      token:'',
      random_url:"",
    },
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    onLaunch: function() {
      if (wx.canIUse("getUpdateManager")) {
        let updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate);
        })
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              } else if (res.cancel) {
                return false;
              }
            }
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          wx.hideLoading();
          wx.showModal({
            title: '升级失败',
            content: '新版本下载失败，请检查网络！',
            showCancel: false
          });
        });
      }
      let self = this
      // 1分钟检查一次 小程序存活就更新时间
      let Interval = setInterval(function(){
        let root = self.globalData.random_url || 'https://queue1.youyueworld.com/apis/'
        // let root = 'https://queue1.youyueworld.com/apis/'
        // let root = 'http://127.0.0.1:9001/apis/'
        let api = root + 'update_queue_time_by_token'
        wx.request({
          url: api,
          data: {
            token: self.globalData.token
          },
          method: "post",
          success: function (res) {
            if (res.data.data.code == 0) {
              wx.redirectTo({
                url: '../blank/blank',
              })
            }
          },
        })
      },60000)
    },
    getUrl: function(e) {
        var t = this.globalData.url;
        e.setData({
            url: t
        });
        var n = this;
        t || n.util.request({
            url: "entry/wxapp/attachurl",
            success: function(t) {
                n.globalData.url = t.data, n.getUrl(e);
            }
        });
    },
    getSystem: function(e) {
        var t = this.globalData.color, n = this.globalData.system;
        t && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        }), e.setData({
            color: t,
            platform: n
        });
        var a = this;
        t || a.util.request({
            url: "entry/wxapp/GetSystem",
            success: function(t) {
                -1 < t.data.jd_custom.indexOf("查询") && (t.data.jd_custom = t.data.jd_custom.replace("查询", "")), 
                a.globalData.color = t.data.color, a.globalData.system = t.data, a.getSystem(e);
            }
        });
    },
    getUserInfo: function(o) {
        var n = this;
        wx.login({
            success: function(t) {
                n.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        getApp().session_key = t.data.session_key, getApp().OpenId = t.data.openid, getApp().getSK = t.data.session_key;
                        var e = t.data.openid;
                        wx.getSetting({
                            success: function(t) {
                                1 != t.authSetting["scope.userInfo"] ? n.util.request({
                                    url: "entry/wxapp/login",
                                    cachetime: "0",
                                    data: {
                                        openid: e,
                                        img: "",
                                        name: ""
                                    },
                                    success: function(t) {
                                        getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                        o(t.data);
                                        var e = getCurrentPages(), n = e[e.length - 1], a = n.route;
                                        n.options;
                                        "zh_jdgjb/pages/index/index" != a && wx.navigateTo({
                                            url: "../login"
                                        });
                                    }
                                }) : wx.getUserInfo({
                                    withCredentials: !1,
                                    success: function(t) {
                                        n.util.request({
                                            url: "entry/wxapp/login",
                                            cachetime: "0",
                                            data: {
                                                openid: e,
                                                img: t.userInfo.avatarUrl,
                                              // name: encodeURIComponent(t.userInfo.nickName)
                                              name: t.userInfo.nickName
                                            },
                                            success: function(t) {
                                        
                                              // t.data.name = encodeURIComponent(t.data.name)
                                              // console.info(t)
                                                getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                                o(t.data);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUserinfo: function(t) {
        if ("" != wx.getStorageSync("userInfo").img) return !0;
        wx.showModal({
            title: "温馨提示",
            content: "您需要授权才能正常使用小程序",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "../login"
                }) : getApp().getUserinfo();
            }
        });
    },
    max: function(t) {
        t = t[0];
        for (var e = t.length, n = 1; n < e; n++) t[n] > t && (t = t[n]);
        return t;
    },
    today_time: function(t) {
        var e = new Date(), n = e.getMonth() + 1, a = e.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e.getFullYear() + "-" + n + "-" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    },
    hours_time: function(t, e) {
        var n = new Date(t.replace("-", "/")), a = 60 * (e = Number(e));
        return n.setMinutes(n.getMinutes() + a, n.getSeconds(), 0), n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    },
    today: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e + "-" + n + "-" + a;
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + n(e.getMonth() + 1, 2) + "-" + n(e.getDate(), 2) + " " + n(e.getHours(), 2) + ":" + n(e.getMinutes(), 2) + ":" + n(e.getSeconds(), 2);
        function n(t, e) {
            for (var n = "" + t, a = n.length, o = "", r = e; r-- > a; ) o += "0";
            return o + n;
        }
    },
    sort_price_Reverse: function(t, e) {
        return t.zd_money - e.zd_money;
    },
    sort_price_order: function(t, e) {
        return e.zd_money - t.zd_money;
    },
    sort_num_order: function(t, e) {
        return t - e;
    },
    sort_distance_order: function(t, e) {
        return t.distance - e.distance;
    },
    sort_distance_Reverse: function(t, e) {
        return e.distance - t.distance;
    },
    time_title: function(t, e) {
        return !(e <= t) || (wx.showModal({
            title: "",
            content: "时间选择错误"
        }), !1);
    },
    getTime2Time: function(t, e) {
        t = t, e = e;
        return ((t = Date.parse(t) / 1e3) - (e = Date.parse(e) / 1e3)) / 86400;
    },
    getSys: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.globalData.sysInfo = t, e.globalData.windowW = t.windowWidth, e.globalData.windowH = t.windowHeight;
            }
        });
    }
});