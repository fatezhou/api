// pages/student/stuList.js
const app = getApp();
var template = require('../../template/template.js')
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList: [],
    studentList: [],
    allStudentList: [],

    defaultAvatar: '',
    perStudent: [],

    isIpx: '',
    letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    haveLetter: [],
    navList: [{
      id: 0,
      name: "我的"
    }, {
      id: 1,
      name: "全部"
    }, {
      id: 2,
      name: "星标"
    }],
    id: 0,
  },

  navChange: function(e) {
    wx.showLoading({
      title: '加载中...',
    })

    console.info(e.target.dataset)
    this.setData({
      id: e.target.dataset.id
    })
    var list = []
    if (this.data.id == 0) {
      list = app.globalData.studentList
    } else if (this.data.id == 1) {
      list = app.globalData.allStudentList
    } else if (this.data.id == 2) {
      list = app.globalData.starList
    }
    this.data.memberList = list
    this.data.haveLetter = []
    for (var i in this.data.letterList) {
      for (var j in list) {
        if (this.data.letterList[i] == list[j].initials) {
          this.data.haveLetter.push(this.data.letterList[i])
          break
        }
      }
    }
    this.setData(this.data)

    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },

  searchName: function(e) {
    var searchValue = e.detail.value
    this.data.perStudent = []
    for (var i = 0; i < this.data.allStudentList.length; i++) {
      if (this.data.allStudentList[i].name.indexOf(searchValue) != -1 && searchValue.length > 0) {
        this.data.perStudent.push(this.data.allStudentList[i])
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
    this.setData({
      memberList: app.globalData.studentList,
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
      allStudentList: app.globalData.allStudentList,
      starList: app.globalData.starList,
      defaultAvatar: app.globalData.defaultAvatar
    })
    if (this.data.id == 2) {
      this.data.memberList= app.globalData.starList
      this.data.haveLetter = []
      for (var i in this.data.letterList) {
        for (var j in this.data.memberList) {
          if (this.data.letterList[i] == this.data.memberList[j].initials) {
            this.data.haveLetter.push(this.data.letterList[i])
            break
          }
        }
      }
      this.setData(this.data)
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