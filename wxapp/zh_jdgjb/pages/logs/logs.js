var util = require("../../utils/util.js"), app = getApp();

Page({
    data: {
        users: !0,
        level_name: "初始会员",
        score: 0,
        balance: 0,
        coupon_length: 0
    },
    onLoad: function(e) {
        app.getUrl(this), app.getSystem(this);
    },
    refresh: function(e) {
        var t = this, n = wx.getStorageSync("userInfo").id;
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
            var t = e.currentTarget.dataset.index, n = t;
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
    info: function (e) {
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
        var t = this.data, n = t.userInfo, i = t.platform.open_member;
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
    score_detail: function(e) {
        1 == this.data.users ? wx.navigateTo({
            url: "../jifen/scoredetails"
        }) : this.bind_user_info();
    },
    distribution: function(e) {
        var t = this;
        if (1 == t.data.users) {
            t.data.GetFxSet;
            var n = t.data.userInfo, i = wx.getStorageSync("userInfo").id, a = t.data.platform.open_member;
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