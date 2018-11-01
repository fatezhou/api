// pages/timeline/timeline.js
const app = getApp()
var http = require('../../utils/http.js')

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

    userId: '',
    defaultAvatar: '',

    // 只有记录
    recordsList: [],
    recordsListToGetAppend: [],
    // 带评论的记录
    recordWithAppends: [],

    allTeacherInfo: [],
    allParentInfo: [],

    noTextPrompt: '',
    recordId: 0,
  },
  // 图片放大
  showBigImg: function(e) {
    var urls = []
    urls[0] = e.currentTarget.dataset.showimg
    wx.previewImage({
      current: e.currentTarget.dataset.showimg,
      urls: urls
    })
  },

  // 全文展开折叠
  showmore: function(e) {
    for (var i = 0; i < this.data.recordsList.length; i++) {
      if (this.data.recordsList[i].recordId == e.currentTarget.dataset.recordid) {
        this.data.recordsList[i].isfold = !this.data.recordsList[i].isfold
        this.setData({
          recordsList: this.data.recordsList
        })
        break
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.allTeacherInfo = app.globalData.teacherList
    this.data.allParentInfo = app.globalData.parentList
    this.data.userId = app.globalData.userId
    this.data.studentId = parseInt(options.studentId)

    var that = this
    for (var i = 0; i < app.globalData.studentList.length; i++) {
      if (app.globalData.studentList[i].studentId == this.data.studentId) {
        this.data.studentSex = app.globalData.studentList[i].sex
        this.data.studentName = (app.globalData.studentList[i].name == '' ? app.globalData.studentList[i].nickname : app.globalData.studentList[i].name)
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
    this.setData({
      recordId: 0,
      recordsList: [],
      recordWithAppends: []
    })
    this.getTimeline()
  },

  getTimeline: function() {
    var that = this;
    http.getRecordSize(this.data.studentId, function(res) {
      that.setData({
        recordWithAppendSize: res
      })
    })
    http.getGrowthRecordsWithoutAppend(that.data.recordId, that.data.studentId, 10, function(res) {
      if (that.data.recordId == 0) {
        that.setData({
          recordSize: res.size,
        })
      }

      if (res.size != 0) {
        that.data.recordsList = that.data.recordsList.concat(res.records)
        app.globalData.timelineRecordsList = that.data.recordsList
        that.setData({
          recordsList: that.data.recordsList,
          recordsListToGetAppend: res.records
        })
        // 获取最后一条recordId 用于加载之后的记录
        that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
        that.setData({
          recordId: that.data.recordId
        })
        that.getAppendByRecordId()
      }
    })
  },

  getAppendByRecordId: function() {
    var that = this;
    for (var i = 0; i < that.data.recordsListToGetAppend.length; i++) {
      http.getoneGrowthRecordWithAppend(that.data.recordsListToGetAppend[i].recordId, function(res) {
        console.info(res)

        // 排序  修复 点赞图标可能出现两个的问题 
        if (res.likes) {
          if (res.likes.teacher.length > 0) {
            for (var i = 0; i < res.likes.teacher.length; i++) {
              var length = res.likes.teacher.length
              if (res.likes.teacher[i] == app.globalData.userId) {
                var temp = res.likes.teacher[length - 1]
                res.likes.teacher[length - 1] = res.likes.teacher[i]
                res.likes.teacher[i] = temp
                break
              }
            }
          }
        }

        for (var t = 0; t < res.append.length; t++) {
          res.append[t].isfold = true
          if (res.append[t].text.length > 100) {
            res.append[t].showTextBtn = true
          }

          // 排序  修复 点赞图标可能出现两个的问题 
          if (res.append[t].like) {
            if (res.append[t].like.teacher.length > 0) {
              for (var i = 0; i < res.append[t].like.teacher.length; i++) {
                var length = res.append[t].like.teacher.length
                if (res.append[t].like.teacher[i] == app.globalData.userId) {
                  var temp = res.append[t].like.teacher[length - 1]
                  res.append[t].like.teacher[length - 1] = res.append[t].like.teacher[i]
                  res.append[t].like.teacher[i] = temp
                  break
                }
              }
            }
          }
        }
        var allTeacherInfo = app.globalData.teacherList
        var allParentInfo = app.globalData.parentList

        for (var i = 0; i < res.append.length; i++) {
          if (res.append[i].authorType == 1) {
            for (var j = 0; j < allTeacherInfo.length; j++) {
              if (res.append[i].authorId == allTeacherInfo[j].teacherId) {
                res.append[i].authorName = (allTeacherInfo[j].nickname == "" ? allTeacherInfo[j].name : allTeacherInfo[j].nickname)
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
        }
        that.data.recordWithAppends = that.data.recordWithAppends.concat(res)
        that.setData({
          recordWithAppends: that.data.recordWithAppends,
        })
      })
    }
  },

  like: function(e) {
    var that = this

    var recordId = e.currentTarget.dataset.recordid
    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)
    var orgAuthorId = 0
    var orgAuthorType = 0
    if (e.currentTarget.dataset.orgauthorid) {
      orgAuthorId = e.currentTarget.dataset.orgauthorid
      orgAuthorType = e.currentTarget.dataset.orgauthortype
    }

    http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, false, function(res) {
      if (res == 4) {
        http.putRecordLike(recordId, parentRecordId, orgAuthorId, orgAuthorType, true, function(res) {})
      }
    })

    for (var i = 0; i < this.data.recordWithAppends.length; i++) {
      if (this.data.recordWithAppends[i].recordId == parentRecordId) {
        for (var j = 0; j < this.data.recordWithAppends[i].append.length; j++) {
          if (this.data.recordWithAppends[i].append[j].recordId == recordId) {
            if (this.data.recordWithAppends[i].append[j].like) {
              if (this.data.recordWithAppends[i].append[j].like.teacher.length > 0) {
                for (var k = 0; k < this.data.recordWithAppends[i].append[j].like.teacher.length; k++) {
                  if (this.data.recordWithAppends[i].append[j].like.teacher[k] == app.globalData.userId) {
                    this.data.recordWithAppends[i].append[j].like.teacher.splice(k, 1)
                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                  } else if ((k + 1) == this.data.recordWithAppends[i].append[j].like.teacher.length) {
                    this.data.recordWithAppends[i].append[j].like.teacher.push(app.globalData.userId)
                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                    break;
                  }
                }
              } else {
                this.data.recordWithAppends[i].append[j].like.teacher[0] = app.globalData.userId
                that.setData({
                  recordWithAppends: this.data.recordWithAppends
                })
              }
            } else {
              this.data.recordWithAppends[i].append[j].like = {}
              this.data.recordWithAppends[i].append[j].like.teacher = []
              this.data.recordWithAppends[i].append[j].like.teacher[0] = app.globalData.userId
              that.setData({
                recordWithAppends: this.data.recordWithAppends
              })
            }
          }
        }
      }
    }

    if (parentRecordId == 0) {
      for (var j = 0; j < this.data.recordWithAppends.length; j++) {
        if (this.data.recordWithAppends[j].recordId == recordId) {
          if (this.data.recordWithAppends[j].likes) {
            if (this.data.recordWithAppends[j].likes.teacher.length > 0) {
              for (var k = 0; k < this.data.recordWithAppends[j].likes.teacher.length; k++) {
                // 已经点赞了 就取消
                if (this.data.recordWithAppends[j].likes.teacher[k] == app.globalData.userId) {
                  this.data.recordWithAppends[j].likes.teacher.splice(k, 1)
                  that.setData({
                    recordWithAppends: this.data.recordWithAppends
                  })
                  app.globalData.recordWithAppends = this.data.recordWithAppends
                } else if ((k + 1) == this.data.recordWithAppends[j].likes.teacher.length) {
                  this.data.recordWithAppends[j].likes.teacher.push(app.globalData.userId)
                  that.setData({
                    recordWithAppends: this.data.recordWithAppends
                  })
                  app.globalData.recordWithAppends = this.data.recordWithAppends
                  break;
                }
              }
            } else {
              this.data.recordWithAppends[j].likes.teacher[0] = app.globalData.userId
              that.setData({
                recordWithAppends: this.data.recordWithAppends
              })
              app.globalData.recordWithAppends = this.data.recordWithAppends
            }
          } else {
            this.data.recordWithAppends[j].likes = {}
            this.data.recordWithAppends[j].likes.teacher = []
            this.data.recordWithAppends[j].likes.teacher[0] = app.globalData.userId
            that.setData({
              recordWithAppends: this.data.recordWithAppends
            })
            app.globalData.recordWithAppends = this.data.recordWithAppends
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
    var that = this
    this.setData({
      recordWithAppends: []
    })
    http.getRecordSize(this.data.studentId, function(res) {
      if (that.data.recordWithAppendSize != res) {
        that.setData({
          recordWithAppendSize: res
        })
      }
    })
    http.getGrowthRecordsWithoutAppend(0, that.data.studentId, 10, function(res) {
      if (that.data.recordId == 0) {
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
        that.data.recordsList = res.records
        app.globalData.timelineRecordsList = that.data.recordsList
        that.setData({
          recordsList: that.data.recordsList,
          recordsListToGetAppend: res.records
        })
        // 获取最后一条recordId 用于加载之后的记录
        that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
        that.setData({
          recordId: that.data.recordId
        })
        that.getAppendByRecordId()
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