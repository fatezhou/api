<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li class="active"><a href="<?php  echo $this->createWebUrl('room',array('type'=>all));?>">房型管理</a></li>
</ul> 
<div class="main">
    <div class="panel panel-default">
        <div class="panel-heading">
            房型信息
        </div>
        <div class="panel-body" style="padding: 0px 15px;">
            <div class="row">
                <table class="yg5_tabel col-md-12">
                   <tr class="yg5_tr1">
                   <td class="store_td1">序号</td>
                    <td class="store_td1">房型</td>
                    <td>房间数量</td>
                    <td>价格</td>

                    <td>楼层</td>
                    <td>可住人数</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
                <?php  if(is_array($list)) { foreach($list as $row) { ?>
                <tr class="yg5_tr2">
                 <td class="store_td1"><?php  echo $row['sort'];?></td>
                    <td class="store_td1"><?php  echo $row['name'];?></td>
                    <td><?php  echo $row['total_num'];?></td>

                </td>

                <td><?php  echo $row['price'];?></td>
                <td><?php  echo $row['floor'];?></td>
                <td><?php  echo $row['people'];?></td>
                <?php  if($row['state']==1) { ?>
                <td><span class="label label-success">上架</span></td>
                <?php  } else { ?>
                 <td><span class="label label-default">下架</span></td>
                <?php  } ?>

                <td>
                <a href="<?php  echo $this->createWebUrl('addroom', array('id' => $row['id']))?>" class="storespan btn btn-xs">
                      <span class="fa fa-pencil"></span>
                      <span class="bianji">编辑
                        <span class="arrowdown"></span>
                    </span>                            
                </a>
                <a class="storespan btn btn-xs" href="<?php  echo $this->createWebUrl('room', array('id' => $row['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;">
                  <span class="fa fa-trash-o"></span>
                  <span class="bianji">删除
                    <span class="arrowdown"></span>
                </span>
            </a>

            <!-- <a class="btn btn-warning btn-xs" href="<?php  echo $this->createWebUrl('addad', array('id' => $row['id']))?>" title="编辑">改</a>&nbsp;&nbsp;<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#myModal<?php  echo $row['id'];?>">删</button> -->
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
            <a href="<?php  echo $this->createWebUrl('nav', array('op' => 'delete', 'id' => $row['id']))?>" type="button" class="btn btn-info" >确定</a>
        </div>
    </div>
</div>
</div>
<div class="modal fade" id="myModal2<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">提示</h4>
    </div>
    <div class="modal-body" style="font-size: 20px">
        确定要禁用么？
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <a href="<?php  echo $this->createWebUrl('nav', array('status' => 2, 'id' => $row['id']))?>" type="button" class="btn btn-info" >确定</a>
    </div>
</div>
</div>
</div>
<div class="modal fade" id="myModal3<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">提示</h4>
    </div>
    <div class="modal-body" style="font-size: 20px">
        确定要启用么？
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <a href="<?php  echo $this->createWebUrl('nav', array('status' => 1, 'id' => $row['id']))?>" type="button" class="btn btn-info" >确定</a>
    </div>
</div>
</div>
</div>
<?php  } } ?>
<?php  if(empty($list)) { ?>
<tr class="yg5_tr2">
  <td colspan="12">
    暂无房间信息
</td>
</tr>
<?php  } ?>


</table>
</div>
</form>
</div>

</div>
<div class="text-right we7-margin-top">
 <?php  echo $pager;?>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-8").show();
        $("#yframe-8").addClass("wyactive");
    })
</script>