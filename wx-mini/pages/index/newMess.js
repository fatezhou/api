// pages/index/newMess.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newAppendList: '',
    Imgpath: '',
    allTeacherInfo: null,
    allParentInfo: null,
    mainText:'',
  },

  toDetail: function(e) {
    var item = e.currentTarget.dataset.item
    var allStudentInfo = app.globalData.allStudent
    if (item.authorId) {
      var authorId = item.authorId
      var authorType = item.authorType
    } else {
      var authorId = item.author_id
      var authorType = item.author_type
    }
    for (var i = 0; i < allStudentInfo.length; i++) {
      if (item.studentId == allStudentInfo[i].studentId) {
        // var name = (allStudentInfo[i].nickname ? allStudentInfo[i].nickname : allStudentInfo[i].name)
        var name = allStudentInfo[i].name
        var avatarUrl = allStudentInfo[i].avatarUrl
      }
    }
    wx.navigateTo({
      url: "detail?recordId=" + item.parentRecordId + "&orgAuthorId=" + authorId + "&orgAuthorType=" + authorType + "&studentId=" + item.studentId + "&name=" + name + "&dateTime=" + item.dateTime + "&avatarUrl=" + avatarUrl,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      Imgpath: app.globalData.Imgpath,
      allTeacherInfo: app.globalData.allTeacherInfo,
      allParentInfo: app.globalData.allParentInfo,

    })
 
    wx.request({
      url: app.globalData.getNewMessage,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "authorId": app.globalData.userId, //自己的id
        "authorType": app.globalData.userType //自己的type
      },
      method: 'POST',
      success: function(res) {
        for (var i = 0; i < res.data.data.append.length; i++) {
          res.data.data.append[i].text = decodeURIComponent(res.data.data.append[i].text)
          // res.data.data.append[i].parentText = decodeURIComponent(res.data.data.append[i].parentText)
          var recordId = res.data.data.append[i].parentRecordId
          wx.request({
            url: app.globalData.oneGrowthRecordWithAppendUrl,
            data: {
              unionid: app.globalData.unionid,
              openid: app.globalData.openid,
              recordId: recordId
            },
            header: {},
            method: 'post',
            dataType: 'json',
            responseType: 'text',
            success: function (e) {
console.info(e)
              e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
              that.setData({
                mainText: e.data.data.record.text
              })
            },
          })
        }
        console.info(res)

        if (res.data.code == 0) {
          var append = res.data.data.append
          var like = res.data.data.like
          if (res.data.data.append.length > 0 && res.data.data.like.length > 0) {
            var newAppendList = append.concat(like)
            for (var i = 0; i < newAppendList.length - 1; i++) {
              for (var j = 0; j < newAppendList.length - i - 1; j++) {
                if (newAppendList[j].dateTime > newAppendList[j + 1].dateTime) {
                  var temp = newAppendList[j]
                  newAppendList[j] = newAppendList[j + 1];
                  newAppendList[j + 1] = temp;
                }
              }
            }
            newAppendList.reverse()
            that.setData({
              newAppendList: newAppendList
            })
          } else if (res.data.data.like.length > 0) {
            var newAppendList = like
            newAppendList.reverse()
            that.setData({
              newAppendList: newAppendList
            })
          } else if (res.data.data.append.length > 0) {
            var newAppendList = append
            newAppendList.reverse()
            that.setData({
              newAppendList: newAppendList
            })
          }
        }
      }
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