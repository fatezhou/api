//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.info(res);
          if (res.code) {
            var self = this;
            wx.request({
              url: this.globalData.minodopeApi.loginUrl,
              data: {
                code: res.code,
                appid: this.globalData.appId
              },
              success: function(e) {
                console.info("app.js.login");
                console.info(e.data.data);
                if (e.data.data.openId) {
                  self.globalData.openid = e.data.data.openId;
                }
                if (e.data.data.unionId) {
                  self.globalData.unionid = e.data.data.unionId;
                }
                if (e.data.data.token) {
                  self.globalData.token = e.data.data.token;
                }

                // 通过uid获取教师信息
                wx.request({
                  url: self.globalData.getTeacherInfo,
                  method: 'POST',
                  data: {
                    unionid: self.globalData.unionid,
                    openid: self.globalData.openid,
                  },
                  success: function(res) {
                    console.info(res)

                    if (res.data.code === 0) {
                      if (res.data.data.teacherInfo.teacherId) {
                        self.globalData.teacherInfo = res.data.data.teacherInfo
                        self.globalData.userId = res.data.data.teacherInfo.teacherId
                      }else{
                        wx.navigateTo({
                          url: '../unBound/index',
                        })
                      }
                    }
                  },
                })


              },
              fail: function(e) {
                console.info(e);
              },
              method: "POST"
            })
          }
        }
      }),

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },
  globalData: {
    userInfo: null,
    userId: '',
    userType: 1,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxc3cdca6978c3b5ba",
    oneGrowthRecordWithAppendUrl: "http://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
    bindPhone:'http://api.minidope.com/api/v1.0/bindPhone',
    minodopeApi: {
      loginUrl: "http://api.minidope.com/api/v1.0/login",
      contactUrl: "http://api.minidope.com/api/v1.0/get_contact",
      recordSizeUrl: "http://api.minidope.com/api/v1.0/get_child_growth_record_count",
    },
    phoneVcode: "http://api.minidope.com/api/v1.0/phone-vcode",
    getTeacherInfo: "http://api.minidope.com/api/v1.0/get_teacher_info",
    putNewRecord: 'http://api.minidope.com/api/v1.0/put_new_record',
    getCdnToken: 'http://api.minidope.com/api/v1.0/get_cdn_token',
    putMemberFav: "http://api.minidope.com/api/v1.0/put_member_fav",
    getGrowthRecordsWithoutAppend: "http://api.minidope.com/api/v1.0/get_growth_records_without_append",
    getTeachers: "http://api.minidope.com/api/v1.0/get_teachers",
    getFamily: 'http://api.minidope.com/api/v1.0/get_family',
    putRecordLike: 'http://api.minidope.com/api/v1.0/put_record_like',


    contact: {},
    teacherInfo: {},
    allTeacherInfo: null,
    qiniup: 'https://up-z2.qiniup.com',
    stararr: [],
  }
})