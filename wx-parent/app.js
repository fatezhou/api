//app.js
App({
  onLaunch: function() {

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
    studentId: [41, 85],
    userType: 2,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxc3cdca6978c3b5ba",
    minodopeApi: {
      loginUrl: "http://api.minidope.com/api/v1.0/login",
      contactUrl: "http://api.minidope.com/api/v1.0/get_contact",
      getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
      getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
      // 改为获取家长信息
      getParentInfo: "https://api.minidope.com/api/v1.0/get_teacher_info",
      getOneGrowthRecordWithAppendByRecordId: "http://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
    },

    allTeacherInfo: null,
    recordsList: '',
    // 记录条数
    indexSize: '',
  }
})