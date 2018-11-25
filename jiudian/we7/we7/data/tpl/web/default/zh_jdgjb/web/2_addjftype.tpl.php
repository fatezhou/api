<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>    
    <li><a href="<?php  echo $this->createWebUrl('jftype')?>">商品分类管理</a></li>
    <li class="active"><a href="<?php  echo $this->createWebUrl('addjftype')?>">添加商品分类</a></li>
</ul>
<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                内容编辑
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">分类名称</label>
                    <div class="col-sm-9">
                        <input type="text" name="name" class="form-control" value="<?php  echo $info['name'];?>" />
                    </div>
                </div>
               <!--  <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">简介</label>
                    <div class="col-sm-9">
                        <input type="text" name="mark" class="form-control" value="<?php  echo $info['mark'];?>" />
                    </div>
                </div> -->
                <!-- <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">链接</label>
                    <div class="col-sm-9">
                        <input type="text" name="link" class="form-control" value="<?php  echo $info['link'];?>" />
                    </div>
                </div> -->
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">图标</label>
                    <div class="col-sm-9">
                        <?php  echo tpl_form_field_image('img', $info['img'])?>
                        建议图片尺寸为175px*175rpx
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">排序</label>
                    <div class="col-sm-9">
                        <input type="number" name="num" class="form-control" value="<?php  echo $info['num'];?>" />
                        *从小到大排序
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
        // $("#frame-8").addClass("in");
        $("#frame-20").show();
        $("#yframe-20").addClass("wyactive");
    })
</script>