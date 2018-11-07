// pages/my/my.js
const app = getApp();

var template = require('../../template/template.js')
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    // img: null,
    prepareToUpload: [],
  },

  toChangeAvatar: function() {
    // wx.navigateTo({
    //   url: 'changeAvatar',
    // })
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
  chooseWxImage: function(type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      count: 1,
      sourceType: [type],
      success: function(res) {
        console.info(res)
        that.data.tempFilePaths[res.tempFilePaths[0]] = '';
        // that.data.img = res.tempFilePaths[0];

        // var encodePicFileName = that.makePicName(app.globalData.userId, res.tempFilePaths[0]);

        var localFilePath = res.tempFilePaths[0];

        that.setData(that.data);
        var data = {
          openid: app.globalData.openid,
          appId: app.globalData.appId,
          userType: "parent",
          userId: app.globalData.userId, //相当于authorId
          token: app.globalData.token,
        }
        console.info(JSON.stringify(data))
        console.info(app.globalData.minodopeApi.uploadAvater)
        wx.request({
          url: app.globalData.minodopeApi.uploadAvater,
          method: 'post',
          data: data,
          success: function(res) {
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

  // makePicName: function (index, tmpFilePath) {
  //   var userId = app.globalData.userId

  //   var date = new Date()
  //   var year = date.getFullYear()
  //   var month = date.getMonth() + 1
  //   var day = date.getDate()
  //   var hour = date.getHours()
  //   var minute = date.getMinutes()
  //   var second = date.getSeconds()

  //   const formatNumber = n => {
  //     n = n.toString()
  //     return n[1] ? n : '0' + n
  //   }
  //   var timeArr = [year, month, day, hour, minute, second].map(formatNumber)
  //   var time = '';

  //   for (var t = 0; t < timeArr.length; t++) {
  //     time += timeArr[t]
  //   }

  //   var arr = tmpFilePath.split('.');
  //   var ext = "JPG";
  //   if (arr.length > 0) {
  //     ext = arr[arr.length - 1];
  //   }
  //   var fileName = 't_' + userId + '_' + time + '_' + index + '.' + ext;
  //   return fileName;
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 2, this)
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