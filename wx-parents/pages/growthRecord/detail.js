// pages/growthRecord/detail.js
// var recordId;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showswiper: [],

    current: 0,

    recordsList: '',
    appendList: '',
    recordSize: '',
    // 字段更换
    // allTeacherInfo: '',
    allUserInfo: '',
    recordId: '',

    userId: '',
    Imgpath: '',
  },

  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showpicurls
    })
  },

  like: function(e) {
    var gData = app.globalData
    var that = this
    console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    var orgAuthorType = e.currentTarget.dataset.orgauthortype
    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)

    // for (var r = 0; r < this.data.recordsList.length; r++) {
    //   if (this.data.recordsList[r].recordId == parentRecordId) {
    for (var j = 0; j < this.data.appendList.length; j++) {
      if (this.data.appendList[j].recordId == recordId) {
        // 代码改动区域   --起始--   -->  teacher 改为 parent
        if (this.data.appendList[j].like) {
          if (this.data.appendList[j].like.parent.length > 0) {
            for (var k = 0; k < this.data.appendList[j].like.parent.length; k++) {
              // 已经点赞了 就取消
              if (this.data.appendList[j].like.parent[k] == gData.userId) {

                this.data.appendList[j].like.parent.splice(k, 1)
                that.setData({
                  appendList: this.data.appendList
                })
                console.info(this.data.appendList)
                console.info('splice')
              } else if ((k + 1) == this.data.appendList[j].like.parent.length) {
                console.info(k + 1)

                this.data.appendList[j].like.parent.push(gData.userId)

                that.setData({
                  appendList: this.data.appendList
                })
                break;
                console.info(this.data.appendList)
                console.info('this.data.appendList[j].like.teacher----------')
              }

            }
          } else {
            this.data.appendList[j].like.parent[0] = gData.userId

            that.setData({
              appendList: this.data.appendList
            })
          }

        } else {
          var like = []
          var parent = []
          this.data.appendList[j].like = {}
          this.data.appendList[j].like.parent = []

          this.data.appendList[j].like.parent[0] = gData.userId

          that.setData({
            appendList: this.data.appendList
          })
        }
      }
    }


    if (parentRecordId == 0) {
      for (var j = 0; j < this.data.recordsList.length; j++) {
        if (this.data.recordsList[j].recordId == recordId) {

          if (this.data.recordsList[j].likes) {
            if (this.data.recordsList[j].likes.parent.length > 0) {
              for (var k = 0; k < this.data.recordsList[j].likes.parent.length; k++) {
                // 已经点赞了 就取消
                if (this.data.recordsList[j].likes.parent[k] == gData.userId) {

                  this.data.recordsList[j].likes.parent.splice(k, 1)
                  that.setData({
                    recordsList: this.data.recordsList
                  })
                  // console.info(this.data.recordsList)
                  // console.info('splice')
                } else if ((k + 1) == this.data.recordsList[j].likes.parent.length) {
                  // console.info(k + 1)

                  this.data.recordsList[j].likes.parent.push(gData.userId)

                  that.setData({
                    recordsList: this.data.recordsList
                  })
                  break;
                  // console.info(this.data.recordsList)
                  // console.info('this.data.appendList[j].like.teacher----------')
                }

              }
            } else {
              this.data.recordsList[j].likes.parent[0] = gData.userId

              that.setData({
                recordsList: this.data.recordsList
              })
            }

          } else {
            var likes = []
            var parent = []
            this.data.recordsList[j].likes = {}
            this.data.recordsList[j].likes.parent = []

            this.data.recordsList[j].likes.parent[0] = gData.userId

            that.setData({
              recordsList: this.data.recordsList
            })
          }
        }
      }
    }

    // 代码改动区域   --终止--   -->
    //   }
    // }

    console.info('like')

    console.info(gData.unionid),
      console.info(gData.openid),
      console.info(4), //自己的id
      console.info(1), //1: teacher, 2: parent",
      console.info(recordId), //评论的id
      console.info(parentRecordId), //记录的id
      console.info(authorId), //评论者id
      console.info(orgAuthorType) //评论者类型
    console.info('like')
    wx.request({
      url: gData.minodopeApi.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionid,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": gData.userType, //1: teacher, 2: parent",
        "recordId": recordId, //评论的id
        "parentRecordId": parentRecordId, //记录的id
        "orgAuthorId": authorId, //评论者id
        "orgAuthorType": orgAuthorType //评论者类型
      },
      success: function(res) {
        console.info(res)
        if (res.data.code == 4) {
          wx.request({
            url: gData.minodopeApi.putRecordLike,
            method: 'post',
            data: {
              "unionid": gData.unionid,
              "openid": gData.openid,
              "authorId": gData.userId, //自己的id
              "authorType": gData.userType, //1: teacher, 2: parent",
              "recordId": recordId,
              "parentRecordId": parentRecordId,
              'cancel': true,
              "orgAuthorId": authorId,
              "orgAuthorType": orgAuthorType
            },
            success: function(res) {
              console.info(res)

              that.show()
              return
            }
          })
        }
        that.show()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var recordId = options.recordId
    app.globalData.recordId = recordId
    this.setData({
      recordId: recordId,
      userId: app.globalData.userId,
      Imgpath: app.globalData.Imgpath
    })
    for (var i = 0; i < app.globalData.recordsList.length; i++) {
      if (recordId == app.globalData.recordsList[i].recordId) {
        var recordsList = [];
        recordsList[0] = app.globalData.recordsList[i]
        console.info(recordsList)
        this.setData({
          recordsList: recordsList,
          appendList: recordsList[0].append,
          // 代码改动区域  --起始-- 
          // allTeacherInfo: app.globalData.allTeacherInfo,
          allUserInfo: app.globalData.allUserInfo,
          // 代码改动区域  --终止-- 
        })
        return
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  show: function() {
    var self = this;
    var gData = app.globalData;
    wx.request({
      url: gData.minodopeApi.getOneGrowthRecordWithAppendByRecordId,
      data: {
        unionid: gData.unionid,
        openid: gData.openid,
        recordId: app.globalData.recordId
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(e) {
        console.info(e)
        self.data.appendList = e.data.data.record.append
        console.info(self.data.appendList)
        // 代码改动区域  --起始--   allTeacherInfo  改为  allUserInfo 根据authorType插对应表数据
        console.info(app.globalData.allUserInfo)
        console.info(111)
        for (var i = 0; i < self.data.appendList.length; i++) {
          for (var j = 0; j < app.globalData.allUserInfo.length; j++) {
            if (self.data.appendList[i].authorType == 1){
              if (app.globalData.allUserInfo[j].teacherId == self.data.appendList[i].authorId) {
                self.data.appendList[i].name = app.globalData.allUserInfo[j].nickname
                self.data.appendList[i].avatarUrl = app.globalData.allUserInfo[j].avatarUrl
                self.data.appendList[i].text = decodeURIComponent(self.data.appendList[i].text)

              }
            } else if (self.data.appendList[i].authorType == 2){
              if (app.globalData.allUserInfo[j].parentId == self.data.appendList[i].authorId) {
                self.data.appendList[i].name = app.globalData.allUserInfo[j].name
                self.data.appendList[i].avatarUrl = app.globalData.allUserInfo[j].avatarUrl
                self.data.appendList[i].text = decodeURIComponent(self.data.appendList[i].text)

              }
            }
            
          }
        }
        // 代码改动区域  --终止--
        self.setData({
          appendList: self.data.appendList
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.info(app.globalData.recordId)

    if (app.globalData.detailonShow) {
      this.show()
      app.globalData.detailonShow = false
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