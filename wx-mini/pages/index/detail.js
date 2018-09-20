// pages/index/detail.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainText: "",
    recordId: 0,
    appendList: [],
    listNumber: 0,
    studentId: 0,
    orgAuthorId: 0,
    orgAuthorType: 0,
    name: "加载中",
    recordSize: "正在查询记录个数",

    imgUrl: [],
    showswiper: '',
    currentid: '',
    bigImgUrl: '',
    canShowBigImg: false,

    hideBtn: false,

    imgUrl: [],
    imgUrllength: '',
    bigImgUrl: '',
    canShowBigImg: false,
    allteacherInfo: [],

    likenumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.allTeacherInfo = app.globalData.allTeacherInfo
    this.data.recordId = options.recordId;
    console.info(options);
    this.data.mainText = options.mainText;
    this.data.studentId = options.studentId;
    this.data.orgAuthorId = options.orgAuthorId;
    this.data.orgAuthorType = options.orgAuthorType;
    this.data.recordId = options.recordId;
    this.data.name = options.name;
    this.data.dateTime = options.dateTime;
    this.setData(this.data);
    console.info(app.globalData.oneGrowthRecordWithAppendUrl);
    this.getRecordSize();
    console.info(app.globalData.contact)
    console.info('------------------')
    for (var i = 0; i < app.globalData.contact.length; i++) {
      if (app.globalData.contact[i].recordId == options.recordId) {
        this.setData({
          imgUrl: app.globalData.contact[i].pictureUrls
        })
      }
    }
    console.info(this.data.imgUrl)
    this.setData({
      imgUrllength: this.data.imgUrl.length
    })

    if (options.hideBtn) {
      this.setData({
        hideBtn: true
      })
    } else {
      this.setData({
        hideBtn: false
      })
    }

  },

  like: function(e) {
    var gData = app.globalData
    var that = this
    console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    wx.request({
      url: gData.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionId,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": 1, //1: teacher, 2: parent",
        "recordId": recordId,
        "parentRecordId": that.data.recordId,
        "orgAuthorId": authorId,
        "orgAuthorType": 1
      },
      success: function(res) {
        console.info(res)
        if (res.data.code == 4) {
          wx.request({
            url: gData.putRecordLike,
            method: 'post',
            data: {
              // "unionid": gData.unionId,
              // "openid": gData.openid,
              "authorId": gData.userId, //自己的id
              "authorType": 1, //1: teacher, 2: parent",
              "recordId": recordId,
              "parentRecordId": that.data.recordId,
              'cancel': true
              // "orgAuthorId": authorId,
              // "orgAuthorType": 1
            },
            success: function(res) {
              console.info(res)
              that.show()
              return
            }
          })
        }
        that.show()
      }
    })
  },

  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showswiper
    })
  },

  notShowImg: function() {
    this.setData({
      canShowBigImg: false
    })
  },

  goMoreRecords: function(e) {
    // getApp().globalData.studentId = this.data.studentId;
    // getApp().globalData.showAllStudents = false;
    // console.info(getApp().globalData);
    // wx.switchTab({
    //   url: '../index/index',
    // });

    wx.navigateTo({
      url: '../index/perInfo?studentId=' + this.data.studentId,
    })
  },
  getRecordSize: function() {
    var gData = getApp().globalData;
    var self = this;
    wx.request({
      url: gData.minodopeApi.recordSizeUrl,
      data: {
        "studentId": self.data.studentId
      },
      success: function(e) {
        self.data.recordSize = "" + e.data.data.count + "条成长记录";
        self.setData(self.data);
      },
      method: "POST",
      complete: function(e) {
        console.info(e);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  show: function() {
    var self = this;
    var gData = app.globalData;
    wx.request({
      url: gData.oneGrowthRecordWithAppendUrl,
      data: {
        unionid: gData.unionid,
        openid: gData.openid,
        recordId: parseInt(this.data.recordId)
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(e) {
        if (e.data.code == 0) {
          self.data.appendList = e.data.data.record.append;
          self.data.likenumber = e.data.data.record.like;
          self.setData(self.data);
        }
        console.info(self.data.appendList)
        var allTeacherInfo = app.globalData.allTeacherInfo
        for (var i = 0; i < self.data.appendList.length; i++) {
          for (var j = 0; j < allTeacherInfo.length; j++) {
            if (self.data.appendList[i].authorId === allTeacherInfo[j].teacherId) {
              self.data.appendList[i].authorName = allTeacherInfo[j].nickname
            }
          }
        }
        self.setData({
          appendList: self.data.appendList,
          listNumber: self.data.appendList.length,
          likenumber: self.data.likenumber
        })
        console.info(self.data.appendList)
      },
      fail: function(e) {

      },
      complete: function(e) {
        console.info(e);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.show()
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