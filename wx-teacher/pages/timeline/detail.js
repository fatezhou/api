// pages/timeline/detail.js
const app = getApp()
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar: '',
    userId: '',

    allTeacherInfo: '',
    allParentInfo: '',

    recordId: '',
    recordList: [],
    imgUrl: [],
    appendList: [],
  },

  // 显示大图
  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showswiper
    })
  },

  //头像跳转个人信息
  toUserInfo: function (e) {
    console.info(e)
    let item = e.currentTarget.dataset.item
    if (item.authorType == 1) {
      wx.navigateTo({
        url: '../userInfo/userInfo?teacherid=' + item.authorId,
      })
    } else {
      wx.navigateTo({
        url: '../member/parents?studentId=' + item.studentId,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.studentName
    })
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.userId = app.globalData.userId
    this.data.allTeacherInfo = app.globalData.teacherList
    this.data.allParentInfo = app.globalData.parentList
    this.data.recordId = parseInt(options.recordId);
    // 记录的配图
    for (var i = 0; i < app.globalData.recordsList.length; i++) {
      if (app.globalData.recordsList[i].recordId == this.data.recordId) {
        this.data.imgUrl = app.globalData.recordsList[i].pictureUrls
        break
      }
    }

    this.setData(this.data);
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
    http.getoneGrowthRecordWithAppend(this.data.recordId, function(res) {
      for (var i = 0; i < that.data.allTeacherInfo.length; i++) {
        if (that.data.allTeacherInfo[i].teacherId == res.authorId) {
          res.avatarUrl = that.data.allTeacherInfo[i].avatarUrl
          res.teacherName = (that.data.allTeacherInfo[i].nickname == '' ? that.data.allTeacherInfo[i].name : that.data.allTeacherInfo[i].nickname)
        }
      }

      var allTeacherInfo = app.globalData.teacherList
      var allParentInfo = app.globalData.parentList
      for (var i = 0; i < res.append.length; i++) {
        if (res.append[i].authorType == 1) {
          for (var j = 0; j < allTeacherInfo.length; j++) {
            if (res.append[i].authorId == allTeacherInfo[j].teacherId) {
              res.append[i].authorName = allTeacherInfo[j].nickname
              res.append[i].avatarUrl = allTeacherInfo[j].avatarUrl
            }
          }
        } else {
          for (var j = 0; j < allParentInfo.length; j++) {
            if (res.append[i].authorId == allParentInfo[j].parentId) {
              res.append[i].authorName = allParentInfo[j].name
              res.append[i].avatarUrl = allParentInfo[j].avatarUrl
            }
          }
        }

        // 排序  修复 点赞图标可能出现两个的问题 
        if (res.append[i].like) {
          if (res.append[i].like.teacher.length > 0) {
            for (var j = 0; j < res.append[i].like.teacher.length; j++) {
              var length = res.append[i].like.teacher.length
              if (res.append[i].like.teacher[j] == app.globalData.userId) {
                var temp = res.append[i].like.teacher[length - 1]
                res.append[i].like.teacher[length - 1] = res.append[i].like.teacher[j]
                res.append[i].like.teacher[j] = temp
                break
              }
            }
          }
        }
      }

      // 排序  修复 点赞图标可能出现两个的问题 
      if (res.likes) {
        if (res.likes.teacher.length > 0) {
          for (var j = 0; j < res.likes.teacher.length; j++) {
            var length = res.likes.teacher.length
            if (res.likes.teacher[j] == app.globalData.userId) {
              var temp = res.likes.teacher[length - 1]
              res.likes.teacher[length - 1] = res.likes.teacher[j]
              res.likes.teacher[j] = temp
              break
            }
          }
        }
      }
      that.data.recordList[0] = res
      that.setData({
        recordList: that.data.recordList,
        appendList: res.append
      })
    })
  },

  like: function(e) {
    var that = this
    var recordId = e.currentTarget.dataset.recordid

    var orgAuthorId = 0
    var orgAuthorType = 0
    if (e.currentTarget.dataset.orgauthorid) {
      orgAuthorId = e.currentTarget.dataset.orgauthorid
      orgAuthorType = e.currentTarget.dataset.orgauthortype
    }
    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)

    http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, false, function(res) {
      if (res == 4) {
        http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, true, function(res) {})
      }
    })

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
          // var like = []
          // var teacher = []
          this.data.appendList[j].like = {}
          this.data.appendList[j].like.teacher = []
          this.data.appendList[j].like.teacher[0] = app.globalData.userId
          that.setData({
            appendList: this.data.appendList
          })
        }
      }
    }

    if (parentRecordId == 0) {
      if (this.data.recordList[0].likes) {
        if (this.data.recordList[0].likes.teacher.length > 0) {
          for (var k = 0; k < this.data.recordList[0].likes.teacher.length; k++) {
            // 已经点赞了 就取消
            if (this.data.recordList[0].likes.teacher[k] == app.globalData.userId) {
              this.data.recordList[0].likes.teacher.splice(k, 1)
              this.setData({
                recordList: this.data.recordList
              })
            } else if ((k + 1) == this.data.recordList[0].likes.teacher.length) {
              this.data.recordList[0].likes.teacher.push(app.globalData.userId)
              this.setData({
                recordList: this.data.recordList
              })
              break;
            }
          }
        } else {
          this.data.recordList[0].likes.teacher[0] = app.globalData.userId

          this.setData({
            recordList: this.data.recordList
          })
        }

      } else {
        // var likes = []
        // var teacher = []
        this.data.recordList[0].likes = {}
        this.data.recordList[0].likes.teacher = []
        this.data.recordList[0].likes.teacher[0] = app.globalData.userId
        this.setData({
          recordList: this.data.recordList
        })
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