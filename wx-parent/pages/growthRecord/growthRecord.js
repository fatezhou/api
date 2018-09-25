// pages/growthRecord/growthRecord.js
const app = getApp();
var template = require('../../template/template.js')
var http = require('../../utils/http.js')
var recordId;
var getrecordsList;
var studentId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showswiper: [],

    current: 0,

    recordsList: '',
    recordSize: '',
    allTeacherInfo: '',

    userId: '',
    Imgpath: '',
    recordId: '',
  },

  showBigImg: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.showbigimg,
      urls: e.currentTarget.dataset.showpicurls
    })
  },

  // 选择学员
  swiper: function(e) {
    this.setData({
      current: e.detail.current
    })
    this.changestudent(e.detail.current)
  },

  changestudent: function(index) {
    var that = this
    studentId = this.data.showswiper[index].studentId
    http.getGrowthRecordsWithoutAppend(studentId, function(res) {
      if (res == 0) {

        http.getTeachers(function(res) {
          if (that.data.recordId != res[0].recordId) {
            // console.info(res)
            recordId = res.slice(res.length - 1)[0].recordId
            that.setData({
              recordId: recordId
            })

            that.getAppend()
          }
        })
      }
    })
  },

  like: function(e) {
    var gData = app.globalData
    var that = this
    // console.info(e)
    var recordId = e.currentTarget.dataset.recordid
    var authorId = e.currentTarget.dataset.authorid
    var orgAuthorType = e.currentTarget.dataset.orgauthortype
    var parentRecordId = e.currentTarget.dataset.parentrecordid

    // console.info(this.data.recordsList)
    // console.info('this.data.recordsList.append')
    for (var r = 0; r < this.data.recordsList.length; r++) {
      if (this.data.recordsList[r].recordId == parentRecordId) {
        for (var j = 0; j < this.data.recordsList[r].append.length; j++) {
          if (this.data.recordsList[r].append[j].recordId == recordId) {

            if (this.data.recordsList[r].append[j].like) {
              if (this.data.recordsList[r].append[j].like.teacher.length > 0) {
                for (var k = 0; k < this.data.recordsList[r].append[j].like.teacher.length; k++) {
                  // 已经点赞了 就取消
                  if (this.data.recordsList[r].append[j].like.teacher[k] == gData.userId) {

                    this.data.recordsList[r].append[j].like.teacher.splice(k, 1)
                    that.setData({
                      recordsList: this.data.recordsList
                    })
                    // console.info(this.data.recordsList)
                    // console.info('splice')
                  } else if ((k + 1) == this.data.recordsList[r].append[j].like.teacher.length) {
                    // console.info(k + 1)

                    this.data.recordsList[r].append[j].like.teacher.push(gData.userId)

                    that.setData({
                      recordsList: this.data.recordsList
                    })
                    break;
                    // console.info(this.data.recordsList)
                    // console.info('this.data.appendList[j].like.teacher----------')
                  }

                }
              } else {
                this.data.recordsList[r].append[j].like.teacher[0] = gData.userId

                that.setData({
                  recordsList: this.data.recordsList
                })
              }

            } else {
              var like = []
              var teacher = []
              this.data.recordsList[r].append[j].like = {}
              this.data.recordsList[r].append[j].like.teacher = []

              this.data.recordsList[r].append[j].like.teacher[0] = gData.userId

              that.setData({
                recordsList: this.data.recordsList
              })
            }
          }
        }
      }

    }





    // console.info('like')

    // console.info(gData.unionid),
    //   console.info(gData.openid),
    //   console.info(4), //自己的id
    //   console.info(1), //1: teacher, 2: parent",
    //   console.info(recordId), //评论的id
    //   console.info(parentRecordId), //记录的id
    //   console.info(authorId), //评论者id
    //   console.info(orgAuthorType) //评论者类型
    // console.info('like')
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
        // console.info(res)
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
              // console.info(res)

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this)
    // var that = this
    // http.login(function(res) {
    //   if (res == 0) {
    //     if (!app.globalData.Imgpath) {
    //       http.getHeadImg(function(res) {
    //         that.setData({
    //           Imgpath: res
    //         })
    //       })
    //     } else {
    //       that.setData({
    //         Imgpath: app.globalData.Imgpath
    //       })
    //     }

    //     http.getParentInfo(function(res) {
    //       if (res == 0) {
    //         that.setData({
    //           showswiper: app.globalData.studentList,
    //           userId: app.globalData.userId
    //         })
    //         studentId = app.globalData.studentId[0]
    //         http.getGrowthRecordsWithoutAppend(studentId, function(res) {
    //           if (res == 0) {

    //             http.getTeachers(function(res) {
    //               console.info(res)
    //               recordId = res.slice(res.length - 1)[0].recordId

    //               that.setData({
    //                 allTeacherInfo: app.globalData.allTeacherInfo,
    //                 recordId: recordId
    //               })
    //               console.info('get')
    //               console.info(app.globalData.allTeacherInfo)

    //               that.getAppend()
    //             })
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
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
    var that = this
    // if (!this.data.recordId || this.data.recordId != res[0].recordId) {
    http.login(function(res) {
      if (res == 0) {
        if (!app.globalData.Imgpath) {
          http.getHeadImg(function(res) {
            that.setData({
              Imgpath: res
            })
          })
        } else {
          that.setData({
            Imgpath: app.globalData.Imgpath
          })
        }

        http.getParentInfo(function(res) {
          if (res == 0) {
            that.setData({
              showswiper: app.globalData.studentList,
              userId: app.globalData.userId
            })
            studentId = app.globalData.studentId[0]
            http.getGrowthRecordsWithoutAppend(studentId, function(res) {
              if (res == 0) {

                http.getTeachers(function(res) {
                  if (!that.data.recordId) {
                    // console.info(res)
                    recordId = res.slice(res.length - 1)[0].recordId

                    that.setData({
                      allTeacherInfo: app.globalData.allTeacherInfo,
                      recordId: recordId
                    })
                    // console.info('get')
                    // console.info(app.globalData.allTeacherInfo)

                    that.getAppend()
                  }
                })
              }
            })
          }
        })
      }
    })
    // }
  },

  getAppend: function() {
    var that = this
    // console.info('recordsList----')
    // console.info(app.globalData.recordsList)
    for (var i = 0; i < app.globalData.recordsList.length; i++) {
      var recordId = app.globalData.recordsList[i].recordId
      // console.info(recordId)
      wx.request({
        url: app.globalData.minodopeApi.getOneGrowthRecordWithAppendByRecordId,
        data: {
          "unionid": app.globalData.unionid,
          "openid": app.globalData.openid,
          "recordId": recordId,
        },
        header: {},
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          // console.info(res)
          // console.info('append')
          for (var x = 0; x < app.globalData.recordsList.length; x++) {

            if (app.globalData.recordsList[x].recordId == res.data.data.record.recordId) {
              app.globalData.recordsList[x].append = res.data.data.record.append
            }
            if (app.globalData.recordsList[x].append) {
              for (var y = 0; y < app.globalData.allTeacherInfo.length; y++) {
                for (var z = 0; z < app.globalData.recordsList[x].append.length; z++) {
                  if (app.globalData.recordsList[x].append[z].authorId == app.globalData.allTeacherInfo[y].teacherId) {
                    app.globalData.recordsList[x].append[z].name = app.globalData.allTeacherInfo[y].nickname
                    app.globalData.recordsList[x].append[z].avatarUrl = app.globalData.allTeacherInfo[y].avatarUrl
                  }
                }
              }
            }

          }
          // console.info(app.globalData.recordsList)
          // console.info('recordsList')
          that.setData({
            recordsList: app.globalData.recordsList,
            recordSize: app.globalData.indexSize
          });

        },
        fail: function(res) {

          // console.info('fail: ' + res)
        },
        complete: function(res) {
          // console.info(res)
        },
      })
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
    var that = this
    http.login(function(res) {
      if (res == 0) {

        http.getParentInfo(function(res) {
          if (res == 0) {
            that.setData({
              showswiper: app.globalData.studentList
            })
            var studentId = app.globalData.studentId[0]
            http.getGrowthRecordsWithoutAppend(studentId, function(res) {
              if (res == 0) {

                http.getTeachers(function(res) {
                  // console.info(res)
                  recordId = res.slice(res.length - 1)[0].recordId

                  that.setData({
                    allTeacherInfo: app.globalData.allTeacherInfo,
                    recordId: recordId
                  })
                  // console.info('get')
                  // console.info(app.globalData.allTeacherInfo)

                  that.getAppend()
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // console.info(recordId)
    // console.info(111)
    var that = this;

    wx.request({
      url: app.globalData.minodopeApi.getGrowthRecordsWithoutAppend,
      data: {
        "unionid": app.globalData.unionid,
        "openid": app.globalData.openid,
        "recordId": recordId,
        "studentId": studentId,
      },
      header: {},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.info(res)
        recordId = res.data.data.records.slice(res.data.data.records.length - 1)[0].recordId
        that.setData({
          recordId: recordId
        })
        getrecordsList = res.data.data.records
        for (var i in getrecordsList) {
          getrecordsList[i].name = " ";
          getrecordsList[i].avatarUrl = " ";
        }

        that.getContactFromGData();
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  getContactFromGData: function() {
    var that = this;

    for (var i in app.globalData.allTeacherInfo) {
      for (var j in getrecordsList) {
        if (app.globalData.allTeacherInfo[i].teacherId == getrecordsList[j].authorId) {
          getrecordsList[j].name = (app.globalData.allTeacherInfo[i].nickname == "" ? app.globalData.allTeacherInfo[i].name : app.globalData.allTeacherInfo[i].nickname);
          getrecordsList[j].avatarUrl = app.globalData.allTeacherInfo[i].avatarUrl;
        }
      }
    }

    app.globalData.recordsList = app.globalData.recordsList.concat(getrecordsList)

    that.getAppend()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})