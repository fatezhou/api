// pages/pull/teaList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar: '',
    memberList: [],

    perTeacher: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
  },

  searchName: function (e) {
    var searchValue = e.detail.value
    this.data.perTeacher = []
    for (var i = 0; i < app.globalData.teacherList.length; i++) {

      if (app.globalData.teacherList[i].name.indexOf(searchValue) != -1 && searchValue.length > 0) {
        this.data.perTeacher.push(app.globalData.teacherList[i])
      }
    }

    this.setData({
      perTeacher: this.data.perTeacher
    })

  },

  chooseTeacher: function (e) {
    var item = e.currentTarget.dataset.item;
    app.globalData.chooseTeacher = item
    wx.navigateBack({ })

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
    // app.globalData.chooseTeacher = ''
    var that = this;
    var memberList = app.globalData.teacherList
    that.setData({
      memberList: memberList,
    })
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