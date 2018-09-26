// pages/unBound/index.js
var app = getApp()
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    codeContent: '点击发送',
    currentTime: 61,
    codeDisabled: '',
  },

  codeInterval: function() {
    const that = this
    let currentTime = that.data.currentTime
    interval = setInterval(() => {
      currentTime--;
      that.setData({
        codeContent: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          codeContent: '重新发送',
          currentTime: 61,
          codeDisabled: false
        })
      }
    }, 1000)
  },

  getPhone: function(e) {
    this.setData({
      phone: e.detail.value,
    })
  },

  getCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  send: function(e) {
    const that = this

    const phone = this.data.phone
    const pattern = /^[1][2-9][0-9]{9}$/
    if (!phone || !pattern.test(phone)) {
      wx.showModal({
        content: '请输入正确的11位手机号码',
        showCancel: false,
      });
    } else {
      that.codeInterval()
      that.setData({
        codeDisabled: true
      })

      wx.request({
        url: app.globalData.phoneVcode,
        method: 'POST',
        data: {
          unionid: app.globalData.unionid,
          openid: app.globalData.openid,
          userType: 1,
          phone: phone,
        },
        success: function(res) {
          console.log(res)
          if (res.data.code === 0) {
            wx.showToast({
              title: '已发送',
            })
          } else {
            wx.showModal({
              content: res.data.message,
              showCancel: false,
            })
          }
        },
        complete: function(res) {
          console.info(res)
        }
      })
    }
  },


  phoneBound: function() {
    const that = this
    const code = that.data.code
    const phone = that.data.phone
    const token = app.globalData.token
    console.info(app.globalData.unionid)
    console.info(app.globalData.openid)
    if (phone && code) {
      wx.request({
        url: app.globalData.bindPhone,
        method: 'POST',
        data: {
          unionid: app.globalData.unionid,
          openid: app.globalData.openid,
          phone: phone,
          vcode: code,
          userType: 1,
          token: token,
        },
        success: function(res) {
          console.info(res)
          if (res.data.code === 0) {
            if (res.data.data.text == "绑定成功") {
              // 通过uid获取教师信息
              wx.request({
                url: app.globalData.getTeacherInfo,
                method: 'POST',
                data: {
                  unionid: app.globalData.unionid,
                  openid: app.globalData.openid,
                },
                success: function(res) {
                  console.info(res)

                  if (res.data.code === 0) {
                    if (res.data.data.teacherInfo.teacherId) {
                      app.globalData.teacherInfo = res.data.data.teacherInfo
                      app.globalData.userId = res.data.data.teacherInfo.teacherId

                      // wx.switchTab({
                      //   url: '../index/index',
                      // })
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    }
                  }
                },
              })
            } else if (res.data.data.text == "验证码不正确") {
              wx.showModal({
                content: '验证码不正确',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    console.log('确定')
                  }
                }
              })
            } else if (res.data.data.text == "该手机号未在线下登记") {
              wx.showModal({
                content: '该手机号未在线下登记',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    console.log('确定')
                  }
                }
              })
            }
          }
        },
      })
    } else {
      wx.showModal({
        content: '请填写手机或验证码',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('确定')
          }
        }
      });
    }
  },
})