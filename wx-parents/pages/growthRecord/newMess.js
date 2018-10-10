// pages/index/newMess.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // record: '',
    newAppendList: '',
    Imgpath: '',
    allTeacherInfo: null,
    allParentInfo: null,
  },

  toDetail: function(e) {
    console.info(e.currentTarget.dataset.item)
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
      url: "detail?recordId=" + item.parentId + "&mainText=" + item.parentText + "&orgAuthorId=" + authorId + "&orgAuthorType=" + authorType + "&studentId=" + item.studentId + "&name=" + name + "&dateTime=" + item.dateTime + "&avatarUrl=" + avatarUrl,
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
    // 数据写死测试用 -->
    // var append = [{
    //   authorId: 3,
    //   authorType: 1,
    //   dateTime: "2018-10-09 15:30:26",
    //   parentRecordId: 594,
    //   parentText: "3_append",
    //   pictureUrls: [app.globalData.Imgpath],
    //   recordId: 649,
    //   text: "33333",
    //   studentId: 141
    // }, {
    //   authorId: 3,
    //   authorType: 1,
    //   dateTime: "2018-10-09 15:32:32",
    //   parentRecordId: 594,
    //   parentText: "我们收费收费大师那麻烦你你反平方",
    //   pictureUrls: [],
    //   recordId: 646,
    //   text: "222ds按施工i啊的那个i适当皮带是你公婆那段视频给你v的女i奶瓶v男彼女本片十大女仆不可能 怕你公婆东南部v破案被迫v女娲哦怕根据颇为局被破微博v评委的视频222",
    //   studentId: 141
    // }]

    // var like = [{
    //   author_id: 3,
    //   author_type: 1,
    //   dateTime: "2018-10-09 15:34:26",
    //   parentRecordId: 594,
    //   parentText: "1_like",
    //   pictureUrls: [app.globalData.Imgpath],
    //   recordId: 646,
    //   text: "111111",
    //   studentId: 141
    // }, {
    //   author_id: 3,
    //   author_type: 1,
    //   dateTime: "2018-10-09 15:29:24",
    //   parentRecordId: 594,
    //   parentText: "4_like",
    //   pictureUrls: [],
    //   recordId: 646,
    //   text: "4444",
    //   studentId: 141
    // }]

    // var newAppendList = append.concat(like)

    // for (var i = 0; i < newAppendList.length - 1; i++) {
    //   for (var j = 0; j < newAppendList.length - i - 1; j++) {
    //     if (newAppendList[j].dateTime > newAppendList[j + 1].dateTime) {
    //       var temp = newAppendList[j]
    //       newAppendList[j] = newAppendList[j + 1];
    //       newAppendList[j + 1] = temp;
    //     }
    //   }
    // }
    // newAppendList.reverse()
    // this.setData({
    //   newAppendList: newAppendList
    // })

    // return
    // <-- 数据写死测试用 
    // console.info(app.globalData.unionid)
    // console.info(app.globalData.openid)
    // console.info(app.globalData.userId)
    // console.info(app.globalData.userType)

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
          res.data.data.append[i].parentText = decodeURIComponent(res.data.data.append[i].parentText)
        }
        console.info(res.data.data)

        if (res.data.code == 0) {
          var append = res.data.data.append
          var like = res.data.data.like
          if (res.data.data.append.length > 0 && res.data.data.like.length > 0) {
            var newAppendList = append.concat(like)
            // console.info(newAppendList + '111')
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
            // console.info(newAppendList + '222')
            newAppendList.reverse()
            that.setData({
              newAppendList: newAppendList
            })
          } else if (res.data.data.append.length > 0) {
            var newAppendList = append
            // console.info(newAppendList + '333')
            newAppendList.reverse()
            that.setData({
              newAppendList: newAppendList
            })
          }

          // var newAppendList = append.concat(like)
          // if (newAppendList.length > 0) {
          //   console.info(newAppendList)

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
          //   this.setData({
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