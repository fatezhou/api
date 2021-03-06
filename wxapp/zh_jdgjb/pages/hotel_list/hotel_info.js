// 点击酒店进来的  房型列表 详情 评价
var app = getApp() , utils = require("../../utils/utils.js");

Page({
    data: {
        activeIndex: 0
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.date(), a.setData({
            grade: wx.getStorageSync("platform").open_member
        });
        a.data.text;
        var e = decodeURIComponent(t.scene);
        if (null == t.hotel_id) var i = e; else i = t.hotel_id;
        a.setData({
            hotel_id: i,
            start: app.util.time(),
            end: app.util.addDate(app.util.time(), 28)
        }), a.refresh();
    },
    date: function(t) {
        var a = wx.getStorageSync("day1"), e = wx.getStorageSync("day2"), i = wx.getStorageSync("day"), r = app.util.time();
        if (wx.setStorageSync("datein", d), "" == a) {
            var d = app.util.time();
            wx.setStorageSync("datein", d);
        } else if (a < r) d = r; else d = a;
        if ("" == e) var o = app.util.addDate(r, 1); else {
            var n = app.util.addDate(r, 1);
            if (e < n) o = n; else o = e;
        }
        i = app.util.day(o, d);
        wx.setStorageSync("day1", d), wx.setStorageSync("day2", o), wx.setStorageSync("day", i), 
        this.setData({
            datein: d,
            dateout: o,
            time: i,
            current_date: d
        });
    },
    refresh: function(t) {
        var r = this;
        r.setData({
            luntext: [ "房型列表", r.data.platform.jd_custom + "详情", r.data.platform.jd_custom + "评价" ]
        });
        var a = r.data.hotel_id, d = r.data.day1;
        app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                9 <= t.data.address.length && (t.data.address = t.data.address.slice(0, 9) + "..."), 
                r.setData({
                    hotel: t.data
                });
                console.info(t.data)
            }
        });
        d = wx.getStorageSync("day1");
        var o = app.util.addDate(d, 1);
        app.util.request({
            url: "entry/wxapp/RoomList",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                var e = t.data, a = function(a) {
                    app.util.request({
                        url: "entry/wxapp/GetRoomCost",
                        data: {
                            room_id: e[a].id,
                            start: d,
                            end: o
                        },
                        success: function(t) {
                            e[a].cost = t.data[0].mprice, r.setData({
                                room: e
                            });
                        }
                    }), app.util.request({
                        url: "entry/wxapp/GetRoomNum",
                        data: {
                            room_id: e[a].id,
                            start: d,
                            // end: o
                          end: wx.getStorageSync("day2")
                        },
                        success: function(t) {
                          // console.info(t)
                          // console.info(e[a])
                          e[a].have_room_list = []
                          e[a].not_room_list = []
                          r.setData(r.data)
                          e[a].room_num = t.data[0].nums
                          console.info(t.data)
                          for (var q in t.data){
                            if (e[a].room_num >= 1){
                              // 这边判断吧 e[a].room_num == 1 改为 e[a].room_num >= 1
                              break
                            }else{
                              e[a].room_num = t.data[q].nums
                            }
                          }
                          t.data.map(function(k){
                            if(k.nums >= 1){
                              // 这边判断吧 k.nums == 1 改为 k.nums >= 1
                              e[a].have_room_list.push(k.dateday)
                              r.setData(r.data)
                            }else{
                              e[a].not_room_list.push(k.dateday)
                              r.setData(r.data)
                            }
                          })
                            // e[a].room_num = t.data[0].nums,
                             r.setData({
                                room: e
                            });
                        }
                      });
                };
                for (var i in e) a(i);
            }
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                for (var a in t.data) "" != t.data[a].img && (t.data[a].img = t.data[a].img.split(",")), 
                t.data[a].time = app.ormatDate(t.data[a].time).slice(0, 10), t.data[a].content = t.data[a].content.replace("↵", "\n");
                r.setData({
                    assess_list: t.data.slice(0, 5)
                });
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    bindDateChange1: function(t) {
        var a = this, e = t.detail.value, i = (a.data.dateout, a.data.current_date, app.util.addDate(e, 1));
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", i), wx.setStorageSync("day", r);
        var r = app.getTime2Time(i, e);
        a.setData({
            datein: t.detail.value,
            dateout: i,
            time: r
        }), this.refresh();
    },
    bindDateChange2: function(t) {
        var a = this.data.datein, e = t.detail.value;
      if (e <= a) {
        console.info(3)
        // 入住时间一定小于退房时间
        a = e
        a = (Date.parse(a)) - 86400000
        a = utils.formatTime(new Date(a))
        a = a.substring(0, 10)
        console.info(a)
       // var n = (this.data.current_date, app.getTime2Time(e, a));
        this.setData({
          datein: a
        });
      }
      var i = app.getTime2Time(e, a);
        wx.setStorageSync("day1", a), wx.setStorageSync("day2", e), wx.setStorageSync("day", i), 
        this.setData({
            dateout: t.detail.value,
            time: i
        });
      this.refresh();
    },
    room_info: function(t) {
        this.data.hotel.id;
        var a = this.data.hotel, e = a.tel, i = a.coordinates, r = a.address, d = a.name;

        for (var j in this.data.room){
          if (t.currentTarget.dataset.id == this.data.room[j].id){
            app.globalData.room = this.data.room[j]
          }
        }
        // 修改 t.currentTarget.dataset.price -> t.currentTarget.dataset.cost
        wx.navigateTo({
          url: "room_info?coordinates=" + i + "&room_id=" + t.currentTarget.dataset.id + "&tel=" + e + "&address=" + r + "&name=" + d + "&price=" + t.currentTarget.dataset.cost + "&hotel_id=" + this.data.hotel_id
        });
    },
    order: function(t) {},
    all_comment: function(t) {
        wx.navigateTo({
            url: "all_comment?seller_id=" + this.data.hotel_id
        });
    },
    sele_address: function(t) {
        var i = this.data.hotel, r = i.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var a = Number(r[0]), e = Number(r[1]);
                wx.openLocation({
                    latitude: a,
                    longitude: e,
                    name: i.name,
                    address: i.address
                });
            }
        });
    },
    call_phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.hotel.tel
        });
    },
    previewImage: function(t) {
        var a = this.data.url, e = [], i = t.currentTarget.id, r = t.currentTarget.dataset.index, d = this.data.assess_list;
        for (var o in d) if (i == d[o].id) var n = d[o].img;
        for (var s in n) e.push(a + n[s]);
        wx.previewImage({
            current: a + n[r],
            urls: e
        });
    },
    formSubmit: function(t) {
        var a = t.detail.formId, e = this.data.grade, i = this.data.userInfo;
        if (1 == e && "" == i.zs_name) wx.showModal({
            content: "您需要注册会员",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "../register/register"
                });
            }
        }); else {
          for(var qq in this.data.room){
            if (this.data.room[qq].id == t.detail.target.dataset.id){
              if (this.data.room[qq].not_room_list.length > 0){
                console.info(this.data.room[qq].have_room_list)
                var tt = ''
                tt = this.data.room[qq].have_room_list.toString()
                // wx.showModal({
                //   title: '抱歉，现只有'+tt+'有房间未被预定',
                //   content: '如有需要，请改动日期后进行预定',
                // })
                wx.showModal({
                  title: '抱歉',
                  content: '现只有' + tt + '有房间未被预定，如有需要，请改动日期后进行预定',
                })
              }else{
                var r = wx.getStorageSync("day1"), d = wx.getStorageSync("day2");
                1 == app.time_title(r, d) && (1 == t.detail.target.dataset.classify ? wx.navigateTo({
                  url: "../place_order/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a
                }) : wx.navigateTo({
                  url: "hour_room?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a + "&cost=" + t.detail.target.dataset.cost + "&rz_time=" + t.detail.target.dataset.rz_time
                }));
              }
            }
          }
          // console.info(this.data.)
          // 这里跳转
            // var r = wx.getStorageSync("day1"), d = wx.getStorageSync("day2");
            // 1 == app.time_title(r, d) && (1 == t.detail.target.dataset.classify ? wx.navigateTo({
            //     url: "../place_order/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a
            // }) : wx.navigateTo({
            //     url: "hour_room?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a + "&cost=" + t.detail.target.dataset.cost + "&rz_time=" + t.detail.target.dataset.rz_time
            // }));
        }
    },
    hotel_in: function(t) {
        wx.navigateTo({
            url: "hotel_in?seller_id=" + t.currentTarget.dataset.id
        });
    },
    bindgetuserinfo: function(t) {
        "getUserInfo:fail auth deny" == t.detail.errMsg && wx.showModal({
            title: "",
            content: "您拒绝了个人信息授权，无法正常使用小程序"
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
  onShareAppMessage: function () {
    return {
      imageUrl: 'https://oneday.youyueworld.com/attachment/images/2/2018/share/share.jpg',
    }
  },
});