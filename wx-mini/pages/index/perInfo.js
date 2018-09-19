// pages/index/perInfo.js
const app = getApp()
var studentId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allGrowthRecords: '',
    studentId: '',
    recordSize: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    studentId = options.studentId
    var recordSize = 0
    console.info(app.globalData.contact)
    for (var i = 0; i < app.globalData.contact.length; i++) {
      if (studentId == app.globalData.contact[i].studentId) {
        recordSize++
      }
    }

    this.setData({
      allGrowthRecords: app.globalData.contact,
      studentId: studentId,
      recordSize: recordSize
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
    this.getGrowthRecords()
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
    this.getGrowthRecords()
  },

  getContact: function () {
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
      success: function (res) {
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

        var recordSize = 0
        console.info(app.globalData.contact)
        for (var i = 0; i < app.globalData.contact.length; i++) {
          if (studentId == app.globalData.contact[i].studentId) {
            recordSize++
          }
        }

        that.setData({
          allGrowthRecords: app.globalData.contact,
          studentId: studentId,
          recordSize: recordSize
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getGrowthRecords: function () {
    var that = this;
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
      success: function (res) {
        app.globalData.allGrowthRecords = res.data.data.records
        console.log(app.globalData.allGrowthRecords)
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = "加载中...";
        }
        that.setData({
          recordsList: res.data.data.records,
          // recordSize: res.data.data.records.length
        });
        that.getContact();
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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