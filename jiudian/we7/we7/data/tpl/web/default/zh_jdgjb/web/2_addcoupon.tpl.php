<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
    .yginp{width: 50%;}
    .ygspan{line-height: 35px;margin-left: 10px;}
    .dis_in{
    	display: inline-block;
    	vertical-align: middle;
    }
</style>
<ul class="nav nav-tabs">    
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li><a href="<?php  echo $this->createWebUrl('coupon')?>">优惠券管理</a></li>
    <li class="active"><a href="javascript:void(0);">添加/编辑优惠券</a></li>
</ul>
<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data" id="invitative">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                优惠券管理&nbsp;>&nbsp;添加/编辑优惠券
            </div>
            <div class="panel-body">
 
                  <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">优惠券名称</label>
                    <div class="col-sm-9">
                        <input type="text" name="name" class="form-control" value="<?php  echo $list['name'];?>" placeholder="请填写优惠券名称"/>
                    </div>
                </div>
             

                   <div class="form-group">

                    <label for="inputEmail3" class="col-sm-2 control-label">优惠条件</label>

                    <div class="col-sm-5">
                        <div class="input-group">
                        	 <span class="input-group-addon">满</span>
                            <input type="text"  name="conditions" value="<?php  echo $list['conditions'];?>" class="form-control dis_in" id="inputEmail3" placeholder="请填写优惠条件">
                        	 <span class="input-group-addon">元</span>
                          
                        </div>
                    </div>

                  </div>

                <div class="form-group">

                    <label for="inputEmail3" class="col-sm-2 control-label">优惠金额</label>

                    <div class="col-sm-5">
                        <div class="input-group">
                        	 <span class="input-group-addon">减</span>
                            <input type="number" name="cost" value="<?php  echo $list['cost'];?>" class="form-control" id="inputEmail3" placeholder="请填写优惠金额">
                            <span class="input-group-addon">元</span>
                        </div>
                    </div>

                  </div>
                  <div class="form-group">

                    <label for="inputEmail3" class="col-sm-2 control-label">数量</label>

                    <div class="col-sm-5">
                        <div class="input-group">
                            <input type="number" name="number" value="<?php  echo $list['number'];?>" class="form-control" id="inputEmail3" placeholder="请填写数量">
                            
                        </div>
                    </div>

                  </div>

                <div class="form-group">

                    <label for="inputEmail3" class="col-sm-2 control-label">有效时间</label>

                    <div class="col-sm-10">

                    <?php  echo tpl_form_field_daterange('time',array('start' =>$list['start_time'], 'end' =>$list['end_time']));?> 

                    </div>

                  </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">使用说明</label>
                    <div class="col-sm-10">
                        <input type="text"  name="introduce" value="<?php  echo $list['introduce'];?>" class="form-control" id="inputEmail3" placeholder="请填写使用说明">
                    </div>
                </div>

            </div>
        </div>
        
       
        <div class="form-group">
            <input type="submit" name="submit" value="提交" class="btn col-lg-3" style="color: white;background-color: #44ABF7;"/>
            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
            <input type="hidden" name="id" value="<?php  echo $list['id'];?>" />
        </div>
    </form>
</div>
<!-- <?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('common/footer', TEMPLATE_INCLUDEPATH)) : (include template('common/footer', TEMPLATE_INCLUDEPATH));?> -->
<script type="text/javascript">
    $(function(){
        $("#frame-6").show();
        $("#yframe-6").addClass("wyactive");
    })
</script>