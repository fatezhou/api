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
    <li><a href="<?php  echo $this->createWebUrl('nav')?>">导航管理</a></li>
    <li class="active"><a href="<?php  echo $this->createWebUrl('addnav')?>">添加导航</a></li>
</ul>
<div class="main ygmain">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
        <!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                内容编辑
            </div>
            <div class="panel-body">
               
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">导航名称</label>
                    <div class="col-sm-9">
                        <input type="text" name="title" class="form-control" value="<?php  echo $info['title'];?>" />
                    </div>
                </div>               
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">导航图标</label>
                    <div class="col-sm-9">
                        <?php  echo tpl_form_field_image('logo', $info['logo'])?>
                        <span class="help-block">*建议图片宽高为50px*50px</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">选择跳转路径</label>
                    <div class="col-sm-9">
                        <select name="state" class="col-md-9" id="type">
                            <option value="1" <?php  if($info['state']=='1') { ?> selected <?php  } ?>>内部网页跳转</option>
                            <option value="2" <?php  if($info['state']=='2') { ?> selected <?php  } ?>>外部网页跳转</option>
                            <option value="3" <?php  if($info['state']=='3') { ?> selected <?php  } ?>>关联小程序跳转</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ygyi1">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">内部链接</label>
                    <div class="col-sm-9">
                <input type="text" name="src" class="form-control" value="<?php  echo $info['src'];?>" />
             <span class="help-block">*跳转酒店详情请按以下格式填写,id值在酒店管理中获取(../hotel_list/hotel_info?hotel_id=1)</span>
              <span class="help-block">*跳转入驻商家请按以下格式填写(../settled_store/settled_store)</span>
              <span class="help-block">*跳转领取优惠券请按以下格式填写(../coupon/receive_coupon)</span>
              <span class="help-block">*跳转我的优惠券请按以下格式填写(../coupon/store_coupon)</span>              
              <span class="help-block">*跳转酒店列表请按以下格式填写(../hotel_list/hotel_list)</span>
              <span class="help-block">*跳转我的订单请按以下格式填写(../order/order)</span>
              <span class="help-block">*跳转商家管理请按以下格式填写(../login_entry/login_entry)</span>
              <span class="help-block">*跳转积分商城请按以下格式填写(../jifen/jifen)</span>
              <span class="help-block">*跳转充值中心请按以下格式填写(../recharge/index)</span>
              <span class="help-block">*跳转酒店详情介绍请按以下格式填写(../hotel_list/hotel_in?seller_id=1)</span>
              <span class="help-block">*跳转会员注册请按以下格式填写(../register/register)</span>
            
                    </div>
                </div>
                <div class="form-group ygyi2">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">外部链接</label>
                    <div class="col-sm-9">
                        <input type="text" name="wb_src" class="form-control" value="<?php  echo $info['wb_src'];?>" />
                        <span class="help-block">*此链接为网页外部跳转链接，需要在小程序后台配置业务域名。</span>
                    </div>
                </div>
                <div class="form-group ygyi3">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">跳转小程序名称</label>
                    <div class="col-sm-9">
                        <input type="text" name="xcx_name" class="form-control" value="<?php  echo $info['xcx_name'];?>" />
                    </div>
                </div> 
             <div class="form-group ygyi3">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">小程序appid</label>
                    <div class="col-sm-9">
                        <input type="text" name="appid" class="form-control" value="<?php  echo $info['appid'];?>" />
                        <span class="help-block">*要跳转的小程序appid(只有同一公众号下的关联的小程序之间才可相互跳转)</span>
                    </div>
                </div>
              
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">排序</label>
                    <div class="col-sm-9">
                        <input type="text" name="orderby" class="form-control" value="<?php  echo $info['orderby'];?>" />
                        <span class="help-block">*顺序由小到大，数字越小，排在前面。</span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">是否禁用</label>
                    <div class="col-sm-9">
                        <label class="radio-inline">
                            <input type="radio" id="emailwy1" name="status" value="1" <?php  if($info['status']==1 || empty($info['status'])) { ?>checked<?php  } ?> />
                            <label for="emailwy1">启用</label>
                        </label>
                        <label class="radio-inline">
                            <input type="radio" id="emailwy2" name="status" value="2" <?php  if($info['status']==2) { ?>checked<?php  } ?> />
                            <label for="emailwy2">禁用</label>
                        </label>    
                    </div>
                </div>
            </div>

        </div>

        <div class="form-group">
            <input type="submit" name="submit" value="提交" class="btn col-lg-3" style="color: white;background-color: #44ABF7;"/>
            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
            <input type="hidden" name="id" value="<?php  echo $info['id'];?>" />
        </div>
    </form>
</div>
<script type="text/javascript">
    $(function(){
        // $(".ygyi1").show();
        // $(".ygyi2").hide();  
        // $(".ygyi3").hide();  
        
        "<?php  if($info) { ?>"
            "<?php  if($info['state']=='1') { ?>"
                $('.ygyi2').hide();
                $('.ygyi3').hide();
            "<?php  } ?>"
            "<?php  if($info['state']=='2') { ?>"
                $('.ygyi1').hide();
                $('.ygyi3').hide();
            "<?php  } ?>" 
            "<?php  if($info['state']=='3') { ?>"
                $('.ygyi1').hide();
                $('.ygyi2').hide();
            "<?php  } ?>"            
        "<?php  } else { ?>"
            $('.ygyi2').hide();
            $('.ygyi3').hide();
        "<?php  } ?>"
        $("select#type").change(function(){
            if($(this).val()=='1'){
                console.log($(this).val())
                $(".ygyi1").show();
                $(".ygyi2").hide();
                $(".ygyi3").hide();  
            }else if($(this).val()=='2'){
                console.log($(this).val())
                $(".ygyi1").hide();
                $(".ygyi2").show();
                $(".ygyi3").hide();  
            }else if($(this).val()=='3'){
                console.log($(this).val())
                $(".ygyi1").hide();
                $(".ygyi2").hide();
                $(".ygyi3").show();  
            }
         })
        $("#frame-17").show();
        $("#yframe-17").addClass("wyactive");
    })
</script>