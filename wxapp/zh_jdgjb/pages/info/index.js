// pages/info/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  call: function() {
    wx.makePhoneCall({
      phoneNumber: '15659838771',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var i = this;
    app.getSystem(i)
  },

  wode: function (t) {
    wx.reLaunch({
      url: "../logs/logs"
    });
  },
  home: function (t) {
    wx.reLaunch({
      url: "../index/index"
    });
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
    return {
      imageUrl: 'https://oneday.youyueworld.com/attachment/images/2/2018/share/share.jpg',
    }
  }
})