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
    userId: 221,
    studentList: [{
      avatarUrl: "",
      name: "T小小铭",
      sex: 0,
      recardCount: 162,
      id: 141,
    }, {
      avatarUrl: "",
      name: "T周周",
      sex: 1,
      recardCount: 115,
      id: 143,
    }, {
      avatarUrl: "",
      name: "T平平",
      sex: 1,
      recardCount: 16259,
      id: 142,
    }, ],
  
    userType: 2,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxf4ff3923fa71c9a3",
    minodopeApi: {
      // 获取 openId unionId token
      loginUrl: "https://api.minidope.com/api/v1.0/login",
      // contactUrl: "https://api.minidope.com/api/v1.0/get_contact",
      // 获取单个学员的成长记录（不包括评论）
      getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
      // 获取教师列表
      getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
      // 获取家长信息
      getParentInfo: "https://api.minidope.com/api/v1.0/get_profile",
      getOneGrowthRecordWithAppendByRecordId: "https://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
      putRecordLike: 'https://api.minidope.com/api/v1.0/put_record_like',
      getCdnToken: 'https://api.minidope.com/api/v1.0/get_cdn_token',
      putNewRecord: 'https://api.minidope.com/api/v1.0/put_new_record',


      getParentsInfo: "https://api.minidope.com/api/v1.0/get_parents_info",

      // 新增代码 新消息提醒   -->
      putFormId: 'https://api.minidope.com/api/v1/put_form_id',
      getNewMessage: 'https://api.minidope.com/api/v2.0/get_new_message',
      //  <--  新增代码 新消息提醒 

    },





    phoneVcode: "https://api.minidope.com/api/v1.0/phone-vcode",

    bindPhone: 'https://api.minidope.com/api/v1.0/bindPhone',


    qiniup: 'https://up-z2.qiniup.com',
    headImg: 'https://ouat-file.buzaishudian.com/images/wx-mini/teacher/ui/default-avatar.png',
    Imgpath: '',

    allTeacherInfo: null,

    allParentInfo: null,

    allUserInfo: null,

    recordsList: '',
    // 记录条数
    indexSize: '',
    detailonShow: false,
    recordId: '',


    teachersInfo: null,
    parentInfo: null
  }
})