// pages/member/member.js
const app = getApp();
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    star: null,
    stararr: [],

    Imgpath: '',
    avatarUrl: '',
  },
  member: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.memberList[index];
    console.info("member.member");
    console.info(item);
    console.info(3333)
    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    console.info(url);
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  memberstar: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.stararr[index];
    console.info("member.member");
    console.info(item);
    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze;
    url += "&sex=" + item.sex;
    url += "&avatarUrl=" + item.avatarUrl;
    console.info(url);
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this)

    var that = this;
    var memberList = app.globalData.allStudent
    app.globalData.memberListLength = memberList.length
    if(app.globalData.stararr.length >0){
      app.globalData.stararrLength = app.globalData.stararr.length
      var stararr = app.globalData.stararr
      console.info(stararr)
      for (var i = 0; i < memberList.length; i++) {
        memberList[i].star = false
        for (var j = 0; j < stararr.length; j++) {
          if (memberList[i].studentId == stararr[j].studentId) {
            memberList[i].star = true
            that.setData({
              memberList: memberList,
              stararr: stararr,
              Imgpath: app.globalData.Imgpath
            })
          }
        }
      }
    }else{
      that.setData({
        memberList: memberList,
        Imgpath: app.globalData.Imgpath
      })
    }
    
    console.info(memberList)
    console.info(this.data.stararr)
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
    var that = this;
    var memberList = app.globalData.allStudent
    console.info(memberList.length)
    // that.setData({
    //   memberList: memberList,
    // })
    if (!app.globalData.memberListLength || !app.globalData.stararrLength || app.globalData.memberListLength != memberList.length || app.globalData.stararrLength != app.globalData.stararr.length) {
      app.globalData.memberListLength = memberList.length
      app.globalData.stararrLength = app.globalData.stararr.length
      var stararr = app.globalData.stararr
      console.info(stararr)
      for (var i = 0; i < memberList.length; i++) {
        memberList[i].star = false
        for (var j = 0; j < stararr.length; j++) {
          if (memberList[i].studentId == stararr[j].studentId) {
            memberList[i].star = true
            that.setData({
              memberList: memberList,
              stararr: stararr,
              Imgpath: app.globalData.Imgpath
            })
          }
        }
      }
      console.info(this.data.stararr)
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