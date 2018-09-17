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
    recordSize: "查询中"
  },
  goMoreRecords: function(e) {
    getApp().globalData.studentId = this.data.studentId;
    getApp().globalData.showAllStudents = false;
    console.info(getApp().globalData);
    wx.switchTab({
      url: '../index/index',
    });
  },

  // 星标
  putMemberFav: function(e) {
    console.info(e.detail.value)
    wx.request({
      url: 'http://api.minidope.com/api/v1.0/put_member_fav',
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "memberId": "059200001",
        "type": "teacher"
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        
      },
      fail: function(res) {
        console.info(res)
      },
      complete: function(res) {
        console.info(res)
      },
    })
  },
  // 跳转新建记录页面
  toAddRecard: function() {
    wx.navigateTo({
      url: '../pull/pull?name=' + this.data.name + '&studentId=' + this.data.studentId,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.info(options);
    this.data.nickName = options.nickName;
    this.data.name = options.name;
    this.data.cardCode = options.cardCode;
    this.data.birthDay = options.birthday;
    this.data.freeze = options.freeze == 0 ? 　"年费会员" : "普通会员";
    this.data.studentId = parseInt(options.studentId);
    this.setData(this.data);
    this.getRecordSize();
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