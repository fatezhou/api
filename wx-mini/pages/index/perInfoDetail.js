// pages/index/perInfoDetail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainText: "",
    recordId: 0,
    appendList: [],
    listNumber: 0,
    studentId: 0,
    orgAuthorId: 0,
    orgAuthorType: 0,
    name: " ",
    recordSize: "正在查询记录个数",

    imgUrl: [],
    showswiper: '',
    currentid: '',
    bigImgUrl: '',
    canShowBigImg: false,

    hideBtn: false,

    imgUrl: [],
    imgUrllength: '',
    bigImgUrl: '',
    canShowBigImg: false,
    allteacherInfo: [],
    allParentInfo: [],

    likenumber: 0,
    userId: '',
    Imgpath: '',
    avatarUrl: '',
    teacherName: '',
    recordList: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 默认头像
    this.data.Imgpath = app.globalData.Imgpath

    if (options.avatarUrl) {
      this.data.avatarUrl = options.avatarUrl
    }

    this.data.userId = app.globalData.userId
    this.data.allTeacherInfo = app.globalData.allTeacherInfo
    // 家长信息
    this.data.allParentInfo = app.globalData.allParentInfo
    this.data.recordId = parseInt(options.recordId);

    // console.info(options);
    this.data.mainText = options.mainText;
    this.data.studentId = options.studentId;
    this.data.orgAuthorId = options.orgAuthorId;
    this.data.orgAuthorType = options.orgAuthorType;
    this.data.recordId = options.recordId;
    this.data.name = options.name;
    this.data.dateTime = options.dateTime;

    this.setData(this.data);
    // console.info(app.globalData.oneGrowthRecordWithAppendUrl);
    this.getRecordSize();
    // console.info(app.globalData.contact)
    // console.info('------------------')
    for (var i = 0; i < app.globalData.contact.length; i++) {
      if (app.globalData.contact[i].recordId == options.recordId) {
        this.setData({
          imgUrl: app.globalData.contact[i].pictureUrls,
        })
      }
    }
    var that = this
    wx.request({
      url: app.globalData.oneGrowthRecordWithAppendUrl,
      data: {
        unionid: app.globalData.unionid,
        openid: app.globalData.openid,
        recordId: this.data.recordId
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(e) {
        e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
        var list = [];
        list.push(e.data.data.record)
        that.setData({
          recordList: list
        })
        console.info(list)
        console.info('list')
      }
    })


    // console.info(this.data.imgUrl)
    this.setData({
      imgUrllength: this.data.imgUrl.length
    })

    if (options.hideBtn) {
      this.setData({
        hideBtn: true
      })
    } else {
      this.setData({
        hideBtn: false
      })
    }

    // 获取教师头像
    for (var i = 0; i < app.globalData.allTeacherInfo.length; i++) {
      if (app.globalData.allTeacherInfo[i].teacherId == this.data.orgAuthorId) {
        var name = (app.globalData.allTeacherInfo[i].nickname ? app.globalData.allTeacherInfo[i].nickname : app.globalData.allTeacherInfo[i].name)
        this.setData({
          teacherName: name
        })
      }
    }
  },

  like: function(e) {
    var gData = app.globalData
    var that = this
    // console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid

    if (e.currentTarget.dataset.parentrecordid){
      var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)
    }else{
      var parentRecordId = parseInt(that.data.recordId)
    }
    // console.info(this.data.appendList)
    // console.info(' this.data.appendList')
    // for (var i = 0; i < this.data.appendList.length; i++) {
    // if (this.data.appendList[i].recordId == that.data.recordId) {
    for (var j = 0; j < this.data.appendList.length; j++) {
      if (this.data.appendList[j].recordId == recordId) {

        if (this.data.appendList[j].like) {
          if (this.data.appendList[j].like.teacher.length > 0) {
            for (var k = 0; k < this.data.appendList[j].like.teacher.length; k++) {
              // 已经点赞了 就取消
              if (this.data.appendList[j].like.teacher[k] == gData.userId) {

                this.data.appendList[j].like.teacher.splice(k, 1)
                that.setData({
                  appendList: this.data.appendList
                })
                // console.info(this.data.appendList)
                // console.info('splice')
              } else if ((k + 1) == this.data.appendList[j].like.teacher.length) {
                // console.info(k + 1)

                this.data.appendList[j].like.teacher.push(gData.userId)

                that.setData({
                  appendList: this.data.appendList
                })
                break;
                // console.info(this.data.appendList)
                // console.info('this.data.appendList[j].like.teacher----------')
              }

            }
          } else {
            this.data.appendList[j].like.teacher[0] = gData.userId

            that.setData({
              appendList: this.data.appendList
            })
          }

        } else {
          var like = []
          var teacher = []
          this.data.appendList[j].like = {}
          this.data.appendList[j].like.teacher = []

          this.data.appendList[j].like.teacher[0] = gData.userId

          that.setData({
            appendList: this.data.appendList
          })
        }
      }
    }

    if (parentRecordId == 0){
     
      if (this.data.recordList[0].likes) {
        if (this.data.recordList[0].likes.teacher.length > 0) {
          for (var k = 0; k < this.data.recordList[0].likes.teacher.length; k++) {
            // 已经点赞了 就取消
            if (this.data.recordList[0].likes.teacher[k] == gData.userId) {

              this.data.recordList[0].likes.teacher.splice(k, 1)
              this.setData({
                recordList: this.data.recordList
              })
            } else if ((k + 1) == this.data.recordList[0].likes.teacher.length) {
              this.data.recordList[0].likes.teacher.push(gData.userId)
              this.setData({
                recordList: this.data.recordList
              })
              break;
            }

          }
        } else {
          this.data.recordList[0].likes.teacher[0] = gData.userId

          this.setData({
            recordList: this.data.recordList
          })
        }

      } else {
        var likes = []
        var teacher = []
        this.data.recordList[0].likes = {}
        this.data.recordList[0].likes.teacher = []

        this.data.recordList[0].likes.teacher[0] = gData.userId

        this.setData({
          recordList: this.data.recordList
        })
      }
    }
    console.info(this.data.recordList)

    // console.info(recordId)
    // console.info(orgAuthorType)
    // console.info('like-------------')
    wx.request({
      url: gData.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionId,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": 1, //1: teacher, 2: parent",
        "recordId": recordId,
        "parentRecordId": parentRecordId,
        "orgAuthorId": authorId,
        "orgAuthorType": 1
      },
      success: function(res) {

        // console.info(res)
        if (res.data.code == 4) {
          wx.request({
            url: gData.putRecordLike,
            method: 'post',
            data: {
              // "unionid": gData.unionId,
              // "openid": gData.openid,
              "authorId": gData.userId, //自己的id
              "authorType": 1, //1: teacher, 2: parent",
              "recordId": recordId,
              "parentRecordId": parseInt(that.data.recordId),
              'cancel': true
              // "orgAuthorId": authorId,
              // "orgAuthorType": 1
            },
            success: function(res) {
              // console.info(res)

              // that.show()
              // return
            }
          })
        }
        // that.show()
      }
    })
  },

  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showswiper
    })
  },

  notShowImg: function() {
    this.setData({
      canShowBigImg: false
    })
  },

  goMoreRecords: function(e) {
    // getApp().globalData.studentId = this.data.studentId;
    // getApp().globalData.showAllStudents = false;
    // console.info(getApp().globalData);
    // wx.switchTab({
    //   url: '../index/index',
    // });
    // console.info(app.globalData.allStudent)
    var sex = null;
    var name = null;
    var avatarUrl = null;
    for (var i = 0; i < app.globalData.allStudent.length; i++) {
      if (app.globalData.allStudent[i].studentId == this.data.studentId) {
        sex = app.globalData.allStudent[i].sex
        name = app.globalData.allStudent[i].name
        avatarUrl = app.globalData.allStudent[i].avatarUrl
      }
    }

    wx.navigateTo({
      url: '../index/perInfo?studentId=' + this.data.studentId + '&studentName=' + name + '&sex=' + sex + '&avatarUrl=' + avatarUrl,
    })
    app.globalData.perTeacherRecords = false
  },
  getRecordSize: function() {
    var that = this
    wx.request({
      url: app.globalData.getChildGrowthRecordCount,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        // "authorId": app.globalData.userId,
        "authorType": app.globalData.userType, //1: teacher, 2: parent",
        "studentId": that.data.studentId
      },
      method: "post",
      success: function(res) {
        app.globalData.studentRecordCount = res.data.data.count
        // console.info(res.data.data.count)
        that.setData({
          recordSize: "" + res.data.data.count + "条成长记录"
        })
      }
    })



    // var gData = getApp().globalData;
    // var self = this;
    // console.info(gData.userId)
    // wx.request({
    //   url: gData.minodopeApi.recordSizeUrl,
    //   data: {
    //     "studentId": self.data.studentId,
    //     "authorId": gData.userId,
    //     "authorType": 1,
    //   },
    //   success: function(e) {
    //     self.data.recordSize = "" + e.data.data.count + "条成长记录";
    //     self.setData(self.data);
    //   },
    //   method: "POST",
    //   complete: function(e) {
    //     console.info(e);
    //   }
    // });
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
      url: gData.oneGrowthRecordWithAppendUrl,
      data: {
        unionid: gData.unionid,
        openid: gData.openid,
        recordId: parseInt(this.data.recordId)
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(e) {
        // console.info(e)
        // console.info('dsadasdasd===')
        if (e.data.code == 0) {
          for (var t = 0; t < e.data.data.record.append.length; t++) {
            e.data.data.record.append[t].text = decodeURIComponent(e.data.data.record.append[t].text)
          }
          self.data.appendList = e.data.data.record.append;
          if (e.data.data.record.likes) {
            self.data.likenumber = e.data.data.record.likes.teacher.length + e.data.data.record.likes.parent.length;
          } else {
            self.data.likenumber = 0
          }

          // app.globalData.likes = e.data.data.record.likes
          // console.info()
          self.setData(self.data);
        }
        // console.info(self.data.appendList)
        // 教师信息
        var allTeacherInfo = app.globalData.allTeacherInfo
        // 家长信息
        var allParentInfo = app.globalData.allParentInfo
        for (var i = 0; i < self.data.appendList.length; i++) {
          // console.info(self.data.appendList)
          if (self.data.appendList[i].authorType == 1) {
            for (var j = 0; j < allTeacherInfo.length; j++) {
              if (self.data.appendList[i].authorId == allTeacherInfo[j].teacherId) {
                self.data.appendList[i].authorName = allTeacherInfo[j].nickname
                self.data.appendList[i].avatarUrl = allTeacherInfo[j].avatarUrl
              }
            }
          } else {
            for (var j = 0; j < allParentInfo.length; j++) {
              if (self.data.appendList[i].authorId == allParentInfo[j].parentId) {
                self.data.appendList[i].authorName = allParentInfo[j].name
                self.data.appendList[i].avatarUrl = allParentInfo[j].avatarUrl
              }
            }
          }

        }
        self.setData({
          appendList: self.data.appendList,
          listNumber: self.data.appendList.length,
          likenumber: self.data.likenumber
        })
        // console.info(self.data.appendList)
      },
      fail: function(e) {

      },
      complete: function(e) {
        // console.info(e);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.show()
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