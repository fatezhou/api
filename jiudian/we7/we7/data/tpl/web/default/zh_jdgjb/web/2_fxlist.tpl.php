<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
  .yg5_key>div{float: left;line-height: 34px;}
  .fxfont3{text-align: left;}
  .store_list_img{width: 80px;height:80px;}
  .yg5_tabel{border: none;outline: none;text-align: center;}
  .yg5_tr2>td{padding: 10px 5px;border-bottom: 1px solid #e5e5e5;}
  .yg5_tr1>td{
    padding: 10px 5px;
    border-bottom: 1px solid #e5e5e5;
  }
  .yg5_btn{background-color: #EEEEEE;color: #333;border: 1px solid #E4E4E4;border-radius: 6px;width: 100px;height: 34px;}
  .check_img{width: 45px;height: 45px;}
  .fxmain{background-color: white;}
  .panel{box-shadow: 0 0px 0px;}
  .fxrow{padding-bottom: 10px;}
  .fxuserimg{width: 30px;height: 30px;border-radius: 50%;border:1px solid #ccc;}
  .fxuserimg2{width: 30px;height: 30px;border-radius: 50%;border:1px solid #ccc;margin-right: 10px;}
  .fxfont1{color: #eb6060;}
  .fxfont2{color: #ffc000;}
  .recharge_info{display: -webkit-flex;display: -webkit-box;display: -ms-flexbox;display: flex;justify-content: space-around;margin-bottom: 10px;}
  .recharge_info>div{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;border:1px solid #efefef;margin:0 10px;padding: 10px 22px;line-height: 25px;color: #333;width: 310px;height: 97px;}
  .tabs-container{border-bottom: 1px solid #e5e5e5;padding: 10px;}
  .fxnum{line-height: 30px;font-size: 14px;}
</style>
<ul class="nav nav-tabs">
  <span class="ygxian"></span>
  <div class="ygdangq">当前位置:</div>
  <li class="active"><a href="javascript:void(0);">全部</a></li>
</ul>
<div class="main fxmain" style="padding: 1px 30px;">
  <div class="row fxrow">
    <div class="col-lg-12">
      <form action="" method="get" class="col-md-6">
        <input type="hidden" name="c" value="site" />
        <input type="hidden" name="a" value="entry" />
        <input type="hidden" name="m" value="zh_jdgjb" />
        <input type="hidden" name="do" value="fxlist" />
        <div class="input-group" style="width: 300px;margin-top: 20px;">
          <input type="text" name="keywords" class="form-control" value="<?php  echo $_GPC['keywords'];?>" placeholder="请输入粉丝姓名/手机号码">
          <span class="input-group-btn">
            <input type="submit" class="btn btn-default" name="submit" value="查找"/>
          </span>
        </div>
        <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
      </form>
    </div>
  </div>  
  <div class="main" style="margin: 5px 0px;">
    <div class="panel">
      <div class="panel-body" style="padding: 0px 30px;">
        <div class="row">
          <table class="yg5_tabel col-md-12">
            <tr class="yg5_tr1">
              <td class="fxfont3">粉丝</td>
              <td>手机号码</td>
              <td>累计佣金<br/>打款佣金</td>
              <td>下级分销商</td>
              <td>申请时间</td>
              <td>审核状态</td>
              <td>操作</td>
            </tr>
            <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
            <?php  $cg = pdo_fetch("select sum(tx_cost) as tx_cost from " . tablename("zh_jdgjb_commission_withdrawal")." WHERE  state=2 and user_id=".$item['user_id']);?>
            <?php  $lei = pdo_fetch("select sum(money) as tx_cost from " . tablename("zh_jdgjb_earnings")." WHERE  state=2 and  user_id=".$item['user_id'] );?>
            <?php   $sql="select a.* ,b.name,b.img from " . tablename("zh_jdgjb_fxuser") . " a"  . " left join " . tablename("zh_jdgjb_user") . " b on b.id=a.fx_user   WHERE a.user_id=:user_id order by id DESC";
            $res=pdo_fetchall($sql,array(':user_id'=>$item['user_id']));
            $res2=array();
            for($i=0;$i<count($res);$i++){
            $sql2="select a.* ,b.name,b.img from " . tablename("zh_jdgjb_fxuser") . " a"  . " left join " . tablename("zh_jdgjb_user") . " b on b.id=a.fx_user   WHERE a.user_id=:user_id order by id DESC";
            $res3=pdo_fetchall($sql2,array(':user_id'=>$res[$i]['fx_user']));
            $res2[]=$res3;

          }
          $res4=array();
          for($k=0;$k<count($res2);$k++){
          for($j=0;$j<count($res2[$k]);$j++){
          $res4[]=$res2[$k][$j]; 
        }
      }
      ?>
      <tr class="yg5_tr2">
        <td class="fxfont3">
          <img class="fxuserimg" src="<?php  echo $item['img'];?>">
          <?php  echo $item['user_name'];?></td>
          <td class="store_td1"><?php  echo $item['user_tel'];?></td>
          <td>
            <span class="fxfont1"><?php  if($lei['tx_cost']) { ?><?php  echo $lei['tx_cost'];?><?php  } else { ?>0.00<?php  } ?></span><br/>
            <span class="fxfont2"><?php  if($cg['tx_cost']) { ?><?php  echo $cg['tx_cost'];?><?php  } else { ?>0.00<?php  } ?></span>
          </td>
          <td><?php  echo count($res)+count($res4)?></td>
          <td><?php  echo date("Y-m-d H:i:s",$item['time'])?></td>
          <?php  if($item['state']==1) { ?>
          <td>
            <span class="label storered">待审核</span>
          </td >
          <?php  } else if($item['state']==2) { ?>
          <td >
            <span class="label storeblue">已通过</span>
          </td>
          <?php  } else if($item['state']==3) { ?>
          <td >
           <span class="label storegrey">已拒绝</span>
         </td>
         <?php  } ?>  
         <td>
          <?php  if($item['state']==1) { ?>
          <a class="btn ygyouhui2 btn-xs" href="<?php  echo $this->createWebUrl('fxlist',array('id'=>$item['id'],'op'=>'adopt'))?>" title="通过">通过</a>
          <a class="btn storegrey2 btn-xs" href="<?php  echo $this->createWebUrl('fxlist', array('id' => $item['id'],'op'=>'reject'))?>" title="拒绝">拒绝</a>
          <?php  } ?>
          <?php  if($item['state']==2) { ?>
          <a href="javascript:void(0);" class="storespan btn btn-xs" data-toggle="modal" data-target="#myModalb<?php  echo $item['user_id'];?>">
            <span class="fa fa-money" style="margin:0px;"></span>
            <span class="bianji" style="left:-70%;">充值佣金
              <span class="arrowdown"></span>
            </span>
          </a>
          <?php  } ?>
          <a href="<?php  echo $this->createWebUrl('fxinfo',array('id'=>$item['id']));?>" class="storespan btn btn-xs">
            <span class="fa fa-pencil"></span>
            <span class="bianji">查看
              <span class="arrowdown"></span>
            </span>                            
          </a>
          <a href="<?php  echo $this->createWebUrl('fxlist', array('id' => $item['id'],'op'=>'delete'))?>" class="storespan btn btn-xs" onclick="return confirm('确认删除吗？');return false;" title="删除">
            <span class="fa fa-trash-o"></span>
            <span class="bianji">删除
              <span class="arrowdown"></span>
            </span>
          </a>
        </td>
      </td>
    </tr>
    <div class="modal fade" id="myModalb<?php  echo $item['user_id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <form action="" method="post" enctype="multipart/form-data" class="">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">会员充值</h4>
            </div>
            <div class="modal-body form-horizontal form-validate">
              <div class="recharge_info">
                <div>
                  <label class="pull-left" style="margin-right: 25px">粉丝</label>
                  <div class="pull-left">
                    <img class="fxuserimg2" src="<?php  echo $item['img'];?>"><?php  echo $item['user_name'];?>
                  </div>
                </div>
                <div>
                  <label class="pull-left" style="margin-right: 25px">会员信息</label>
                  <div class="pull-left">
                    ID:<?php  echo $item['user_id'];?><br/>姓名：<?php  echo $item['user_name'];?><br/>手机号：<?php  echo $item['user_tel'];?>
                  </div>
                </div>                                        
              </div>
              <div class="tabs-container">
                充值余额
              </div>
              <div class="form-group"></div>
              <div class="form-group">
                <label class="col-md-2 control-label">充值数目</label>
                <div class="col-md-5">
                 <input type="number" name="reply" class="form-control accout_inp" placeholder="请输入金额">
               </div>
             </div>
           </div>
           <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <input type="submit" name="submit2" class="btn btn-info" value="确定">
            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
            <input type="hidden" name="id2" value="<?php  echo $item['user_id'];?>"/>
          </div>
        </div>
      </form>
    </div>
  </div>
  <?php  } } ?>
  <?php  if(empty($list)) { ?>
  <tr class="yg5_tr2">
    <td colspan="9">
      暂无分销商
    </td>
  </tr> 
  <?php  } ?>        
</table>
</div>
</div>
</div>
</div>
</div>
<div class="text-right we7-margin-top">
 <?php  echo $pager;?>
</div>
<script type="text/javascript">
  $(function(){
    $("#frame-9").show();
    $("#yframe-9").addClass("wyactive");
  })
</script>