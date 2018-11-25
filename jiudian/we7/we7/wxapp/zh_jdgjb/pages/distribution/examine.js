var app = getApp();

Page({
    data: {
        fwxy: !1
    },
    onLoad: function(t) {},
    refresh: function(t) {
        var e = this;
        app.getUrl(e), app.getSystem(e);
        var a = wx.getStorageSync("userInfo").id;
        app.util.request({
            url: "entry/wxapp/MySx",
            data: {
                user_id: a
            },
            success: function(t) {
                0 == t.data ? e.setData({
                    name: wx.getStorageSync("platform").pt_name,
                    bind_userid: 0
                }) : 0 == t.data.user_id ? e.setData({
                    name: wx.getStorageSync("platform").pt_name,
                    bind_userid: 0
                }) : e.setData({
                    name: t.data.name,
                    bind_userid: t.data.user_id
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetFxSet",
            success: function(t) {
                e.setData({
                    GetFxSet: t.data
                });
            }
        });
    },
    formSubmit: function(t) {
        var e = t.detail.value.name, a = t.detail.value.tel, n = wx.getStorageSync("userInfo").id, u = this.data.bind_userid, i = "";
        "" == e ? i = "请输入您的真实姓名" : "" == a && (i = "请输入您的手机号码"), "" != i ? wx.showModal({
            content: i
        }) : (app.util.request({
            url: "entry/wxapp/Binding",
            cachetime: "0",
            data: {
                fx_user: n,
                user_id: u
            },
            success: function(t) {}
        }), app.util.request({
            url: "entry/wxapp/Distribution",
            data: {
                user_id: n,
                user_name: e,
                user_tel: a
            },
            success: function(t) {
                wx.showToast({
                    title: "已提交申请"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        }));
    },
    onReady: function() {},
    onShow: function() {
        this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});