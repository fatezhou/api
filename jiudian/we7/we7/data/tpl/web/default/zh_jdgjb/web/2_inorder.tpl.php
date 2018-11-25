<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<style type="text/css">
  /*#nav5{display: block;visibility: visible;}*/
  .nav-tabs>li>a:hover{
    color: #333;
    border-color: #31C2A5;
    background-color: white;
  }
  .nav-tabs > li.active > a,.nav-tabs > li.active > a:hover{
    background-color: #31C2A5;
    color: white;
    border-color: #31C2A5;
  }    
  .nav.nav-tabs{border-color: #31C2A5;margin-top: 30px;margin-bottom: 30px;}
  .yg5_key>div{float: left;line-height: 34px;}
  .store_td1{height: 45px;}
  .store_list_img{width: 60px;height: 60px;}
  .yg5_tabel{border-color: #e5e5e5;outline: 1px solid #e5e5e5;text-align: center;}
  .yg5_tr2>td{padding: 15px;border: 1px solid #e5e5e5;text-align: center;}
  .yg5_tr1>th{
    border: 1px solid #e5e5e5;
    padding: 15px;
    background-color: #FAFAFA;
    font-weight: bold;
    text-align: center;
  }
  .yg5_btn{background-color: #EEEEEE;color: #333;border: 1px solid #E4E4E4;border-radius: 6px;width: 100px;height: 34px;}
  .btn-sm{padding: 6px 10px;}
</style>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<ul class="nav nav-tabs">
  <li  <?php  if($type=='all') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>all));?>">全部订单</a></li>
  <li   <?php  if($type=='wait') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>wait,'status'=>1));?>">待支付</a></li>
  <li   <?php  if($type=='pay') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>pay,'status'=>2));?>">已付款</a></li>
  <li   <?php  if($type=='cancel') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>cancel,'status'=>3));?>">已取消</a></li>
  <li   <?php  if($type=='complete') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>complete,'status'=>4));?>">已完成</a></li>
  <li   <?php  if($type=='rz') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>rz,'status'=>5));?>">已入住</a></li>
  <li   <?php  if($type=='refund') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>refund,'status'=>6));?>">待退款</a></li>
  <li   <?php  if($type=='completerefund') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>completerefund,'status'=>7));?>">已退款</a></li>
    <li   <?php  if($type=='reject') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('inorder',array('type'=>reject,'status'=>8));?>">退款拒绝</a></li> 
  </ul>
    <div class="row ygrow">
    <form action="" method="get" class="col-md-3">
       <input type="hidden" name="c" value="site" />
       <input type="hidden" name="a" value="entry" />
       <input type="hidden" name="m" value="zh_jdgjb" />
       <input type="hidden" name="do" value="inorder" />
       <div class="input-group">
        <input type="text" name="keywords" class="form-control" value="<?php  echo $_GPC['keywords'];?>" placeholder="请输入入住人姓名/手机号" style="font-size: 12px;">
        <span class="input-group-btn">
            <input type="submit" class="btn btn-default" name="submit" value="查找"/>
        </span>
    </div>
    <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
</form>
   <form action="" method="get" class="col-md-3">
          <input type="hidden" name="c" value="site" />
          <input type="hidden" name="a" value="entry" />
          <input type="hidden" name="m" value="zh_jdgjb" />
          <input type="hidden" name="do" value="inorder" />
            <div class="input-group" style="width: 100px">
                <?php  echo tpl_form_field_daterange('time',$_GPC['time']);?>
                <span class="input-group-btn">
                    <input type="submit" class="btn btn-default" name="submit2" value="查找"/>
                     <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
                       <input type="hidden" name="type" value="all"/>
                </span>
            </div><!-- /input-group -->
        </form>
<!--   <div class="col-md-4 userremark">人工充值：双击可修改余额，输入值与原有值进行累加充值。</div> -->
</div>
  <div class="main">
   <div class="panel panel-default">
    <div class="panel-heading">全部订单</div>
    <div class="table-responsive">
      <table class="col-md-12">
        <tr class="yg5_tr1">
          <th class="store_td1">下单时间</th>        
          <th>联系人</th>
          <th>联系人电话</th>
          <th>房型</th> 
           <th>房间价格</th> 
            <th>押金</th> 
          <th>订房数量</th>
          <th>入住</th>
          <th>离店</th>
          
          <!--  <th>金额</th> -->
          <!--   <th>是否入住</th> -->
          <th>状态</th>
          <th>支付方式</th>
          <th>操作</th>
        </tr>
        <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
        <tr class="yg5_tr2">
          <td>
            <?php  echo date('Y-m-d H:i:s',$item['time'])?>
          </td>      
          <td>
            <?php  echo $item['name'];?>
          </td>
          <td>
            <?php  echo $item['tel'];?>
          </td>
          <td >
            <?php  echo $item['room_type'];?>
          </td> 
            <td >
            <?php  echo $item['price'];?>
          </td> 
           <td >
            <?php  echo $item['yj_cost'];?>
          </td> 
          <td >
           <?php  echo $item['num'];?>
         </td>
         <td >
           <?php  echo substr($item['arrival_time'],0,10)?>
         </td>
         <td >
           <?php  echo substr($item['departure_time'],0,10)?>
         </td>             
         <?php  if($item['status']==1) { ?>
         <td >
          <span class="label label-warning">待付款</span>
        </td>
        <?php  } else if($item['status']==2) { ?>
        <td >
         <span class="label label-info"> 已付款</span>
       </td>
       <?php  } else if($item['status']==3) { ?>
       <td >
         <span class="label label-default">已取消</span>
         
       </td>
       <?php  } else if($item['status']==4) { ?>
       <td >
         <span class="label label-success">已完成</span>
       </td>
       
       <?php  } else if($item['status']==5) { ?>
       <td >
         <span class="label label-danger">已入住</span>
       </td>
       <?php  } else if($item['status']==6) { ?>
       <td >
         <span class="label label-danger">待退款</span>
       </td>
       <?php  } else if($item['status']==7) { ?>
       <td >
         <span class="label label-success">已退款</span>
       </td>
       <?php  } else if($item['status']==8) { ?>
       <td >
         <span class="label label-danger">退款拒绝</span>
       </td>
         <?php  } else if($item['status']==9) { ?>
       <td >
         <span class="label label-default">拒绝入住</span>
       </td>
         <?php  } else if($item['status']==10) { ?>
       <td >
         <span class="label label-warning">确认订单(待入住)</span>
       </td>
        <?php  } else if($item['status']==11) { ?>
       <td >
         <span class="label label-danger">拒绝订单</span>
       </td>
       <?php  } ?> 
         <?php  if($item['type']==1) { ?>
         <td >
          <span class="label label-success">微信支付</span>
        </td>
        <?php  } else if($item['type']==2) { ?>
        <td >
         <span class="label label-info">余额支付</span>
       </td>
       <?php  } else if($item['type']==3) { ?>
       <td >
         <span class="label label-warning">到店支付</span>
       </td>

       <?php  } ?> 
       <td>
        <a href="<?php  echo $this->createWebUrl('inorderinfo',array('id'=>$item['id']));?>" class="storespan btn btn-xs">
          <span class="fa fa-pencil"></span>
          <span class="bianji">查看
            <span class="arrowdown"></span>
          </span>                            
        </a>
        <?php  if($item['status']==2 && $item['voice']==1 or $item['status']==1 && $item['type']==3 && $item['voice']==1) { ?>
          <a href="<?php  echo $this->createWebUrl('inorder',array('order_id'=>$item['id'],'op'=>'close'));?>" class="storespan btn btn-xs">
          <span class="fa fa-bitbucket"></span>
          <span class="bianji">关闭声音
            <span class="arrowdown"></span>
          </span>                            
        </a>
        <?php  } ?>
      </td>
      <!--  <td> <?php  echo $pager;?></td> -->
    </tr>
    <?php  } } ?>
    <?php  if(empty($list)) { ?>
    <tr class="yg5_tr2">
      <td colspan="10">
        暂无订单信息
      </td>
    </tr>
    <?php  } ?>

    
  </table>
</div>
</form>
</div>

</div>
<div class="text-right we7-margin-top">
 <?php  echo $pager;?>
</div>
<script type="text/javascript">
  $(function(){
    $("#frame-12").show();
    $("#yframe-12").addClass("wyactive");
  })
</script>
<!-- <script type="text/javascript">
$(function(){
    setInterval(function(){
               $.ajax({ 
                type: "post",
                dataType: "json",
                url: "<?php  echo $_W['siteroot'];?>/app/index.php?i=<?php  echo $_W['uniacid'];?>&c=entry&do=neworder&m=zh_cjdianc&store=<?php  echo $_COOKIE['storeid'];?>",
                success: function (data) {
                    console.log(data);
                   if(data==1){
                     var myAuto = document.getElementById('myaudio');
                     myAuto.play(); 
                    }else if(data==2){
                        var myAuto = document.getElementById('myaudio2');
                     myAuto.play(); 
                    }else if(data==3){
                        var myAuto = document.getElementById('myaudio3');
                     myAuto.play(); 
                    }
                },
                error:function (data) {
                    console.log(data)
                }

            })
          },1000);
})
    
</script>
<audio id="myaudio" src="../addons/zh_dianc/template/images/wm.wav" controls="controls"  hidden="true" ></audio>
<audio id="myaudio2" src="../addons/zh_dianc/template/images/dn.wav" controls="controls"  hidden="true" ></audio>
<audio id="myaudio3" src="../addons/zh_dianc/template/images/yy.wav" controls="controls"  hidden="true" ></audio> -->