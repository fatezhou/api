// pages/myInfo/myInfo.js
var app = getApp()
var template = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    defaultAvatar: '',
    name: '',
    nickName: '',
    phone: '',
    sex: '',

    position: '教师',

    isIpx: '',

    tempFilePaths: [],
    prepareToUpload: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.isIpx) {
      this.setData({
        isIpx: app.globalData.isIpx
      })
    }
    template.tabbar("tabBar", 2, this)

    var userInfo = app.globalData.userInfo
    this.data.defaultAvatar = app.globalData.defaultAvatar
    this.data.nickName = (userInfo.nickname == '' ? userInfo.name : userInfo.nickname)
    this.data.name = userInfo.name
    this.data.avatarUrl = userInfo.avatarUrl
    this.data.phone = userInfo.phone
    this.data.sex = userInfo.sex

    if (app.globalData.role == 0) {
      this.data.position = "助教"
    } else if (app.globalData.role == 1) {
      this.data.position = "校长"
    } else if (app.globalData.role == 2) {
      this.data.position = "班主任"
    }

    this.setData(this.data)
  },

  changeAvatar: function() {
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

  // 选取图片
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function (res) {
        console.info(res)
        that.data.tempFilePaths[res.tempFilePaths[0]] = '';
        // that.data.img = res.tempFilePaths[0];

        // var encodePicFileName = that.makePicName(app.globalData.userId, res.tempFilePaths[0]);

        var localFilePath = res.tempFilePaths[0];

        that.setData(that.data);
        var data = {
          openid: app.globalData.openId,
          appId: app.globalData.appId,
          userType: "teacher",
          userId: app.globalData.userId, //相当于authorId
          token: app.globalData.token,
        }
        console.info(JSON.stringify(data))
        console.info(app.globalData.minidopeApi.uploadAvater)
        wx.request({
          url: app.globalData.minidopeApi.uploadAvater,
          method: 'post',
          data: data,
          success: function (res) {
            console.info(res)
            return
            that.data.prepareToUpload.push({
              fileName: res.data.data.cdn.fileName,
              token: res.data.data.cdn.token,
              downloadUrl: res.data.data.cdn.downloadUrl,
              key: res.data.data.cdn.key,
              localFilePath: res.data.data.cdn.localFilePath
            });

            wx.uploadFile({
              url: app.globalData.minodopeApi.qiniup,
              filePath: this.data.prepareToUpload[0].localFilePath,
              name: "file",
              header: 'Content-Type: multipart/form-data;',
              method: 'post',
              formData: {
                token: this.data.prepareToUpload[0].token,
                key: this.data.prepareToUpload[0].key,
              },
              success: function (res) {
                console.info(res)
              },
            });

          }
        })
      },
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