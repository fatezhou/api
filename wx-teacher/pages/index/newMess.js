// pages/index/newMess.js
const app = getApp();
var http = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newAppendList: [],
    defaultAvatar: '',
    allTeacherInfo: null,
    allParentInfo: null,
    mainText: [],
  },

  toDetail: function(e) {
    var item = e.currentTarget.dataset.item
    var allStudentInfo = app.globalData.studentList
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
    // for (var i = 0; i < app.globalData.studentList.length; i++) {
    //   if (app.globalData.studentList[i].studentId == item.studentId) {
    //     item.familyId = app.globalData.studentList[i].familyId
    //   }
    // }

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
      defaultAvatar: app.globalData.defaultAvatar,
      allTeacherInfo: app.globalData.teacherList,
      allParentInfo: app.globalData.parentList,
    })

    http.getNewMessage(function(res) {
      if (res.data.data.append.length > 0) {
        for (var i = 0; i < res.data.data.append.length; i++) {
          var recordId = res.data.data.append[i].parentRecordId

          http.getoneGrowthRecordWithAppend(recordId, function(res) {
            if (that.data.mainText.length > 0) {
              for (var i = 0; i < that.data.mainText.length; i++) {
                if (that.data.mainText[i].recordId == res.recordId) {

                } else if (i + 1 == that.data.mainText.length) {
                  that.data.mainText = that.data.mainText.concat(res)
                  that.setData({
                    mainText: that.data.mainText
                  })
                }
              }
            } else {
              that.data.mainText = that.data.mainText.concat(res)
              that.setData({
                mainText: that.data.mainText
              })
            }
          })
        }
      }
      if (res.data.data.record.length > 0) {
        for (var i = 0; i < res.data.data.record.length; i++) {
          res.data.data.record[i].text = decodeURIComponent(res.data.data.record[i].text)
        }
      }

      if (res.data.code == 0) {
        for (var a = 0; a < res.data.data.like.length; a++) {
          res.data.data.like[a].text = decodeURIComponent(res.data.data.like[a].text)
        }

        var append = res.data.data.append
        var like = res.data.data.like
        var record = res.data.data.record

        var newAppendList = append.concat(like)
        newAppendList = newAppendList.concat(record)
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