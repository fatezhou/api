<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
    .yginp{width: 50%;}
    .ygspan{line-height: 35px;margin-left: 10px;}
</style>
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li ><a href="<?php  echo $this->createWebUrl('room',array('type'=>all));?>">房型管理</a></li>
    <li class="active"><a href="<?php  echo $this->createWebUrl('addroom',array('type'=>all));?>">添加房型</a></li>
</ul>
<div class="main ygmain">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
        <!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                内容编辑
            </div>
            <div class="panel-body">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">排序</label>
                <div class="col-sm-10">
                  <input type="number" name="sort" value="<?php  echo $list['sort'];?>" class="form-control" id="inputEmail3" placeholder="请填写排序序号">
                </div>
              </div>
              <div class="form-group">
              <label class="col-xs-12 col-sm-3 col-md-2 control-label">房间类别</label>
               <div class="col-sm-9">
                 <label class="radio-inline">
                   <input type="radio" name="classify" value="1" <?php  if($list['classify']==1 || empty($list['classify'])) { ?>checked<?php  } ?> />普通房
                 </label>
                 <label class="radio-inline">
                   <input class="js_only" type="radio" name="classify" value="2" <?php  if($list['classify']==2 ) { ?>checked<?php  } ?> />钟点房

                 </label>

               </div>

             </div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">房型</label>
					<div class="col-sm-10">
						<input type="text"  name="name" value="<?php  echo $list['name'];?>" class="form-control" id="inputEmail3" placeholder="请填写房型">
					</div>            
				</div>
				<div class="form-group js_tyle" style="display: none">
					<label for="inputEmail3" class="col-sm-2 control-label">入住时长</label>
					<div class="col-md-10">
						<input type="text" onkeyup="value=value.replace(/[^\d.]/g,'')"  name="rz_time"  value="<?php  echo $list['rz_time'];?>" class="col-md-5" id="inputEmail3" placeholder="请填写入住时间" style="height: 34px;border: 1px solid #e7e7eb;">
						<span class="" style="border-color: #e7e7eb;border-radius: 0;padding: 8px 10px;color: #98999a;background: #e7e7eb;float: left;">小时</span>
					</div>            
				</div>				
<!-- 				<div class="form-group" style="margin-top: 20px;">
					<label for="inputEmail3" class="col-sm-2 control-label">房型</label>
				<div class="col-sm-8">
				  <input type="text"  name="name" value="<?php  echo $list['name'];?>" class="form-control col-sm-5" id="inputEmail3" placeholder="请填写房型">
				  <span class=" col-sm-1">小时</span>
				</div>  -->           
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">房型大图</label>
					<div class="col-sm-10">
					    <?php  echo tpl_form_field_image('logo',$list['logo']);?> 
					</div>
				</div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">房型数量</label>
            <div class="col-sm-10">
              <input type="text"  name="total_num" value="<?php  echo $list['total_num'];?>" class="form-control" id="inputEmail3" placeholder="请填写房型数量">
          </div>
      </div>
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">房间价格</label>
        <div class="col-sm-10">
          <input type="text"  name="price" value="<?php  echo $list['price'];?>" class="form-control" id="inputEmail3" placeholder="请填写房间价格">
      </div>
  </div>
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">楼层</label>
    <div class="col-sm-10">
      <input type="text" name="floor" value="<?php  echo $list['floor'];?>" class="form-control" id="inputEmail3" placeholder="请填写楼层,如'3-15层'">
  </div>
</div>
<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">可住人数</label>
    <div class="col-sm-10">
      <input type="text"  name="people" value="<?php  echo $list['people'];?>" class="form-control" id="inputEmail3" placeholder="请填写可住人数">
  </div>
</div>
<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">床型尺寸</label>
    <div class="col-sm-10">
      <input type="text" name="size" value="<?php  echo $list['size'];?>" class="form-control" id="inputEmail3" placeholder="请填写尺寸,如1.8*2.0">
  </div>
</div>
<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">房间设施</label>
    <div class="col-sm-10">
        <input type="text"  name="facilities" value="<?php  echo $list['facilities'];?>" class="form-control" id="inputEmail3" placeholder="请填写房间设施">
    </div>
</div>
<div class="form-group">
    <label for="lastname" class="col-sm-2 control-label">房间其他信息</label>
    <div class="col-sm-10">
        <label class="checkbox-inline">
         <?php  if($list['breakfast']==1) { ?>  
         <input type="checkbox" name="breakfast" id="optionsRadios3" value="1" checked> 早餐
         <?php  } else { ?>
         <input type="checkbox" name="breakfast" id="optionsRadios3" value="1" > 早餐
         <?php  } ?>
     </label>
     <label class="checkbox-inline">
       <?php  if($list['bed']==1) { ?>  
       <input type="checkbox" name="bed" id="optionsRadios4"  value="1" checked> 加床
       <?php  } else { ?>
       <input type="checkbox" name="bed" id="optionsRadios4"  value="1"> 加床
       <?php  } ?>
   </label>
   <label class="checkbox-inline">
    <?php  if($list['windows']==1) { ?>  
    <input type="checkbox" name="windows" id="optionsRadios4"  value="1" checked> 窗户
    <?php  } else { ?>
    <input type="checkbox" name="windows" id="optionsRadios4"  value="1" > 窗户
    <?php  } ?>
</label>
</div>
</div>
<div class="form-group">
  <label for="inputEmail3" class="col-sm-2 control-label">押金金额</label>
  <div class="col-sm-10">
  <input type="text"  name="yj_cost" value="<?php  echo $list['yj_cost'];?>" class="form-control" id="inputEmail3" placeholder="请填写押金金额">
  不填写默认没有押金金额
  </div>
</div>
<!--    <div class="form-group">

                <label for="inputEmail3" class="col-sm-2 control-label">押金类型</label>
                <div class="col-sm-10">
                    <select class="form-control" name="yj_state">
                        <?php  if($list['yj_state']==1) { ?>
                        <option value="1" selected="selected">在线付押金</option>
                        <option value="2">到店付押金</option>
                          <option value="3">在线+到店</option>
                        <?php  } else if($list['yj_state']==2) { ?>
                        <option value="1">在线付押金</option>
                        <option value="2" selected="selected">到店付押金</option>
                         <option value="3">在线+到店</option>
                         <?php  } else if($list['yj_state']==3) { ?>
                          <option value="1">在线付押金</option>
                        <option value="2" >到店付押金</option>
                         <option value="3" selected="selected">在线+到店</option>
                        <?php  } else { ?>
                        <option value="1">在线付押金</option>
                        <option value="2">到店付押金</option>
                         <option value="3">在线+到店</option>
                        <?php  } ?>
                    </select>
                </div>
            </div>
            <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">押金金额</label>
                        <div class="col-sm-10">
                            <input type="text"  name="szyj_cost" value="<?php  echo $list['szyj_cost'];?>" class="form-control" id="inputEmail3" placeholder="请填写押金金额">
                        </div>
                    </div>
                    <div class="form-group">
                     <label class="col-xs-12 col-sm-3 col-md-2 control-label">押金是否可退</label>
                     <div class="col-sm-9">
                       <label class="radio-inline">
                         <input type="radio" name="is_refund" value="1" <?php  if($list['is_refund']==1 || empty($list['is_refund'])) { ?>checked<?php  } ?> />不能
                       </label>
                       <label class="radio-inline">
                         <input type="radio" name="is_refund" value="2" <?php  if($list['is_refund']==2) { ?>checked<?php  } ?> />可以
                         &nbsp;(开启押金后才可生效)
                       </label>

                     </div>
                   </div>  -->

<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">房间图片</label>
    <div class="col-sm-10">
        <?php  echo tpl_form_field_multi_image('img',$img);?>
    </div>

</div>
      <div class="form-group">
       <label class="col-xs-12 col-sm-3 col-md-2 control-label">房间状态</label>
       <div class="col-sm-9">
         <label class="radio-inline">
           <input type="radio" name="state" value="1" <?php  if($list['state']==1 ) { ?>checked<?php  } ?> />上架
         </label>
         <label class="radio-inline">
         <input type="radio" name="state" value="2" <?php  if($list['state']==2 || empty($list['state'])) { ?>checked<?php  } ?> />下架
         </label>
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
        $("#frame-8").show();
        $("#yframe-8").addClass("wyactive");
        var status=$(".js_only").is(":checked")
        console.log(status)
        if(status==true){
          $(".js_tyle").show()
        }

        $("input[name='classify']").click(function(){
        	//console.log($(this).val())
        	var con=$(this).val()
        	if(con=="1"){
        		$(".js_tyle").hide()
        	}else{
        		$(".js_tyle").show()
        	}
        })
    })
</script>