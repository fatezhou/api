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
  },

  // 新消息 传递formid
  formSubmit_collect: function(e) {
    let formId = e.detail.formId;
    wx.request({
      url: app.globalData.minidopeApi.putFormId,
      data: {
        "authorId": app.globalData.userId,
        "authorType": app.globalData.userType,
        "formId": formId,
        "openId": app.globalData.openid,
        "unionId": app.globalData.unionid,
        "accesstoken": app.globalData.token,
      },
      method: 'post',
      success: function(res) {}
    })
  },

  // 班主任编辑助教记录
  toeditRecord: function(e) {
    if(app.globalData.role == 1){
      app.globalData.reviewList = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '../pull/review'
      })
    }
  },
  // 记录详情页
  todetail: function(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: "detail?recordId=" + item.recordId + "&mainText=" + item.text + "&orgAuthorId=" + item.authorId + "&orgAuthorType=" + item.authorType + "&studentId=" + item.studentId + "&name=" + item.name + "&dateTime=" + item.dateTime + "&avatarUrl=" + item.avatarUrl,
    })
  },
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

    // 获取家长列表
    http.getParents()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    http.getReviewList(function(res) {
      console.info(res)
    })
    var that = this
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
              that.getGrowthRecordsWithoutAppend()
            }
          })
        }
      })
    } else {
      that.getGrowthRecordsWithoutAppend()
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
                if (that.data.recordSize !== res.size) {
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
                }
              })
              wx.stopPullDownRefresh()
            }
          })
        }
      })
    } else {
      http.getGrowthRecordsWithoutAppend(0, 0, 10, function(res) {
        if (that.data.recordSize !== res.size) {
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
        }
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
              app.globalData.recordsList[j].name = (studentList[i].nickname == "" ? studentList[i].name : studentList[i].nickname);
              app.globalData.recordsList[j].avatarUrl = studentList[i].avatarUrl;
            }
          }
        }
        that.setData({
          recordsList: app.globalData.recordsList
        })
        wx.hideLoading()
      }
    })
  },

  // 获取教师列表
  getTeachers: function() {
    http.getTeachers(function(res) {
      if (res === 0) {

      }
    })
  },

})