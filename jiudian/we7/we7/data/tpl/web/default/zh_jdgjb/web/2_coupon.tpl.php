<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
  .storespan2{font-size: 14px;color: white;margin: 5px;position: relative;background-color: #44abf7;}
  .storespan2:hover{color: #fff;}
  .storespan2:hover .bianji{display: block;}
  .rcbox{font-size: 14px;padding-top: 5px;padding-bottom: 5px;height: 44px;}
  .rcinput{width: 300px;height: 30px;border:1px solid #666;text-indent: 1em;}
  .rczuo,.rczuo2{display: none;position: absolute;z-index: 10;}
</style>
<ul class="nav nav-tabs">
  <span class="ygxian"></span>
  <div class="ygdangq">当前位置:</div>
  <li class="active"><a href="<?php  echo $this->createWebUrl('coupon')?>">优惠券管理</a></li>
  <li><a href="<?php  echo $this->createWebUrl('addcoupon')?>">添加优惠券</a></li>
</ul>
</ul>

<div class="row ygrow">
  <div class="col-lg-12">


  </div>    
</div>
<div class="main">
  <div class="panel panel-default">
    <div class="panel-heading">全部优惠券</div>
    <div class="table-responsive">
      <table class="col-md-12">
        <tr class="yg5_tr1">
          <td class="store_td1 col-md-1">优惠券名称</td>
          <td class="col-md-1">优惠条件</td>
          <td class="col-md-1">优惠金额</td>
          <td class="col-md-1">开始时间</td>
          <td class="col-md-1">结束时间</td> 
          <td class="col-md-1">数量</td>
          <td class="col-md-1">领取数量</td>                      
          <td class="col-md-2">操作</td>
        </tr>
        <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
        <tr class="yg5_tr2">
          <td>
            <?php  echo $item['name'];?>
          </td>
          <td >
            <?php  echo $item['conditions'];?>
          </td> 
          <td >
            <?php  echo $item['cost'];?>
          </td> 
          <td >
            <?php  echo $item['start_time'];?>
          </td> 
          <td >
            <?php  echo $item['end_time'];?>
          </td> 
          <td >
            <?php  echo $item['number'];?>
          </td>
           <td >
            <?php  echo $item['lq_num'];?>
          </td>
          <td > 
            <a href="<?php  echo $this->createWebUrl('lqlist',array('id'=>$item['id']));?>" class="storespan btn btn-xs">
            <span class="fa fa-database"></span>
            <span class="bianji">查看领取记录
              <span class="aritemdown"></span>
            </span>                            
          </a>
           <a href="<?php  echo $this->createWebUrl('addcoupon',array('id'=>$item['id']));?>" class="storespan btn btn-xs">
            <span class="fa fa-pencil"></span>
            <span class="bianji">编辑
              <span class="arrowdown"></span>
            </span>                            
          </a>
          <a class="storespan btn btn-xs" href="<?php  echo $this->createWebUrl('coupon', array('id'=>$item['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;">
            <span class="fa fa-trash-o"></span>
            <span class="bianji">删除
              <span class="arrowdown"></span>
            </span>
          </a>
                 <!-- <a href="<?php  echo $this->createWebUrl('orderinfo',array('id'=>$item['id']));?>"><button class="btn btn-success btn-xs">查看</button></a>
                 <a class="btn btn-danger btn-xs" href="<?php  echo $this->createWebUrl('zcorder', array('id'=>$item['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;" title="删除">删</a> -->

               </td>
               <!--  <td> <?php  echo $pager;?></td> -->
             </tr>
             <?php  } } ?>
             
             <?php  if(empty($list)) { ?>
             <tr>
              <td colspan="4" style="padding: 10px 30px;">
                暂无优惠券信息
              </td>
            </tr>

            <?php  } ?>
          </table>
        </div>
      </div>
    </div>
    <div class="text-right we7-margin-top"><?php  echo $pager;?></div>
    <script type="text/javascript">
      $(function(){
        $("#frame-6").show();
        $("#yframe-6").addClass("wyactive");
      })
    </script>