<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>

<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">

<ul class="nav nav-tabs">
  <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
  <li  <?php  if($type=='all') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('auditorhotel',array('type'=>all));?>">全部</a></li>

  <li   <?php  if($type=='wait') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('auditorhotel',array('type'=>wait,'state'=>1));?>">待审核</a></li>

  <li   <?php  if($type=='now') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('auditorhotel',array('type'=>now,'state'=>2));?>">审核通过</a></li>

  <li   <?php  if($type=='delivery') { ?> class="active" <?php  } ?>><a href="<?php  echo $this->createWebUrl('auditorhotel',array('type'=>delivery,'state'=>3));?>">审核拒绝</a></li>

</ul>



<div class="row ygrow">

    <div class="col-lg-12">

        <form action="" method="get" class="col-md-6">
        <input type="hidden" name="c" value="site" />
            <input type="hidden" name="a" value="entry" />
            <input type="hidden" name="m" value="zh_jdgjb" />
            <input type="hidden" name="do" value="auditorhotel" />

            <div class="input-group" style="width: 300px">

                <input type="text" name="keywords" class="form-control" placeholder="请输入酒店名称">

                <span class="input-group-btn">

                    <input type="submit" class="btn btn-default" name="submit" value="查找"/>

                </span>

            </div>

            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>

        </form>

        

    </div><!-- /.col-lg-6 -->

</div>  

<div class="main">

    <div class="panel panel-default">

        <div class="panel-heading">

            入驻审核管理

        </div>

        <div class="panel-body" style="padding: 0px 15px;">

            <div class="row">

                <table class="yg5_tabel col-md-12">

                    <tr class="yg5_tr1">

                        <td class="store_td1">酒店名称</td>
                        <td>联系人</td>
                         <td>联系人电话</td>
                         <td>地址</td>                    
                        <td>补充说明</td>
                        
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                    <?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
                    <tr class="yg5_tr2">
                      <td class="store_td1"><?php  echo $item['name'];?></td>
                      <td><?php  echo $item['link_name'];?></td>
                      <td><?php  echo $item['link_tel'];?></td>
                       <td><?php  echo $item['address'];?></td> 
                       <td><?php  echo $item['other'];?></td>
                     <?php  if($item['state']==1) { ?>
                     <td >
                        <span class="label storered">待审核</span>
                    </td >
                    <?php  } else if($item['state']==2) { ?>
                    <td >
                        <span class="label storeblue">已通过</span>
                    </td>
                    <?php  } else if($item['state']==3) { ?>
                    <td >
                       <span class="label storegrey">已拒绝</span>
                   </td>

                   <?php  } ?>  
                   <td>

                      <?php  if($item['state']==1) { ?>
                      <a class="btn ygyouhui2 btn-xs" href="<?php  echo $this->createWebUrl('auditorhotel',array('id'=>$item['id'],'op'=>'adopt'))?>" >通过</a>
                      <a class="btn storegrey2 btn-xs" href="<?php  echo $this->createWebUrl('auditorhotel', array('id' => $item['id'],'op'=>'reject'))?>" title="拒绝">拒绝</a>
                      <?php  } ?>
                      <!-- <a class="btn btn-danger btn-xs" href="<?php  echo $this->createWebUrl('attestation', array('id' => $item['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;" title="删除">删</a> -->
                         <a href="<?php  echo $this->createWebUrl('auditorhotelinfo',array('id'=>$item['id']));?>" class="storespan btn btn-xs">

                      <span class="fa fa-pencil"></span>

                      <span class="bianji">编辑

                          <span class="arrowdown"></span>

                      </span>                            

                  </a>
                      <a class="storespan btn btn-xs" href="<?php  echo $this->createWebUrl('attestation', array('id' => $item['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;">
                          <span class="fa fa-trash-o"></span>
                          <span class="bianji">删除
                              <span class="arrowdown"></span>
                          </span>
                      </a>
                  </td>

              </td>

          </tr>

          <?php  } } ?>
          <?php  if(empty($list)) { ?>
          <tr class="yg5_tr2">
            <td colspan="9">
              暂无入驻信息
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
<script type="text/javascript">
    $(function(){
        $("#frame-8").show();
        $("#yframe-8").addClass("wyactive");
    })
</script>