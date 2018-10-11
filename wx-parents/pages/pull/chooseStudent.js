// pages/pull/chooseStudent.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    star: null,
    stararr: [],
  },
  member: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.memberList[index];
    console.info("member.member");
    console.info(item);
    app.globalData.chooseStudent = item
    wx.navigateBack({

    })
 
  },

  memberstar: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.stararr[index];
    console.info("member.member");
    console.info(item);
    app.globalData.chooseStudent = item
    wx.navigateBack({
      
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
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
    app.globalData.chooseStudent = ''
    var that = this;
    var memberList = app.globalData.allStudent
    that.setData({
      memberList: memberList,
    })

    var stararr = app.globalData.stararr
    console.info(stararr)
    for (var i = 0; i < memberList.length; i++) {
      memberList[i].star = false
      for (var j = 0; j < stararr.length; j++) {
        if (memberList[i].studentId == stararr[j].studentId) {
          memberList[i].star = true
          that.setData({
            memberList: memberList,
            stararr: stararr
          })
        }
      }
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