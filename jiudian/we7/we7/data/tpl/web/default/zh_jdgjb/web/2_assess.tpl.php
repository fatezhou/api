<?php defined('IN_IA') or exit('Access Denied');?>﻿<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
    .yg5_tr2>td{padding: 15px;border: 1px solid #e5e5e5;text-align: center;line-height:20px;}
</style>
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li class="active"><a href="javascript:void(0);">评论列表</a></li>
</ul>

<div class="main">
 <div class="row">

  <div class="col-lg-6">

   <form action="" method="POST">

    <div class="input-group" style="width: 300px">

     <input type="text" name="keywords" class="form-control" placeholder="请输入评论内容">

      <span class="input-group-btn">

         <input type="submit" class="btn btn-md btn-default" name="submit" value="查找" style="font-size: 14px;" />

      </span>

    </div>

  </div>

   <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>

  </form>

</div>

<div class="main">

    <!-- <div class="panel panel-default">

        <div class="panel-body">

            <a class="btn btn-primary" href="javascript:location.reload()"><i class="fa fa-refresh"></i>刷新</a>

        </div>

      </div> -->

      <!-- 门店列表部分开始 -->

      <div class="panel panel-default" >

        <div class="panel-heading">

          评论列表

        </div>

        <div class="panel-body" style="padding: 0px 15px;">

          <div class="row">

            <table class="" style="width: 100%;">

              <tr class="yg5_tr1">

                <th class="col-md-4 store_td1">评论内容</th>

                <!-- <th class="col-md-2">评论分数</th> -->

                <th class="col-md-2">评论时间</th>

                <th class="col-md-2">状态</th>

                <th class="col-md-2">回复</th>

                <th class="col-md-2">操作</th>

              </tr>

              <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>

              <tr class="yg5_tr2">
               <td>
                <?php  echo $item['content'];?>
              </td>
             <!--  <td>
                <?php  echo $item['score'];?>
              </td> -->
              <td>
                <?php  echo date('Y-m-d H:i:s',$item['time'])?>
              </td>
              <?php  if($item['status']==1) { ?>
              <td>
                <span class="label storeblue">未回复</span>
              </td>
              <?php  } else if($item['status']==2) { ?>
              <td>
                <span class="label storegrey">已回复</span>
              </td>
              <?php  } ?>
              <td>
                <?php  if($item['status']==1) { ?>
                <a href="javascript:void(0);" data-toggle="modal" data-target="#myModal<?php  echo $item['id'];?>"><span class="label storeblue">回复</span></a>
                <?php  } else { ?>
                <span class="label storeblue">已回复</span>
                <?php  } ?>
                
              </td>
              <td>
                <a href="<?php  echo $this->createWebUrl('assessinfo', array('id'=>$item['id'],'op'=>'info'));?>" class="storespan btn btn-xs">
                  <span class="fa fa-pencil"></span>
                  <span class="bianji">编辑
                    <span class="arrowdown"></span>
                  </span>
                  
                </a>
                <a href="<?php  echo $this->createWebUrl('assess', array('op'=>delete,'id'=>$item['id']));?>" class="storespan btn btn-xs" onclick="if(!confirm('删除后将不可恢复,确定删除吗?')) return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="删除">
                  <span class="fa fa-trash-o"></span>
                  <span class="bianji">删除
                    <span class="arrowdown"></span>
                  </span>
                </a>
                  <!-- <a href="<?php  echo $this->createWebUrl('assessinfo', array('id'=>$item['id'],'op'=>'info'));?>" class="btn btn-sm btn-info" >查看 </a>
                  <a onclick="if(!confirm('删除后将不可恢复,确定删除吗?')) return false;" href="<?php  echo $this->createWebUrl('assess', array('op'=>delete,'id'=>$item['id']));?>" class="btn btn-default btn-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="删除"><i class="fa fa-times"></i> </a> -->   
                </td>
              </tr>
              <div class="modal fade" id="myModal<?php  echo $item['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <form action="" method="post" enctype="multipart/form-data">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">编辑回复内容</h4>
                      </div>
                      <div class="modal-body" style="font-size:20px">
                        <input type="text" name="reply" class="accout_inp" placeholder="请输入回复内容">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <input type="submit" name="submit2" class="btn btn-info" value="确定">
                        <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
                        <input type="hidden" name="id" value="<?php  echo $item['id'];?>"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <?php  } } ?>
              <?php  if(empty($list)) { ?>
              <tr class="yg5_tr2">
                <td colspan="12">
                  暂无评论信息
                </td>
              </tr>
              <?php  } ?>

          </table>

                </div>

            </div>

        </div>



</div>
<div class="text-right we7-margin-top">
             <?php  echo $pager;?>
             </div>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-10").show();
        $("#yframe-10").addClass("wyactive");
    })
</script>