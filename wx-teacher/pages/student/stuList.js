// pages/student/stuList.js
const app = getApp();
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList: [],
    studentList: [],

    defaultAvatar: '',
    perStudent: [],

    isIpx: '',
    letterList : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    haveLetter:[],
  },

  searchName: function(e) {
    var searchValue = e.detail.value
    this.data.perStudent = []
    for (var i = 0; i < this.data.studentList.length; i++) {
      if (this.data.studentList[i].name.indexOf(searchValue) != -1 && searchValue.length > 0) {
        this.data.perStudent.push(this.data.studentList[i])
      }
    }
    this.setData({
      perStudent: this.data.perStudent
    })
  },

  toStudentInfo: function(e) {
    var item = e.currentTarget.dataset.item

    var url = 'stuInfo?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + item.nickname;
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    url += "&familyId=" + item.familyId;

    if (item.isStar) {
      url += "&isStar=" + item.isStar;
    } else {
      url += "&isStar=false";
    }
    wx.navigateTo({
      url: url,
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
    template.tabbar("tabBar", 1, this)
    wx.showLoading({
      title: '加载中...',
      success: function() {
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
      }
    })

    for (var i in this.data.letterList){
      for (var j in app.globalData.studentList){
        if (this.data.letterList[i] == app.globalData.studentList[j].initials){
          this.data.haveLetter.push(this.data.letterList[i])
          break
        }
      }
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
    this.setData({
      studentList: app.globalData.studentList,
      starList: app.globalData.starList,
      defaultAvatar: app.globalData.defaultAvatar
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