// pages/myInfo/myInfo.js
var app = getApp()
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    defaultAvatar: '',
    name: '',
    nickName: '',
    phone: '',
    sex: '',

    position: '教师',

    isIpx: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.isIpx) {
      this.setData({
        isIpx: app.globalData.isIpx
      })
    }
    template.tabbar("tabBar", 2, this)

    var userInfo = app.globalData.userInfo
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.nickName = (userInfo.nickname == '' ? userInfo.name : userInfo.nickname)
    this.data.name = userInfo.name
    this.data.avatarUrl = userInfo.avatarUrl
    this.data.phone = userInfo.phone
    this.data.sex = userInfo.sex

    if(app.globalData.role == 0){
      this.data.position = "助教"
    }else if(app.globalData.role == 1){
      this.data.position = "校长"
    }else if(app.globalData.role == 2){
      this.data.position = "班主任"
    }

    this.setData(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})