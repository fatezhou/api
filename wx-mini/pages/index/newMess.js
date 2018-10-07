// pages/index/newMess.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: '',
    append: '',
    Imgpath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      record: app.globalData.contact,
      Imgpath: app.globalData.Imgpath,
    })
    wx.request({
      url: app.globalData.getNewMessage,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "authorId": app.globalData.userId, //自己的id
        "authorType": app.globalData.userType //自己的type
      },
      method: 'POST',
      success: function(res) {
        for (var i = 0; i < res.data.data.append.length; i++) {
          res.data.data.append[i].text = decodeURIComponent(res.data.data.append[i].text)
        }
        console.info(res)
        // console.info(app.globalData.contact)
        // for (var i = 0; i < that.data.record.length; i++) {
        //   for (var j = 0; j < res.data.data.append.length;j++){
        //     if (that.data.record[i].recordId == res.data.data.append[j].parentRecordId){
        //       that.data.record[i].append += res.data.data.append[j]
        //     }
        //   }
        // }
        that.setData({
          append: res.data.data.append
        })
      }
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