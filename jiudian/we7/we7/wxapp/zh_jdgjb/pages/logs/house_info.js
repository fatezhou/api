var siteinfo = require("../../../siteinfo.js"), app = getApp();

Page({
    data: {
        items: [ {
            name: "USA",
            value: "叫醒"
        }, {
            name: "CHN",
            value: "24小时热水",
            checked: "true"
        }, {
            name: "BRA",
            value: "免费wifi"
        }, {
            name: "JPN",
            value: "免费停车"
        }, {
            name: "ENG",
            value: "早餐"
        }, {
            name: "TUR",
            value: "健身房"
        }, {
            name: "TUR",
            value: "会议室"
        }, {
            name: "TUR",
            value: "银联"
        } ],
        maintin: !1,
        maintin_num: !1
    },
    onLoad: function(t) {
        var a = this, e = t.id;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/GetMonthCost",
            cachetime: "0",
            data: {
                room_id: e
            },
            success: function(t) {
                a.setData({
                    price: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetMonthNum",
            cachetime: "0",
            data: {
                room_id: e
            },
            success: function(t) {
                a.setData({
                    room_num: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/RoomDetails",
            cachetime: "0",
            data: {
                room_id: e
            },
            success: function(t) {
                t.data.img = t.data.img.split(","), 0 == t.data.yj_cost ? a.setData({
                    checked: !1
                }) : a.setData({
                    checked: !0
                }), 1 == t.data.state ? a.setData({
                    check: !1
                }) : a.setData({
                    check: !0
                }), a.setData({
                    room: t.data,
                    imgs: t.data.img
                });
            }
        });
    },
    choose_logo: function(t) {
        var e = this, i = siteinfo.siteroot, o = siteinfo.uniacid;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths[0];
                wx.uploadFile({
                    url: i + "?i=" + o + "&c=entry&a=wxapp&do=upload&m=zh_jdgjb",
                    filePath: a,
                    name: "upfile",
                    formData: {},
                    success: function(t) {
                        var a = e.data.room;
                        a.logo = t.data, e.setData({
                            room: a
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    img_array: function(t) {
        var e = this, i = siteinfo.siteroot, o = siteinfo.uniacid;
        wx.chooseImage({
            count: 9,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var a = t.tempFilePaths;
                e.uploadimg({
                    url: i + "?i=" + o + "&c=entry&a=wxapp&do=Upload&m=zh_jdgjb",
                    path: a
                });
            }
        });
    },
    uploadimg: function(t) {
        var e = this, a = t.i ? t.i : 0, i = t.success ? t.success : 0, o = t.fail ? t.fail : 0;
        wx.uploadFile({
            url: t.url,
            filePath: t.path[a],
            name: "upfile",
            formData: null,
            success: function(t) {
                if ("" != t.data) {
                    i++;
                    var a = e.data.imgs;
                    a.push(t.data), 0 < a.length ? e.setData({
                        imgs: a,
                        edit: !0
                    }) : e.setData({
                        edit: !1
                    });
                } else wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(t) {
                o++;
            },
            complete: function() {
                ++a == t.path.length ? (e.setData({
                    images: t.path
                }), wx.hideToast()) : (t.i = a, t.success = i, t.fail = o, e.uploadimg(t));
            }
        });
    },
    delete: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.imgs;
        Array.prototype.indexOf = function(t) {
            for (var a = 0; a < this.length; a++) if (this[a] == t) return a;
            return -1;
        }, Array.prototype.remove = function(t) {
            var a = this.indexOf(t);
            -1 < a && this.splice(a, 1);
        }, e.remove(e[a]), this.setData({
            imgs: e
        });
    },
    switchchange: function(t) {
        var a = t.detail.value;
        this.setData({
            checked: a
        });
    },
    switchchanges: function(t) {
        var a = t.detail.value;
        this.setData({
            check: a
        });
    },
    maintin: function(t) {
        var a = this.data.maintin;
        0 == a ? this.setData({
            maintin: !0
        }) : this.setData({
            maintin: !1
        });
    },
    maintin_num: function(t) {
        var a = this.data.maintin_num;
        0 == a ? this.setData({
            maintin_num: !0
        }) : this.setData({
            maintin_num: !1
        });
    },
    modify_price: function(t) {
        var a = t.detail.value, e = t.currentTarget.dataset.index, i = this.data.price, o = i[e].dateday;
        o = "2018-" + (o = (o = o.replace("月", "-")).replace("日", " ")), i[e].mprice = a, 
        app.util.request({
            url: "entry/wxapp/EditRoomPrice",
            data: {
                dateday: o,
                price: a,
                room_id: this.data.room.id
            },
            success: function(t) {
                1 == t.data && wx.showToast({
                    title: "修改成功"
                });
            }
        }), this.setData({
            price: i
        });
    },
    modify_num: function(t) {
        var a = t.detail.value, e = t.currentTarget.dataset.index, i = this.data.room_num;
        i[e].nums = a;
        var o = i[e].dateday;
        o = "2018-" + (o = (o = o.replace("月", "-")).replace("日", " ")), app.util.request({
            url: "entry/wxapp/EditRoomNum",
            data: {
                dateday: o,
                nums: a,
                room_id: this.data.room.id
            },
            success: function(t) {
                1 == t.data && wx.showToast({
                    title: "修改成功"
                });
            }
        }), this.setData({
            room_num: i
        });
    },
    formSubmit: function(t) {
        var a = t.detail.value.name, e = t.detail.value.floor, i = t.detail.value.people, o = this.data.checked, n = this.data.check, s = this.data.room, c = this.data.imgs;
        if (0 == o) var u = 0; else u = t.detail.value.yj_cost;
        if (0 == n) var r = 1; else r = 2;
        var d = "";
        "" == a ? d = "请输入房间类型" : "" == e ? d = "请输入房间楼层" : "" == i ? d = "请输入房间可住人数" : "" == e && (d = "请输入房间楼层"), 
        "" != d ? wx.showModal({
            title: "",
            content: d
        }) : app.util.request({
            url: "entry/wxapp/EditRoom",
            data: {
                room_id: s.id,
                floor: e,
                logo: s.logo,
                name: a,
                people: i,
                price: s.price,
                state: r,
                yj_cost: u,
                img: c.join(",")
            },
            success: function(t) {
                1 == t.data ? wx.showToast({
                    title: "修改成功"
                }) : wx.showToast({
                    title: "修改失败"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});