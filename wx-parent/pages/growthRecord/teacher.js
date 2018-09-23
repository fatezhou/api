// pages/growthRecord/teacher.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachernickname: '',
    teachername: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options.teacherid)
    console.info(app.globalData.allTeacherInfo)
    for (var i = 0; i < app.globalData.allTeacherInfo.length; i++) {
      if (app.globalData.allTeacherInfo[i].teacherId == options.teacherid) {
        this.setData({
          teachername: app.globalData.allTeacherInfo[i].name,
          teachernickname: app.globalData.allTeacherInfo[i].nickname,
        })
      }
    }
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