<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>

<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
  input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    width: 1em;
    height: 1em;
    margin-right: .4em;
    border-radius: 50%;
    border: 2px solid #ddd;
    text-indent: .15em;
    line-height: 1; 
  }
  input[type="radio"]:checked + label::before {
    background-color: #44ABF7;
    background-clip: content-box;
    padding: .1em;
    border: 2px solid #44ABF7;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
</style>

<ul class="nav nav-tabs">    
  <span class="ygxian"></span>
  <div class="ygdangq">当前位置:</div>
  <li><a href="<?php  echo $this->createWebUrl('txlist')?>">提现管理</a></li>

  <li class="active"><a href="<?php  echo $this->createWebUrl('txsz')?>">提现设置</a></li>

</ul>

<div class="main">

  <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">

    <!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->

    <div class="panel panel-default ygdefault">

      <div class="panel-heading wyheader">

        商户提现设置

      </div>

      <div class="panel-body">


        <div class="form-group">
          <label for="lastname" class="col-sm-2 control-label">提现方式</label>
          <div class="col-sm-10">
           <label class="radio-inline">
            <input type="radio" id="emailwy1" name="tx_mode" value="1" <?php  if($item['tx_mode']==1 || empty($item['tx_mode'])) { ?>checked<?php  } ?> />
            <label for="emailwy1">线下打款</label>
          </label>
          <label class="radio-inline">
            <input type="radio" id="emailwy2" name="tx_mode" value="2" <?php  if($item['tx_mode']==2) { ?>checked<?php  } ?> />
            <label for="emailwy2">微信打款</label>

          </label>
          <span class="help-block">*设置为微信打款默认到微信钱包(需开通企业付款到用户功能,需上传证书),设置为线下打款默认为线下操作打款</span>
        </div>
      </div>

      <div class="form-group">

        <label class="col-xs-12 col-sm-3 col-md-2 control-label">最低提现金额</label>

        <div class="col-sm-9">

          <div class="input-group">

           <input type="text" name="zd_money" value="<?php  echo $item['zd_money'];?>"  class="form-control" />

           <span class="input-group-addon">元</span>

         </div>

         <span class="help-block">*最低提现金额不能小于1元，建议填写整数，不填写为不限制</span>

       </div>

     </div>

     <div class="form-group">

      <label class="col-xs-12 col-sm-3 col-md-2 control-label">提现费率</label>

      <div class="col-sm-9">

        <div class="input-group">

         <input type="text" name="tx_sxf" value="<?php  echo $item['tx_sxf'];?>"  class="form-control" />

         <span class="input-group-addon">%</span>

       </div>

       <span class="help-block">*用户申请提现时，每笔申请提现扣除的费用，默认为空，即提现不扣费</span>

     </div>

   </div>



   <div class="form-group">

    <label class="col-xs-12 col-sm-3 col-md-2 control-label">提现须知</label>

    <div class="col-sm-9">

     <?php  echo tpl_ueditor('tx_notice',$item['tx_notice']);?>

   </div>

 </div>



</div>

</div>

<div class="form-group col-sm-12">

  <input type="submit" name="submit" value="提交" class="btn col-sm-3" style="color: white;background-color: #44ABF7;"/>

  <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />

  <input type="hidden" name="id" value="<?php  echo $item['id'];?>" />

</div>

</form>

</div>
<script type="text/javascript">
  $(function(){
    $("#frame-3").show();
    $("#yframe-3").addClass("wyactive");
  })
</script>