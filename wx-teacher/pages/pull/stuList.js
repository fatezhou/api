// pages/pull/stuList.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar: '',
    starList: [],
    memberList: [],

    perStudent: [],

    letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    haveLetter: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })

    for (var i in this.data.letterList) {
      for (var j in app.globalData.studentList) {
        if (this.data.letterList[i] == app.globalData.studentList[j].initials) {
          this.data.haveLetter.push(this.data.letterList[i])
          break
        }
      }
    }
    this.setData(this.data)
  },

  searchName: function(e) {
    var searchValue = e.detail.value
    this.data.perStudent = []
    for (var i = 0; i < app.globalData.studentList.length; i++) {

      if (app.globalData.studentList[i].name.indexOf(searchValue) != -1 && searchValue.length > 0) {
        this.data.perStudent.push(app.globalData.studentList[i])
      }
    }

    this.setData({
      perStudent: this.data.perStudent
    })

  },

  chooseStudent: function(e) {
    var item = e.currentTarget.dataset.item;
    app.globalData.chooseStudent = item
    wx.navigateBack({})

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
    var that = this;
    var memberList = app.globalData.studentList
    var starList = app.globalData.starList
    that.setData({
      memberList: memberList,
      starList: starList
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