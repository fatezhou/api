// pages/index/detail.js

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
    familyId: '',
    Imgpath: '',
    avatarUrl: '',
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
    this.data.recordId = options.recordId;

    this.data.mainText = options.mainText;
    this.data.studentId = options.studentId;
    this.data.familyId = options.familyId;
    this.data.orgAuthorId = options.orgAuthorId;
    this.data.orgAuthorType = options.orgAuthorType;
    this.data.recordId = options.recordId;
    this.data.name = options.name;
    this.data.dateTime = options.dateTime;

    this.setData(this.data);

    this.getRecordSize();

    for (var i = 0; i < app.globalData.contact.length; i++) {
      if (app.globalData.contact[i].recordId == options.recordId) {
        this.setData({
          imgUrl: app.globalData.contact[i].pictureUrls
        })
      }
    }

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

  },

  like: function(e) {
    var gData = app.globalData
    var that = this

    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    var familyId = e.currentTarget.dataset.familyid

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

              } else if ((k + 1) == this.data.appendList[j].like.teacher.length) {
                this.data.appendList[j].like.teacher.push(gData.userId)

                that.setData({
                  appendList: this.data.appendList
                })
                break;

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




    wx.request({
      url: gData.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionId,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": 1, //1: teacher, 2: parent",
        "recordId": recordId,
        "parentRecordId": parseInt(that.data.recordId),
        "orgAuthorId": authorId,
        "orgAuthorType": 1,
        "familyId": familyId
      },
      success: function(res) {

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
              "familyId": familyId,
              'cancel': true
              // "orgAuthorId": authorId,
              // "orgAuthorType": 1
            },
            success: function(res) {

            }
          })
        }

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
      url: '../index/perInfo?studentId=' + this.data.studentId + '&studentName=' + name + '&sex=' + sex + '&avatarUrl=' + avatarUrl + '&familyId=' + this.data.familyId,
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

        that.setData({
          recordSize: "" + res.data.data.count + "条成长记录"
        })
      }
    })

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

        e.data.data.record.text = decodeURIComponent(e.data.data.record.text)
        self.setData({
          mainText: e.data.data.record.text
        })
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

          self.setData(self.data);
        }

        // 教师信息
        var allTeacherInfo = app.globalData.allTeacherInfo
        // 家长信息
        var allParentInfo = app.globalData.allParentInfo
        var allStudentInfo = app.globalData.allStudent
        for (var i = 0; i < self.data.appendList.length; i++) {

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

          
          for (var j = 0; j < allStudentInfo.length; j++) {
            if (allStudentInfo[j].studentId == self.data.appendList[i].studentId) {
              self.data.appendList[i].familyId = allStudentInfo[j].familyId
            }
          }

        }

        self.setData({
          appendList: self.data.appendList,
          listNumber: self.data.appendList.length,
          likenumber: self.data.likenumber
        })

      },
      fail: function(e) {

      },
      complete: function(e) {

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