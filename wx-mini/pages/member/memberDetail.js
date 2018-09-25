// pages/member/memberDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    name: "",
    cardCode: "",
    birthDay: "",
    freeze: "",
    studentId: 0,
    recordSize: "查询中",

    star: null,
    nowStar: false,
    Img: '',
    sex: '',
    Imgpath: '',
    avatarUrl: '',
  },
  goMoreRecords: function(e) {
    // getApp().globalData.studentId = this.data.studentId;
    // getApp().globalData.showAllStudents = false;
    // console.info(getApp().globalData);
    // wx.switchTab({
    //   url: '../index/perInfo',
    // });
    wx.navigateTo({
      url: '../index/perInfo?studentId=' + this.data.studentId + '&studentName=' + this.data.nickName + '&sex=' + this.data.sex + '&avatarUrl=' + this.data.avatarUrl,
    })
    app.globalData.perTeacherRecords = true
  },

  // 星标
  putMemberFav: function(e) {
    var that = this;
    // app.globalData.haveputMemberFav = true
    console.info(that.data.studentId)
    console.info(app.globalData.teacherInfo.teacherId)
    var statu = e.detail.value
    if (statu) {
      console.info(statu)
      wx.request({
        url: app.globalData.putMemberFav,
        data: {
          "unionid": app.globalData.unionid,
          "openid": app.globalData.openid,
          "studentId": that.data.studentId,
          "authorType": 1,
          "authorId": app.globalData.teacherInfo.teacherId,
          "cancel": false
        },
        method: 'post',
        success: function(res) {
          console.log(res)
          that.setData({
            star: true
          })
          that.getstar()
        },
      })
    } else {
      console.info(statu)
      wx.request({
        url: app.globalData.putMemberFav,
        data: {
          "unionid": app.globalData.unionid,
          "openid": app.globalData.openid,
          "studentId": that.data.studentId,
          "authorType": 1,
          "authorId": app.globalData.teacherInfo.teacherId,
          "cancel": true
        },
        method: 'post',
        success: function(res) {
          console.log(res)
          that.setData({
            star: false
          })
          that.getstar()
        },
      })
    }

  },

  getstar: function() {
    wx.request({
      url: app.globalData.minodopeApi.contactUrl,
      data: {
        unionid: app.globalData.unionid,
        openid: app.globalData.openid,
        authorId: app.globalData.userId, //可选, 只要特定老师发的
        authorType: app.globalData.userType, //保留参数, 用来标记是老师还是家长
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        // 有星标的
        app.globalData.stararr = res.data.data.contact[0].member;
      },
    })
  },

  // 跳转新建记录页面
  toAddRecard: function() {
    wx.navigateTo({
      url: '../pull/pull?name=' + this.data.name + '&studentId=' + this.data.studentId + '&avatarUrl=' + this.data.avatarUrl,
    })
  },

  // getRecordSize: function() {
  //   var gData = getApp().globalData;
  //   var self = this;
  //   wx.request({
  //     url: gData.minodopeApi.recordSizeUrl,
  //     data: {
  //       "studentId": self.data.studentId
  //     },
  //     success: function(e) {
  //       self.data.recordSize = "" + e.data.data.count + "条成长记录";
  //       self.setData(self.data);
  //     },
  //     method: "POST",
  //     complete: function(e) {
  //       console.info(e);
  //     }
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    console.info(options);
    console.info('2222')
    this.data.sex = parseInt(options.sex);
    this.data.Imgpath = app.globalData.Imgpath;
    this.data.avatarUrl = options.avatarUrl;
    this.data.nickName = options.nickName;
    this.data.name = options.name;
    this.data.cardCode = options.cardCode;
    this.data.birthDay = options.birthday;
    this.data.freeze = options.freeze == 0 ? 　"年费会员" : "普通会员";
    this.data.studentId = parseInt(options.studentId);
    this.setData(this.data);
    // this.getRecordSize();

    // wx.request({
    //   url: app.globalData.getChildGrowthRecordCount,
    //   data: {
    //     "unionid": app.globalData.unionid,
    //     "openid": app.globalData.openid,
    //     "authorId": app.globalData.userId,
    //     "authorType": 1, //1: teacher, 2: parent",
    //     "studentId": options.studentId
    //   },
    //   method: "post",
    //   success: function(res) {
    //     app.globalData.studentRecordCount = res.data.data.count
    //     console.info(res.data.data.count)
    //     that.setData({
    //       recordSize: "" + res.data.data.count + "条成长记录"
    //     })
    //   }
    // })

  },

  showLatelyImg: function() {
    var gData = app.globalData
    var that = this
    wx.request({
      url: gData.getPrePics,
      data: {
        unionid: gData.unionid,
        openid: gData.openid,
        studentId: this.data.studentId,
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.data.records)
        var haveImgRecords = res.data.data.records
        var Img = []
        for (var i = 0; i < haveImgRecords.length; i++) {
          Img = Img.concat(haveImgRecords[i].picture)
        }
        that.setData({
          Img: Img
        })
      },
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

    // app.globalData.haveputMemberFav = false
    // this.getRecordSize()
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
        console.log(res)

        var stararr = res.data.data.contact[0].member
        for (var i = 0; i < stararr.length; i++) {
          if (stararr[i].studentId == that.data.studentId) {
            that.setData({
              star: stararr[i].isStar
            })

            break;
          }
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

    wx.request({
      url: app.globalData.getChildGrowthRecordCount,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "authorId": app.globalData.userId,
        "authorType": 1, //1: teacher, 2: parent",
        "studentId": this.data.studentId
      },
      method: "post",
      success: function(res) {
        app.globalData.studentRecordCount = res.data.data.count
        console.info(res.data.data.count)
        that.setData({
          recordSize: "" + res.data.data.count + "条成长记录"
        })
      }
    })

    this.showLatelyImg()
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