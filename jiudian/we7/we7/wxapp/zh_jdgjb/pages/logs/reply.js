var app = getApp();

Page({
    data: {
        assess_list: [],
        page: 1,
        reply: !1
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            seller_id: a.seller_id
        }), app.getUrl(t), app.getSystem(t), t.refresh();
    },
    refresh: function(a) {
        var e = this, t = e.data.seller_id, s = e.data.assess_list, i = e.data.page;
        app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: {
                seller_id: t,
                page: i
            },
            success: function(a) {
                if (0 < a.data.length) {
                    for (var t in e.setData({
                        page: i + 1,
                        none_more: !1
                    }), a.data) "" == a.data[t].reply && (a.data[t].img = a.data[t].img.split(","), 
                    a.data[t].time = app.ormatDate(a.data[t].time).slice(0, 10), s = s.concat(a.data[t]));
                    e.setData({
                        assess_list: s
                    });
                } else e.setData({
                    none_more: !0
                });
            }
        });
    },
    previewImage: function(a) {
        var t = this.data.url, e = [], s = a.currentTarget.id, i = a.currentTarget.dataset.index, r = this.data.assess_list;
        for (var n in r) if (s == r[n].id) var l = r[n].img;
        for (var d in l) e.push(t + l[d]);
        wx.previewImage({
            current: t + l[i],
            urls: e
        });
    },
    reply: function(a) {
        var t = this, e = t.data.reply, s = a.currentTarget.dataset.id;
        t.setData({
            assess_id: s
        }), 0 == e ? t.setData({
            reply: !0
        }) : t.setData({
            reply: !1
        });
    },
    textarea: function(a) {
        this.setData({
            textarea: a.detail.value
        });
    },
    determine: function(a) {
        var t = this, e = t.data.textarea, s = t.data.assess_id;
        null == e || "" == e ? wx.showModal({
            title: "",
            content: "您还没有输入回复哦！"
        }) : (app.util.request({
            url: "entry/wxapp/ReplyAssess",
            cachetime: "0",
            data: {
                reply: e,
                assess_id: s
            },
            success: function(a) {}
        }), t.setData({
            reply: !1
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            assess_list: [],
            page: 1
        }), this.refresh();
    },
    onReachBottom: function() {
        this.refresh();
    }
});