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
    <li class="active"><a href="javascript:void(0);">模板消息</a></li>
</ul>

<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data" id="invitative">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                系统设置&nbsp;>&nbsp;模板消息设置
            </div>
            <div class="panel-body">
        <!--     <div class="form-group">
                <label for="lastname" class="col-sm-2 control-label">是否开启短信</label>
                <div class="col-sm-10">
                     <label class="radio-inline">
                        <input type="radio" id="emailwy1" name="is_open" value="1" <?php  if($item['is_open']==1 || empty($item['is_open'])) { ?>checked<?php  } ?> />
                        <label for="emailwy1">开启</label>
                    </label>
                    <label class="radio-inline">
                        <input type="radio" id="emailwy2" name="is_open" value="2" <?php  if($item['is_open']==2) { ?>checked<?php  } ?> />
                        <label for="emailwy2">关闭</label>
                    </label>
                </div>
            </div> -->
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">订房通知</label>
                <div class="col-sm-10">
                   <input type="text"  name="tid1" value="<?php  echo $item['tid1'];?>" class="form-control" id="inputEmail3" placeholder="请填写模板id">
                   <span class="help-block">*模板编号AT0011 ,关键词(酒店名称,预订时间,金额,地点,订单号,入住时间,离店时间,入住人,房间类型)</span>
               </div>
           </div>
           <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">入住通知</label>
            <div class="col-sm-10">
                <input type="text"  name="rz_tid" value="<?php  echo $item['rz_tid'];?>" class="form-control" id="inputEmail3" placeholder="请填写模板id">
                <span class="help-block">*模板编号AT0390 ,关键词(酒店名称,房间类型,入住人,入住时间,酒店电话,酒店地址)</span>
            </div>
        </div>

        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">拒绝入住通知</label>
            <div class="col-sm-10">
                <input type="text"  name="jjrz_tid" value="<?php  echo $item['jjrz_tid'];?>" class="form-control" id="inputEmail3" placeholder="请填写模板id">
                <span class="help-block">*模板编号AT0375 ,关键词(拒绝原因,拒绝时间,支付金额,店铺名称,客服电话,订单号)</span>
            </div>
        </div> 
        <?php  if($item['is_order']==1) { ?>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">确认订单通知</label>
            <div class="col-sm-10">
                <input type="text"  name="tid3" value="<?php  echo $item['tid3'];?>" class="form-control" id="inputEmail3" placeholder="请填写模板id">
                <span class="help-block">*模板编号AT0163 ,关键词(订单号,商户名称,订单状态,入住时间,退房时间)</span>
            </div>
        </div>   
        <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">拒绝订单通知</label>
            <div class="col-sm-10">
                <input type="text"  name="tid4" value="<?php  echo $item['tid4'];?>" class="form-control" id="inputEmail3" placeholder="请填写模板id">
                <span class="help-block">*模板编号AT0012 ,关键词(失败原因,订单号,入住日期,入住人,酒店名称,地点,酒店电话)</span>
            </div>
        </div>   
        <?php  } ?>     
    </div>
</div>

<div class="form-group">
    <input type="submit" name="submit" value="保存设置" class="btn col-lg-3" style="color: white;background-color: #44ABF7;" />
    <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
    <input type="hidden" name="id" value="<?php  echo $item['id'];?>" />
</div>
</form>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-5").show();
        $("#yframe-5").addClass("wyactive");
    })
</script>