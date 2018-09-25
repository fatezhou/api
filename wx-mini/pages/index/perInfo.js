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

    userId:'',
    Imgpath: '',
    avatarUrl: '',
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
    this.getGrowthRecords()
  },

  getContact: function() {
    var self = this;
    var that = this;

    var contact = app.globalData.allStudent
    // console.info(self.data.recordsList)
    // console.info('----------====')
    for (var i in contact) {
      for (var j in self.data.recordsList) {
        if (contact[i].studentId == self.data.recordsList[j].studentId) {
          self.data.recordsList[j].name = (contact[i].nickname == "" ? contact[i].name : contact[i].nickname);

        }
      }
    }
    self.setData({
      recordsList: self.data.recordsList
    });
    app.globalData.contact = self.data.recordsList;



    that.setData({
      allGrowthRecords: app.globalData.contact,
      studentId: studentId,

    })


    var recordsList = self.data.recordsList

    for (var i = 0; i < recordsList.length; i++) {
      var self = this;
      var gData = app.globalData;
      var recordIds = recordsList[i].recordId
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
            self.data.recordWithAppend = e.data.data.record
            // self.data.appendList = e.data.data.record.append;
            // self.data.recordId = e.data.data.record.recordId
            // self.data.likenumber = e.data.data.record.like;
            // self.setData({
            //   recordWithAppend: self.data.recordWithAppend
            // });
            // console.info(self.data.recordWithAppend)
          }
          // console.info(self.data.appendList)
          var allTeacherInfo = app.globalData.allTeacherInfo
          for (var i = 0; i < self.data.recordWithAppend.append.length; i++) {
            for (var j = 0; j < allTeacherInfo.length; j++) {
              if (self.data.recordWithAppend.append[i].authorId === allTeacherInfo[j].teacherId) {
                self.data.recordWithAppend.append[i].authorName = allTeacherInfo[j].nickname
                self.data.recordWithAppend.append[i].avatarUrl = allTeacherInfo[j].avatarUrl
              }
            }
          }
          console.info(self.data.recordWithAppend)
          var recordWithAppends = self.data.recordWithAppends.concat(self.data.recordWithAppend)
          // recordWithAppend[0].appendList = 
          self.setData({
            recordWithAppend: self.data.recordWithAppend,
            recordWithAppends: recordWithAppends,
            allTeacherInfo: allTeacherInfo
            // appendList: self.data.appendList,
            // listNumber: self.data.appendList.length,
            // likenumber: self.data.likenumber
          })

        },

      })
    }
    setTimeout(function() {
      console.info(self.data.recordWithAppends)
    }, 2000)

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
        // console.info(res)
        perGrowthRecords = res.data.data.records
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
    console.info('recordWithAppends')
    console.info(this.data.recordWithAppends)
    var gData = app.globalData
    var that = this
    console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    var orgAuthorType = e.currentTarget.dataset.orgauthortype
    var parentRecordId = e.currentTarget.dataset.parentrecordid
    console.info('like')
    console.info(gData.unionid),
      console.info(gData.openid),
      console.info(4), //自己的id
      console.info(1), //1: teacher, 2: parent",
      console.info(recordId), //评论的id
      console.info(parentRecordId), //记录的id
      console.info(authorId), //评论者id
      console.info(orgAuthorType) //评论者类型



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
                    console.info(k + 1)

                    this.data.recordWithAppends[i].append[j].like.teacher.push(gData.userId)

                    that.setData({
                      recordWithAppends: this.data.recordWithAppends
                    })
                    break;
                    console.info(this.data.recordWithAppends)
                    console.info('this.data.appendList[j].like.teacher----------')
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
        console.info(res)
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
              console.info(res)

              // that.changestudent(that.data.current)
              return
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