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
    studentId: [115, 44, 43],
    studentList: [{
      pic: '',
      // ../../ image / head.png
      name: '曹语荞',
      sex: 0,
      recardCount: 162,
      studentId: 141,
    }, {
      pic: '',
      // ../../ image / head02.png
      name: '李司羽',
      sex: 1,
      recardCount: 115,
      studentId: 44,
    }, {
      pic: '',
      // ../../ image / head.png
      name: '李淇锭',
      sex: 1,
      recardCount: 16259,
      studentId: 43,
    }, ],
    // 教师端1 ,家长端2 测试用记得改
    userType: 2,
    unionid: "",
    openid: "",
    token: "",
    appId: "wxf4ff3923fa71c9a3",
    minodopeApi: {
      loginUrl: "http://api.minidope.com/api/v1.0/login",
      contactUrl: "http://api.minidope.com/api/v1.0/get_contact",
      getGrowthRecordsWithoutAppend: "https://api.minidope.com/api/v1.0/get_growth_records_without_append",
      getTeachers: "https://api.minidope.com/api/v1.0/get_teachers",
      // 改为获取家长信息
      getParentInfo: "https://api.minidope.com/api/parent_info",
      getOneGrowthRecordWithAppendByRecordId: "http://api.minidope.com/api/v1.0/get_one_growth_record_with_append_by_recordId",
      putRecordLike: 'https://api.minidope.com/api/v1.0/put_record_like',
      getCdnToken: 'https://api.minidope.com/api/v1.0/get_cdn_token',
      putNewRecord: 'https://api.minidope.com/api/v1.0/put_new_record',

      // 获得全部家长信息  --> 新增代码
      getParentsInfo: "https://api.minidope.com/api/v1.0/get_parents_info",
      //  <-- 新增代码
    },
    qiniup: 'https://up-z2.qiniup.com',
    headImg: 'https://ouat-file.buzaishudian.com/images/wx-mini/teacher/ui/default-avatar.png',
    Imgpath: '',

    allTeacherInfo: null,
    // 所有家长信息  --> 新增代码
    allParentInfo: null,
    // 所有用户信息  包括所有家长和教师的信息  id区别: 'teacherId' 和 'parentId'
    // 记录和评论里面id的区别方式 : authorid可能一样 区别方式是authorType 1:'teacher' 2:'parent'
    allUserInfo:null,
    //  <-- 新增代码
    recordsList: '',
    // 记录条数
    indexSize: '',
    detailonShow: false,
    recordId: '',


    teachersInfo: null,
  }
})