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
    mainText: [],
    // likeMainText: [],
  },

  toDetail: function(e) {
    var item = e.currentTarget.dataset.item
    // var allStudentInfo = app.globalData.allStudent
    if (item.authorId) {
      var authorId = item.authorId
      var authorType = item.authorType
    } else {
      var authorId = item.author_id
      var authorType = item.author_type
    }
    // var name = ''
    // var avatarUrl = ''
    // for (var i = 0; i < allStudentInfo.length; i++) {
    //   if (item.studentId == allStudentInfo[i].studentId) {
    //     // var name = (allStudentInfo[i].nickname ? allStudentInfo[i].nickname : allStudentInfo[i].name)
    //     name = allStudentInfo[i].name
    //     avatarUrl = allStudentInfo[i].avatarUrl
    //   }
    // }
    // console.info(name)
    // console.info(avatarUrl)
    // for (var i = 0; i < app.globalData.allStudent.length; i++) {
    //   if (app.globalData.allStudent[i].studentId == item.studentId) {
    //     item.familyId = app.globalData.allStudent[i].familyId
    //   }
    // }
    console.info(item)
    if (item.parentRecordId == 0){
      wx.navigateTo({
        url: "detail?recordId=" + item.recordId,
      })
    }else{
      wx.navigateTo({
        url: "detail?recordId=" + item.parentRecordId,
      })
    }
    
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



    // var append = [{
    //   authorId: 3,
    //   authorType: 1,
    //   createTime: "2018-10-11 17:37:30",
    //   dateTime: "2018-10-11 17:37:30",
    //   orgAuthorId: 3,
    //   orgAuthorType: 1,
    //   parentRecordId: 712,
    //   pictureUrls: [],
    //   recordId: 734,
    //   studentId: 141,
    //   text: "评论111"
    // }, {
    //   authorId: 3,
    //   authorType: 1,
    //   createTime: "2018-10-11 17:37:40",
    //   dateTime: "2018-10-11 17:37:40",
    //   orgAuthorId: 3,
    //   orgAuthorType: 1,
    //   parentRecordId: 713,
    //   pictureUrls: [],
    //   recordId: 735,
    //   studentId: 141,
    //   text: "评论222"
    // }]
    // var like = [{
    //   author_id: 3,
    //   author_type: 1,
    //   dateTime: "2018-10-11 17:37:30",
    //   parentRecordId: 712,
    //   pictureUrls: [],
    //   recordId: 734,
    //   studentId: 141,
    //   text: "评论111"
    // }, {
    //   author_id: 3,
    //   author_type: 1,
    //   dateTime: "2018-10-11 17:37:40",
    //   parentRecordId: 713,
    //   pictureUrls: [],
    //   recordId: 735,
    //   studentId: 141,
    //   text: "评论222",
    // }]
    // var record = [{
    //   authorId: 3,
    //   authorType: 1,
    //   createTime: "2018-10-15 17:37:30",
    //   dateTime: "2018-10-15 17:37:30",
    //   orgAuthorId: 3,
    //   orgAuthorType: 1,
    //   parentRecordId: 0,
    //   pictureUrls: [],
    //   recordId: 846,
    //   studentId: 141,
    //   text: "q"
    // }, {
    //   authorId: 3,
    //   authorType: 1,
    //   createTime: "2018-10-16 17:37:30",
    //   dateTime: "2018-10-16 17:37:30",
    //   orgAuthorId: 3,
    //   orgAuthorType: 1,
    //   parentRecordId: 0,
    //   pictureUrls: [],
    //   recordId: 847,
    //   studentId: 141,
    //   text: "1"
    // }]

    // if (append.length > 0) {
    //   for (var i = 0; i < append.length; i++) {
    //     append[i].text = decodeURIComponent(append[i].text)
    //     var recordId = append[i].parentRecordId
    //     wx.request({
    //       url: app.globalData.oneGrowthRecordWithAppendUrl,
    //       data: {
    //         unionid: app.globalData.unionid,
    //         openid: app.globalData.openid,
    //         recordId: recordId
    //       },
    //       header: {},
    //       method: 'post',
    //       dataType: 'json',
    //       responseType: 'text',
    //       success: function(e) {
    //         e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
    //         if (that.data.mainText.length > 0) {
    //           for (var i = 0; i < that.data.mainText.length; i++) {
    //             if (that.data.mainText[i].recordId == e.data.data.record.recordId) {

    //             } else if (i + 1 == that.data.mainText.length) {
    //               that.data.mainText = that.data.mainText.concat(e.data.data.record)
    //               that.setData({
    //                 mainText: that.data.mainText
    //               })
    //             }
    //           }
    //           // console.info(that.data.mainText)
    //         } else {
    //           that.data.mainText = that.data.mainText.concat(e.data.data.record)
    //           that.setData({
    //             mainText: that.data.mainText
    //           })
    //         }
    //       },
    //     })
    //   }
    // }



    // // if (res.data.code == 0) {
    // // var append = res.data.data.append
    // // var like = res.data.data.like
    // if (append.length > 0 && like.length > 0) {
    //   var newAppendList = append.concat(like)
    //   for (var i = 0; i < newAppendList.length - 1; i++) {
    //     for (var j = 0; j < newAppendList.length - i - 1; j++) {
    //       if (newAppendList[j].dateTime > newAppendList[j + 1].dateTime) {
    //         var temp = newAppendList[j]
    //         newAppendList[j] = newAppendList[j + 1];
    //         newAppendList[j + 1] = temp;
    //       }
    //     }
    //   }
    //   newAppendList.reverse()
    //   that.setData({
    //     newAppendList: newAppendList
    //   })
    // } else if (like.length > 0) {
    //   var newAppendList = like
    //   newAppendList.reverse()
    //   that.setData({
    //     newAppendList: newAppendList
    //   })
    // } else if (append.length > 0) {
    //   var newAppendList = append
    //   newAppendList.reverse()
    //   that.setData({
    //     newAppendList: newAppendList
    //   })
    // }
    // // }
    // return
    console.info(app.globalData.unionid)
    console.info(app.globalData.openid)
    console.info(app.globalData.userId) //自己的id
    console.info(app.globalData.userType) //自己的type
    // console.info(app.globalData.familyId)
    wx.request({
      url: app.globalData.minodopeApi.getNewMessage,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "authorId": app.globalData.userId, //自己的id
        "authorType": app.globalData.userType, //自己的type
        // "familyId": app.globalData.familyId
      },
      method: 'POST',
      success: function(res) {
        console.info(res)
        if (res.data.data.append.length > 0) {
          for (var i = 0; i < res.data.data.append.length; i++) {
            res.data.data.append[i].text = decodeURIComponent(res.data.data.append[i].text)
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
              success: function(e) {
                e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
                if (that.data.mainText.length > 0) {
                  for (var i = 0; i < that.data.mainText.length; i++) {
                    if (that.data.mainText[i].recordId == e.data.data.record.recordId) {

                    } else if (i + 1 == that.data.mainText.length) {
                      that.data.mainText = that.data.mainText.concat(e.data.data.record)
                      that.setData({
                        mainText: that.data.mainText
                      })
                    }
                  }
                } else {
                  that.data.mainText = that.data.mainText.concat(e.data.data.record)
                  that.setData({
                    mainText: that.data.mainText
                  })
                }
              },
            })
          }
        }
        if (res.data.data.record.length > 0) {
          for (var i = 0; i < res.data.data.record.length; i++) {
            res.data.data.record[i].text = decodeURIComponent(res.data.data.record[i].text)
          }
        }

        // if (res.data.data.like.length > 0) {
        //   for (var i = 0; i < res.data.data.like.length; i++) {
        //     res.data.data.like[i].text = decodeURIComponent(res.data.data.like[i].text)
        //     // res.data.data.like[i].parentText = decodeURIComponent(res.data.data.append[i].parentText)
        //     var recordId = res.data.data.like[i].parentRecordId
        //     // console.info(i)
        //     wx.request({
        //       url: app.globalData.oneGrowthRecordWithAppendUrl,
        //       data: {
        //         unionid: app.globalData.unionid,
        //         openid: app.globalData.openid,
        //         recordId: recordId
        //       },
        //       header: {},
        //       method: 'post',
        //       dataType: 'json',
        //       responseType: 'text',
        //       success: function(e) {
        //         e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
        //         if (that.data.likeMainText.length > 0) {
        //           for (var i = 0; i < that.data.likeMainText.length; i++) {
        //             if (that.data.likeMainText[i].recordId == e.data.data.record.recordId) {
        //               // continue;
        //             } else if (i + 1 == that.data.likeMainText.length) {
        //               that.data.likeMainText = that.data.likeMainText.concat(e.data.data.record)
        //               that.setData({
        //                 likeMainText: that.data.likeMainText
        //               })
        //             }
        //           }
        //           // console.info(that.data.mainText)
        //         } else {
        //           that.data.likeMainText = that.data.likeMainText.concat(e.data.data.record)
        //           that.setData({
        //             likeMainText: that.data.likeMainText
        //           })
        //         }

        //         // console.info(that.data.likeMainText)
        //       },
        //     })
        //   }
        // }

        console.info(res)

        if (res.data.code == 0) {
          for (var a = 0; a < res.data.data.like.length; a++) {
            res.data.data.like[a].text = decodeURIComponent(res.data.data.like[a].text)
          }

          var append = res.data.data.append
          var like = res.data.data.like
          var record = res.data.data.record
          // if (res.data.data.append.length > 0 && res.data.data.like.length > 0) {
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
          // } else if (res.data.data.like.length > 0) {
          //   var newAppendList = like
          //   newAppendList.reverse()
          //   that.setData({
          //     newAppendList: newAppendList
          //   })
          // } else if (res.data.data.append.length > 0) {
          //   var newAppendList = append
          //   newAppendList.reverse()
          //   that.setData({
          //     newAppendList: newAppendList
          //   })
          // }
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