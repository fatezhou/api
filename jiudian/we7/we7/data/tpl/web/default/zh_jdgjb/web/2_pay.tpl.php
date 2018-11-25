<?php defined('IN_IA') or exit('Access Denied');?>﻿<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<ul class="nav nav-tabs">    
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li class="active"><a href="javascript:void(0);">支付配置</a></li>
</ul>

 <div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data" id="invitative">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                系统设置&nbsp;>&nbsp;支付配置
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">小程序支付商户号：</label>
                    <div class="col-sm-9">
                        <input type="text" name="mchid" value="<?php  echo $item['mchid'];?>" id="web_name" class="form-control" />
                    </div>
                </div>                
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">小程序支付Api密钥：</label>
                    <div class="col-sm-9">
                        <input type="text" name="wxkey" value="<?php  echo $item['wxkey'];?>" id="web_name" class="form-control" />
                        <span class="help-block" style="color:red">*请输入微信支付商户后台32位API密钥</span>
                    </div>
                </div>
                <div class="form-group">
                  <label class="col-xs-12 col-sm-3 col-md-2 control-label">微信支付apiclient_cert.pem<?php  if($item['apiclient_cert']) { ?><font color="red">(已上传)</font><?php  } ?>：</label>
                  <div class="col-sm-9">
                      <p class="form-control-static">
                        <textarea name="apiclient_cert" class="form-control" placeholder="为保证安全性, 不显示证书内容. 若要修改, 请直接输入" cols="30" rows="7"></textarea>
                      </p>
                      <span class="help-block">*如果无需退款无需填写</span>
                  </div>
                               </div>
                               <div class="form-group">
                  <label class="col-xs-12 col-sm-3 col-md-2 control-label">微信支付apiclient_key.pem<?php  if($item['apiclient_key']) { ?><font color="red">(已上传)</font><?php  } ?>：</label>
                  <div class="col-sm-9">
                      <p class="form-control-static">
                               <textarea name="apiclient_key" class="form-control" placeholder="为保证安全性, 不显示证书内容. 若要修改, 请直接输入" cols="30" rows="7"></textarea>
                      </p>
                      <span class="help-block">*如果无需退款无需填写</span>
                  </div>
                   <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">client_ip:</label>
                    <div class="col-sm-9">
                        <input type="text" name="client_ip" value="<?php  if($item['client_ip']) { ?>******<?php  } ?>" id="web_name" class="form-control" />
                        <span class="help-block" style="color:red">*请输入服务器IP</span>
                    </div>
                </div>
               
            </div>
        </div>
        
        <div class="form-group">
            <input type="submit" name="submit" value="保存设置" class="btn col-lg-3" style="color: white;background-color: #44ABF7;" />
            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
            <input type="hidden" name="id" value="<?php  echo $item['id'];?>"/>
        </div>
    </form>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-5").show();
        $("#yframe-5").addClass("wyactive");
    })
</script>