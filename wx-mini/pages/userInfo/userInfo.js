// pages/userInfo/userInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachernickname: '',
    teachername: '',
    Imgpath: '',
    avatarUrl: '',
    phone: '',
    sex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Imgpath: app.globalData.Imgpath
    })
    console.info(options.teacherid)
    console.info(app.globalData.allTeacherInfo)
    for (var i = 0; i < app.globalData.allTeacherInfo.length; i++) {
      if (app.globalData.allTeacherInfo[i].teacherId == options.teacherid) {
        this.setData({
          teachername: app.globalData.allTeacherInfo[i].name,
          teachernickname: app.globalData.allTeacherInfo[i].nickname,
          avatarUrl: app.globalData.allTeacherInfo[i].avatarUrl,
          phone: app.globalData.allTeacherInfo[i].phone,
          sex: app.globalData.allTeacherInfo[i].sex,
        })
      }
    }
  },

  showBigImg: function (e) {
    console.info(e.currentTarget.dataset)
    var urls = []
    urls[0] = e.currentTarget.dataset.showimg
    wx.previewImage({
      current: e.currentTarget.dataset.showimg,
      urls: urls
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})