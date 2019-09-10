// zh_jdgjb/pages/blank/blank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    image: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = this.getToken()
    this.queue(token)
  },

  getToken: function() {
    let timestamp = new Date().getTime()
    let ran = Math.random().toString(36).slice(-8)
    return ran + timestamp
  },

  queue: function(token) {
    app.globalData.token = token
    let self = this
    let root = 'https://queue1.youyueworld.com/apis/'
    let api = root + 'queue'
    wx.request({
      url: api,
      data: {
        token: token
      },
      method: "post",
      success: function(res) {
        if (res.data.data.code == 1) {
          // 放行
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.showLoading({
            title: '',
          })
          self.setData({
            text: '服务器正忙，请稍等片刻再进入哦~',
            image: '../img/loading.jpg'
          })
          // 继续排队
          setTimeout(function() {
            self.queue(str)
          }, 30000)
        }
      },
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