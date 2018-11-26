var util = require("../../utils/util.js"),
  app = getApp();

Page({
  data: {
    users: !0,
    level_name: "初始会员",
    score: 0,
    balance: 0,
    coupon_length: 0,

    title: '',
    content: '',
    showmodal: false,
    style:'',
  },
  onLoad: function(e) {
    app.getUrl(this), app.getSystem(this);
  },
  refresh: function(e) {
    var t = this,
      n = wx.getStorageSync("userInfo").id;
    app.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        user_id: n
      },
      success: function(e) {
        t.setData({
          coupon_length: e.data.length
        });
      }
    }), app.util.request({
      url: "entry/wxapp/CheckRz",
      data: {
        user_id: n
      },
      success: function(e) {
        t.setData({
          state: e.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/GetFxSet",
      success: function(e) {
        t.setData({
          GetFxSet: e.data
        });
      }
    });
  },
  mine_order: function(e) {
    if (1 == this.data.users) {
      var t = e.currentTarget.dataset.index,
        n = t;
      wx.navigateTo({
        url: "../order/order?activeIndex=" + n + "&index=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
      });
    } else this.bind_user_info();
  },
  home: function(e) {
    wx.reLaunch({
      url: "../index/index"
    });
  },
  info: function(e) {
    wx.reLaunch({
      url: "../info/index"
    });
  },
  seller_manage: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../login_entry/login_entry"
    }) : this.bind_user_info();
  },
  opensetting: function(e) {
    wx.openSetting({});
  },
  integral: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../jifen/jifen"
    }) : this.bind_user_info();
  },
  settled_store: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../settled_store/settled_store"
    }) : this.bind_user_info();
  },
  service: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../service/service"
    }) : this.bind_user_info();
  },
  coupon: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../coupon/store_coupon"
    }) : this.bind_user_info();
  },
  receive_coupon: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../coupon/receive_coupon"
    }) : this.bind_user_info();
  },
  user_zhuce: function(e) {
    var t = this.data,
      n = t.userInfo,
      i = t.platform.open_member;
    1 == i && null != i ? "" == n.zs_name || null == n.zs_name ? wx.navigateTo({
      url: "../register/register"
    }) : wx.navigateTo({
      url: "member"
    }) : wx.showModal({
      title: "温馨提示",
      content: "平台未开放注册会员,请联系平台管理员"
    });
  },
  cancel_storange: function(e) {
    wx.clearStorage(), wx.showToast({
      title: "清除成功"
    });
  },
  copyright: function(e) {
    var t = wx.getStorageSync("platform").tz_appid;
    wx.navigateToMiniProgram({
      appId: t,
      success: function(e) {}
    });
  },
  recharge: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../recharge/index"
    }) : this.bind_user_info();
  },
  showModal: function(e) {
    var title, content, style = ''
    if (e.currentTarget.dataset.id == "0") {
      title = "用户须知"
      content = "（！！！）按照相关部门规定，前台办理入住需出示所有人身份证！（小孩需出示户口本原件或者出生证明原件），所有新疆、香港、台湾、澳门及外籍人士无法入住。\r\n" +
        "未满18周岁，需要监护人陪同，否则无法入住，因证件问题无法入住者，不给予退款。请知悉：）\r\n" +
        "\r\n" +
        "一：如果您临时改变行程取消预订如下：\r\n" +
        "1，退房：\r\n" +
        "*入住前15天以上取消订单，退还100%房费。\r\n" +
        "*入住前15天内取消订单，不退还房费。可选择转让。\r\n" +
        "\r\n" +
        "2，转让：\r\n" +
        "*入住前随时可以转让，转让成功手续费10%，若没转出，无法退还房费，可以选择如期入住。\r\n" +
        "\r\n" +
        "*在有房的情况下，入住前15天以上可免费换房或换日期一次。\r\n" +
        "*在有房的情况下，入住前7-15天内，换房收取10%手续费。\r\n" +
        "*入住前7天内，不接受换房或换日期，可选择转让。\r\n" +
        "\r\n" +
        "二：入住协议：\r\n" +
        "1，入住的客人要求爱干净讲卫生，爱护物品，房子属于心爱之物，不接受携带宠物，望谅解：）\r\n" +
        "2，房屋内不允许抽烟，也不要办大型PARTY，不要影响到邻居被投诉。\r\n" +
        "3，房子禁止做违法犯罪的行为，要遵守中华人民共和国法律法规。\r\n" +
        "4，房间入住无法开具发票的噢，可开具收据，请知悉：）。\r\n" +
        "5，入住时间为预订日期当天14:00后，退房时间为第二天12：00前。登记入住押金300元，退房时没问题会退还噢：）\r\n" 
          // + "\r\n \r\n \r\n"
    } else {
      title = "WIFI密码"
      content = "关注“Oneday民宿”公众号回复“WIFI”，即可获取WIFI密码\r\n"
      style =  "height:30%;margin-top: 40%"
    }
    this.setData({
      showmodal: true,
      title: title,
      content: content,
      style: style
    })
    console.info(this.data.style)
  },

  cancelModal: function() {
    this.setData({
      showmodal: false,
    })
  },
  score_detail: function(e) {
    1 == this.data.users ? wx.navigateTo({
      url: "../jifen/scoredetails"
    }) : this.bind_user_info();
  },
  distribution: function(e) {
    var t = this;
    if (1 == t.data.users) {
      t.data.GetFxSet;
      var n = t.data.userInfo,
        i = wx.getStorageSync("userInfo").id,
        a = t.data.platform.open_member;
      "" == n.zs_name && 1 == a ? wx.showModal({
        content: "您需要注册会员",
        success: function(e) {
          e.confirm && wx.navigateTo({
            url: "../register/register"
          });
        }
      }) : app.util.request({
        url: "entry/wxapp/MyDistribution",
        data: {
          user_id: i
        },
        success: function(e) {
          0 == e.data ? wx.navigateTo({
            url: "../distribution/examine"
          }) : 1 == e.data.state ? wx.showModal({
            title: "温馨提示",
            content: "系统正在审核中，请稍后再试"
          }) : 2 == e.data.state ? wx.navigateTo({
            url: "../distribution/distribution"
          }) : 3 == e.data.state && wx.showModal({
            title: "温馨提示",
            content: "您的申请已被拒绝"
          });
        }
      });
    } else t.bind_user_info();
  },
  onReady: function() {},
  onShow: function() {
    var t = this;
    app.getUserInfo(function(e) {
      t.setData({
        userInfo: e,
        balance: e.balance,
        score: Number(e.score)
      }), t.refresh();
    });
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});