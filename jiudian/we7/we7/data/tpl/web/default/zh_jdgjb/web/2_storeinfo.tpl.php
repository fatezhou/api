<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
   .dizhi{margin-top: 10px;color: #44ABF7;}
   .yginp{width: 50%;}
   .ygspan{line-height: 35px;margin-left: 10px;}
</style>
<!-- <ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li ><a href="<?php  echo $this->createWebUrl('hotel');?>">酒店管理</a></li>
    <li class="active"><a href="<?php  echo $this->createWebUrl('addhotel');?>">添加酒店</a></li>
</ul> -->
<div class="main ygmain">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
        <!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                编辑酒店信息
            </div>
            <div class="panel-body">
                   <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
            <div class="col-sm-10">
                <input type="number"  name="scort" value="<?php  echo $list['scort'];?>" class="form-control" id="inputEmail3" placeholder="请填写排序编号">
                数字越小越靠前
            </div>
        </div>
               <div class="form-group">
                    <label for="lastname" class="col-sm-2 control-label">商家支持</label>
                    <div class="col-sm-10">
                        <label class="checkbox-inline">
                        <?php  if($list['wx_open']==1) { ?>  
                        <input type="checkbox" name="wx_open" id="optionsRadios3" value="1" checked> 微信支付
                        <?php  } else { ?>
                        <input type="checkbox" name="wx_open" id="optionsRadios3" value="1" > 微信支付
                        <?php  } ?>
                        </label>
                        <label class="checkbox-inline">
                            <?php  if($list['ye_open']==1) { ?>  
                            <input type="checkbox" name="ye_open" id="optionsRadios4"  value="1" checked> 余额支付
                              <?php  } else { ?>
                               <input type="checkbox" name="ye_open" id="optionsRadios4"  value="1" > 余额支付
                               <?php  } ?>
                        </label>
                        <label class="checkbox-inline">
                           <?php  if($list['dd_open']==1) { ?>  
                            <input type="checkbox" name="dd_open" id="optionsRadios4"  value="1" checked> 到店支付
                             <?php  } else { ?>
                                <input type="checkbox" name="dd_open" id="optionsRadios4"  value="1"> 到店支付
                                 <?php  } ?>
                        </label>
                       
                        <p></p>
                        <div class="help-block">
                        * 备注：默认三种支付都支持
                        </div>
                    </div>
                </div>
              <div class="row yg_dnorder"> 
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">酒店名称</label>
                    <div class="col-sm-10">
                        <input type="text"  name="name" value="<?php  echo $list['name'];?>" class="form-control" id="inputEmail3" placeholder="请填写酒店名称">
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">开业时间</label>
                    <div class="col-sm-10">
                     <?php  echo tpl_form_field_date(open_time, $list['open_time'],$withtime = false);?>
                 </div>
             </div>

             <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">酒店logo</label>
                <div class="col-sm-10">
                    <?php  echo tpl_form_field_image('ewm_logo',$list['ewm_logo']);?>
                    建议尺寸大小:105px*80px
                </div>
            </div>
                <div class="form-group">
                        <label class="col-xs-12 col-sm-3 col-md-2 control-label" style="margin-right: 15px;">酒店星级</label>
                        <select class="col-sm-8" name="star">
                        <?php  if($list['star']=='暂无星级(经济型)') { ?>
                            <option value="暂无星级(经济型)" selected="selected">暂无星级(经济型)</option>
                            <option value="三星级" >三星级</option>
                            <option value="四星级" >四星级</option>
                            <option value="五星级" >五星级</option>
                        <?php  } else if($list['star']=='三星级') { ?>
                        <option value="暂无星级(经济型)" >暂无星级(经济型)</option>
                            <option value="三星级" selected="selected">三星级</option>
                            <option value="四星级" >四星级</option>
                            <option value="五星级" >五星级</option>
                        <?php  } else if($list['star']=='四星级') { ?>
                         <option value="暂无星级(经济型)" >暂无星级(经济型)</option>
                            <option value="三星级" >三星级</option>
                            <option value="四星级" selected="selected">四星级</option>
                            <option value="五星级" >五星级</option>
                             <?php  } else if($list['star']=='五星级') { ?>
                              <option value="暂无星级(经济型)" >暂无星级(经济型)</option>
                            <option value="三星级" >三星级</option>
                            <option value="四星级" >四星级</option>
                            <option value="五星级" selected="selected">五星级</option>
                              <?php  } else { ?>
                                <option value="暂无星级(经济型)" selected="selected">暂无星级(经济型)</option>
                            <option value="三星级" >三星级</option>
                            <option value="四星级" >四星级</option>
                            <option value="五星级" >五星级</option>
                            <?php  } ?>
                        </select>
                    </div>

            <div class="form-group">
                <label class="col-xs-12 col-sm-3 col-md-2 control-label">酒店详细地址</label>
                <div class="col-sm-9">
                    <input type="text" name="address" class="form-control" value="<?php  echo $list['address'];?>" />
                </div>
            </div>   
            <div class="form-group">
                <label class="col-xs-12 col-sm-3 col-md-2 control-label">地址坐标</label>
                <div class="col-sm-10">
                   <!-- <?php  echo tpl_form_field_coordinate('op',$list['coordinates'])?> -->
                   <input type="text" name="coordinates" class="form-control dizhiname" value="<?php  echo $list['coordinates'];?>" placeholder="例如:30.527540,114.346430" />
                   <a href="http://lbs.qq.com/tool/getpoint/" target="_blank">
                       <p class="dizhi">*点击获取地理位置</p></a>
                   </div>
               </div>
               <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">酒店电话</label>
                <div class="col-sm-10">
                    <input type="text"  name="tel" value="<?php  echo $list['tel'];?>" class="form-control" id="inputEmail3" placeholder="请填写联系电话">
                </div>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">联系人</label>
                <div class="col-sm-10">
                    <input type="text"  name="link_name" value="<?php  echo $list['link_name'];?>" class="form-control" id="inputEmail3" placeholder="请填写联系人姓名">
                </div>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">联系人电话</label>
                <div class="col-sm-10">
                    <input type="text"  name="link_tel" value="<?php  echo $list['link_tel'];?>" class="form-control" id="inputEmail3" placeholder="请填写联系人电话">
                </div>
            </div>

            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">办理时间</label>
                <div class="col-sm-10">
                  <input type="text"  name="handle" value="<?php  echo $list['handle'];?>" class="form-control" id="inputEmail3" placeholder="请按入驻时间00:00~退房时间00:00格式填写">
              </div>
          </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">商家店铺图片</label>
            <div class="col-sm-10">
                <?php  echo tpl_form_field_multi_image('img',$img);?>
                建议尺寸大小:375px*200px
            </div>
        </div>


        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">退订规则</label>
            <div class="col-sm-10">
                <input type="text"  name="rule" value="<?php  echo $list['rule'];?>" class="form-control" id="inputEmail3" placeholder="请填写退订规则">
            </div>
        </div>

        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">温馨提示</label>
            <div class="col-sm-10">
                <input type="text"  name="prompt" value="<?php  echo $list['prompt'];?>" class="form-control" id="inputEmail3" placeholder="请填写温馨提示">
            </div>
        </div>
 
<!--         <div class="form-group">
       <label class="col-xs-12 col-sm-3 col-md-2 control-label">平台优惠券使用</label>
       <div class="col-sm-9">
         <label class="radio-inline">
           <input type="radio" name="is_use" value="1" <?php  if($list['is_use']==1 ) { ?>checked<?php  } ?> />支持
         </label>
         <label class="radio-inline">
         <input type="radio" name="is_use" value="2" <?php  if($list['is_use']==2 || empty($list['is_use'])) { ?>checked<?php  } ?> />不支持
         </label>
       </div>
     </div> -->
        <div class="form-group">
            <label for="lastname" class="col-sm-2 control-label">酒店设施</label>
            <div class="col-sm-10">
                <label class="checkbox-inline">
                    <?php  if($list['wake']==1) { ?>  
                    <input type="checkbox" name="wake" id="optionsRadios3" value="1" checked> 叫醒
                    <?php  } else { ?>
                    <input type="checkbox" name="wake" id="optionsRadios3" value="1" > 叫醒
                    <?php  } ?>
                </label>
                <label class="checkbox-inline">
                  <?php  if($list['water']==1) { ?>  
                  <input type="checkbox" name="water" id="optionsRadios4"  value="1" checked> 热水
                  <?php  } else { ?>
                  <input type="checkbox" name="water" id="optionsRadios4"  value="1"> 热水
                  <?php  } ?>
              </label>
              <label class="checkbox-inline">
                <?php  if($list['wifi']==1) { ?>  
                <input type="checkbox" name="wifi" id="optionsRadios4"  value="1" checked> wifi
                <?php  } else { ?>
                <input type="checkbox" name="wifi" id="optionsRadios4"  value="1" > wifi
                <?php  } ?>
            </label>
            <label class="checkbox-inline">
                <?php  if($list['park']==1) { ?>  
                <input type="checkbox" name="park" id="optionsRadios4"  value="1" checked> 停车
                <?php  } else { ?>
                <input type="checkbox" name="park" id="optionsRadios4"  value="1" > 停车
                <?php  } ?>
            </label>
            <label class="checkbox-inline">
               <?php  if($list['breakfast']==1) { ?>  
               <input type="checkbox" name="breakfast" id="optionsRadios4"  value="1" checked> 早餐
               <?php  } else { ?>
               <input type="checkbox" name="breakfast" id="optionsRadios4"  value="1" > 早餐
               <?php  } ?>
           </label>
           <label class="checkbox-inline">
              <?php  if($list['unionPay']==1) { ?>  
              <input type="checkbox" name="unionPay" id="optionsRadios4"  value="1" checked> 银联
              <?php  } else { ?>
              <input type="checkbox" name="unionPay" id="optionsRadios4"  value="1" > 银联
              <?php  } ?>
          </label>
          <label class="checkbox-inline">
              <?php  if($list['gym']==1) { ?>  
              <input type="checkbox" name="gym" id="optionsRadios4"  value="1" checked> 健身房
              <?php  } else { ?>
              <input type="checkbox" name="gym" id="optionsRadios4"  value="1" > 健身房
              <?php  } ?>
          </label>
          <label class="checkbox-inline">
            <?php  if($list['boardroom']==1) { ?>  
            <input type="checkbox" name="boardroom" id="optionsRadios4"  value="1" checked> 会议室
            <?php  } else { ?>
            <input type="checkbox" name="boardroom" id="optionsRadios4"  value="1" > 会议室
            <?php  } ?>
        </label>
    </div>
</div>
<div class="form-group">
  <label for="inputEmail3" class="col-sm-2 control-label">房间最低价格</label>
  <div class="col-sm-10">
    <input type="text"  name="zd_money" value="<?php  echo $list['zd_money'];?>" class="form-control" id="inputEmail3" placeholder="请填写联系电话">
  </div>
</div>

<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">酒店政策</label>
    <div class="col-sm-10">
      <?php  echo tpl_ueditor('policy',$list['policy']);?>
  </div>
</div>

<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">酒店简介</label>
    <div class="col-sm-10">
      <?php  echo tpl_ueditor('introduction',$list['introduction']);?>
  </div>
</div>
<?php  if($img!='') { ?>
<div class="form-group">
  <label for="inputEmail3" class="col-sm-2 control-label">店铺小程序码</label>
  <?php  if(strlen($img)>200) { ?>
  <?php  echo "<img src='data:image/png;base64,".$img."'>"?>
  <?php  } else { ?> 
  <div class="col-sm-10">
   <input type="text" style="color:red" name="orderby" value="该二维码必须在小程序发布后才能生成" class="form-control" id="inputEmail3" readonly>
 </div>
 <?php  } ?>
</div>
<?php  } ?>

<div class="form-group storeset">
  <span class="ygxian"></span>
  <div class="ygdangq storesetfont">自动提现设置:</div>
</div>
<div class="form-group">
  <label for="inputEmail3" class="col-sm-2 control-label">绑定提现人</label>
  <div class="col-sm-10">
    <div class="col-sm-12" style="padding: 0px;">
      <select class="col-sm-6" name="bd_id" id="username">

        <option value="0" id="select_people" name="user_id">添加酒店</option>
        <?php  if(is_array($user)) { foreach($user as $key => $item3) { ?>
        <?php  if($item3['id']==$list['bd_id']) { ?>
        <option value="<?php  echo $item3['id'];?>" selected="selected" name="unopction"><?php  echo $item3['name'];?></option>
        <?php  } else { ?>
        <option value="<?php  echo $item3['id'];?>" ><?php  echo $item3['name'];?></option>
        <?php  } ?>
        
        <?php  } } ?>
      </select>
      <span class="btn btn-sm storeblue" data-toggle="modal" data-target="#myModal1" style="margin-left: 30px;">搜索管理员</span>
      <div class="col-sm-9">
        <div class="help-block">
          * 用于商户微信提现时直接打款到绑定人的微信钱包，微信支付需开通企业付款到零钱功能
        </div>
      </div>
    </div>                    
  </div>
  <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h5 class="modal-title" id="myModalLabel" style="font-size: 16px;">提示</h5>
        </div>
        <div class="modal-body ygsearch" style="font-size: 20px;padding: 15px 30px;">
          <input type="text" id="ygsinput" placeholder="请输入openid">
          <span class="btn btn-sm storeblue ygbtn">搜索</span>
          <div class="searchname" style="margin-top: 8px;"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
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
<script type="text/javascript">
    $(function(){
        // $("#frame-0").addClass("in");
        $("#frame-14").show();
        $("#yframe-14").addClass("wyactive");
        $(".ygbtn").on("click",function(){
            var ygsinput = $("#ygsinput").val();
            console.log(ygsinput)
            if(ygsinput.length==''){
              $(".searchname").html('');
            }else{
              $(".searchname").html('')  
              var keywords = $("#ygsinput").val()
              $.ajax({
                  type:"post",
                  url:"<?php  echo $_W['siteroot'];?>/app/index.php?i=<?php  echo $_W['uniacid'];?>&c=entry&do=SelectUser&m=zh_jdgjb",
                  dataType:"text",
                  data:{keywords:keywords},
                  success:function(data){                    
                      var data = eval('(' + data + ')')
                      console.log(data);
                      $(".searchname").show();
                      for(var i=0;i<data.length;i++){
                        $(".searchname").append('<div class="shnbox" data-dismiss="modal" id="'+data[i].id+'"><a href="javascript:void(0);"><p>'+data[i].name+'</p></a></div>')
                      }
                      $(".shnbox").each(function(){
                        $(this).click(function(){
                            var thid = $(this).text()
                            // 获取选中的用户name
                            var user_id = $(this).attr("id")
                            // 根据选中的用户新增一个option
                            $("#username").append("<option value='"+user_id+"'>"+thid+"</option>").attr("selected", true);
                            // 点击之后让value等于user_id的options显示
                            $("#username").val(user_id);
                        })
                        
                      })
                      
                  }
              }) 
            }
            
        })
        
    })
</script>