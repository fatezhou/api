// pages/timeline/timeline.js
const app = getApp()
var http = require('../../utils/http.js')

var recordId = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: '',
    studentSex: '',
    studentName: '',
    studentAvatarUrl: '',
    recordWithAppendSize: '',
    recordSize: '',

    defaultAvatar: '',

    recordsList: [],

    allTeacherInfo: [],
    allParentInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.allTeacherInfo = app.globalData.teacherList
    this.data.allParentInfo = app.globalData.parentList
    this.data.studentId = parseInt(options.studentId)

    var that = this
    for (var i = 0; i < app.globalData.studentList.length; i++) {
      if (app.globalData.studentList[i].studentId == this.data.studentId) {
        this.data.studentSex = app.globalData.studentList[i].sex
        this.data.studentName = app.globalData.studentList[i].name
        this.data.studentAvatarUrl = app.globalData.studentList[i].avatarUrl

        this.setData(this.data)
        break
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
    this.getTimeline()
  },

  getTimeline: function() {
    var that = this;
    http.getRecordSize(this.data.studentId, function(res) {
      that.setData({
        recordWithAppendSize: res
      })
    })
    http.getGrowthRecordsWithoutAppend(recordId, that.data.studentId, function(res) {
      console.info(res)
      if (recordId == 0) {
        that.setData({
          recordSize: res.size,
        })
      }
      for (var t = 0; t < res.records.length; t++) {
        res.records[t].isfold = true
        if (res.records[t].text.length > 100) {
          res.records[t].showTextBtn = true
        }

        // 排序  修复 点赞图标可能出现两个的问题 
        if (res.records[t].likes) {
          if (res.records[t].likes.teacher.length > 0) {
            for (var i = 0; i < res.records[t].likes.teacher.length; i++) {
              var length = res.records[t].likes.teacher.length
              if (res.records[t].likes.teacher[i] == app.globalData.userId) {
                var temp = res.records[t].likes.teacher[length - 1]
                res.records[t].likes.teacher[length - 1] = res.records[t].likes.teacher[i]
                res.records[t].likes.teacher[i] = temp
                break
              }
            }
          }
        }
      }
      if (res.size != 0) {
        that.data.recordsList = that.data.recordsList.concat(res.records)
        that.setData({
          recordsList: that.data.recordsList,
        })
        // 获取最后一条recordId 用于加载之后的记录
        recordId = res.records.slice(res.records.length - 1)[0].recordId
        console.info(recordId)
      }
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
    var that = this
    recordId = 0
    http.getRecordSize(this.data.studentId, function(res) {
      if (that.data.recordWithAppendSize != res) {
        that.setData({
          recordWithAppendSize: res
        })
      }
    })
    http.getGrowthRecordsWithoutAppend(recordId, that.data.studentId, function(res) {
      if (that.data.recordSize !== res.size) {
        // 记录数不同 才重新设置
        that.setData({
          recordSize: res.size,
          recordsList: res.records,
        })
        // 获取最后一条recordId 用于加载之后的记录
        recordId = res.records.slice(res.records.length - 1)[0].recordId
      }
    })
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      noTextPrompt: '无更多记录'
    })
    this.getTimeline()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})