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
    <li class="active"><a href="javascript:void(0);">短信设置(聚合短信服务)</a></li>
</ul>

<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data" id="invitative">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                系统设置&nbsp;>&nbsp;短信设置(聚合短信服务)
            </div>
            <div class="panel-body">
            <div class="form-group">
                <label for="lastname" class="col-sm-2 control-label">是否开启短信</label>
                <div class="col-sm-10">
                     <label class="radio-inline">
                        <input type="radio" id="emailwy1" name="is_dxyz" value="1" <?php  if($item['is_dxyz']==1 || empty($item['is_dxyz'])) { ?>checked<?php  } ?> />
                        <label for="emailwy1">开启</label>
                    </label>
                    <label class="radio-inline">
                        <input type="radio" id="emailwy2" name="is_dxyz" value="2" <?php  if($item['is_dxyz']==2) { ?>checked<?php  } ?> />
                        <label for="emailwy2">关闭</label>
                    </label>
                </div>
            </div>

                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">应用key：</label>
                    <div class="col-sm-9">
                        <input type="text" name="appkey" value="<?php  echo $item['appkey'];?>" id="web_name" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">商户入驻短信模板id(验证码)：</label>
                    <div class="col-sm-9">
                        <input type="text" name="tpl_id" value="<?php  echo $item['tpl_id'];?>" id="web_name" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">会员注册短信模板id(验证码)：</label>
                    <div class="col-sm-9">
                        <input type="text" name="tpl_id2" value="<?php  echo $item['tpl_id2'];?>" id="web_name" class="form-control" />
                    </div>
                </div>
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