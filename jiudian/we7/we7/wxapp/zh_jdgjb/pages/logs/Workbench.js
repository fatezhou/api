var app = getApp();

Page({
    data: {
        nav: [ {
            img: "../img/workbench/gongzuotai@2x.png",
            img_select: "../img/workbench/gongzuota@2x.png",
            name: "工作台",
            id: 0
        }, {
            img: "../img/workbench/dingdan@2x.png",
            img_select: "../img/workbench/dindan@2x.png",
            name: "订单",
            id: 1
        }, {
            img: "../img/workbench/fangxing@2x.png",
            img_select: "../img/workbench/fangxin@2x.png",
            name: "房型管理",
            id: 2
        } ],
        order_nav: [ {
            name: "全部订单"
        }, {
            name: "待处理"
        }, {
            name: "已完成"
        }, {
            name: "退款订单"
        } ],
        page: 1,
        order: [],
        index: 0,
        ac_index: 0,
        order_index: 0,
        acti_index: 0
    },
    onLoad: function(t) {
        var e = this;
        app.getUrl(e), app.getSystem(e), e.setData({
            store_info: wx.getStorageSync("store_info"),
            type: t.type
        });
    },
    refresh: function(t) {
        var e = this;
        if (2 == e.data.type) {
            var a = wx.getStorageSync("userInfo").id;
            app.util.request({
                url: "entry/wxapp/StoreWxLogin",
                cachetime: "0",
                data: {
                    user_id: a
                },
                success: function(t) {
                    e.setData({
                        store_info: t.data
                    }), app.util.request({
                        url: "entry/wxapp/TxMoney",
                        cachetime: "0",
                        data: {
                            seller_id: t.data.seller_id
                        },
                        success: function(t) {
                            e.setData({
                                price: t.data
                            });
                        }
                    });
                }
            });
        } else {
            var i = wx.getStorageSync("sign");
            wx.getStorageSync("store_info");
            app.util.request({
                url: "entry/wxapp/HtLogin",
                cachetime: "0",
                data: {
                    username: i.name,
                    password: i.password
                },
                success: function(t) {
                    "账号或密码错误" == t.data ? wx.showModal({
                        title: "提示",
                        content: "该账号已经修改，请重新登录",
                        success: function(t) {
                            t.confirm ? wx.redirectTo({
                                url: "logs"
                            }) : t.cancel && wx.redirectTo({
                                url: "logs"
                            });
                        }
                    }) : (e.setData({
                        store_info: t.data
                    }), app.util.request({
                        url: "entry/wxapp/TxMoney",
                        cachetime: "0",
                        data: {
                            seller_id: t.data.seller_id
                        },
                        success: function(t) {
                            e.setData({
                                price: t.data
                            });
                        }
                    }));
                }
            });
        }
    },
    order_list: function(t) {
        var a = this, i = a.data.page, s = a.data.order, e = a.data.order_index;
        if (0 == e) var r = ""; else if (1 == e) r = 2; else if (2 == e) r = 4; else if (3 == e) r = 6;
        var n = a.data.store_info;
        app.util.request({
            url: "entry/wxapp/SellerOrderList",
            cachetime: "0",
            data: {
                seller_id: n.seller_id,
                status: r,
                page: i
            },
            success: function(t) {
                if (0 < t.data.length) {
                    for (var e in s = s.concat(t.data), t.data) if (t.data[e].arrival_time = t.data[e].arrival_time.slice(5, 10), 
                    t.data[e].departure_time = t.data[e].departure_time.slice(5, 10), t.data[e].time = app.ormatDate(t.data[e].time), 
                    1 == t.data[e].status) t.data[e].status = "未付款"; else if (2 == t.data[e].status) {
                        wx.getBackgroundAudioManager().src = "https://hl.zhycms.com/addons/zh_jd/template/images/text2audio.mp3", 
                        t.data[e].status = "已付款";
                    } else 3 == t.data[e].status ? t.data[e].status = "已取消" : 4 == t.data[e].status ? t.data[e].status = "已完成" : 5 == t.data[e].status ? t.data[e].status = "已入住" : 6 == t.data[e].status ? t.data[e].status = "申请退款中" : 7 == t.data[e].status ? t.data[e].status = "已退款" : 8 == t.data[e].status ? t.data[e].status = "拒绝退款" : 9 == t.data[e].status && (t.data[e].status = "拒绝入住");
                    a.setData({
                        order: t.data,
                        page: i + 1
                    });
                }
            }
        });
    },
    room_list: function(t) {
        var i = this, e = i.data.store_info;
        app.util.request({
            url: "entry/wxapp/RoomList",
            cachetime: "0",
            data: {
                seller_id: e.seller_id
            },
            success: function(t) {
                var e = t.data;
                for (var a in e) a % 2 == 0 ? (e[a].img = "../img/workbench/dididi@2x.png", e[a].class = "back_one") : (e[a].img = "../img/workbench/house_management_one.png", 
                e[a].class = "back_two");
                i.setData({
                    room: e
                });
            }
        });
    },
    nav_bottom: function(t) {
        var e = t.currentTarget.dataset.index;
        1 == e && this.order_list(), 2 == e && this.room_list(), this.setData({
            index: e,
            ac_index: e
        });
    },
    order_sele: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            order_index: e,
            page: 1,
            order: []
        }), this.order_list();
    },
    wait_payment: function(t) {
        this.setData({
            order_index: 1,
            page: 1,
            order: [],
            index: 1,
            ac_index: 1
        }), this.order_list();
    },
    already: function(t) {
        this.setData({
            order_index: 2,
            page: 1,
            order: [],
            index: 1,
            ac_index: 1
        }), this.order_list();
    },
    refund: function(t) {
        this.setData({
            order_index: 3,
            page: 1,
            order: [],
            index: 1,
            ac_index: 1
        }), this.order_list();
    },
    code: function(t) {
        var a = this.data.store_info;
        wx.showModal({
            content: "是否核销此订单",
            success: function(t) {
                t.confirm && wx.scanCode({
                    success: function(t) {
                        var e = t.path.slice(36, t.path.length);
                        app.util.request({
                            url: "entry/wxapp/SmRz",
                            cachetime: "0",
                            data: {
                                seller_id: a.seller_id,
                                order_id: e
                            },
                            success: function(t) {
                                1 == t.data ? wx.showToast({
                                    title: "订单核销成功"
                                }) : wx.showToast({
                                    title: "核销失败"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    order_info: function(t) {
        wx.navigateTo({
            url: "order_info?id=" + t.currentTarget.dataset.id
        });
    },
    edit: function(t) {
        wx.navigateTo({
            url: "house_info?id=" + t.currentTarget.dataset.id
        });
    },
    search: function(t) {
        wx.navigateTo({
            url: "search"
        });
    },
    change_room: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        if (1 == t.currentTarget.dataset.state) var i = 2; else i = 1;
        wx.showModal({
            title: "",
            content: "确定要修改？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/ChangeRoom",
                    data: {
                        room_id: a,
                        state: i
                    },
                    success: function(t) {
                        1 == t.data && (wx.showToast({
                            title: "修改成功"
                        }), setTimeout(function() {
                            e.room_list();
                        }, 1500));
                    }
                });
            }
        });
    },
    delete_house: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        wx.showModal({
            title: "",
            content: "确定要删除此房型？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/DeleteRoom",
                    data: {
                        room_id: a
                    },
                    success: function(t) {
                        1 == t.data && (wx.showToast({
                            title: "删除成功"
                        }), setTimeout(function() {
                            e.room_list();
                        }, 1500));
                    }
                });
            }
        });
    },
    put_forward: function(t) {
        wx.navigateTo({
            url: "put_forward?seller_id=" + this.data.store_info.seller_id
        });
    },
    put_forward_record: function(t) {
        wx.navigateTo({
            url: "record?seller_id=" + this.data.store_info.seller_id
        });
    },
    reply: function(t) {
        wx.navigateTo({
            url: "reply?seller_id=" + this.data.store_info.seller_id
        });
    },
    onReady: function() {},
    onShow: function() {
        this.refresh(), this.order_list();
    },
    onHide: function() {
        this.setData({
            page: 1,
            order: []
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {
        1 == this.data.index && (this.setData({
            page: 1,
            order: []
        }), this.order_list()), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.order_list();
    }
});