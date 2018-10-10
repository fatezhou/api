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
    // --> 代码改动区域 
    // allTeacherInfo: '',
    allUserInfo: '',
    // <-- 代码改动区域

    userId: '',
    Imgpath: '',
    recordId: '',
  },

  formSubmit_collect: function (e) {
    console.info(e)
    let formId = e.detail.formId;
    // console.info(formId)
    console.info(app.globalData.userId)
    console.info(app.globalData.userType)
    console.info(formId)
    console.info(app.globalData.openid)
    console.info(app.globalData.unionid)
    console.info(app.globalData.token)

    wx.request({
      url: app.globalData.putFormId,
      data: {
        "authorId": app.globalData.userId,
        "authorType": app.globalData.userType,
        "formId": formId,
        "openId": app.globalData.openid,
        "unionId": app.globalData.unionid,
        "accesstoken": app.globalData.token
      },
      method: 'post',
      success: function (res) {
        console.info(res)
      }
    })
  },

  showmore: function(e) {
    // console.info(e)
    for (var o = 0; 0 < this.data.recordsList.length; o++) {
      if (this.data.recordsList[o].recordId == e.currentTarget.dataset.recordid) {
        this.data.recordsList[o].isfold = !this.data.recordsList[o].isfold
        this.setData({
          recordsList: this.data.recordsList
        })
        break
      }
    }
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
    studentId = this.data.showswiper[index].id
    // console.info(studentId)
    // console.info('studentId')
    http.getGrowthRecordsWithoutAppend(studentId, function(res) {
      if (res == 0) {
       
        http.getTeachers(function(res) {
          if (that.data.recordId != res[0].recordId || that.data.recordId != '') {
            // console.info(res)

            recordId = res.slice(res.length - 1)[0].recordId
            // console.info(recordId)
            // console.info('recordId')
            that.setData({
              recordId: recordId
            })

            // -- > 代码改动区域
            if (!app.globalData.allUserInfo) {
              http.getParents(function(res) {
                if (res == 0) {
                  http.getTeachers(function(res) {

                    // recordId = res.slice(-1)[0].recordId
           
                    // 整合 教师信息 和 家长信息
                    app.globalData.allUserInfo = app.globalData.allTeacherInfo.concat(app.globalData.allParentInfo)
                   
                    that.setData({
                      // allTeacherInfo: app.globalData.allTeacherInfo,
                      // allParentInfo: app.globalData.allParentInfo,
                      allUserInfo: app.globalData.allUserInfo,
                      // recordId: recordId
                    })
                    that.getAppend()
                  })
                }
              })
            } else {
              that.getAppend()
            }

            // <-- 代码改动区域


          }
        })
      } else {
        that.setData({
          recordsList: '',
          recordSize: 0
        });
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
    var parentRecordId = parseInt(e.currentTarget.dataset.parentrecordid)

    // console.info(this.data.recordsList)
    // console.info('this.data.recordsList.append')
    for (var r = 0; r < this.data.recordsList.length; r++) {
      if (this.data.recordsList[r].recordId == parentRecordId) {
        for (var j = 0; j < this.data.recordsList[r].append.length; j++) {
          if (this.data.recordsList[r].append[j].recordId == recordId) {

            if (this.data.recordsList[r].append[j].like) {
              if (this.data.recordsList[r].append[j].like.parent.length > 0) {
                for (var k = 0; k < this.data.recordsList[r].append[j].like.parent.length; k++) {
                  // 已经点赞了 就取消
                  // 改动位置 删除 previewImage  -->
                  // console.info(this.data.recordsList[r].append[j].like[k])
                  // console.info('cccccc')
                  if (this.data.recordsList[r].append[j].like.parent[k] == gData.userId) {
                    // <-- 改动位置
                    this.data.recordsList[r].append[j].like.parent.splice(k, 1)
                    that.setData({
                      recordsList: this.data.recordsList
                    })
                    app.globalData.recordsList = this.data.recordsList
                    // console.info(this.data.recordsList)
                    // console.info('splice')
                  } else if ((k + 1) == this.data.recordsList[r].append[j].like.parent.length) {

                    this.data.recordsList[r].append[j].like.parent.push(gData.userId)

                    that.setData({
                      recordsList: this.data.recordsList
                    })
                    app.globalData.recordsList = this.data.recordsList
                    break;
                    // console.info(this.data.recordsList)
                    // console.info('this.data.appendList[j].like.teacher----------')
                  }

                }
              } else {
                this.data.recordsList[r].append[j].like.parent[0] = gData.userId

                that.setData({
                  recordsList: this.data.recordsList
                })
                app.globalData.recordsList = this.data.recordsList

              }

            } else {
              var like = []
              var parent = []
              this.data.recordsList[r].append[j].like = {}
              this.data.recordsList[r].append[j].like.parent = []

              this.data.recordsList[r].append[j].like.parent[0] = gData.userId

              that.setData({
                recordsList: this.data.recordsList
              })
              app.globalData.recordsList = this.data.recordsList
            }
          }
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
                  app.globalData.recordsList = this.data.recordsList
                  // console.info(this.data.recordsList)
                  // console.info('splice')
                } else if ((k + 1) == this.data.recordsList[j].likes.parent.length) {
                  // console.info(k + 1)

                  this.data.recordsList[j].likes.parent.push(gData.userId)

                  that.setData({
                    recordsList: this.data.recordsList
                  })
                  app.globalData.recordsList = this.data.recordsList
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
              app.globalData.recordsList = this.data.recordsList
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
            app.globalData.recordsList = this.data.recordsList
          }
        }
      }
    }

    // console.info('like')

    // console.info(gData.unionid),
    //   console.info(gData.openid),
    //   console.info(gData.userId), //自己的id
    //   console.info(gData.userType), //1: teacher, 2: parent",
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
            if (!studentId){
              studentId = app.globalData.studentList[0].id
            }
          
            
            // console.info(that.data.showswiper)
            http.getGrowthRecordsWithoutAppend(studentId, function(res) {
              if (res == 0) {

                // http.getTeachers(function(res) {
                //   // if (!that.data.recordId) {
                //   // console.info(res)
                //   recordId = res.slice(res.length - 1)[0].recordId

                //   that.setData({
                //     allTeacherInfo: app.globalData.allTeacherInfo,
                //     recordId: recordId
                //   })
                //   // console.info('get')
                //   // console.info(app.globalData.allTeacherInfo)

                //   that.getAppend()
                //   // }
                // })
                // -- > 代码改动区域
                http.getParents(function(res) {
                  if (res == 0) {
                    
                    http.getTeachers(function(res) {

                      recordId = res.slice(-1)[0].recordId
                      // console.info(recordId)
                      // console.info('recordId')
                      // console.info(app.globalData.allTeacherInfo)
                      // console.info(app.globalData.allParentInfo)
                      // 整合 教师信息 和 家长信息
                      app.globalData.allUserInfo = app.globalData.allTeacherInfo.concat(app.globalData.allParentInfo)
                      // console.info(app.globalData.allUserInfo)
                      that.setData({
                        // allTeacherInfo: app.globalData.allTeacherInfo,
                        // allParentInfo: app.globalData.allParentInfo,
                        allUserInfo: app.globalData.allUserInfo,
                        recordId: recordId
                      })
                      that.getAppend()
                    })
                  }
                })
                // <-- 代码改动区域

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
    // console.info(app.globalData.recordsList.length)

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
          // console.info(app.globalData.recordsList.length)
          // app.globalData.recordsList = res.data.data.record
          for (var x = 0; x < app.globalData.recordsList.length; x++) {

            if (app.globalData.recordsList[x].recordId == res.data.data.record.recordId) {
              app.globalData.recordsList[x].append = res.data.data.record.append
              app.globalData.recordsList[x].like = res.data.data.record.like
              app.globalData.recordsList[x].likes = res.data.data.record.likes

              app.globalData.recordsList[x].isfold = true
              if (app.globalData.recordsList[x].text.length > 100) {
                app.globalData.recordsList[x].showTextBtn = true
              }
            }
            if (app.globalData.recordsList[x].append) {

              // 代码改动区域  authorType:1:teacher 2:parent --> 循环内  allTeacherInfo 换成 allUserInfo
              for (var y = 0; y < app.globalData.allUserInfo.length; y++) {
                for (var z = 0; z < app.globalData.recordsList[x].append.length; z++) {
                  app.globalData.recordsList[x].append[z].text = decodeURIComponent(app.globalData.recordsList[x].append[z].text)
                  if (app.globalData.recordsList[x].append[z].authorType == 1) {
                    if (app.globalData.recordsList[x].append[z].authorId == app.globalData.allUserInfo[y].teacherId) {
                      // console.info(app.globalData.allUserInfo[y].teacherId)
                      // console.info(app.globalData.recordsList[x].append[z].authorId)
                      // console.info(app.globalData.allUserInfo[y])
                      app.globalData.recordsList[x].append[z].name = app.globalData.allUserInfo[y].nickname
                      app.globalData.recordsList[x].append[z].avatarUrl = app.globalData.allUserInfo[y].avatarUrl
                      // app.globalData.recordsList[x].append[z].isfold = true
                      // if (app.globalData.recordsList[x].append[z].text.length > 100) {
                      //   app.globalData.recordsList[x].append[z].showTextBtn = true
                      // }
                    }
                  } else if (app.globalData.recordsList[x].append[z].authorType == 2) {
                    // console.info(app.globalData.allUserInfo[y])
                    // console.info(app.globalData.recordsList[x].append[z])
                    // console.info(app.globalData.allUserInfo[y].parentId)
                    if (app.globalData.recordsList[x].append[z].authorId == app.globalData.allUserInfo[y].parentId) {
                      // console.info(app.globalData.allUserInfo[y].parentId)
                      // console.info(app.globalData.recordsList[x].append[z].authorId)
                      // console.info(app.globalData.allUserInfo)
                      // console.info('-------------------------')
                      app.globalData.recordsList[x].append[z].name = app.globalData.allUserInfo[y].name
                      app.globalData.recordsList[x].append[z].avatarUrl = app.globalData.allUserInfo[y].avatarUrl
                      // app.globalData.recordsList[x].append[z].isfold = true
                      // if (app.globalData.recordsList[x].append[z].text.length > 100) {
                      //   app.globalData.recordsList[x].append[z].showTextBtn = true
                      // }
                    }
                  }

                  // <-- 代码改动区域
                }
              }
              // console.info(app.globalData.recordsList[x].append)
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
            // var studentId = studentId
            http.getGrowthRecordsWithoutAppend(studentId, function(res) {
              if (res == 0) {

                // http.getTeachers(function(res) {
                //   // console.info(res)
                //   recordId = res.slice(res.length - 1)[0].recordId

                //   that.setData({
                //     allTeacherInfo: app.globalData.allTeacherInfo,
                //     recordId: recordId
                //   })
                //   // console.info('get')
                //   // console.info(app.globalData.allTeacherInfo)

                //   that.getAppend()
                // })

                // -- > 代码改动区域
                http.getParents(function(res) {
                  if (res == 0) {
                    http.getTeachers(function(res) {

                      recordId = res.slice(res.length - 1)[0].recordId
                      // console.info(app.globalData.allTeacherInfo)
                      // console.info(app.globalData.allParentInfo)
                      // 整合 教师信息 和 家长信息
                      app.globalData.allUserInfo = app.globalData.allTeacherInfo.concat(app.globalData.allParentInfo)
                      // console.info(app.globalData.allUserInfo)
                      that.setData({
                        // allTeacherInfo: app.globalData.allTeacherInfo,
                        // allParentInfo: app.globalData.allParentInfo,
                        allUserInfo: app.globalData.allUserInfo,
                        recordId: recordId
                      })
                      that.getAppend()
                    })
                  }
                })
                // <-- 代码改动区域
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
          getrecordsList[i].text = decodeURIComponent(getrecordsList[i].text)
        }

        that.getContactFromGData();
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  getContactFromGData: function() {
    var that = this;
    // 代码改动区域   allTeacherInfo 换成  allUserInfo -->
    for (var i in app.globalData.allUserInfo) {
      for (var j in getrecordsList) {
        if (getrecordsList[j].authorType == 1) {
          if (app.globalData.allUserInfo[i].teacherId == getrecordsList[j].authorId) {
            getrecordsList[j].name = (app.globalData.allUserInfo[i].nickname == "" ? app.globalData.allUserInfo[i].name : app.globalData.allUserInfo[i].nickname);
            getrecordsList[j].avatarUrl = app.globalData.allUserInfo[i].avatarUrl;
          }
        } else if (getrecordsList[j].authorType == 2) {
          if (app.globalData.allUserInfo[i].parentId == getrecordsList[j].authorId) {
            getrecordsList[j].name = app.globalData.allUserInfo[i].name;
            getrecordsList[j].avatarUrl = app.globalData.allUserInfo[i].avatarUrl;
          }
        }

      }
    }
    //  <-- 代码改动区域

    app.globalData.recordsList = app.globalData.recordsList.concat(getrecordsList)

    that.getAppend()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})