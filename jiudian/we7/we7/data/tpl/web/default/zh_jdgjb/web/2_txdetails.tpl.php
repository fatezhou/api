<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
    .yg5_key>div{float: left;line-height: 34px;}
    .store_td1{height: 45px;}
    .store_list_img{width: 60px;height: 60px;}
    .yg5_tabel{border-color: #e5e5e5;outline: 1px solid #e5e5e5;text-align: center;}
    .yg5_tr2>td{padding: 15px;border: 1px solid #e5e5e5;}
    .yg5_tr1>td{

        border: 1px solid #e5e5e5;
        background-color: #FAFAFA;

        font-weight: bold;

    }
    .yg5_btn{background-color: #EEEEEE;color: #333;border: 1px solid #E4E4E4;border-radius: 6px;width: 100px;height: 34px;}
    .check_img{width: 45px;height: 45px;}
</style>


<ul class="nav nav-tabs">
  <span class="ygxian"></span>
  <div class="ygdangq">当前位置:</div>
    <li   <?php  if($type=='now') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('txdetails',array('type'=>now,'state'=>2));?>">提现通过</a></li>
      <li   <?php  if($type=='wait') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('txdetails',array('type'=>wait,'state'=>1));?>">待提现</a></li>
        <li   <?php  if($type=='delivery') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('txdetails',array('type'=>delivery,'state'=>3));?>">提现拒绝</a></li>
  <li  <?php  if($type=='all') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('txdetails',array('type'=>all));?>">全部</a></li>



</ul>
<div class="main">

    <div class="panel panel-default">

        <div class="panel-heading">

          提现明细

        </div>

        <div class="panel-body" style="padding: 0px 15px;">

          <div class="row">

            <table class="yg5_tabel col-md-12">

              <tr class="yg5_tr1">

                <td class="store_td1">申请日期</td>
                <td class="store_td1">审核日期</td>
                <td>提现金额</td>
                <td>实际金额</td> 
                <td>提现账号</td>
                <td>真实姓名</td>
                <td >审核状态</td>    
                      </tr>
                      <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
                      <tr class="yg5_tr2">
                        <td ><?php  echo $item['time'];?></td>
                         <td ><?php  echo $item['sh_time'];?></td>
                        <td><?php  echo $item['tx_cost'];?></td>
                        <td><?php  echo $item['sj_cost'];?></td>
                        <td><?php  echo $item['username'];?></td>
                         <td><?php  echo $item['name'];?></td>
                       <?php  if($item['state']==1) { ?>
                       <td >
                        <span class="label storered">待确认</span>
                      </td >
                      <?php  } else if($item['state']==2) { ?>
                      <td >
                        <span class="label storeblue">已提现</span>
                      </td>
                      <?php  } else if($item['state']==3) { ?>
                      <td >
                       <span class="label storegrey">已拒绝</span>
                     </td>

                     <?php  } ?>  
                  </td>

                </tr>

                <?php  } } ?>
                <?php  if(empty($list)) { ?>
                <tr class="yg5_tr2">
                  <td colspan="9">
                    暂无提现信息
                  </td>
                </tr> 
                <?php  } ?>        



              </table>

            </div>

        </div>

    </div>

</div>

<div class="text-right we7-margin-top">
<?php  echo $pager;?>
</div>
<script type="text/javascript">
    $(function(){
        // $("#frame-6").addClass("in");
        $("#frame-6").show();
        $("#yframe-6").addClass("wyactive");
    })
</script>