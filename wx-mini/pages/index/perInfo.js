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
    recordsList: '',

    appendList: '',
    listNumber: '',
    likenumber: '',
    recordId: '',
    recordWithAppend: '',
    recordWithAppends: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      recordWithAppends: []
    })
    // if (app.globalData.perTeacherRecords == true) {
    // perTeacherRecords = true
    // } else {
    perTeacherRecords = false
    // }
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
    // console.info(self.data.recordsList)
    // console.info('----------====')
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


    var recordsList = self.data.recordsList

    for (var i = 0; i < recordsList.length; i++) {
      var self = this;
      var gData = app.globalData;
      var recordIds = recordsList[i].recordId
      wx.request({
        url: gData.oneGrowthRecordWithAppendUrl,
        data: {
          unionid: gData.unionid,
          openid: gData.openid,
          recordId: recordIds
        },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function(e) {

          if (e.data.code == 0) {
            self.data.recordWithAppend = e.data.data.record
            // self.data.appendList = e.data.data.record.append;
            // self.data.recordId = e.data.data.record.recordId
            // self.data.likenumber = e.data.data.record.like;
            // self.setData({
            //   recordWithAppend: self.data.recordWithAppend
            // });
            // console.info(self.data.recordWithAppend)
          }
          // console.info(self.data.appendList)
          var allTeacherInfo = app.globalData.allTeacherInfo
          for (var i = 0; i < self.data.recordWithAppend.append.length; i++) {
            for (var j = 0; j < allTeacherInfo.length; j++) {
              if (self.data.recordWithAppend.append[i].authorId === allTeacherInfo[j].teacherId) {
                self.data.recordWithAppend.append[i].authorName = allTeacherInfo[j].nickname
              }
            }
          }
          console.info(self.data.recordWithAppend)
          var recordWithAppends = self.data.recordWithAppends.concat(self.data.recordWithAppend)
          // recordWithAppend[0].appendList = 
          self.setData({
            recordWithAppend: self.data.recordWithAppend,
            recordWithAppends: recordWithAppends
            // appendList: self.data.appendList,
            // listNumber: self.data.appendList.length,
            // likenumber: self.data.likenumber
          })

        },

      })
    }
    setTimeout(function() {
      console.info(self.data.recordWithAppends)
    }, 2000)

  },

  getGrowthRecords: function() {
    var that = this;
    // console.info(perTeacherRecords)
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
        // console.info(res)
        perGrowthRecords = res.data.data.records
        // console.log(perGrowthRecords)
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = " ";
        }
        that.setData({
          recordsList: res.data.data.records,
          // recordSize: res.data.data.records.length
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