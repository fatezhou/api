// pages/index/detail.js
const app = getApp()
var http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainText: '',
    imgUrl: '',
    dateTime: '',
    studentId: '',
    recordId: '',
    avatarUrl: '',
    name: '',
    userId: '',
    orgAuthorType: '',
    orgAuthorId: '',

    defaultAvatar: '',
    recordSize: '',
    appendList: '',
    likenumber: 0,

    allTeacherInfo: '',
    allParentInfo: '',

    // 抽屉
    drawer: false,
  },

  toShareOrPull: function(e) {
    var that = this
    wx.showActionSheet({
      itemList: ['评论', '分享'],
      itemColor: "#00000",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '../pull/pull?recordId=' + that.data.recordId + '&type=append&orgAuthorId=' + that.data.orgAuthorId + '&orgAuthorType=' + that.data.orgAuthorType + '&studentId=' + that.data.studentId,
            })

          } else if (res.tapIndex == 1) {
            app.globalData.shareList[0] = {}
            app.globalData.shareList[0].text = that.data.mainText
            app.globalData.shareList[0].imgUrl = that.data.imgUrl
            app.globalData.shareList[0].dateTime = that.data.dateTime
            app.globalData.shareList[0].avatarUrl = that.data.avatarUrl
            wx.navigateTo({
              url: '../share/share',
            })
          }
        }
      }
    })
  },

  // 分享按钮
  // toShare: function(e) {
  //   app.globalData.shareList[0] = {}
  //   app.globalData.shareList[0].text = this.data.mainText
  //   app.globalData.shareList[0].imgUrl = this.data.imgUrl
  //   app.globalData.shareList[0].dateTime = this.data.dateTime
  //   app.globalData.shareList[0].avatarUrl = this.data.avatarUrl
  //   wx.navigateTo({
  //     url: '../share/share',
  //   })
  // },

  //头像跳转个人信息
  toUserInfo: function(e) {
    let item = e.currentTarget.dataset.item
    if (item.authorType == 1) {
      // 跳转教师信息
      wx.navigateTo({
        url: '../teacher/teaInfo?teacherid=' + item.authorId,
      })
    } else {
      // 跳转家长信息
      wx.navigateTo({
        url: '../student/parentInfo?studentId=' + item.studentId,
      })
    }
  },

  // 抽屉
  // drawerClick: function() {
  //   this.setData({
  //     drawer: !this.data.drawer
  //   })
  // },

  // 图片放大
  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showswiper
    })
  },

  goMoreRecords: function(e) {
    wx.navigateTo({
      url: '../timeline/timeline?studentId=' + this.data.studentId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.userId = app.globalData.userId
    // this.data.mainText = options.mainText
    this.data.dateTime = options.dateTime
    this.data.recordId = parseInt(options.recordId)
    this.data.studentId = parseInt(options.studentId)
    this.data.avatarUrl = options.avatarUrl
    this.data.name = options.name
    this.data.orgAuthorId = options.orgAuthorId
    this.data.orgAuthorType = options.orgAuthorType

    for (var i = 0; i < app.globalData.recordsList.length; i++) {
      if (app.globalData.recordsList[i].recordId == this.data.recordId) {
        this.data.imgUrl = app.globalData.recordsList[i].pictureUrls
        break
      }
    }

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
              if (this.data.appendList[j].like.teacher[k] == app.globalData.userId) {
                this.data.appendList[j].like.teacher.splice(k, 1)
                that.setData({
                  appendList: this.data.appendList
                })
              } else if ((k + 1) == this.data.appendList[j].like.teacher.length) {
                this.data.appendList[j].like.teacher.push(app.globalData.userId)
                that.setData({
                  appendList: this.data.appendList
                })
                break;
              }
            }
          } else {
            this.data.appendList[j].like.teacher[0] = app.globalData.userId
            that.setData({
              appendList: this.data.appendList
            })
          }
        } else {
          this.data.appendList[j].like = {}
          this.data.appendList[j].like.teacher = []
          this.data.appendList[j].like.teacher[0] = app.globalData.userId
          that.setData({
            appendList: this.data.appendList
          })
        }
      }
    }

    http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, false, function(res) {
      if (res == 4) {
        http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, true, function(res) {})
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
        mainText: res.text,
        appendList: appendList,
        listNumber: appendList.length,
        likenumber: res.like,
        allTeacherInfo: allTeacherInfo,
        allParentInfo: allParentInfo
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