// pages/member/member.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList:[]
  },
	member:function(e){
    var index = e.currentTarget.dataset.index;
    var item = this.data.memberList[index];
    console.info("member.member");
    console.info(item);
    var url = 'memberDetail?name=' + item.name;
    url += "&studentId=" + item.studentId;
    url += "&cardCode=" + item.cardCode;
    url += "&nickName=" + (item.nickName == "" ? item.nickName : item.name);
    url += "&birthday=" + item.birthday;
    url += "&freeze=" + item.freeze; 
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
  onLoad: function (options) {
    console.info("member.js");
		var that = this;
    var gData = app.globalData;
    var url = gData.minodopeApi.contactUrl;
		wx.request({
      url: url,
			data: {
        unionid: gData.unionid,
        openid: gData.openid,
				authorId: gData.userId,//可选, 只要特定老师发的
        authorType: gData.userType,//保留参数, 用来标记是老师还是家长
			},
			header: {},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: function (res) {
				console.log(res)
				that.setData({
					memberList: res.data.data.contact[1].member
				})
        that.data.memberList = res.data.data.contact[1].member;
			},
			fail: function (res) {
			},
			complete: function (res) {
			},
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})