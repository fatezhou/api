<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<ul class="nav nav-tabs">    
    <li class="active"><a href="<?php  echo $this->createWebUrl('memberlevel')?>">会员等级管理</a></li>
    <li><a href="<?php  echo $this->createWebUrl('addmemberlevel')?>">添加/编辑会员等级</a></li>
</ul>
<div class="main">
    <!-- 门店列表部分开始 -->
    <div class="panel panel-default">
        <div class="panel-heading">
            会员等级列表
        </div>
        <div class="panel-body" style="padding: 0px 15px;">
            <div class="row">
                <table class="yg5_tabel col-md-12">
                    <tr class="yg5_tr1">
                        <td class="store_td1 col-md-1">顺序</td>
                        <td class="col-md-2">会员等级名称</td>
                        <td class="col-md-2">背景图片</td>
                        <td class="col-md-2">累计消费</td>
                        <td class="col-md-2">折扣</td>                           
                        <td class="col-md-3">操作</td>
                    </tr>
                    <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
                    <tr class="yg5_tr2">
                        <td><div><?php  echo $item['orderby'];?></div></td>
                        <td>
                           <?php  echo $item['name'];?>
                       </td>
                       <td><img class="store_list_img" src="<?php  echo tomedia($item['icon'])?>" alt=""/></td>
                       <td><?php  echo $item['value'];?></td>
                       <td><?php  echo $item['discount'];?></td>

                       <td>
                          <a href="<?php  echo $this->createWebUrl('addmemberlevel', array('id' => $item['id']))?>" class="storespan btn btn-xs">
                            <span class="fa fa-pencil"></span>
                            <span class="bianji">编辑
                                <span class="arrowdown"></span>
                            </span>                            
                        </a>
                        <a href="<?php  echo $this->createWebUrl('memberlevel', array('id' => $item['id']))?>" class="storespan btn btn-xs">
                            <span class="fa fa-trash-o"></span>
                            <span class="bianji">删除
                                <span class="arrowdown"></span>
                            </span>                           
                        </a>
                    </td>
                </tr>
                <?php  } } ?>
                <?php  if(empty($list)) { ?>
                <tr class="yg5_tr2">
                  <td colspan="12">
                    暂无等级信息
                </td>
            </tr>
            <?php  } ?>
        </table>
    </div>
</div>
</div>
<?php  echo $pager;?>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-1").show();
        $("#yframe-1").addClass("wyactive");
    })
</script>