// pages/index/perInfo.js
const app = getApp()
var studentId;
var perGrowthRecords;
var perTeacherRecords = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allGrowthRecords: '',
    studentId: '',
    familyId: '',
    studentName: '',
    sex: '',
    recordSize: 0,
    recordsList: '',

    appendList: '',
    listNumber: '',
    likenumber: '',
    recordId: '',
    recordWithAppend: '',
    recordWithAppends: [],

    orgAuthorType: 0,
    allTeacherInfo: '',
    allParentInfo: '',
    userId: '',
    Imgpath: '',
    avatarUrl: '',

    norecord: '',
    noTextPrompt: '无更多记录',
  },

  showBigImg: function (e) {
    console.info(e.currentTarget.dataset)
    var urls = []
    urls[0] = e.currentTarget.dataset.showimg
    wx.previewImage({
      current: e.currentTarget.dataset.showimg,
      urls: urls
    })
  },

  showmore: function(e) {

    for (var o = 0; o < this.data.allGrowthRecords.length; o++) {
      if (this.data.allGrowthRecords[o].recordId == e.currentTarget.dataset.recordid) {
        this.data.allGrowthRecords[o].isfold = !this.data.allGrowthRecords[o].isfold
        this.setData({
          allGrowthRecords: this.data.allGrowthRecords
        })
        break
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    studentId = options.studentId
    this.setData({
      studentId: studentId,
      familyId: parseInt(options.familyId),
      studentName: options.studentName,
      sex: options.sex,
      recordSize: app.globalData.studentRecordCount,
      userId: app.globalData.userId,
      Imgpath: app.globalData.Imgpath,
      avatarUrl: options.avatarUrl
    })
    console.info(this.data.familyId)
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
    this.setData({
      recordWithAppends: []
    })

    perTeacherRecords = false

    this.getGrowthRecords()

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
    this.setData({
      // allGrowthRecords: '',
      // recordsList: '',
      // appendList: '',
      // recordWithAppend: '',
      recordWithAppends: [],
    })
    this.getGrowthRecords()
    wx.stopPullDownRefresh()
  },

  getContact: function() {
    var self = this;

    var contact = app.globalData.allStudent
    for (var i in contact) {
      for (var j in self.data.recordsList) {
        if (contact[i].studentId == self.data.recordsList[j].studentId) {
          self.data.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
          // self.data.recordsList[j].familyId = contact[i].familyId
        }
      }
    }
    self.setData({
      recordsList: self.data.recordsList
    });
    app.globalData.contact = self.data.recordsList;



    self.setData({
      allGrowthRecords: app.globalData.contact,
      studentId: studentId,

    })
    console.info(self.data.allGrowthRecords)

    for (var i = 0; i < app.globalData.contact.length; i++) {
      var self = this;
      var gData = app.globalData;
      var recordIds = app.globalData.contact[i].recordId
      wx.request({
        url: gData.oneGrowthRecordWithAppendUrl,
        data: {
          unionid: gData.unionid,
          openid: gData.openid,
          recordId: recordIds
        },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function(e) {

          if (e.data.code == 0) {
            for (var t = 0; t < e.data.data.record.append.length; t++) {
              e.data.data.record.append[t].text = decodeURIComponent(e.data.data.record.append[t].text)
              e.data.data.record.append[t].isfold = true
              if (e.data.data.record.append[t].text.length > 100) {
                e.data.data.record.append[t].showTextBtn = true
              }


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
            self.data.recordWithAppend = e.data.data.record
          }

          var allTeacherInfo = app.globalData.allTeacherInfo

          var allParentInfo = app.globalData.allParentInfo
          var allStudentInfo = app.globalData.allStudent
          for (var i = 0; i < self.data.recordWithAppend.append.length; i++) {
            if (self.data.recordWithAppend.append[i].authorType == 1) {
              for (var j = 0; j < allTeacherInfo.length; j++) {
                if (self.data.recordWithAppend.append[i].authorId == allTeacherInfo[j].teacherId) {
                  self.data.recordWithAppend.append[i].authorName = allTeacherInfo[j].nickname
                  self.data.recordWithAppend.append[i].avatarUrl = allTeacherInfo[j].avatarUrl
                  self.data.recordWithAppend.append[i].text = decodeURIComponent(self.data.recordWithAppend.append[i].text)
                }
              }
            } else {
              for (var j = 0; j < allParentInfo.length; j++) {
                if (self.data.recordWithAppend.append[i].authorId == allParentInfo[j].parentId) {
                  self.data.recordWithAppend.append[i].authorName = allParentInfo[j].name
                  self.data.recordWithAppend.append[i].avatarUrl = allParentInfo[j].avatarUrl
                  self.data.recordWithAppend.append[i].text = decodeURIComponent(self.data.recordWithAppend.append[i].text)
                }
              }
            }

            // 通过student表 获取familyId
            for (var j = 0; j < allStudentInfo.length; j++) {
              if (self.data.recordWithAppend.append[i].studentId == allStudentInfo[j].studentId) {
                self.data.recordWithAppend.append[i].familyId = allStudentInfo[j].familyId
              }
            }

          }

          var recordWithAppends = self.data.recordWithAppends.concat(self.data.recordWithAppend)

          self.setData({
            recordWithAppend: self.data.recordWithAppend,
            recordWithAppends: recordWithAppends,
            allTeacherInfo: allTeacherInfo,
            allParentInfo: allParentInfo
          })
          app.globalData.recordWithAppends = recordWithAppends

        },

      })
      // setTimeout(function(){
      //   console.info(self.data.recordWithAppends)
      // },5000)
    }

  },

  getGrowthRecords: function() {
    var that = this;

    if (perTeacherRecords) {
      var data = {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "studentId": studentId,
        "pageSize": that.data.recordSize,
        "authorType": app.globalData.userType,
        "authorId": app.globalData.userId
      }
    } else {
      var data = {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "studentId": studentId,
        "pageSize": that.data.recordSize,
      }
    }

    wx.request({
      url: app.globalData.getGrowthRecordsWithoutAppend,
      data: data,
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.data.records.length == 0) {
          that.setData({
            norecord: true
          })
        }
        for (var t = 0; t < res.data.data.records.length; t++) {
          res.data.data.records[t].text = decodeURIComponent(res.data.data.records[t].text)

          res.data.data.records[t].isfold = true
          if (res.data.data.records[t].text.length > 100) {
            res.data.data.records[t].showTextBtn = true
          }

          // 排序  修复 点赞图标可能出现两个的问题  开始 --->
          if (res.data.data.records[t].likes) {
            if (res.data.data.records[t].likes.teacher.length > 0) {
              for (var i = 0; i < res.data.data.records[t].likes.teacher.length; i++) {
                var length = res.data.data.records[t].likes.teacher.length
                if (res.data.data.records[t].likes.teacher[i] == app.globalData.userId) {
                  var temp = res.data.data.records[t].likes.teacher[length - 1]
                  res.data.data.records[t].likes.teacher[length - 1] = res.data.data.records[t].likes.teacher[i]
                  res.data.data.records[t].likes.teacher[i] = temp
                  break
                }
              }
            }
          }
          //排序  修复 点赞图标可能出现两个的问题   <---  结束
        }
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = " ";
        }
        that.setData({
          recordsList: res.data.data.records,
        });
        that.getContact();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  like: function(e) {

    var gData = app.globalData
    var that = this
    console.info(e.currentTarget.dataset)
    var recordId = e.currentTarget.dataset.recordid
    var orgAuthorId = 0
    var orgAuthorType = 0
    if (e.currentTarget.dataset.orgauthorid){
      orgAuthorId = e.currentTarget.dataset.orgauthorid
      orgAuthorType = e.currentTarget.dataset.orgauthortype
    }
 

    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)
    var familyId = parseInt(e.currentTarget.dataset.familyid)

    for (var i = 0; i < this.data.recordWithAppends.length; i++) {
      if (this.data.recordWithAppends[i].recordId == parentRecordId) {
        for (var j = 0; j < this.data.recordWithAppends[i].append.length; j++) {
          if (this.data.recordWithAppends[i].append[j].recordId == recordId) {

            if (this.data.recordWithAppends[i].append[j].like) {
              if (this.data.recordWithAppends[i].append[j].like.teacher.length > 0) {
                for (var k = 0; k < this.data.recordWithAppends[i].append[j].like.teacher.length; k++) {
                  if (this.data.recordWithAppends[i].append[j].like.teacher[k] == gData.userId) {

                    this.data.recordWithAppends[i].append[j].like.teacher.splice(k, 1)
                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                  } else if ((k + 1) == this.data.recordWithAppends[i].append[j].like.teacher.length) {

                    this.data.recordWithAppends[i].append[j].like.teacher.push(gData.userId)

                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                    break;
                  }
                }
              } else {
                this.data.recordWithAppends[i].append[j].like.teacher[0] = gData.userId

                that.setData({
                  recordWithAppends: this.data.recordWithAppends
                })
              }

            } else {
              var like = []
              var teacher = []
              this.data.recordWithAppends[i].append[j].like = {}
              this.data.recordWithAppends[i].append[j].like.teacher = []

              this.data.recordWithAppends[i].append[j].like.teacher[0] = gData.userId

              that.setData({
                recordWithAppends: this.data.recordWithAppends
              })
            }
          }
        }
      }
    }

    if (parentRecordId == 0) {
      for (var j = 0; j < this.data.recordWithAppends.length; j++) {
        if (this.data.recordWithAppends[j].recordId == recordId) {

          if (this.data.recordWithAppends[j].likes) {
            if (this.data.recordWithAppends[j].likes.teacher.length > 0) {
              for (var k = 0; k < this.data.recordWithAppends[j].likes.teacher.length; k++) {
                // 已经点赞了 就取消
                if (this.data.recordWithAppends[j].likes.teacher[k] == gData.userId) {

                  this.data.recordWithAppends[j].likes.teacher.splice(k, 1)
                  that.setData({
                    recordWithAppends: this.data.recordWithAppends
                  })
                  app.globalData.recordWithAppends = this.data.recordWithAppends

                } else if ((k + 1) == this.data.recordWithAppends[j].likes.teacher.length) {

                  this.data.recordWithAppends[j].likes.teacher.push(gData.userId)

                  that.setData({
                    recordWithAppends: this.data.recordWithAppends
                  })
                  app.globalData.recordWithAppends = this.data.recordWithAppends
                  break;
                }

              }
            } else {
              this.data.recordWithAppends[j].likes.teacher[0] = gData.userId

              that.setData({
                recordWithAppends: this.data.recordWithAppends
              })
              app.globalData.recordWithAppends = this.data.recordWithAppends
            }

          } else {
            var likes = []
            var teacher = []
            this.data.recordWithAppends[j].likes = {}
            this.data.recordWithAppends[j].likes.teacher = []

            this.data.recordWithAppends[j].likes.teacher[0] = gData.userId

            that.setData({
              recordWithAppends: this.data.recordWithAppends
            })
            app.globalData.recordWithAppends = this.data.recordWithAppends
          }
        }
      }
    }
    // console.info(gData.userId)
    // console.info(gData.userType)
    // console.info(orgAuthorId)
    // console.info(orgAuthorType)

    wx.request({
      url: gData.putRecordLike,
      method: 'post',
      data: {
        "unionid": gData.unionid,
        "openid": gData.openid,
        "authorId": gData.userId, //自己的id
        "authorType": gData.userType, //1: teacher, 2: parent",
        "recordId": recordId, //评论的id
        "familyId": familyId,
        "parentRecordId": parentRecordId, //记录的id
        "orgAuthorId": orgAuthorId, //评论者id
        "orgAuthorType": orgAuthorType //评论者类型
      },
      success: function(res) {
        if (res.data.code == 4) {
          wx.request({
            url: gData.putRecordLike,
            method: 'post',
            data: {
              "unionid": gData.unionid,
              "openid": gData.openid,
              "authorId": gData.userId, //自己的id
              "familyId": familyId,
              "authorType": gData.userType, //1: teacher, 2: parent",
              "recordId": recordId,
              "parentRecordId": parentRecordId,
              'cancel': true,
              "orgAuthorId": orgAuthorId,
              "orgAuthorType": orgAuthorType
            },
            success: function(res) {

            }
          })
        }
      }
    })
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