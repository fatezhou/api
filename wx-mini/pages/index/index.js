//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    studentId: 2,
    recordSize: 0,
    name: "",
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.info(app.globalData);
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


  },

  getContact: function() {
    var self = this;
    var that = this;
    var gData = app.globalData;
    var url = gData.minodopeApi.contactUrl;
    wx.request({
      url: url,
      data: {
        unionid: gData.unionid,
        openid: gData.openid,
        authorId: gData.userId, //可选, 只要特定老师发的
        authorType: gData.userType, //保留参数, 用来标记是老师还是家长
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var contact = res.data.data.contact[1].member;
        for (var i in contact) {
          for (var j in self.data.recordsList) {
            if (contact[i].studentId == self.data.recordsList[j].studentId) {
              self.data.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
              // break;
            }
          }
        }
        self.setData({
          recordsList: self.data.recordsList
        });
        app.globalData.contact = self.data.recordsList;
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getGrowthRecords: function() {
    // console.info(app.globalData.unionid)
    // console.info(app.globalData.openid)
    var that = this;
    // var gData = getApp().globalData;
    // var requestData = {
    //   "unionid": "oO_8zy0yAhxBcEwEnPahvblLIGe1",
    //   "openid": "oO_8zy0yAhxBcEwEnPahvblLIGe1",
    //   //"studentId": gData.studentId,
    //   //"authorId": gData.userId,//可选, 只要特定老师发的
    //   //"authorType": gData.userType,//保留参数, 用来标记是老师还是家长
    // };
    wx.request({
      url: app.globalData.getGrowthRecordsWithoutAppend,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        app.globalData.allGrowthRecords = res.data.data.records
        console.log(app.globalData.allGrowthRecords)
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = "加载中...";
        }
        that.setData({
          recordsList: res.data.data.records,
          recordSize: res.data.data.records.length
        });
        that.getContact();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onShow: function() {


    // var that = this;
    // var gData = getApp().globalData;
    // var requestData = {
    //   "unionid": "oO_8zy0yAhxBcEwEnPahvblLIGe1",
    //   "openid": "oO_8zy0yAhxBcEwEnPahvblLIGe1",
    //"studentId": gData.studentId,
    //"authorId": gData.userId,//可选, 只要特定老师发的
    //"authorType": gData.userType,//保留参数, 用来标记是老师还是家长
    // };

    // if (gData.showAllStudents == false) {

    //   this.setData({
    //     studentId: gData.studentId
    //   });
    //   requestData.studentId = gData.studentId;
    // }

    this.getGrowthRecords()

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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getGrowthRecords()
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {

  }
})

// 下拉刷新