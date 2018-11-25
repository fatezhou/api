<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
    .yg5_key>div{float: left;line-height: 34px;}
    .store_td1{height: 45px;}
    .store_list_img{width: 40px;height: 40px;}
    .yg5_tabel{border-color: #e5e5e5;outline: 1px solid #e5e5e5;}
    .yg5_tr2>td{padding: 10px;border: 1px solid #e5e5e5;text-align: center;}
    .yg5_tr1>td{
        border: 1px solid #e5e5e5;
        padding-left: 15px;
        background-color: #FAFAFA;
        font-weight: bold;
        text-align: center;
    }
    .yg5_btn{background-color: #EEEEEE;color: #333;border: 1px solid #E4E4E4;border-radius: 6px;width: 100px;height: 34px;}
    .jfbtn{background-color: #44ABF7;color: white;}
    .jfbtn:hover{background-color: #44ABF7;color: white;}
</style>
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>    
    <li class="active"><a href="<?php  echo $this->createWebUrl('jfgoods')?>">商品管理</a></li>
    <li><a href="<?php  echo $this->createWebUrl('addjfgoods')?>">添加商品</a></li>
</ul>
<div class="main">
    <!-- <div class="panel panel-default">
        <div class="panel-body">
            <a class="btn btn-primary" href="javascript:location.reload()"><i class="fa fa-refresh"></i>刷新</a>
        </div>
    </div> -->
    <!-- 门店列表部分开始 -->
        <div class="panel panel-default">
            <div class="panel-heading">
                商品列表
            </div>
            <div class="panel-body" style="padding: 0px 15px;">
                <div class="row">
                    <table class="yg5_tabel col-md-12">
                        <tr class="yg5_tr1">
                            <td class="store_td1 col-md-1">顺序</td>
                            <td class="col-md-1">图片</td>
                            <td class="col-md-2">商品名称</td>
                            <td class="col-md-2">分类名称</td>
                            <td class="col-md-1">数量</td>
                            <td class="col-md-1">所需积分</td>
                            <td class="col-md-1">领取记录</td>
                            <td class="col-md-1">操作</td>
                        </tr>
                        <?php  if(is_array($list)) { foreach($list as $row) { ?>
                        <tr class="yg5_tr2">
                            <td><div><?php  echo $row['num'];?></div></td>
                            <td>
                                <img class="store_list_img" src="<?php  echo tomedia($row['img']);?>" alt=""/>                                
                            </td>
                            <td><?php  echo $row['name'];?></td>
                            <td><?php  echo $row['type_name'];?></td>
                            <td><?php  echo $row['number'];?></td>
                            <td><?php  echo $row['score'];?></td>
                            <td><a class="btn jfbtn btn-xs" href="<?php  echo $this->createWebUrl('receivelist', array('good_id' => $row['id'],'type'=>$row['type']))?>" title="查看列表">查看列表</a></td>
                            <td>
                                <a href="<?php  echo $this->createWebUrl('addjfgoods', array('id' => $row['id']))?>" class="storespan btn btn-xs">
                                    <span class="fa fa-pencil"></span>
                                    <span class="bianji">编辑
                                        <span class="arrowdown"></span>
                                    </span>
                                
                                </a>
                                <a href="javascript:void(0);" class="storespan btn btn-xs" data-toggle="modal" data-target="#myModal<?php  echo $row['id'];?>">
                                    <span class="fa fa-trash-o"></span>
                                    <span class="bianji">删除
                                        <span class="arrowdown"></span>
                                    </span>
                                </a>
                                <!-- <a class="btn btn-warning btn-xs" href="<?php  echo $this->createWebUrl('addjfgoods', array('id' => $row['id']))?>" title="编辑">改</a>&nbsp;&nbsp;
                                <button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#myModal<?php  echo $row['id'];?>">删</button> -->
                            </td>
                        </tr>
                         <div class="modal fade" id="myModal<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">提示</h4>
                        </div>
                        <div class="modal-body" style="font-size: 20px">
                            确定删除么？
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <a href="<?php  echo $this->createWebUrl('jfgoods', array('id' => $row['id']))?>" type="button" class="btn btn-info" >确定</a>
                        </div>
                    </div>
                </div>
            </div>
                        <?php  } } ?>
                   <?php  if(empty($list)) { ?>
                        <tr class="yg5_tr2">
                            <td colspan="8">
                              暂无商品管理
                            </td>
                        </tr>         
                    <?php  } ?>
                    </table>
                </div>
            </div>
        </div>
   
</div>
<div class="text-right we7-margin-top"><?php  echo $pager;?></div>
<script type="text/javascript">
    $(function(){
        // $("#frame-8").addClass("in");
        $("#frame-20").show();
        $("#yframe-20").addClass("wyactive");
    })
</script>