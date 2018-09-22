// pages/growthRecord/growthRecord.js
const app = getApp();
var template = require('../../template/template.js')
var http = require('../../utils/http.js')
var recordId;
var getrecordsList;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showswiper: [{
      pic: '../../image/head.png',
      name: '小葡萄',
      sex: 0,
      recardCount: 162
    }, {
      pic: '../../image/head02.png',
      name: '小苹果',
      sex: 1,
      recardCount: 115
    }, {
      pic: '../../image/head.png',
      name: '小蜜桃',
      sex: 1,
      recardCount: 16259
    }, ],

    current: 0,

    recordsList: '',
    recordSize: '',
  },

  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showpicurls
    })
  },

  // 选择学员
  swiper: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this)
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
    http.login(function(res) {
      console.info(res)
      recordId = res.slice(res.length - 1)[0].recordId

      that.getAppend()

    })

  },

  getAppend: function() {
    var that = this
    for (var i = 0; i < app.globalData.recordsList.length; i++) {
      var recordId = app.globalData.recordsList[i].recordId
      wx.request({
        url: app.globalData.minodopeApi.getOneGrowthRecordWithAppendByRecordId,
        data: {
          "unionid": app.globalData.unionid,
          "openid": app.globalData.openid,
          "recordId": recordId,
        },
        header: {},
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {

          for (var x = 0; x < app.globalData.recordsList.length; x++) {

            if (app.globalData.recordsList[x].recordId == res.data.data.record.recordId) {
              app.globalData.recordsList[x].append = res.data.data.record.append
            }
            if (app.globalData.recordsList[x].append) {
              for (var y = 0; y < app.globalData.allTeacherInfo.length; y++) {
                for (var z = 0; z < app.globalData.recordsList[x].append.length; z++) {
                  if (app.globalData.recordsList[x].append[z].authorId == app.globalData.allTeacherInfo[y].teacherId) {
                    app.globalData.recordsList[x].append[z].name = app.globalData.allTeacherInfo[y].nickname
                  }
                }
              }
            }

          }

          that.setData({
            recordsList: app.globalData.recordsList,
            recordSize: app.globalData.indexSize
          });

        },
        fail: function(res) {},
        complete: function(res) {},
      })
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
    http.login(function(res) {
      console.info(res)
      recordId = res.slice(res.length - 1)[0].recordId

      that.getAppend()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.info(recordId)
    console.info(111)
    var that = this;

    wx.request({
      url: app.globalData.minodopeApi.getGrowthRecordsWithoutAppend,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "recordId": recordId,
        // 目前写死的
        "studentId": 41,
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.info(res)
        recordId = res.data.data.records.slice(res.data.data.records.length - 1)[0].recordId
        getrecordsList = res.data.data.records
        for (var i in getrecordsList) {
          getrecordsList[i].name = " ";
        }

        that.getContactFromGData();
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  getContactFromGData: function() {
    var that = this;

    for (var i in app.globalData.allTeacherInfo) {
      for (var j in getrecordsList) {
        if (app.globalData.allTeacherInfo[i].teacherId == getrecordsList[j].authorId) {
          getrecordsList[j].name = (app.globalData.allTeacherInfo[i].nickname == "" ? app.globalData.allTeacherInfo[i].name : app.globalData.allTeacherInfo[i].nickname);
        }
      }
    }

    app.globalData.recordsList = app.globalData.recordsList.concat(getrecordsList)

    that.getAppend()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})