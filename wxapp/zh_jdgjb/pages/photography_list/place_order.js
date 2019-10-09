var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp();

Page({
  data: {
    time: "20:00",
    num: 1,
    see_price: !1,
    red_bag: 0,
    red_bag_id: 0,
    mode1: "success",
    mode2: "clear",
    mode3: "clear",
    pay_mode: !1,
    refrer_to: "确认支付",
    pay_num: 1,
    type: 1,

    // jolly店下午茶套装单位为 /份，其余为 /小时
    unit:'小时'
  },
  onLoad: function (t) {
    var a = this;
    app.getUrl(a), app.getSystem(a);
    var e = t.room_id, o = t.hotel_id, d = wx.getStorageSync("day1"), i = wx.getStorageSync("day2"), r = wx.getStorageSync("day");
    a.setData({
      room_id: e,
      hotel_id: o,
      day1: d,
      day2: i,
      day: r,
      coupon: 0,
      condition: 0,
      coupons_id: -1,
      form_d: t.form_d,
      grade: wx.getStorageSync("platform").open_member
    });
    var n = 0;
    app.util.request({
      url: "entry/wxapp/GetRoomCost",
      data: {
        room_id: e,
        start: d,
        end: i
      },
      success: function (res) {
        // console.info(t)
        console.info(t.room_id)
        if(t.room_id == 155 || t.room_id == 156){
          a.setData({
            unit:'份'
          })
        }
        // 这部分是价格倍数增长 只能选择1~3个小时 价格如 400 800 1200
        if (t.room_id == 143 || t.room_id == 144 || t.room_id == 72 || t.room_id == 112 || t.room_id == 113 || t.room_id == 114 || t.room_id == 115 || t.room_id == 116 || t.room_id == 117 || t.room_id == 118 || t.room_id == 131 || t.room_id == 132 || t.room_id == 133 || t.room_id == 134 || t.room_id == 146 || t.room_id == 147 || t.room_id == 149 || t.room_id == 150 || t.room_id == 151 || t.room_id == 152 || t.room_id == 153 || t.room_id == 154){
          for (var k in res.data) res.data[k].mprice = (Number(res.data[k].mprice)).toFixed(2)
        }else{
          for (var k in res.data) res.data[k].mprice = (Number(res.data[k].mprice) + 100).toFixed(2)
        }
      
        for (var e in res.data) n += Number(res.data[e].mprice);
        a.setData({
          z_price: n,
          price_infos: res.data
        }), a.refresh(), a.room_num();
      }
    });
  },
  userinfo: function (t) {
    var e = this;
    app.getUserInfo(function (t) {
      e.setData({
        userInfo: t
      });
    });
  },
  refresh: function (t) {
    var a = this, e = a.data.room_id, o = a.data.hotel_id;
    2 == a.data.grade ? (a.setData({
      discount: 1
    }), a.data.z_price) : app.getUserInfo(function (t) {
      t.id;
      var e = t.discount;
      null == e && (e = 10), a.setData({
        discount: e / 10
      }), null != a.data.z_price && a.cost();
    });
    var d = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        user_id: d
      },
      success: function (t) {
        a.setData({
          coupons: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/RoomDetails",
      cachetime: "0",
      data: {
        room_id: e
      },
      success: function (t) {
        console.info(t.data)
        t.data.price, t.data.yj_cost;
        a.setData({
          room: t.data,
          yj_cost: Number(t.data.yj_cost)
        }), a.cost();
      }
    }), app.util.request({
      url: "entry/wxapp/PjDetails",
      cachetime: "0",
      data: {
        seller_id: o
      },
      success: function (t) {
        a.setData({
          hotel: t.data
        }), 1 != t.data.wx_open && 1 != t.data.ye_open && a.mode2();
      }
    }), app.util.request({
      url: "entry/wxapp/MyHb",
      cachetime: "0",
      data: {
        user_id: d,
        page: 1
      },
      success: function (t) {
        a.setData({
          my_hb: t.data
        });
      }
    });
  },
  room_num: function (t) {
    var d = this, e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), o = d.data.room_id;
    app.util.request({
      url: "entry/wxapp/GetRoomNum",
      data: {
        room_id: o,
        start: e,
        end: a
      },
      success: function (t) {
        var e = [], a = [];
        for (var o in t.data.map(function (t) {
          var e;
          e = Number(t.nums), a.push(e);
        }), t.data) t.data[o].nums <= 0 && e.push(t.data[o]);
        a = a.sort(app.sort_num_order), d.setData({
          rooms: a[0]
        }), 0 < e.length && wx.showModal({
          title: "",
          content: e[0].dateday + "没有房间了",
          success: function (t) {
            t.confirm ? wx.navigateBack({
              delta: 1
            }) : t.cancel && wx.navigateBack({
              delta: 1
            });
          }
        });
      }
    });
  },
  use_res_bag: function (t) {
    wx.navigateTo({
      url: "../coupon/red_bag"
    });
  },
  bindTimeChange: function (t) {
    this.setData({
      time: t.detail.value
    });
  },
  add_num: function (t) {
    var e = this;
    if (e.data.rooms == e.data.num) wx.showModal({
      title: "",
      content: "没有这么多拍摄时间啦"
    }); else if (e.data.room.id == 119 || e.data.room.id == 120 || e.data.room.id == 124 || e.data.room.id == 125 || e.data.room.id == 129 || e.data.room.id == 130 || e.data.room.id == 146 || e.data.room.id == 147 || e.data.room.id == 149 || e.data.room.id == 150 || e.data.room.id == 151 || e.data.room.id == 152 || e.data.room.id == 153 || e.data.room.id == 154){
      var a = e.data.num + 1;
      e.setData({
        num: a
      });
      // for (var k in e.data.price_infos) console.info(e.data.price_infos[k].mprice)
      // debugger
      for (var k in e.data.price_infos) e.data.price_infos[k].mprice = ((Number(e.data.price_infos[k].mprice) / (a - 1)) * a).toFixed(2); e.setData({
        price_infos: e.data.price_infos
      }), e.cost();
    } else if (e.data.num<3){
      // 增加了if(e.data.num < 3)
      // console.info(e.data.room.id)
      // if (e.data.room.id == 119 || e.data.room.id == 120 || e.data.room.id == 124 || e.data.room.id == 125 || e.data.room.id == 129 || e.data.room.id == 130) {
      // console.info("这家店只能1个小时")
      // return
      // } else 
      if(e.data.room.id == 155 || e.data.room.id == 156){
        console.info("这家店只能1个小时")
        return
      }
      else if (e.data.room.id == 121 || e.data.room.id == 122 || e.data.room.id == 123 || e.data.room.id == 126 || e.data.room.id == 127) {
        console.info("这家店只能1个小时和3个小时")
        var a = e.data.num + 2;
        e.setData({
          num: a
        });
        if (e.data.room.id == 123) {
          for (var k in e.data.price_infos) e.data.price_infos[k].mprice = (((Number(e.data.price_infos[k].mprice) - 100) * a + 100) + 50).toFixed(2); e.setData({
            price_infos: e.data.price_infos
          }), e.cost();
          return
        }
        for (var k in e.data.price_infos) e.data.price_infos[k].mprice = (((Number(e.data.price_infos[k].mprice) - 100) * a + 100)+100).toFixed(2); e.setData({
          price_infos: e.data.price_infos
        }), e.cost();
      return
    }


      var a = e.data.num + 1;
      e.setData({
        num: a
      });
      if (e.data.room.id == 143 || e.data.room.id == 144 || e.data.room.id == 72 || e.data.room.id == 112 || e.data.room.id == 113 || e.data.room.id == 114 || e.data.room.id == 115 || e.data.room.id == 116 || e.data.room.id == 117 || e.data.room.id == 118 || e.data.room.id == 131 || e.data.room.id == 132 || e.data.room.id == 133 || e.data.room.id == 134){
        for (var k in e.data.price_infos) e.data.price_infos[k].mprice = ((Number(e.data.price_infos[k].mprice)/(a-1)) * a).toFixed(2); e.setData({
          price_infos: e.data.price_infos
        }), e.cost();
      }else{
        for (var k in e.data.price_infos) e.data.price_infos[k].mprice = (((Number(e.data.price_infos[k].mprice) - 100) / (a - 1)) * a + 100).toFixed(2); e.setData({
          price_infos: e.data.price_infos
        }), e.cost();
      }
    }
  },
  reduce_num: function (t) {
    if (this.data.num == 1){
      console.info('小时数已经是：' + this.data.num + '，不可再减少')
      return
    }
    if (this.data.room.id == 119 || this.data.room.id == 120 || this.data.room.id == 124 || this.data.room.id == 125 || this.data.room.id == 129 || this.data.room.id == 130 || this.data.room.id == 146 || this.data.room.id == 147 || this.data.room.id == 149 || this.data.room.id == 150 || this.data.room.id == 151 || this.data.room.id == 152 || this.data.room.id == 153 || this.data.room.id == 154){
      //没有优惠 即价格增加值为初始值
      var e = this.data.num - 1;
      for (var k in this.data.price_infos) this.data.price_infos[k].mprice = (Number(this.data.price_infos[k].mprice) - (Number(this.data.price_infos[k].mprice) / (e + 1))).toFixed(2); this.setData({
        price_infos: this.data.price_infos
      })

      1 <= e && (this.setData({
        num: e
      }), this.cost());

    return
    }else if (this.data.room.id == 121 || this.data.room.id == 122 || this.data.room.id == 123 || this.data.room.id == 126 || this.data.room.id == 127) {
      console.info("这家店只能1个小时和3个小时")
      var e = this.data.num - 2;;
    
      if (this.data.room.id == 123) {
        for (var k in this.data.price_infos) this.data.price_infos[k].mprice = ((Number(this.data.price_infos[k].mprice) - 150) / 3 + 100).toFixed(2); this.setData({
          price_infos: this.data.price_infos
        })

        1 <= e && (this.setData({
          num: e
        }), this.cost());
        return
      }
      for (var k in this.data.price_infos) this.data.price_infos[k].mprice = ((Number(this.data.price_infos[k].mprice) - 200) / 3 + 100 ).toFixed(2); this.setData({
        price_infos: this.data.price_infos
      })

      1 <= e && (this.setData({
        num: e
      }), this.cost());
      return
    }
  
    var e = this.data.num - 1;
    if (this.data.room.id == 143 || this.data.room.id == 144 || this.data.room.id == 72 || this.data.room.id == 112 || this.data.room.id == 113 || this.data.room.id == 114 || this.data.room.id == 115 || this.data.room.id == 116 || this.data.room.id == 117 || this.data.room.id == 118 || this.data.room.id == 131 || this.data.room.id == 132 || this.data.room.id == 133 || this.data.room.id == 134) {
      for (var k in this.data.price_infos) this.data.price_infos[k].mprice = (Number(this.data.price_infos[k].mprice) - (Number(this.data.price_infos[k].mprice) / (e + 1))).toFixed(2); this.setData({
        price_infos: this.data.price_infos
      })
    } else {
      for (var k in this.data.price_infos) this.data.price_infos[k].mprice = (Number(this.data.price_infos[k].mprice) - ((Number(this.data.price_infos[k].mprice) - 100) / (e + 1))).toFixed(2); this.setData({
        price_infos: this.data.price_infos
      })
    }
    

    1 <= e && (this.setData({
      num: e
    }), this.cost());
  },
  see_price: function (t) {
    var e = this.data.see_price;
    1 == e ? this.setData({
      see_price: !1
    }) : this.setData({
      see_price: !0
    });
  },
  mode1: function (t) {
    this.setData({
      mode1: "success",
      mode2: "clear",
      mode3: "clear",
      refrer_to: "确认支付",
      type: 1
    }), this.refresh();
  },
  mode2: function (t) {
    this.setData({
      mode1: "clear",
      mode2: "success",
      mode3: "clear",
      refrer_to: "确认支付",
      yj_cost: 0,
      type: 3
    }), this.cost();
  },
  mode3: function (t) {
    var e = this, a = e.data.hotel, o = e.data.userInfo;
    2 == a.ye_open ? e.setData({
      refrer_to: "该酒店不支持余额支付"
    }) : Number(o.balance) < e.data.settlement ? wx.showModal({
      title: "",
      content: "余额不足,请先去充值"
    }) : (e.setData({
      refrer_to: "确认支付",
      type: 2
    }), e.setData({
      mode1: "clear",
      mode2: "clear",
      yj_cost: 0,
      mode3: "success"
    }), e.cost());
  },
  cost: function (t) {
    // 更改了d = o * a
    // 更改了 p = c - r + d - n
    if (this.data.room.id == 121 || this.data.room.id == 122 || this.data.room.id == 123 || this.data.room.id == 126 || this.data.room.id == 127) {
      // 只能订 一个小时 和 三个小时 的
      console.info(this.data.room.id)
      var e = this, a = e.data.num, o = Number(e.data.yj_cost), d = o, i = e.data.z_price, r = e.data.coupon, n = Number(e.data.red_bag), s = Number(i) * a, c = s * e.data.discount, u = s - c, p = c - r - n + d - (100 * Number(a - 1) * e.data.price_infos.length), m = s - r - n;

      if(a == 3){
        if (this.data.room.id == 123){
          // 三小时的价格 和别的 不一样
          p = p + (50 * e.data.price_infos.length)
        }else{
          p = p + (100 * e.data.price_infos.length)
        }
      }
      // console.info(c)
      // console.info(r)
      // console.info(n)
      // console.info(a)

      // console.info(d)
      // console.info(p)
    } else if (this.data.room.id == 119 || this.data.room.id == 120 || this.data.room.id == 124 || this.data.room.id == 125 || this.data.room.id == 129 || this.data.room.id == 130 || this.data.room.id == 146 || this.data.room.id == 147 || this.data.room.id == 149 || this.data.room.id == 150 || this.data.room.id == 151 || this.data.room.id == 152 || this.data.room.id == 153 || this.data.room.id == 154){
      var e = this, a = e.data.num, o = Number(e.data.yj_cost), d = o, i = e.data.z_price, r = e.data.coupon, n = Number(e.data.red_bag), s = Number(i) * a, c = s * e.data.discount, u = s - c, p = c - r + d - n, m = s - r - n;
     
    } else{
      if (this.data.room.id == 143 || this.data.room.id == 144 || this.data.room.id == 72 || this.data.room.id == 112 || this.data.room.id == 113 || this.data.room.id == 114 || this.data.room.id == 115 || this.data.room.id == 116 || this.data.room.id == 117 || this.data.room.id == 118 || this.data.room.id == 131 || this.data.room.id == 132 || this.data.room.id == 133 || this.data.room.id == 134){
        var e = this, a = e.data.num, o = Number(e.data.yj_cost), d = o, i = e.data.z_price, r = e.data.coupon, n = Number(e.data.red_bag), s = Number(i) * a, c = s * e.data.discount, u = s - c, p = c - r - n + d, m = s - r - n;
        console.info(a)
        console.info(o)
        console.info(i)
        console.info(r)
        console.info(n)
        console.info(s)
        console.info(c)
        console.info(u)
        console.info(p)
      }else{
        var e = this, a = e.data.num, o = Number(e.data.yj_cost), d = o, i = e.data.z_price, r = e.data.coupon, n = Number(e.data.red_bag), s = Number(i) * a, c = s * e.data.discount, u = s - c, p = c - r - n + d - (100 * Number(a - 1) * e.data.price_infos.length), m = s - r - n;
      }
    }

    (m = m.toFixed(2)) <= 0 && (m = 0), c = c.toFixed(2), u = u.toFixed(2);
    var l = s;
    (p = p.toFixed(2)) <= 0 && (p = 0 != o ? d : .01), s = (s += d).toFixed(2), l = l.toFixed(2),
      e.setData({
        price: s,
        total_price: l,
        settlement: p,
        discount_price: c,
        reduction_price: u,
        dis_cost: m,
        yj_price: d
      });
  },
  use_coupon: function (t) {
    var e = this.data.discount_price, a = this.data.hotel_id;
    wx.navigateTo({
      url: "../coupon/store_coupon?money=" + e + "&hotel_id=" + a
    });
  },
  pay_mode: function (t) {
    var e = this.data.pay_mode;
    1 == e ? this.setData({
      pay_mode: !1
    }) : this.setData({
      pay_mode: !0
    });
  },
  formSubmit1: function (t) {
    var e = t.detail.formId;
    this.setData({
      form_id: e
    });
  },
  formSubmit: function (t) {
    var e = this, a = e.data.form_d, o = e.data.form_id;
    var d = e.data.userInfo, i = t.detail.formId, r = e.data.hotel, n = e.data.room, s = t.detail.value.code, c = e.data.total_price, u = e.data.settlement, p = e.data.condition, m = (e.data.price,
      t.detail.value.people), l = t.detail.value.tel, _ = e.data.time, f = r.id, y = n.id, h = wx.getStorageSync("userInfo").id, g = e.data.coupons_id, x = r.name, w = r.address, v = r.coordinates, S = e.data.day1, b = e.data.day2, D = e.data.num, I = n.name, T = n.size, q = e.data.day, M = e.data.discount_price, j = e.data.yj_cost, z = e.data.coupon, N = n.logo, L = e.data.reduction_price, P = e.data.red_bag, k = e.data.red_bag_id, F = e.data.type, R = e.data.platform, O = "";
    console.info(c)
    console.info(M)

    //增加
    c = (Number(u) - Number(j)).toFixed(2)
    M = (Number(u) - Number(j)).toFixed(2)
 
    if ("" == m) O = "请填写入住人姓名"; else if ("" == l) O = "请填写联系电话"; else if (11 != l.length) O = "联系电话填写有误"; else if ("" == s && 1 == R.is_sfz) O = "请填写您的身份证号"; else if (18 != s.length) O = "身份证号填写有误"; else if (2 == R.is_sfz) s = ""; else 0 == /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(l) ? O = "请输入正确的手机号" : 0 < z ? p > e.data.discount_price && (O = "不满足优惠券满减条件") : u <= 0 && (u = .01);
    var U = e.data.pay_num;
    "" != O ? (wx.showModal({
      title: "温馨提示",
      content: O
    }), e.setData({
      pay_num: 1
    })) : "" == O && 1 == U && (e.setData({
      pay_num: 0
    }), "" == d.zs_name && 1 == e.data.garde ? wx.showModal({
      content: "您需要注册会员",
      success: function (t) {
        t.confirm && wx.navigateTo({
          url: "../register/register"
        });
      }
    }) : (wx.showLoading({
      title: "正在提交订单",
      mask: !0
    }), app.util.request({
      url: "entry/wxapp/AddOrder",
      data: {
        name: m,
        tel: l,
        price: c,
        dd_time: _,
        seller_id: f,
        room_id: y,
        user_id: h,
        coupons_id: g,
        seller_name: x,
        seller_address: w,
        coordinates: v,
        arrival_time: S,
        departure_time: b,
        num: D,
        room_type: I,
        bed_type: T,
        days: q,
        dis_cost: M,
        yj_cost: j,
        yhq_cost: z,
        total_cost: u,
        room_logo: N,
        yyzk_cost: L,
        hb_id: k,
        hb_cost: P,
        from_id: o,
        classify: 1,
        type: F,
        qr_fromid: a,
        code: s
      },
      method: "POST",
      success: function (t) {
        var e = t.data, a = t.data;
        if (1 == F) {
          e = void 0 === e ? "undefined" : _typeof(e);
          var o = app.OpenId;
          "string" != e ? app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
              openid: o,
              money: u,
              order_id: a
            },
            success: function (t) {
              wx.requestPayment({
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: t.data.package,
                signType: t.data.signType,
                paySign: t.data.paySign,
                success: function (t) {
                  wx.hideLoading(), wx.redirectTo({
                    url: "../order/order?activeIndex=0&index=0"
                  });
                  var e = wx.getStorageSync("userInfo").openid;
                  app.util.request({
                    url: "entry/wxapp/Message",
                    cachetime: "0",
                    data: {
                      form_id: i,
                      openid: e,
                      order_id: a
                    },
                    success: function (t) {
                      wx.hideLoading();
                    }
                  });
                },
                fail: function (t) {
                  wx.hideLoading(), wx.showToast({
                    title: "支付失败"
                  }), wx.redirectTo({
                    url: "../order/order?activeIndex=1&index=1"
                  });
                }
              });
            }
          }) : wx.showModal({
            content: t.data
          });
        } else if (2 == F) {
          e = void 0 === e ? "undefined" : _typeof(e);
          o = app.OpenId;
          "string" != e ? app.util.request({
            url: "entry/wxapp/YePay",
            cachetime: "0",
            data: {
              order_id: a
            },
            success: function (t) {
              wx.hideLoading(), wx.showToast({
                title: "支付成功"
              }), setTimeout(function () {
                wx.redirectTo({
                  url: "../order/order?activeIndex=0&index=0"
                });
              }, 1e3);
              var e = wx.getStorageSync("userInfo").openid;
              app.util.request({
                url: "entry/wxapp/Message",
                cachetime: "0",
                data: {
                  form_id: i,
                  openid: e,
                  order_id: a
                },
                success: function (t) { }
              });
            }
          }) : wx.showModal({
            content: t.data
          });
        } else 3 == F && (wx.hideLoading(), wx.showToast({
          title: "订单提交成功"
        }), setTimeout(function () {
          wx.redirectTo({
            url: "../order/order?activeIndex=0&index=0"
          });
        }, 1500));
      }
    })));
  },
  onReady: function () { },
  onShow: function () {
    this.userinfo(), -1 != this.data.coupons_id ? this.cost() : "" == this.data.coupons_id && this.cost(),
      0 != this.data.red_bag && this.cost();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});