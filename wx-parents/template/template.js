const app = getApp()

function tabbarInit(){
  return[
    {
      'current':0,
      'pagePath':'/pages/index/index',
      'iconPath':'../../image/icbook.png',
      'selectedIconPath':'../../image/icbook2.png',
      'text':'约课'
    },
    {
      'current': 0,
      'pagePath': '/pages/growthRecord/growthRecord',
      'iconPath': '../../image/iccontact.png',
      'selectedIconPath': '../../image/iccontact2.png',
      'msg':'2',
      'text': '成长记录'
    },
    {
      'current': 0,
      'pagePath': '/pages/my/my',
      'iconPath': '../../image/icaccount.png',
      'selectedIconPath': '../../image/icaccount2.png',
      'text': '我的'
    }
  ]
}

//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarInit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar;
  that.setData({bindData});
}

module.exports = {
  tabbar: tabbarmain,
  
}