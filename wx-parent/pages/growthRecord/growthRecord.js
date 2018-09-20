// pages/growthRecord/growthRecord.js
const app = getApp();
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

    appendList: [{
        ILike: 0,
        authorId: 4,
        authorName: "小铭",
        authorType: 1,
        dateTime: "2018-09-18 21:15:18",
        pictures: ["https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211757_0.jpg", "https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211800_1.jpg", "https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211804_2.jpg", "https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211807_3.jpg", "https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211810_3.jpg"],
        recordId: 159,
        studentId: 43,
      text: "那时，我还是个有着25年丰富旱鸭子经验的严重恐水星人；凭借着在不会游泳界的出色成就，我轻松地成为了当天最难搞的学员。",
      },
      {
        ILike: 0,
        authorId: 4,
        authorName: "小铭",
        authorType: 1,
        dateTime: "2018-09-18 21:15:18",
        pictures: ["https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211757_0.jpg"],
        recordId: 159,
        studentId: 43,
        text: "上课啦",
      },
      {
        ILike: 0,
        authorId: 4,
        authorName: "小铭",
        authorType: 1,
        dateTime: "2018-09-18 21:15:18",
        pictures: ["https://ouat-file.buzaishudian.com/images/wx-mini/teacher/t_4_20180918211757_0.jpg"],
        recordId: 159,
        studentId: 43,
        text: "好饿好饿的毛毛虫",
      }
    ],
  },

  showBigImg: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showswiper
    })
  },

  swiper: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  // gets:function(){
  //   var gData = app.globalData
  //   wx.request({
  //     url: gData.getFamily  ,
  //     data: {
  //       "unionid": app.globalData.unionid,
  //       "openid": app.globalData.openid,
  //     },
  //     header: {},
  //     method: 'post',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       app.globalData.allGrowthRecords = res.data.data.records
  //       console.log(app.globalData.allGrowthRecords)
  //       for (var i in res.data.data.records) {
  //         res.data.data.records[i].name = "加载中...";
  //       }
  //       that.setData({
  //         recordsList: res.data.data.records,
  //         recordSize: res.data.data.records.length
  //       });
  //       that.getContact();
  //     },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },
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