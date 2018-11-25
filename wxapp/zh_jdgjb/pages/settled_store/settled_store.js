var siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {
        arrays: [ "暂无星级(经济型)", "三星级", "四星级", "五星级" ],
        index: 0,
        inde: 0,
        prompt: !1,
        choice: !0,
        getmsg: "获取验证码",
        interval: "interval2",
        num: 0,
        store_num: 1
    },
    onLoad: function(t) {
        var e = this;
        app.getSystem(e), app.getUrl(e);
        wx.getStorageSync("openid");
        var a = wx.getStorageSync("users").id;
        e.setData({
            user_id: a
        });
    },
    choose_address: function(t) {
        var a = this;
        wx.chooseLocation({
            success: function(t) {
                var e = t.latitude + "," + t.longitude;
                a.setData({
                    address: t.address,
                    latitude: e
                });
            }
        });
    },
    bindPickerChanges: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    choose: function(t) {
        var a = this, n = siteinfo.siteroot, i = siteinfo.uniacid, o = t.currentTarget.dataset.id;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var e = t.tempFilePaths[0];
                wx.uploadFile({
                    url: n + "?i=" + i + "&c=entry&a=wxapp&do=upload&m=zh_jdgjb",
                    filePath: e,
                    name: "upfile",
                    formData: {},
                    success: function(t) {
                        1 == o ? a.setData({
                            upload_one: t.data
                        }) : 2 == o ? a.setData({
                            upload_two: t.data
                        }) : 3 == o && a.setData({
                            upload_three: t.data
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    user_tel: function(t) {
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
            for (var n = "", i = 0; i < 6; i++) n += Math.floor(10 * Math.random());
            app.util.request({
                url: "entry/wxapp/sms2",
                cachetime: "0",
                data: {
                    code: n,
                    tel: a,
                    type: 1
                },
                success: function(t) {}
            }), e.setData({
                num: n
            });
            var o = 59, s = setInterval(function() {
                e.setData({
                    getmsg: o + "s后重新发送",
                    send: !0
                }), --o <= 0 && (clearInterval(s), e.setData({
                    getmsg: "获取验证码",
                    send: !1,
                    num: 0
                }));
            }, 1e3);
        }
    },
    verification_code: function(t) {
        var e = t.detail.value, a = this.data.num;
        6 == e.length && e != a && (wx.showModal({
            title: "",
            content: "验证码输入错误"
        }), this.setData({
            phone: 0
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
    formSubmit: function(t) {
        var e = this, a = e.data.store_num, n = t.detail.value.hotel_name, i = t.detail.value.hotel_address, o = e.data.latitude;
        o = String(o);
        var s = t.detail.value.hotel_contacts, u = t.detail.value.hotel_tel, l = e.data.upload_one, c = e.data.upload_two, d = e.data.upload_three, r = t.detail.value.textarea, p = e.data.arrays[e.data.index], f = e.data.phone, h = wx.getStorageSync("userInfo").id, m = "";
        "" == n ? m = "请输入酒店名称" : "" == i ? m = "请选择酒店地址" : "" == s ? m = "请输入酒店联系人姓名" : "" == u ? m = "请输入酒店电话" : null == l ? m = "请上传营业执照" : null == c ? m = "请上传负责人身份证正面照片" : null == d ? m = "请上传负责人身份证反面照片" : "" == f || 0 == f ? m = "请进行手机号验证" : "" == r && (r = ""), 
        "" != m ? wx.showModal({
            title: "",
            content: m
        }) : "" == m && 1 == a && (e.setData({
            store_num: 0
        }), app.util.request({
            url: "entry/wxapp/SaveHotelApply",
            cachetime: "0",
            data: {
                user_id: h,
                name: n,
                address: i,
                coordinates: o,
                link_name: s,
                link_tel: u,
                tel: f,
                sfz_img1: c,
                sfz_img2: d,
                yy_img: l,
                other: r,
                star: p
            },
            success: function(t) {
                1 == t.data ? (wx, wx.showToast({
                    title: "入驻成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500)) : wx.navigateBack({
                    delta: 1
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "入驻失败"
                }), setTimeout(function(t) {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        }));
    },
    reset: function(t) {},
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(t) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});