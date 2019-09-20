// zh_jdgjb/pages/blank/blank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    image: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = this.getToken()
    this.queue(token)
  },

  getToken: function () {
    let timestamp = new Date().getTime()
    let ran = Math.random().toString(36).slice(-8)
    return ran + timestamp
  },

  queue: function (token) {
    app.globalData.token = token
    let self = this
    let root = 'https://queue1.youyueworld.com/apis/'
    // let root = 'http://127.0.0.1:9001/apis/'
    let api = root + 'queue'
    wx.request({
      url: api,
      data: {
        token: token
      },
      method: "post",
      success: function (res) {
        if (res.data.data.code == 1) {
          // 放行
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.showLoading({
            title: '',
          })
          self.setData({
            text: '服务器正忙，请稍等片刻再进入哦~',
            image: '../img/loading.jpg'
          })
          // 继续排队
          setTimeout(function () {
            self.queue(token)
          }, 30000)
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (wx.canIUse("getUpdateManager")) {
    //   let updateManager = wx.getUpdateManager();
    //   updateManager.onCheckForUpdate((res) => {
    //     // 请求完新版本信息的回调
    //     console.log(res.hasUpdate);
    //   })
    //   updateManager.onUpdateReady(() => {
    //     wx.showModal({
    //       title: '更新提示',
    //       content: '新版本已经准备好，是否重启应用？',
    //       success: (res) => {
    //         if (res.confirm) {
    //           // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //           updateManager.applyUpdate();
    //         } else if (res.cancel) {
    //           return false;
    //         }
    //       }
    //     })
    //   })
    //   updateManager.onUpdateFailed(() => {
    //     // 新的版本下载失败
    //     wx.hideLoading();
    //     wx.showModal({
    //       title: '升级失败',
    //       content: '新版本下载失败，请检查网络！',
    //       showCancel: false
    //     });
    //   });
    // }
    
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