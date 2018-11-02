// pages/pull/pull.js
const app = getApp();
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordType: 1,
    orgAuthorId: '',
    orgAuthorType: '',
    parentRecordId: 0,
    text: '',
    mainTeacherId: 0,
    publishRecord: false,
    familyIds: [],
    pictureUrls: [],

    callText: '',
    placeholder: '填写内容(12-500字)',

    studentAvatarUrl: '',
    studentName: '',
    studentId: 0,
    teacherAvatarUrl: '',
    teacherName: '',
    teacherId: 0,

    toChooseStudent: true,
    role: null,

    canChoose: true, //是否可选图片
    tempFilePaths: {}, //本地图片地址对象
    downloadUrl: '',
    prepareToUpload: [],
    imgs: [], //本地图片地址数组

    defaultAvatar: '',
  },

  charChange: function(e) {
    if (this.data.callText) {
      var text = this.data.callText + e.detail.value
    } else {
      var text = e.detail.value
    }
    text = encodeURIComponent(text)
    this.setData({
      text: text
    })
  },

  // 班主任选择发布
  publishNow: function(e) {
    var status = e.detail.value
    this.data.publishRecord = status
    // if (status) {
    //   this.data.mainTeacherId = 0
    // } else {
    //   this.data.mainTeacherId = -1
    // }
    this.setData(this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.chooseTeacher = null
    app.globalData.chooseStudent = null

    this.data.role = app.globalData.role
    this.data.defaultAvatar = app.globalData.defaultAvatar

    if (options.type == 'append') {
      this.data.recordType = 2
      this.data.orgAuthorId = parseInt(options.orgAuthorId)
      this.data.orgAuthorType = parseInt(options.orgAuthorType)
      this.data.parentRecordId = parseInt(options.recordId)
      this.data.studentId = parseInt(options.studentId)

      this.setData(this.data)
      this.getFamily(this.data.studentId)

    } else if (options.type == 'record') {
      this.data.orgAuthorId = app.globalData.userId
      this.data.orgAuthorType = app.globalData.userType
      this.data.parentRecordId = 0
      this.data.studentName = '请选择学员'
      this.data.teacherName = '请选择班主任'

      this.setData(this.data)
      if (options.studentId) {
        this.data.studentAvatarUrl = options.studentAvatarUrl
        this.data.studentId = parseInt(options.studentId)
        this.data.studentName = options.studentName
        this.data.teacherName = '请选择班主任'
        this.data.toChooseStudent = false

        this.setData(this.data)

        this.getFamily(this.data.studentId)
      }

      // if(助教)
    }

    if (options.callName) {
      this.setData({
        callText: '回复' + ' ' + options.callName + ' ',
        placeholder: '回复' + ' ' + options.callName + ' '
      })
    }

    // 编辑未发布
    // 可以更换学员
    // 助教固定
    // 发布家长端按钮
    // if (app.globalData.editRecordList){
    //   console.info(1)
    // }


    console.info(options)
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

    if (this.data.teacherName == '请选择班主任' && app.globalData.role == 0) {
      wx.showToast({
        title: '请选择班主任',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success: function(res) {},
      })
      return
    }

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

    var recordType = this.data.recordType
    var text = this.data.text
    var studentId = this.data.studentId
    var familyIds = this.data.familyIds
    var parentRecordId = this.data.parentRecordId
    var orgAuthorId = this.data.orgAuthorId
    var orgAuthorType = this.data.orgAuthorType
    var mainTeacherId = this.data.mainTeacherId

    var publishRecord = this.data.publishRecord
    // recordId 仅为修改或删除时需要
    var recordId = null
    var assistId = null

    http.putNewRecord(recordType, text, studentId, familyIds, pictureUrls, parentRecordId, orgAuthorId, orgAuthorType, mainTeacherId, publishRecord, recordId, assistId, function(res) {
      if (res == 0) {
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

    if (app.globalData.chooseTeacher) {
      console.info(app.globalData.chooseTeacher)
      this.setData({
        teacherName: app.globalData.chooseTeacher.name,
        teacherId: app.globalData.chooseTeacher.teacherId,
        teacherAvatarUrl: app.globalData.chooseTeacher.avatarUrl,
        mainTeacherId: app.globalData.chooseTeacher.teacherId,
      })
    }

    // if(){

    // }
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
    // console.info(e)
    let index = e.currentTarget.dataset.index
    let imgs = that.data.imgs
    for (var i = 0; i < imgs.length; i++) {
      if (index == i) {
        imgs.splice(i, 1);
        i--;
        break
      }
    }
    if (imgs.length <= 9) {
      that.setData({
        canChoose: true,
      });
    }
    that.setData({
      imgs: imgs,
    });
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

        var imgsLimit = [];
        var tempFilePaths = that.data.tempFilePaths;
        var imgs = that.data.imgs;
        var index = imgs.length;

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