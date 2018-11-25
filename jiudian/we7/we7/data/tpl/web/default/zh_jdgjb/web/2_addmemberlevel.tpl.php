<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<ul class="nav nav-tabs">    
    <li><a href="<?php  echo $this->createWebUrl('memberlevel')?>">会员等级管理</a></li>
    <li class="active"><a href="<?php  echo $this->createWebUrl('addmemberlevel')?>">添加/编辑会员等级</a></li>
</ul>
<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
        <!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->
        <div class="panel panel-default">
            <div class="panel-heading">
                会员营销&nbsp;>&nbsp;添加/编辑会员等级
            </div>
            <div class="panel-body">
              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">等级名称</label>
                  <div class="col-sm-10">
                      <input type="text"  name="name" value="<?php  echo $list['name'];?>" class="form-control" id="inputEmail3" placeholder="请填写等级名称">
                  </div>
              </div>
              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">背景图片</label>
                  <div class="col-sm-10"><?php  echo tpl_form_field_image('icon',$list['icon']);?>
						建议图片尺寸为295px*170rpx
                  </div>
              </div>  
             
              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">升级条件</label>
                  <div class="col-sm-5">
                    <div class="input-group">
                        <input type="text"  name="value" value="<?php  echo $list['value'];?>" class="form-control" id="inputEmail3" placeholder="请填写等级金额">
                        <span class="input-group-addon">元</span>
                    </div>
                    <div class="addcolor">消费多少金额后才能成为对应的会员</div>
                  </div>
              </div>
              <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">折扣</label>
                  <div class="col-sm-10">
                    <input type="text"  name="discount" value="<?php  echo $list['discount'];?>" class="form-control" id="inputEmail3" placeholder="请填写折扣">
                    
                  </div>
              </div>
               <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
                  <div class="col-sm-10">
                      <input type="text"  name="orderby" value="<?php  echo $list['orderby'];?>" class="form-control" id="inputEmail3" placeholder="请填写排序序号">
                      <div class="addcolor">数值越大越靠后</div>
                  </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">会员权益</label>
                <div class="col-sm-10">
                <?php  echo tpl_ueditor('content',$list['content']);?>
                </div>
              </div>
               </div>
            </div>
              <div class="form-group">
                 <div class="form-group col-sm-12">
                      <input type="submit" name="submit" value="提交" class="btn col-lg-3" style="color: white;background-color: #44ABF7;"/>
                  </div>
             
        </div>
        <input type="hidden" name="id" value="<?php  echo $list['id'];?>"/>

  <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>

    </form>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-1").show();
        $("#yframe-1").addClass("wyactive");
    })
</script>