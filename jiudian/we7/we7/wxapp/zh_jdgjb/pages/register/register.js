var app = getApp();

Page({
    data: {
        getmsg: "发送验证码",
        yz: !1
    },
    onLoad: function(t) {
        app.getUrl(this), app.getSystem(this);
    },
    name: function(t) {
        this.setData({
            user_name: t.detail.value
        });
    },
    phone: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    sendmessg: function(t) {
        var e = this, a = e.data.phone;
        if ("" == a || null == a) wx.showToast({
            title: "请输入手机号",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }); else {
            for (var n = "", s = 0; s < 6; s++) n += Math.floor(10 * Math.random());
            app.util.request({
                url: "entry/wxapp/sms2",
                cachetime: "0",
                data: {
                    code: n,
                    tel: a,
                    type: 2
                },
                success: function(t) {}
            }), e.setData({
                num: n
            });
            var i = 59, o = setInterval(function() {
                e.setData({
                    getmsg: i + "s后重新发送",
                    send: !0
                }), --i <= 0 && (clearInterval(o), e.setData({
                    getmsg: "发送验证码",
                    send: !1,
                    num: 0
                }));
            }, 1e3);
        }
    },
    verification_code: function(t) {
        var e = t.detail.value, a = this.data.num;
        6 == e.length && (e != a ? (wx.showModal({
            title: "",
            content: "验证码输入错误"
        }), this.setData({
            phone: 0
        })) : this.setData({
            yz: !0
        }));
    },
    getPhoneNumber: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/jiemi",
            cachetime: "0",
            data: {
                sessionKey: app.getSK,
                iv: t.detail.iv,
                data: t.detail.encryptedData
            },
            success: function(t) {
                e.setData({
                    phone: t.data.phoneNumber
                });
            }
        });
    },
    confirm: function(t) {
        var e = this, a = e.data.user_name, n = e.data.phone, s = e.data.platform, i = wx.getStorageSync("userInfo").id, o = "";
        if ("" == a || null == a) o = "请输入您的姓名"; else if ("" == n || null == n) o = "请输入您的手机号"; else if (1 == s.is_dxyz) {
            1 != e.data.yz && (o = "验证码输入错误");
        }
        "" != o ? wx.showModal({
            content: o
        }) : app.util.request({
            url: "entry/wxapp/RenewUser",
            cachetime: "0",
            data: {
                tel: n,
                zs_name: a,
                user_id: i
            },
            success: function(t) {
                1 == t.data && (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500));
            }
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