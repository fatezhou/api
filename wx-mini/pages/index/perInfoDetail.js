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
    familyId: 0,
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

  //头像跳转个人信息
  toUserInfo: function(e) {
    console.info(e)
    let item = e.currentTarget.dataset.item
    if (item.authorType == 1) {
      wx.navigateTo({
        url: '../userInfo/userInfo?teacherid=' + item.authorId,
      })
    } else {
      wx.navigateTo({
        url: '../member/parents?studentId=' + item.studentId,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 默认头像
    this.data.Imgpath = app.globalData.Imgpath

    // if (options.avatarUrl) {
    //   this.data.avatarUrl = options.avatarUrl
    // }

    this.data.userId = app.globalData.userId
    this.data.allTeacherInfo = app.globalData.allTeacherInfo
    // 家长信息
    this.data.allParentInfo = app.globalData.allParentInfo
    this.data.recordId = parseInt(options.recordId);

    this.data.mainText = options.mainText;
    this.data.studentId = options.studentId;
    this.data.familyId = parseInt(options.familyId);
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

      }
    })


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
        var avatarUrl = app.globalData.allTeacherInfo[i].avatarUrl
        this.setData({
          teacherName: name,
          avatarUrl: avatarUrl
        })
      }
    }
  },

  like: function(e) {
    var gData = app.globalData
    var that = this
    var recordId = e.currentTarget.dataset.recordid
    var familyId = parseInt(e.currentTarget.dataset.familyid)

    var orgAuthorId = 0
    var orgAuthorType = 0
    if (e.currentTarget.dataset.orgauthorid) {
      orgAuthorId = e.currentTarget.dataset.orgauthorid
      orgAuthorType = e.currentTarget.dataset.orgauthortype
    }


    if (e.currentTarget.dataset.parentrecordid) {
      var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)
    } else {
      var parentRecordId = parseInt(that.data.recordId)
    }

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

    if (parentRecordId == 0) {

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
    console.info(gData.userId)
    console.info(gData.userType)
    console.info(orgAuthorId)
    console.info(orgAuthorType)
    wx.request({
      url: gData.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionId,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": gData.userType, //1: teacher, 2: parent",
        "familyId": familyId,
        "recordId": recordId,
        "parentRecordId": parentRecordId,
        "orgAuthorId": orgAuthorId,
        "orgAuthorType": orgAuthorType
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
              "authorType": gData.userType, //1: teacher, 2: parent",
              "recordId": recordId,
              "familyId": familyId,
              "parentRecordId": parseInt(that.data.recordId),
              'cancel': true,
              "orgAuthorId": orgAuthorId,
              "orgAuthorType": orgAuthorType
            },
            success: function(res) {
              // console.info(res)

              // that.show()
              // return
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
        if (e.data.code == 0) {
          for (var t = 0; t < e.data.data.record.append.length; t++) {
            e.data.data.record.append[t].text = decodeURIComponent(e.data.data.record.append[t].text)

            // 排序  修复 点赞图标可能出现两个的问题  开始 --->
            if (e.data.data.record.append[t].like) {
              if (e.data.data.record.append[t].like.teacher.length > 0) {
                for (var i = 0; i < e.data.data.record.append[t].like.teacher.length; i++) {
                  var length = e.data.data.record.append[t].like.teacher.length
                  if (e.data.data.record.append[t].like.teacher[i] == app.globalData.userId) {
                    var temp = e.data.data.record.append[t].like.teacher[length - 1]
                    e.data.data.record.append[t].like.teacher[length - 1] = e.data.data.record.append[t].like.teacher[i]
                    e.data.data.record.append[t].like.teacher[i] = temp
                    break
                  }
                }
              }
            }
            //排序  修复 点赞图标可能出现两个的问题   <---  结束
          }
          self.data.appendList = e.data.data.record.append;
          if (e.data.data.record.likes) {
            self.data.likenumber = e.data.data.record.likes.teacher.length + e.data.data.record.likes.parent.length;
          } else {
            self.data.likenumber = 0
          }

          // 排序  修复 点赞图标可能出现两个的问题  开始 --->
          if (e.data.data.record.likes) {
            if (e.data.data.record.likes.teacher.length > 0) {
              for (var i = 0; i < e.data.data.record.likes.teacher.length; i++) {
                var length = e.data.data.record.likes.teacher.length
                if (e.data.data.record.likes.teacher[i] == app.globalData.userId) {
                  var temp = e.data.data.record.likes.teacher[length - 1]
                  e.data.data.record.likes.teacher[length - 1] = e.data.data.record.likes.teacher[i]
                  e.data.data.record.likes.teacher[i] = temp
                  break
                }
              }
            }
          }
          //排序  修复 点赞图标可能出现两个的问题   <---  结束

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
            if (self.data.appendList[i].studentId == allStudentInfo[j].studentId) {
              self.data.appendList[i].familyId = allStudentInfo[j].familyId
            }
          }


        }
        self.setData({
          appendList: self.data.appendList,
          listNumber: self.data.appendList.length,
          likenumber: self.data.likenumber
        })
        console.info(self.data.appendList)
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