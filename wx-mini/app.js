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
    userType: 1,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxc3cdca6978c3b5ba",
    oneGrowthRecordWithAppendUrl: "https://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
    bindPhone: 'https://api.minidope.com/api/v1.0/bindPhone',
    minodopeApi: {
      loginUrl: "https://api.minidope.com/api/v1.0/login",
      contactUrl: "https://api.minidope.com/api/v1.0/get_contact",
      recordSizeUrl: "https://api.minidope.com/api/v1.0/get_child_growth_record_count",
    },
    phoneVcode: "https://api.minidope.com/api/v1.0/phone-vcode",
    getTeacherInfo: "https://api.minidope.com/api/v1.0/get_teacher_info",
    putNewRecord: 'https://api.minidope.com/api/v1.0/put_new_record',
    getCdnToken: 'https://api.minidope.com/api/v1.0/get_cdn_token',
    putMemberFav: "https://api.minidope.com/api/v1.0/put_member_fav",
    getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
    getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
    getFamily: 'https://api.minidope.com/api/v1.0/get_family',
    putRecordLike: 'https://api.minidope.com/api/v1.0/put_record_like',
    getChildGrowthRecordCount: 'https://api.minidope.com/api/v1.0/get_child_growth_record_count',
    getPrePics: 'https://api.minidope.com/api/v1.0/get_pre_pics',
    headImg:'https://ouat-file.buzaishudian.com/images/wx-mini/teacher/ui/default-avatar.png',
    Imgpath:'',

    studentRecordCount: '',
    contact: {},
    teacherInfo: {},
    allTeacherInfo: null,
    allStudent: null, // 通讯录
    qiniup: 'https://up-z2.qiniup.com',
    stararr: [], // 有星标的

    perTeacherRecords: '',

    recordsList: '', //首页学员记录（特定老师）
    indexSize: '',
    chooseStudent: '',

    recordId: null,
    memberListLength: null,
    stararrLength: null,
  }
})