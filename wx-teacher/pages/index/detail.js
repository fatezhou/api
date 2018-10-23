// pages/index/detail.js
const app = getApp()
var http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainText: '',
    dateTime: '',
    studentId: '',
    recordId: '',
    avatarUrl: '',
    name: '',

    defaultAvatar: '',
    recordSize: '',
    appendList: '',
    likenumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options)
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.mainText = options.mainText
    this.data.dateTime = options.dateTime
    this.data.recordId = parseInt(options.recordId)
    this.data.studentId = parseInt(options.studentId)
    this.data.avatarUrl = options.avatarUrl
    this.data.name = options.name

    this.setData(this.data)
  },

  like: function(e) {
    var that = this

    var recordId = e.currentTarget.dataset.recordid
    var orgAuthorId = e.currentTarget.dataset.authorid
    var orgAuthorType = e.currentTarget.dataset.authortype
    var parentRecordId = that.data.recordId

    for (var j = 0; j < this.data.appendList.length; j++) {
      if (this.data.appendList[j].recordId == recordId) {
        if (this.data.appendList[j].like) {
          if (this.data.appendList[j].like.teacher.length > 0) {
            for (var k = 0; k < this.data.appendList[j].like.teacher.length; k++) {
              // 已经点赞了 就取消
              if (this.data.appendList[j].like.teacher[k] == gData.userId) {
                this.data.appendList[j].like.teacher.splice(k, 1)
                that.setData({
                  appendList: this.data.appendList
                })
              } else if ((k + 1) == this.data.appendList[j].like.teacher.length) {
                this.data.appendList[j].like.teacher.push(gData.userId)
                that.setData({
                  appendList: this.data.appendList
                })
                break;
              }
            }
          } else {
            this.data.appendList[j].like.teacher[0] = gData.userId
            that.setData({
              appendList: this.data.appendList
            })
          }
        } else {
          var like = []
          var teacher = []
          this.data.appendList[j].like = {}
          this.data.appendList[j].like.teacher = []
          this.data.appendList[j].like.teacher[0] = gData.userId
          that.setData({
            appendList: this.data.appendList
          })
        }
      }
    }

    http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, function(res) {
      
    })

    // console.info(authorType)
    // wx.request({
    //   url: gData.putRecordLike,
    //   method: 'post',
    //   data: {
    //     "unionid": gData.unionId,
    //     "openid": gData.openid,
    //     "authorId": gData.userId, //自己的id
    //     "authorType": gData.userType, //1: teacher, 2: parent",
    //     "recordId": recordId,
    //     "parentRecordId": parseInt(that.data.recordId),
    //     "orgAuthorId": authorId,
    //     "orgAuthorType": authorType,
    //     "familyId": familyId
    //   },
    //   success: function(res) {

    //     if (res.data.code == 4) {
    //       wx.request({
    //         url: gData.putRecordLike,
    //         method: 'post',
    //         data: {
    //           // "unionid": gData.unionId,
    //           // "openid": gData.openid,
    //           "authorId": gData.userId, //自己的id
    //           "authorType": gData.userType, //1: teacher, 2: parent",
    //           "recordId": recordId,
    //           "parentRecordId": parseInt(that.data.recordId),
    //           "familyId": familyId,
    //           'cancel': true,
    //           "orgAuthorId": authorId,
    //           "orgAuthorType": authorType
    //         },
    //         success: function(res) {

    //         }
    //       })
    //     }

    //   }
    // })
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
    var that = this
    http.getRecordSize(this.data.studentId, function(res) {
      that.setData({
        recordSize: res + "条成长记录"
      })
    })

    http.getoneGrowthRecordWithAppend(this.data.recordId, function(res) {
      var appendList = res.append
      // 教师信息
      var allTeacherInfo = app.globalData.teacherList
      // 家长信息
      var allParentInfo = app.globalData.parentList

      for (var i = 0; i < appendList.length; i++) {
        if (appendList[i].authorType == 1) {
          for (var j = 0; j < allTeacherInfo.length; j++) {
            if (appendList[i].authorId == allTeacherInfo[j].teacherId) {
              appendList[i].authorName = allTeacherInfo[j].nickname
              appendList[i].avatarUrl = allTeacherInfo[j].avatarUrl
            }
          }
        } else {
          for (var j = 0; j < allParentInfo.length; j++) {
            if (appendList[i].authorId == allParentInfo[j].parentId) {
              appendList[i].authorName = allParentInfo[j].name
              appendList[i].avatarUrl = allParentInfo[j].avatarUrl
            }
          }
        }
        // 排序  修复 点赞图标可能出现两个的问题  
        if (appendList[i].like) {
          if (appendList[i].like.teacher.length > 0) {
            for (var j = 0; j < appendList[i].like.teacher.length; j++) {
              var length = appendList[i].like.teacher.length
              if (appendList[i].like.teacher[j] == app.globalData.userId) {
                var temp = appendList[i].like.teacher[length - 1]
                appendList[i].like.teacher[length - 1] = appendList[i].like.teacher[j]
                appendList[i].like.teacher[j] = temp
                break
              }
            }
          }
        }
      }
      that.setData({
        appendList: appendList,
        listNumber: appendList.length,
        likenumber: res.like
      })
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