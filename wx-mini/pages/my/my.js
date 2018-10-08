// pages/my/my.js
var app = getApp()
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Imgpath: '',
    avatarUrl: '',
    nickname:'',
    name:'',
    sex:'',
    phone:'',
    isIpx:'',
  },
  xiugai: function() {
    wx.navigateTo({
      url: 'meInforCha',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
    if (app.globalData.teacherInfo.teacherId) {
      this.data.position = '教师'
    }
    console.info(app.globalData.teacherInfo)
    this.setData({
      name: app.globalData.teacherInfo.name,
      nickname: app.globalData.teacherInfo.nickname,
      position: this.data.position,
      avatarUrl: app.globalData.teacherInfo.avatarUrl,
      Imgpath: app.globalData.Imgpath,
      phone: app.globalData.teacherInfo.phone,
      sex: app.globalData.teacherInfo.sex
    })
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