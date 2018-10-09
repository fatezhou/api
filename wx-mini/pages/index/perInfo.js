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
  },

  showmore: function(e) {

    for (var o = 0; o < this.data.allGrowthRecords.length; o++) {
      if (this.data.allGrowthRecords[o].recordId == e.currentTarget.dataset.recordid) {
        this.data.allGrowthRecords[o].isfold = !this.data.allGrowthRecords[o].isfold
        this.setData({
          allGrowthRecords: this.data.allGrowthRecords
        })
        // console.info(this.data.allGrowthRecords[o])
        // console.info(this.data.allGrowthRecords[o].isfold)
        break
      }
    }
    // console.info(e.currentTarget.dataset.recordid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    studentId = options.studentId
    this.setData({
      studentId: studentId,
      studentName: options.studentName,
      sex: options.sex,
      recordSize: app.globalData.studentRecordCount,
      userId: app.globalData.userId,
      Imgpath: app.globalData.Imgpath,
      avatarUrl: options.avatarUrl
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
    this.setData({
      recordWithAppends: []
    })
    // if (app.globalData.perTeacherRecords == true) {
    // perTeacherRecords = true
    // } else {
    perTeacherRecords = false
    // }
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
    // var that = this;

    var contact = app.globalData.allStudent
    // console.info(self.data.recordsList)
    // console.info('----------====')
    for (var i in contact) {
      for (var j in self.data.recordsList) {
        if (contact[i].studentId == self.data.recordsList[j].studentId) {
          self.data.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);
         
          // self.data.recordsList[j].text = decodeURIComponent(self.data.recordsList[j].text)
          // console.info(self.data.recordsList[j].text)
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
    // console.info(self.data.allGrowthRecords)

    // var recordsList = self.data.recordsList

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
          // console.info(e.data.data.record)
          // console.info('e.data.data.record')
          if (e.data.code == 0) {
            for (var t = 0; t < e.data.data.record.append.length; t++) {
              e.data.data.record.append[t].text = decodeURIComponent(e.data.data.record.append[t].text)
              e.data.data.record.append[t].isfold = true
              if (e.data.data.record.append[t].text.length > 100) {
                e.data.data.record.append[t].showTextBtn = true
              }
            }
            self.data.recordWithAppend = e.data.data.record
          }

          var allTeacherInfo = app.globalData.allTeacherInfo
        
          var allParentInfo = app.globalData.allParentInfo
          for (var i = 0; i < self.data.recordWithAppend.append.length; i++) {
            if (self.data.recordWithAppend.append[i].authorType == 1) {
              for (var j = 0; j < allTeacherInfo.length; j++) {
                if (self.data.recordWithAppend.append[i].authorId == allTeacherInfo[j].teacherId) {
                  self.data.recordWithAppend.append[i].authorName = allTeacherInfo[j].nickname
                  self.data.recordWithAppend.append[i].avatarUrl = allTeacherInfo[j].avatarUrl
                  self.data.recordWithAppend.append[i].text = decodeURIComponent(self.data.recordWithAppend.append[i].text)
                }
              }
            }else{
              for (var j = 0; j < allParentInfo.length; j++) {
                if (self.data.recordWithAppend.append[i].authorId == allParentInfo[j].parentId) {
                  self.data.recordWithAppend.append[i].authorName = allParentInfo[j].name
                  self.data.recordWithAppend.append[i].avatarUrl = allParentInfo[j].avatarUrl
                  self.data.recordWithAppend.append[i].text = decodeURIComponent(self.data.recordWithAppend.append[i].text)
                }
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
          // console.info(recordWithAppends)
          // console.info('recordWithAppends')

        },

      })
    }
    // setTimeout(function() {
      // console.info(self.data.recordWithAppends)
    // }, 2000)

  },

  getGrowthRecords: function() {
    var that = this;
    // console.info(perTeacherRecords)
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
        if (res.data.data.records.length == 0){
          that.setData({
            norecord:true
          })
        }
        // console.info(res)
        for (var t = 0; t < res.data.data.records.length; t++) {
          res.data.data.records[t].text = decodeURIComponent(res.data.data.records[t].text)

          res.data.data.records[t].isfold = true
          if (res.data.data.records[t].text.length > 100) {
            res.data.data.records[t].showTextBtn = true
          }
          // console.info(res)
        }
        // perGrowthRecords = res.data.data.records
        // console.log(perGrowthRecords)
        for (var i in res.data.data.records) {
          res.data.data.records[i].name = " ";
        }
        that.setData({
          recordsList: res.data.data.records,
          // recordSize: res.data.data.records.length
        });
        that.getContact();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  like: function(e) {
    // console.info('recordWithAppends')
    // console.info(this.data.recordWithAppends)
    var gData = app.globalData
    var that = this
    // console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    var orgAuthorType = e.currentTarget.dataset.orgauthortype
    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)

    // console.info('like')
    // console.info(gData.unionid),
    //   console.info(gData.openid),
    //   console.info(4), //自己的id
    //   console.info(1), //1: teacher, 2: parent",
    //   console.info(recordId), //评论的id
    //   console.info(parentRecordId), //记录的id
    //   console.info(authorId), //评论者id
    //   console.info(orgAuthorType) //评论者类型



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
                  }


                  // 3333
                  else if ((k + 1) == this.data.recordWithAppends[i].append[j].like.teacher.length) {
                    // console.info(k + 1)

                    this.data.recordWithAppends[i].append[j].like.teacher.push(gData.userId)

                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                    break;
                    // console.info(this.data.recordWithAppends)
                    // console.info('this.data.appendList[j].like.teacher----------')
                  }
                  // 2222
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

    // recordWithAppends
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
                  // console.info(this.data.recordsList)
                  // console.info('splice')
                } else if ((k + 1) == this.data.recordWithAppends[j].likes.teacher.length) {
                  // console.info(k + 1)

                  this.data.recordWithAppends[j].likes.teacher.push(gData.userId)

                  that.setData({
                    recordWithAppends: this.data.recordWithAppends
                  })
                  app.globalData.recordWithAppends = this.data.recordWithAppends
                  break;
                  // console.info(this.data.recordsList)
                  // console.info('this.data.appendList[j].like.teacher----------')
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

    console.info(recordId)
    console.info(orgAuthorType)
    console.info('like-------------')
    wx.request({
      url: gData.putRecordLike,
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
        // console.info(res)
        if (res.data.code == 4) {
          wx.request({
            url: gData.putRecordLike,
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
              // console.info(res)

              // that.changestudent(that.data.current)
              // return
            }
          })
        }
        // that.changestudent(that.data.current)
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