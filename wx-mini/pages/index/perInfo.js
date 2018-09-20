// pages/index/perInfo.js
const app = getApp()
var studentId;
var perGrowthRecords;
var perTeacherRecords = false;
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
    if (options.perTeacherRecords) {
      perTeacherRecords = true
    }
    studentId = options.studentId

    this.setData({
      studentId: studentId,
      recordSize: app.globalData.studentRecordCount
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

  getContact: function() {
    var self = this;
    var that = this;

    var contact = app.globalData.allStudent
    console.info(self.data.recordsList)
    console.info('----------====')
    for (var i in contact) {
      for (var j in self.data.recordsList) {
        if (contact[i].studentId == self.data.recordsList[j].studentId) {
          self.data.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);

        }
      }
    }
    self.setData({
      recordsList: self.data.recordsList
    });
    app.globalData.contact = self.data.recordsList;



    that.setData({
      allGrowthRecords: app.globalData.contact,
      studentId: studentId,

    })
    // },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },

  getGrowthRecords: function() {
    var that = this;
    if (perTeacherRecords) {
      var data = {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "studentId": studentId,
        "pageSize": that.data.recordSize,
        "authorType": app.globalData.userType,
        "authorId": app.globalData.userId
      }
    } else {
      var data = {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "studentId": studentId,
        "pageSize": that.data.recordSize,
      }
    }

    wx.request({
      url: app.globalData.getGrowthRecordsWithoutAppend,
      data: data,
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.info(res)
        perGrowthRecords = res.data.data.records
        console.log(perGrowthRecords)
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = "加载中...";
        }
        that.setData({
          recordsList: res.data.data.records,

        });
        that.getContact();
      },
      fail: function(res) {},
      complete: function(res) {},
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