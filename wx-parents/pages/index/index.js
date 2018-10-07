//index.js
//获取应用实例
const app = getApp()
var template = require('../../template/template.js')
var http = require('../../utils/http.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    template.tabbar("tabBar", 0, this)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  formSubmit_collect: function(e) {
    console.info(e)
    let formId = e.detail.formId;
    console.info(formId)
    wx.request({
      url: 'https://api.minidope.com/api/v1/put_form_id',
      data: {
        "authorId": 3,
        "authorType": 1,
        "formId": formId,
        "openId": app.globalData.openid,
        "unionId": app.globalData.unionid
      },
      method: 'post',
      success: function(res) {
        console.info(res)
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})