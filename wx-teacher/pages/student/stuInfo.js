// pages/student/stuInfo.js
const app = getApp();
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar: '',
    sex: '',
    avatarUrl: '',
    nickName: '',
    name: '',
    cardCode: '',
    birthDay: '',
    freeze: '',
    studentId: '',
    familyId: '',
    isStar: '',

    recordList: [],
  },

  goMoreRecords: function() {
    wx.navigateTo({
      url: '../timeline/timeline?studentId=' + this.data.studentId,
    })
  },

  // 跳转新建记录页面
  toAddRecard: function() {
    if(app.globalData.role != 1){
      wx.navigateTo({
        url: '../pull/pull?studentName=' + this.data.name + '&studentId=' + this.data.studentId + '&studentAvatarUrl=' + this.data.avatarUrl + '&type=record',
      })
    }
  
  },

  // 图片放大
  showBigImg: function (e) {
    var urls = []
    urls[0] = e.currentTarget.dataset.showimg
    wx.previewImage({
      current: e.currentTarget.dataset.showimg,
      urls: urls
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.sex = parseInt(options.sex);
    this.data.avatarUrl = options.avatarUrl;
    this.data.nickName = options.nickName;
    this.data.name = options.name;
    this.data.cardCode = options.cardCode;
    this.data.birthDay = options.birthday;
    this.data.freeze = options.freeze == 0 ? "年费会员" : "普通会员";
    this.data.studentId = parseInt(options.studentId);
    this.data.familyId = parseInt(options.familyId);
    this.data.isStar = (options.isStar == 'true' ? true : false)

    this.setData(this.data);
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
    http.getRecordSize(this.data.studentId, function(res) {
      that.setData({
        recordSize: res + "条成长记录"
      })
    })
    this.latelyRecord()
  },

  // 星标
  putMemberFav: function(e) {
    var that = this;
    var status = !e.detail.value

    http.putMemberFav(this.data.studentId, status, function(res) {
      if (res == 0) {
        that.setData({
          isStar: !status
        })

        http.getStudents(function(res) {})
      }
    })
  },

  latelyRecord: function() {
    var that = this
    http.getGrowthRecordsWithoutAppend(0, this.data.studentId, 3, function(res) {
      that.setData({
        recordList: res.records
      })
    })
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