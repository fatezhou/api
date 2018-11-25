var app = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录",
        werchat: !1,
        password: "888888888",
        name: "test8888"
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.setData({
            pt_img: wx.getStorageSync("platform").link_logo,
            color: wx.getStorageSync("platform").color,
            pt_name: wx.getStorageSync("platform").pt_name,
            tel: wx.getStorageSync("platform").tel
        });
    },
    name: function(t) {
        this.setData({
            name: t.detail.value
        });
    },
    password: function(t) {
        this.setData({
            password: t.detail.value
        });
    },
    sign: function(t) {
        app.util.request({
            url: "entry/wxapp/HtLogin",
            cachetime: "0",
            data: {
                username: this.data.name,
                password: this.data.password
            },
            success: function(t) {
                var a = {
                    name: this.data.username,
                    password: this.data.password
                };
                "账号或密码错误" == t.data ? wx.showModal({
                    title: "提示",
                    content: "账号或密码错误"
                }) : (wx.setStorageSync("store_info", t.data), wx.setStorageSync("sign", a), wx.redirectTo({
                    url: "../logs/Workbench"
                }));
            }
        });
    },
    wechat_login: function(t) {
        var a = this, e = wx.getStorageSync("userInfo").id;
        wx.showModal({
            title: "温馨提示",
            content: "确定使用此微信绑定的操作员身份登录吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/StoreWxLogin",
                    cachetime: "0",
                    data: {
                        user_id: e
                    },
                    success: function(t) {
                        null == t.data.seller_id ? wx.showModal({
                            title: "温馨提示",
                            content: "您还不是" + a.data.platform.jd_custom + "的管理员"
                        }) : (wx.removeStorageSync("store_info"), wx.redirectTo({
                            url: "../logs/Workbench?type=2"
                        }));
                    }
                });
            }
        });
    },
    weixin: function(t) {
        0 == this.data.werchat ? this.setData({
            werchat: !0
        }) : 1 == this.data.werchat && this.setData({
            werchat: !1
        });
    },
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(t) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});