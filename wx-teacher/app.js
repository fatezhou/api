//app.js
App({
  onLaunch: function() {
    var that = this
    // 手机信息 适配tabbar
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.model = res.model
        let model = res.model.substring(0, res.model.indexOf('X')) + 'X'
        if (model == "iPhone X") {
          that.globalData.isIpx = true
        }
      }
    })
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
    userId: null,
    userType: 1,
    role: null,

    unionId: null,
    openId: null,
    token: null,
    appId: "wxc3cdca6978c3b5ba",

    // 默认头像
    defaultAvatar: null,

    minidopeApi: {
      loginUrl: "https://api.minidope.com/api/v1.0/login",
      defaultAvatarUrl: 'https://ouat-file.buzaishudian.com/images/wx-mini/teacher/ui/default-avatar.png',
      putFormId: 'https://api.minidope.com/api/v1/put_form_id',
      getCdnToken: 'https://api.minidope.com/api/v1.0/get_cdn_token',

      getTeacherInfo: "https://api.minidope.com/api/v1.0/get_teacher_info",
      getStudents: "https://api.minidope.com/api/v1.0/get_contact",
      getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
      getParents: "https://api.minidope.com/api/v1.0/get_parents_info",
      getFamily: 'https://api.minidope.com/api/v1.0/get_family',

      getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
      getChildGrowthRecordCount: 'https://api.minidope.com/api/v1.0/get_child_growth_record_count',
      oneGrowthRecordWithAppendUrl: "https://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",

      // 新api
      getReviewList: "https://api.minidope.com/api/v1.0/get_review_list",

      getNewMessage: 'https://api.minidope.com/api/v2.0/get_new_message',

      putNewRecord: 'https://api.minidope.com/api/v1.0/put_new_record',
      putRecordLike: 'https://api.minidope.com/api/v1.0/put_record_like',
      putMemberFav: "https://api.minidope.com/api/v1.0/put_member_fav",
    },

    qiniup: 'https://up-z2.qiniup.com',

    // 记录
    recordsSize: '',
    recordsList: [],
    timelineRecordsList: [],

    // 星标
    starList: [],
    // 通讯录
    studentList: [],
    teacherList: [],
    parentList: [],

    // 添加记录选择人员
    chooseTeacher: null,
    chooseStudent:null,

    // 手机型号
    model: null,
    isIpx: false,
  }
})