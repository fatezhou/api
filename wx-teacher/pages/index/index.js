//index.js
//获取应用实例
const app = getApp()

var template = require('../../template/template.js')
var http = require('../../utils/http.js')
Page({
  data: {
    recordSize: '',
    recordsList: '',

    defaultAvatar: '',

    isIpx: '',
    noTextPrompt: '',
    recordId: 0,

    role: '',
  },

  // 新消息 传递formid
  formSubmit_collect: function(e) {
    console.warn(e)
    let navigateto = e.target.dataset.navigateto
    let formId = e.detail.formId;
    var data = {}
    data = {
      authorId: app.globalData.userId,
      authorType: app.globalData.userType,
      formId: formId,
      openId: app.globalData.openId,
      unionId: app.globalData.unionId,
      accesstoken: app.globalData.token,
    }
    console.warn(1)
    console.warn(JSON.stringify(data))
    wx.request({
      url: app.globalData.minidopeApi.putFormId,
      data: data,
      method: 'POST',
      success: function(res) {
        console.warn(res.data)
      }
    })

    if (navigateto == "newMess") {
      wx.navigateTo({
        url: 'newMess',
      })
    } else if (navigateto == "pull") {
      wx.navigateTo({
        url: './../pull/pull?type=record',
      })
    } else if (navigateto == "todetail") {
      // 记录详情页
      var item = e.currentTarget.dataset.item
      if (item.publishState == 1) {
        wx.navigateTo({
          url: "detail?recordId=" + item.recordId + "&mainText=" + item.text + "&orgAuthorId=" + item.authorId + "&orgAuthorType=" + item.authorType + "&studentId=" + item.studentId + "&name=" + item.studentName + "&dateTime=" + item.dateTime + "&avatarUrl=" + item.studentAvatarUrl,
        })
      }
    }
  },

  // 班主任编辑助教记录
  toeditRecord: function(e) {
    // if (app.globalData.role == 2) {
    app.globalData.reviewList = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../pull/review'
    })
    // }
  },
  // 记录详情页
  // todetail: function(e) {
  //   var item = e.currentTarget.dataset.item
  //   if (item.publishState == 1) {
  //     wx.navigateTo({
  //       url: "detail?recordId=" + item.recordId + "&mainText=" + item.text + "&orgAuthorId=" + item.authorId + "&orgAuthorType=" + item.authorType + "&studentId=" + item.studentId + "&name=" + item.studentName + "&dateTime=" + item.dateTime + "&avatarUrl=" + item.studentAvatarUrl,
  //     })
  //   }
  // },
  //事件处理函数
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

  onLoad: function() {
    var that = this
    // 底部tabbar
    if (app.globalData.isIpx) {
      this.setData({
        isIpx: app.globalData.isIpx
      })
    }
    template.tabbar("tabBar", 0, this)

    // 默认头像
    http.getDefaultAvatar(function(res) {
      if (res === 0) {
        that.setData({
          defaultAvatar: app.globalData.defaultAvatar
        })
      }
    })

    wx.showLoading({
      title: '加载中...',
    })
    that.setData({
      recordId: 0,
    })
    app.globalData.recordsList = []
    if (!app.globalData.userId && !app.globalData.unionId) {
      http.login(function(res) {
        if (res === 0) {
          http.getTeacherInfo(function(res) {
            if (res === 0) {
              that.setData({
                role: app.globalData.role
              })
              that.getGrowthRecordsWithoutAppend()
            }
          })
        }
      })
    } else {
      that.setData({
        role: app.globalData.role
      })
      that.getGrowthRecordsWithoutAppend()
    }

    // 获取家长列表
    http.getParents()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    if (that.data.recordsList) {
      http.getGrowthRecordsWithoutAppend(0, 0, 10, function(res) {
        if (that.data.recordSize !== res.size || app.globalData.isReview) {
          // 记录数不同 才重新设置
          app.globalData.recordsList = res.records
          app.globalData.isReview = false
          that.setData({
            recordSize: res.size,
            recordsList: app.globalData.recordsList,
          })
          // 获取最后一条recordId 用于加载之后的记录
          that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
          that.setData({
            recordId: that.data.recordId
          })
          that.getStudents()
          that.getTeachers()
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    if (!app.globalData.userId && !app.globalData.unionId) {
      http.login(function(res) {
        if (res === 0) {
          http.getTeacherInfo(function(res) {
            if (res === 0) {
              http.getGrowthRecordsWithoutAppend(0, 0, 10, function(res) {
                // if (that.data.recordSize !== res.size) {
                // 记录数不同 才重新设置
                app.globalData.recordsList = res.records
                that.setData({
                  recordSize: res.size,
                  recordsList: app.globalData.recordsList,
                })
                // 获取最后一条recordId 用于加载之后的记录
                that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
                that.setData({
                  recordId: that.data.recordId
                })
                that.getStudents()
                that.getTeachers()
                // }
              })
              wx.stopPullDownRefresh()
            }
          })
        }
      })
    } else {
      http.getGrowthRecordsWithoutAppend(0, 0, 10, function(res) {
        // if (that.data.recordSize !== res.size) {
        // 记录数不同 才重新设置
        app.globalData.recordsList = res.records
        that.setData({
          recordSize: res.size,
          recordsList: app.globalData.recordsList,
        })
        // 获取最后一条recordId 用于加载之后的记录
        that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
        that.setData({
          recordId: that.data.recordId
        })
        that.getStudents()
        that.getTeachers()
        // }
      })
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      noTextPrompt: '无更多记录'
    })
    this.getGrowthRecordsWithoutAppend()
  },

  getGrowthRecordsWithoutAppend: function() {
    var that = this
    http.getGrowthRecordsWithoutAppend(that.data.recordId, 0, 10, function(res) {
      if (that.data.recordId == 0) {
        that.setData({
          recordSize: res.size,
        })
      }
      if (res.size != 0) {
        app.globalData.recordsList = app.globalData.recordsList.concat(res.records)
        that.setData({
          recordsList: app.globalData.recordsList,
        })
        // 获取最后一条recordId 用于加载之后的记录
        that.data.recordId = res.records.slice(res.records.length - 1)[0].recordId
        that.setData({
          recordId: that.data.recordId
        })
        that.getStudents()
        that.getTeachers()
      } else {
        wx.hideLoading()
        http.getStudents(function(res) {})
        http.getTeachers(function(res) {})
      }
    })
  },

  // 给记录的学生id 添加学生头像 昵称
  getStudents: function() {
    var that = this
    http.getStudents(function(res) {
      if (res === 0) {
        var studentList = app.globalData.studentList
        for (var i in studentList) {
          for (var j in app.globalData.recordsList) {
            if (studentList[i].studentId == app.globalData.recordsList[j].studentId) {
              app.globalData.recordsList[j].studentName = (studentList[i].nickname == "" ? studentList[i].name : studentList[i].nickname);
              app.globalData.recordsList[j].studentAvatarUrl = studentList[i].avatarUrl;
            }
          }
        }
        that.setData({
          recordsList: app.globalData.recordsList
        })
        console.info(app.globalData.recordsList)
        wx.hideLoading()
      }
    })
  },

  // 获取教师列表
  getTeachers: function() {
    var that = this
    http.getTeachers(function(res) {
      if (res === 0) {
        var teacherList = app.globalData.teacherList
        for (var i in teacherList) {
          for (var j in app.globalData.recordsList) {
            var assistId = app.globalData.recordsList[j].assistId
            if (assistId) {
              if (teacherList[i].teacherId == assistId) {
                app.globalData.recordsList[j].teacherName = (teacherList[i].nickname == "" ? teacherList[i].name : teacherList[i].nickname);
                app.globalData.recordsList[j].teacherAvatarUrl = teacherList[i].avatarUrl;
              }
            } else {
              if (teacherList[i].teacherId == app.globalData.recordsList[j].mainTeacherId) {
                app.globalData.recordsList[j].teacherName = (teacherList[i].nickname == "" ? teacherList[i].name : teacherList[i].nickname);
                app.globalData.recordsList[j].teacherAvatarUrl = teacherList[i].avatarUrl;
              }
            }

          }
        }
        that.setData({
          recordsList: app.globalData.recordsList
        })
      }
    })
  },

})