// pages/pull/review.js
const app = getApp();
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatar: '',
    value: '',
    text: '',
    authorId: '',
    authorType: '',
    studentAvatarUrl: '',
    studentName: '',

    teacherName: '',
    teacherAvatarUrl: '',

    pictureUrls: [],
    canChoose: true, //是否可选图片
    tempFilePaths: {}, //本地图片地址对象
    downloadUrl: '',
    prepareToUpload: [],
    imgs: [], //本地图片地址数组

    recordId: '',
    studentId: '',
    assistId: '',

    familyIds: '',

    mainTeacherId: 0,
    publishRecord: false,

    role: '',
  },

  charChange: function(e) {
    var text = e.detail.value
    var value = e.detail.value
    text = encodeURIComponent(text)
    this.setData({
      text: text,
      value: value,
    })
  },

  getFamily: function(studentId) {
    var that = this
    http.getFamily(studentId, function(res) {
      if (res.length > 0) {
        var familyIds = []
        for (var i = 0; i < res.length; i++) {
          familyIds[i] = res[i].id
        }
        that.setData({
          familyIds: familyIds
        })
      }
    })
  },

  getTeacher: function(authorId) {
    for (var i in app.globalData.teacherList) {
      if (authorId == app.globalData.teacherList[i].teacherId) {
        this.data.teacherName = (app.globalData.teacherList[i].nickname ? app.globalData.teacherList[i].nickname : app.globalData.teacherList[i].name)
        this.data.teacherAvatarUrl = app.globalData.teacherList[i].avatarUrl
        this.setData(this.data)
        break
      }
    }
  },

  // 班主任选择发布
  publishNow: function(e) {
    var status = e.detail.value
    this.data.publishRecord = status

    this.setData(this.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var reviewList = app.globalData.reviewList
    console.info(reviewList)
    this.data.defaultAvatar = app.globalData.defaultAvatar

    this.data.value = reviewList.text
    this.data.text = reviewList.text
    this.data.authorId = reviewList.authorId
    this.data.authorType = reviewList.authorType
    this.data.studentAvatarUrl = reviewList.studentAvatarUrl
    this.data.studentName = reviewList.studentName

    this.data.recordId = reviewList.recordId
    this.data.studentId = reviewList.studentId
    // this.data.assistId = parseInt(reviewList.assistId)
    this.data.assistId = reviewList.assistId
    this.data.mainTeacherId = reviewList.mainTeacherId

    this.data.imgs = reviewList.pictureUrls


    for (var i in this.data.imgs) {
      this.data.prepareToUpload[i] = {}
      this.data.prepareToUpload[i].downloadUrl = this.data.imgs[i]
    }

    if (this.data.imgs.length >= 9) {
      this.setData({
        canChoose: false,
      });
    }

    this.data.role = app.globalData.role

    this.setData(this.data)

    this.getFamily(this.data.studentId)
    this.getTeacher(this.data.authorId)
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
    if (app.globalData.chooseStudent) {
      this.setData({
        studentName: app.globalData.chooseStudent.name,
        studentId: app.globalData.chooseStudent.studentId,
        studentAvatarUrl: app.globalData.chooseStudent.avatarUrl,
      })
      this.getFamily(this.data.studentId)
    }
  },

  submit: function() {
    // console.info(this.data.text)
    // console.info(this.data.tempFilePaths)
    if (this.data.text == '' && this.data.tempFilePaths == {}) {
      wx.showToast({
        title: '您还没输入内容呢',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
      return
    }
    //  console.info(1)
    if (encodeURIComponent(this.data.callText) == this.data.text || this.data.tempFilePaths == {}) {
      wx.showToast({
        title: '您还没输入内容呢',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
      return
    }
    if (this.data.studentName == '请选择学员') {
      wx.showToast({
        title: '请选择学员',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
      return
    }
    console.info(this.data.prepareToUpload)
    if (app.globalData.reviewList.pictureUrls.length > 0) {
      for (var i in this.data.prepareToUpload) {
        for (var j in app.globalData.reviewList.pictureUrls) {
          if (this.data.prepareToUpload[i].downloadUrl != app.globalData.reviewList.pictureUrls[i]) {
            wx.uploadFile({
              url: app.globalData.qiniup,
              filePath: this.data.prepareToUpload[i].localFilePath,
              name: "file",
              header: 'Content-Type: multipart/form-data;',
              method: 'post',
              formData: {
                token: this.data.prepareToUpload[i].token,
                key: this.data.prepareToUpload[i].key,
              },
              success: function(res) {},
            });
          }
        }
      }
    } else {
      for (var i in this.data.prepareToUpload) {
        wx.uploadFile({
          url: app.globalData.qiniup,
          filePath: this.data.prepareToUpload[i].localFilePath,
          name: "file",
          header: 'Content-Type: multipart/form-data;',
          method: 'post',
          formData: {
            token: this.data.prepareToUpload[i].token,
            key: this.data.prepareToUpload[i].key,
          },
          success: function(res) {},
        });
      }
    }

    this.addRecard();
  },

  addRecard() {
    wx.showToast({
      title: '发送中...',
      icon: 'success',
      image: '',
      duration: 1000,
      mask: true,
    })

    var pictureUrls = [];
    for (var i in this.data.prepareToUpload) {
      pictureUrls.push(this.data.prepareToUpload[i].downloadUrl);
    }

    var recordType = 1
    var text = this.data.text
    var studentId = this.data.studentId
    var familyIds = this.data.familyIds
    var parentRecordId = 0
    var orgAuthorId = app.globalData.userId
    var orgAuthorType = app.globalData.userType
    var mainTeacherId = this.data.mainTeacherId
    var assistId = this.data.assistId
    var recordId = this.data.recordId

    var publishRecord = this.data.publishRecord

    // console.info(recordType, text, studentId, familyIds, pictureUrls, parentRecordId, orgAuthorId, orgAuthorType, mainTeacherId, recordId)
    if (app.globalData.reviewList.text == this.data.value && this.data.studentId == app.globalData.reviewList.studentId && this.data.imgs[this.data.imgs.length - 1] == app.globalData.reviewList.pictureUrls[this.data.imgs.length - 1] && publishRecord) {
      // 未做任何改动 并发布
      http.review(recordId, familyIds, assistId, function(res) {
        if (res == 0) {
          app.globalData.isReview = true
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {
              setTimeout(function() {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            },
          })
        }
      })
    } else {
      if (app.globalData.reviewList.text != this.data.value || this.data.studentId != app.globalData.reviewList.studentId || this.data.imgs[this.data.imgs.length - 1] != app.globalData.reviewList.pictureUrls[app.globalData.reviewList.pictureUrls.length - 1] || this.data.imgs.length != app.globalData.reviewList.pictureUrls.length) {
        // 做了改动 如 文本变化 图片变化 学员选择变化
        http.putNewRecord(recordType, text, studentId, familyIds, pictureUrls, parentRecordId, orgAuthorId, orgAuthorType, mainTeacherId, publishRecord, recordId, assistId, function(res) {
          if (res == 0) {
            app.globalData.isReview = true
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              image: '',
              duration: 1000,
              mask: true,
              success: function(res) {
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              },
            })
          }
        })
      } else {
        // if(app.globalData.role == 2){
        if (publishRecord == false) {
          wx.showToast({
            title: '未做任何修改',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {
              // setTimeout(function() {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }, 1000)
            },
          })
        }
        // }

      }


    }
  },

  makePicName: function(index, tmpFilePath) {
    var userId = app.globalData.userId

    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var timeArr = [year, month, day, hour, minute, second].map(formatNumber)
    var time = '';

    for (var t = 0; t < timeArr.length; t++) {
      time += timeArr[t]
    }

    var arr = tmpFilePath.split('.');
    var ext = "JPG";
    if (arr.length > 0) {
      ext = arr[arr.length - 1];
    }
    var fileName = 't_' + userId + '_' + time + '_' + index + '.' + ext;
    return fileName;
  },

  //删除上传图片
  reom(e) {
    let that = this

    wx.showActionSheet({
      itemList: ['删除'],
      itemColor: "#00000",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            let index = e.currentTarget.dataset.index
            let imgs = that.data.imgs
            console.info(e)
            for (var i = 0; i < imgs.length; i++) {
              if (index == i) {
                imgs.splice(i, 1);
                i--;
                break
              }
            }
            for (var j in that.data.imgs) {
              if (that.data.imgs[j] == e.currentTarget.dataset.item) {
                that.data.imgs.splice(j, 1);
              }
            }

            that.data.prepareToUpload = []
            for (var i in that.data.imgs) {
              that.data.prepareToUpload[i] = {}
              that.data.prepareToUpload[i].downloadUrl = that.data.imgs[i]
            }
            that.setData(that.data)

            if (imgs.length <= 9) {
              that.setData({
                canChoose: true,
              });
            }
            that.setData({
              imgs: imgs,
            });
          }
        }
      }
    })
  },
  //添加上传图片
  chooseImageTap: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')

          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  noChoose: function() {
    var that = this;
    wx.showToast({
      title: '最多只能上传9张哦~',
      icon: 'loading',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 选取图片
  chooseWxImage: function(type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        console.info(res)
        var imgsLimit = [];
        var tempFilePaths = that.data.tempFilePaths;
        var imgs = that.data.imgs;
        var index = imgs.length;
        if (imgs.length > 0) {
          var temp = []
          for (var i = 0; i < 9 - imgs.length; i++) {
            temp.push(res.tempFilePaths[i]) 
          }
          res.tempFilePaths = temp
        }

        for (var i = 0; i < res.tempFilePaths.length; i++) {
          tempFilePaths[res.tempFilePaths[i]] = '';

          imgs.push(res.tempFilePaths[i]);

          var encodePicFileName = that.makePicName(index, res.tempFilePaths[i]);
          index++;

          var self = that;
          var localFilePath = res.tempFilePaths[i];

          wx.request({
            url: app.globalData.minidopeApi.getCdnToken,
            method: 'post',
            data: {
              appid: app.globalData.appId,
              fileName: encodePicFileName,
              localFilePath: localFilePath
            },
            success: function(res) {
              self.data.prepareToUpload.push({
                fileName: res.data.data.cdn.fileName,
                token: res.data.data.cdn.token,
                downloadUrl: res.data.data.cdn.downloadUrl,
                key: res.data.data.cdn.key,
                localFilePath: res.data.data.cdn.localFilePath
              });
              console.info(self.data.prepareToUpload)
            }
          })
        };
        if (imgs.length > 9) {
          for (var i = 0; i < 9; i++) {
            imgsLimit.push(imgs[i]);
          }
          that.setData({
            imgs: imgsLimit,
            tempFilePaths: tempFilePaths,
          });
        } else {
          that.setData({
            imgs: imgs,
            tempFilePaths: tempFilePaths,
          });
        }
        if (imgsPaths.length >= 9) {
          that.setData({
            canChoose: false,
          });
        } else {
          that.setData({
            canChoose: true,
          });
        };
      },
    })
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