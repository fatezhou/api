<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>

<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<style type="text/css">
    .ygrow{font-size: 12px;color: #44ABF7;}
    .userremark{line-height: 35px;}
    .userinfolist{font-size: 14px;line-height: 30px;}
    .userilfirst{font-weight: bold;}
    .userilsecond{margin-left: 30px;}
    .userinfolist2>li>span{cursor: pointer;}
    .usertuinfo{width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;z-index: 10;border:1px solid #eee;display: none;background-color: rgba(0,0,0,0.5);text-align: center;}
    .usertuinfo>img{width: 400px;height: 233px;margin-top: 15px;}
    .usertuinfo>div{position: absolute;right: 20%;top: 5px;z-index: 11;}
</style>
<ul class="nav nav-tabs">    
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li class="active"><a href="javascript:void(0);">会员列表</a></li>
</ul>

<div class="row ygrow">
    <form action="" method="get" class="col-md-3">
       <input type="hidden" name="c" value="site" />
       <input type="hidden" name="a" value="entry" />
       <input type="hidden" name="m" value="zh_jdgjb" />
       <input type="hidden" name="do" value="member" />
       <div class="input-group">
        <input type="text" name="keywords" class="form-control" placeholder="请输入昵称/手机号" style="font-size: 12px;">
        <span class="input-group-btn">
            <input type="submit" class="btn btn-default" name="submit" value="查找"/>
        </span>
    </div>
    <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
</form>
<!--   <div class="col-md-4 userremark">人工充值：双击可修改余额，输入值与原有值进行累加充值。</div> -->
</div>
<div class="main">
    <div class="panel panel-default">

        <div class="panel-heading">用户列表</div>
        <div class="panel-body" style="padding: 0px 15px;">

            <div class="row">

                <table class="yg5_tabel col-md-12">

                    <tr class="yg5_tr1">

                        <!-- <th class="store_td1 col-md-1">

                            <input type="checkbox" style="margin:0px;" id="allCheckBox"/>

                            <input type="checkbox" class="check_all" />

                            <span class="store_inp">全选</span>

                        </th> -->

                      <!--   <th class="store_td1 col-md-1" >id</th> -->

                        <th class="store_td1 col-md-1">用户头像</th>

                        <th class="col-md-1">用户昵称</th>
                        <th class="col-md-1">名称</th>
                        <th class="col-md-1">手机号</th>

                      <!--   <th class="col-md-1">用户openid</th> -->
                       <th class="col-md-1">注册时间</th>
                       <th class="col-md-1">是否是会员</th>
                       <th class="col-md-1">会员等级</th>
                        <th class="col-md-1">积分</th>
                        <th class="col-md-1">余额</th>
                       <th class="col-md-2">操作</th>

                   </tr>

                   <?php  if(is_array($list)) { foreach($list as $row) { ?>

                   <tr class="yg5_tr2">

                  <!--   <td ><?php  echo $row['id'];?></td> -->

                    <td><img class="store_list_img" src="<?php  echo $row['img'];?>"/></td>

                    <td><?php  echo $row['name'];?></td>
                    <td><?php  echo $row['zs_name'];?></td>
                    <td><?php  echo $row['tel'];?></td>

                  <!--   <td><?php  echo $row['openid'];?></td> -->
                    
                    <td><?php  echo date("Y-m-d H:i",$row['join_time']);?></td> 
                    <?php  if($row['type']==1) { ?>
                    <td>
                        否
                    </td>
                    <?php  } else if($row['type']==2) { ?>
                    <td>
                         <span class="label label-success">是</span>
                    </td>
                    <?php  } ?>
                    <?php  if($row['type']==2&&$row['level_name']=='') { ?>
                    <td>
                        初始会员
                        
                    </td>
                    <?php  } else { ?>
                    <td>       
                       <?php  echo $row['level_name'];?>
                   </td>
                   <?php  } ?>
                     <td>       
                       <?php  echo $row['score'];?>
                   </td>
                   <td>       
                       <?php  echo $row['balance'];?>
                   </td>
                   <td>
                     <a href="javascript:void(0);" data-toggle="modal" data-target="#myModalb<?php  echo $row['id'];?>"><span class="btn btn-xs ygyouhui2">充值余额</span> </a>
                      <a href="javascript:void(0);" data-toggle="modal" data-target="#myModala<?php  echo $row['id'];?>"><span class="btn btn-xs ygshouqian2">充值积分</span> </a>
                      <a href="javascript:void(0);" data-toggle="modal" data-target="#myModalc<?php  echo $row['id'];?>"><span class="btn btn-xs ygshouqian2">修改等级</span> </a>
                    <a href="#myModal<?php  echo $row['id'];?>" class="storespan btn btn-xs" data-toggle="modal" data-target="#myModal<?php  echo $row['id'];?>">
                        <span class="fa fa-trash-o"></span>
                        <span class="bianji">删除
                            <span class="arrowdown"></span>
                        </span>
                    </a>
                    <!-- <button type="button" class="btn storeblue btn-xs" data-toggle="modal" data-target="#myModal<?php  echo $row['id'];?>">删除</button> -->
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
                            <a href="<?php  echo $this->createWebUrl('user2', array('op' => 'delete', 'id' => $row['id']))?>" type="button" class="btn btn-info" >确定</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="myModalb<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div class="modal-dialog" role="document" style="min-width: 300px!important;width: 250px;">
                          <form action="" method="post" enctype="multipart/form-data">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">编辑充值金额</h4>
                                  </div>
                                  <div class="modal-body" style="font-size:20px">
                                      <input type="number" name="cz_money" class="accout_inp col-md-9" placeholder="请输入金额">
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                      <input type="submit" name="submit2" class="btn btn-info" value="确定">
                                      <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
                                      <input type="hidden" name="id2" value="<?php  echo $row['id'];?>"/>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
                      <div class="modal fade" id="myModalc<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div class="modal-dialog" role="document" style="min-width: 300px!important;width: 250px;">
                          <form action="" method="post" enctype="multipart/form-data">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">编辑会员等级</h4>
                                  </div>
                                  <div class="modal-body">
                                    <select class="col-sm-6" id="username" name="level_id">
                                     <?php  if(is_array($member)) { foreach($member as $key => $item) { ?>
                                     <?php  if($item['id']==$row['level_id']) { ?>
                                     <option value="<?php  echo $item['id'];?>" selected="selected" name="unopction"><?php  echo $item['name'];?></option>
                                     <?php  } else { ?>
                                     <option value="<?php  echo $item['id'];?>" name="unopction"><?php  echo $item['name'];?></option>
                                     <?php  } ?>
                                     <?php  } } ?>
                                   </select>
                                 </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                      <input type="submit" name="submit4" class="btn btn-info" value="确定">
                                      <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
                                      <input type="hidden" name="id4" value="<?php  echo $row['id'];?>"/>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
                   <div class="modal fade" id="myModala<?php  echo $row['id'];?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div class="modal-dialog" role="document" style="min-width: 300px!important;width: 250px;">
                          <form action="" method="post" enctype="multipart/form-data">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title" id="myModalLabel" style="font-size: 20px;">编辑积分数量</h4>
                                  </div>
                                  <div class="modal-body" style="font-size:20px">
                                      <input type="number" name="reply" class="accout_inp col-md-9" placeholder="请输入积分">
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                      <input type="submit" name="submit3" class="btn btn-info" value="确定">
                                      <input type="hidden" name="token" value="<?php  echo $_W['token'];?>"/>
                                      <input type="hidden" name="id3" value="<?php  echo $row['id'];?>"/>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
            <?php  } } ?>

            <?php  if(empty($list)) { ?>

            <tr class="yg5_tr2">

                <td colspan="9">

                  暂无用户信息
              </td>
          </tr>
          <?php  } ?>
      </table>
  </div>

</div>

</div>

</div>

<div class="text-right we7-margin-top"><?php  echo $pager;?></div>
<!-- <?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('common/footer', TEMPLATE_INCLUDEPATH)) : (include template('common/footer', TEMPLATE_INCLUDEPATH));?> -->
<script type="text/javascript">
    $(function(){
        $("#frame-1").show();
        $("#yframe-1").addClass("wyactive");
        
      

      

    })

</script>

