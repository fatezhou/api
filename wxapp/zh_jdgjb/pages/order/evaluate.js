var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp(), siteinfo = require("../../../siteinfo.js");

Page((_defineProperty(_Page = {
    data: {
        length: 0,
        imgArray1: [],
        imgs: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t), t.setData({
            seller_id: e.seller_id,
            order_id: e.order_id
        }), app.getUserInfo(function(e) {
            t.setData({
                user_id: e.id
            });
        });
    },
    textarea: function(e) {
        var t = e.detail.cursor;
        "" != e.detail.value && this.setData({
            length: t,
            value: e.detail.value
        });
    },
    submit: function(e) {
        this.data.value;
    },
    img_array: function(e) {
        var a = this, i = a.data.imgArray1;
        if (9 <= i.length) wx.showModal({
            title: "",
            content: "最多上传9张图片"
        }); else {
            siteinfo.siteroot;
            var t = 9 - i.length;
            wx.chooseImage({
                count: t,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var t = e.tempFilePaths;
                    i = i.concat(t), a.setData({
                        imgArray1: i
                    });
                }
            });
        }
    },
    uploadimg: function(e) {
        var t = this, a = t.data.imgs, i = e.i ? e.i : 0, n = e.success ? e.success : 0, o = e.fail ? e.fail : 0;
        if(e.path.length > 0){
          wx.uploadFile({
            url: e.url,
            filePath: e.path[i],
            name: "upfile",
            formData: null,
            success: function (e) {
              "" != e.data ? (n++ , a.push(e.data), 0 < a.length ? t.setData({
                imgs: a,
                edit: !0
              }) : t.setData({
                edit: !1
              })) : wx.showToast({
                icon: "loading",
                title: "请重试"
              });
            },
            fail: function (e) {
              o++;
            },
            complete: function () {
              ++i == e.path.length ? (t.setData({
                images: e.path,
                upLoadSucess: !0
              }), t.place_order()) : (e.i = i, e.success = n, e.fail = o, t.uploadimg(e));
            }
          });
        }else{
          t.place_order()
        }
       
    },
    delete: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.imgArray1;
        a.splice(t, 1), this.setData({
            imgArray1: a
        });
    }
}, "submit", function(e) {
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }), this.uploadimg({
        url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=Upload&m=zh_jdgjb",
        path: this.data.imgArray1
    });
}), _defineProperty(_Page, "place_order", function(e) {
    var t = this, a = t.data.imgs.join(","), i = t.data.value;
    i = i.replace("\n", "↵");
    var n = t.data.user_id, o = t.data.seller_id, r = t.data.order_id;
    app.util.request({
        url: "entry/wxapp/SaveAssess",
        data: {
            user_id: n,
            img: a,
            content: i,
            order_id: r,
            seller_id: o
        },
        success: function(e) {
            1 == e.data ? (wx.hideToast(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 2
                });
            }, 1500)) : (wx.hideToast(), wx.showModal({
                title: "",
                content: "系统出差了，待会再试一下"
            }));
        }
    });
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "onShow", function() {}), 
_defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {
    this.setData({
        imgArray1: []
    });
}), _defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_Page));