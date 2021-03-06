// pages/member/member.js
const app = getApp();
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    star: null,
    stararr: [],

    Imgpath: '',
    avatarUrl: '',

    perStudent: [],
    isIpx:'',
  },

  searchName: function(e) {
    var searchValue = e.detail.value
    this.data.perStudent = []
    for (var i = 0; i < app.globalData.allStudent.length; i++) {
    
      if (app.globalData.allStudent[i].name.indexOf(searchValue) != -1 && searchValue.length > 0) {
  
        this.data.perStudent.push(app.globalData.allStudent[i])
      }
    }

    this.setData({
      perStudent: this.data.perStudent
    })
  },

  searchList: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.perStudent[index];

    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    url += "&familyId=" + item.familyId;
 
  
    wx.navigateTo({
      url: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  member: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.memberList[index];
 
    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    url += "&familyId=" + item.familyId;

    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  memberstar: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.stararr[index];
  
    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    url += "&familyId=" + item.familyId;
   
    wx.navigateTo({
      url: url,
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
    template.tabbar("tabBar", 1, this)
    wx.showLoading({
      title: '加载中...',
      success:function(){
        setTimeout(function(){
          wx.hideLoading()
        },1000)
      }
    })
    var that = this;
    var memberList = app.globalData.allStudent
    app.globalData.memberListLength = memberList.length
    if (app.globalData.stararr.length > 0) {
      app.globalData.stararrLength = app.globalData.stararr.length
      var stararr = app.globalData.stararr
   
      for (var i = 0; i < memberList.length; i++) {
        memberList[i].star = false
        for (var j = 0; j < stararr.length; j++) {
          if (memberList[i].studentId == stararr[j].studentId) {
            memberList[i].star = true
            that.setData({
              memberList: memberList,
              stararr: stararr,
              Imgpath: app.globalData.Imgpath
            })
            // wx.hideLoading()
          }
        }
      }
    } else {
      that.setData({
        memberList: memberList,
        Imgpath: app.globalData.Imgpath
      })
      // wx.hideLoading()
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
    var that = this;
    var memberList = app.globalData.allStudent
 
    if (!app.globalData.memberListLength || !app.globalData.stararrLength || app.globalData.memberListLength != memberList.length || app.globalData.stararrLength != app.globalData.stararr.length) {
      app.globalData.memberListLength = memberList.length
      app.globalData.stararrLength = app.globalData.stararr.length
      var stararr = app.globalData.stararr

      for (var i = 0; i < memberList.length; i++) {
        memberList[i].star = false
        for (var j = 0; j < stararr.length; j++) {
          if (memberList[i].studentId == stararr[j].studentId) {
            memberList[i].star = true
            that.setData({
              memberList: memberList,
              stararr: stararr,
              Imgpath: app.globalData.Imgpath
            })
          }
        }
      }

    }
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