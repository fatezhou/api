//index.js
//获取应用实例
const app = getApp()
var template = require('../../template/template.js')
var http = require('../../utils/http.js')
var recordId;
var contact;
var getrecordsList;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    studentId: 2,
    recordSize: 0,
    name: "",
    qqq: '',
    Imgpath: '',

    norecord: '',
    isIpx: '',
    noTextPrompt: '',
  },

  todetail: function(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: "detail?recordId=" + item.recordId + "&mainText=" + item.text + "&orgAuthorId=" + item.authorId + "&orgAuthorType=" + item.authorType + "&studentId=" + item.studentId + "&name=" + item.name + "&dateTime=" + item.dateTime + "&avatarUrl=" + item.avatarUrl + "&familyId=" + item.familyId,
    })
  },
  //事件处理函数
  showmore: function(e) {

    for (var o = 0; 0 < this.data.recordsList.length; o++) {
      if (this.data.recordsList[o].recordId == e.currentTarget.dataset.recordid) {
        this.data.recordsList[o].isfold = !this.data.recordsList[o].isfold
        this.setData({
          recordsList: this.data.recordsList
        })
        break
      }
    }

  },

  formSubmit_collect: function(e) {

    let formId = e.detail.formId;

    wx.request({
      url: app.globalData.putFormId,
      data: {
        "authorId": app.globalData.userId,
        "authorType": app.globalData.userType,
        "formId": formId,
        "openId": app.globalData.openid,
        "unionId": app.globalData.unionid,
        "accesstoken": app.globalData.token,
        "familyId": 0,
      },
      method: 'post',
      success: function(res) {

      }
    })
  },

  onLoad: function(options) {
    if (app.globalData.isIpx) {
      this.setData({
        isIpx: app.globalData.isIpx
      })
    }
    template.tabbar("tabBar", 0, this)
    if (options.new_message) {
      console.info(options.new_message)
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    app.globalData.chooseStudent = ''
    var that = this
    http.login(function(res) {
      recordId = res.slice(res.length - 1)[0].recordId
      for (var t = 0; t < res.length; t++) {
        res[t].text = decodeURIComponent(res[t].text)
        res[t].isfold = true
        if (res[t].text.length > 100) {
          res[t].showTextBtn = true
        }
      }

      that.setData({
        recordsList: res,
        recordSize: app.globalData.indexSize,
        Imgpath: app.globalData.Imgpath,
      });
      wx.hideLoading()
    })

  },


  getContactFromGData: function() {
    var self = this;

    for (var i in app.globalData.allStudent) {
      for (var j in getrecordsList) {
        if (app.globalData.allStudent[i].studentId == getrecordsList[j].studentId) {
          getrecordsList[j].name = (app.globalData.allStudent[i].nickname == "" ? app.globalData.allStudent[i].name : app.globalData.allStudent[i].nickname);
          getrecordsList[j].avatarUrl = app.globalData.allStudent[i].avatarUrl;
          getrecordsList[j].familyId = app.globalData.allStudent[i].familyId

        }
      }
    }

    app.globalData.recordsList = app.globalData.recordsList.concat(getrecordsList)

    self.setData({
      recordsList: app.globalData.recordsList,
    });
  },

  onShow: function() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.chooseStudent = ''
    var that = this

    http.login(function(res) {

      that.setData({
        norecord: app.globalData.norecord
      })

      if (!app.globalData.recordId || app.globalData.recordId != res[0].recordId) {

        app.globalData.recordId = res[0].recordId
        recordId = res.slice(res.length - 1)[0].recordId

        that.setData({
          recordsList: res,
          recordSize: app.globalData.indexSize,
          Imgpath: app.globalData.Imgpath,
        });
        wx.hideLoading()
      } else {

        wx.hideLoading()

      }

    })

    // 获取所有教师信息
    if (!app.globalData.allTeacherInfo) {
      wx.request({
        url: app.globalData.getTeachers,
        method: 'post',
        data: {
          "pages": 100
        },
        success: function(res) {
          app.globalData.allTeacherInfo = res.data.data.teachers
          console.info(app.globalData.allTeacherInfo)
        }
      })
    }
    // 所有家长信息
    if (!app.globalData.allParentInfo) {
      wx.request({
        url: app.globalData.getParentsInfo,
        method: 'POST',
        data: {
          unionid: app.globalData.unionid,
          openid: app.globalData.openid,
        },
        success: function(res) {
          if (res.data.code == 0) {
            app.globalData.allParentInfo = res.data.data.records
          }
        },
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    http.login(function(res) {
      recordId = res.slice(res.length - 1)[0].recordId

      that.setData({
        recordsList: res
      });
      wx.stopPullDownRefresh()

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    var that = this;
    that.setData({
      noTextPrompt: '无更多记录'
    })
    wx.request({
      url: app.globalData.getGrowthRecordsWithoutAppend,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "recordId": recordId,
        "authorId": app.globalData.userId,
        "authorType": app.globalData.userType,
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        if (res.data.data.records.length != 0) {

          recordId = res.data.data.records.slice(res.data.data.records.length - 1)[0].recordId
          for (var t = 0; t < res.data.data.records.length; t++) {
            res.data.data.records[t].text = decodeURIComponent(res.data.data.records[t].text)
            res.data.data.records[t].isfold = true
            if (res.data.data.records[t].text.length > 100) {
              res.data.data.records[t].showTextBtn = true
            }
          }
          getrecordsList = res.data.data.records
          for (var i in getrecordsList) {
            getrecordsList[i].name = "";
            getrecordsList[i].avatarUrl = '';
            getrecordsList[i].familyId = '';
          }
          that.getContactFromGData();
        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {

  }
})