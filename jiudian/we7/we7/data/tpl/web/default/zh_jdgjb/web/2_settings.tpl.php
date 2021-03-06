<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
	.yginp{width: 40%;}
	.ygspan{line-height: 35px;margin-left: 10px;}
	.select_con{
		display: none;
	}
</style>
<ul class="nav nav-tabs">    
	<span class="ygxian"></span>
	<div class="ygdangq">当前位置:</div>
	<li class="active"><a href="javascript:void(0);">基本信息</a></li>
</ul>
<div class="main">
	<form action="" method="post" class="form-horizontal form" enctype="multipart/form-data">
		<!--<input type="hidden" name="parentid" value="<?php  echo $parent['id'];?>" />-->
		<div class="panel panel-default ygdefault">
			<div class="panel-heading wyheader">
				基本信息
			</div>
			<div class="panel-body">

				<div class="panel-body">

					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">平台名称</label>
						<div class="col-sm-9">
							<input type="text" name="pt_name" class="form-control" value="<?php  echo $item['pt_name'];?>" />
						</div>
					</div>  
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">平台电话</label>
						<div class="col-sm-9">
							<input type="text" name="tel"  class="form-control" value="<?php  echo $item['tel'];?>" />
						</div>
					</div> 
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">自定义酒店类型</label>
						<div class="col-sm-9">
							<input type="text" name="jd_custom"  class="form-control" value="<?php  echo $item['jd_custom'];?>" />
						</div>
					</div> 
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">小程序风格颜色</label>
						<div class="col-sm-9">
							<?php  echo tpl_form_field_color('color', $item['color'])?> 
							<span class="help-block">*不填写会默认选中蓝色</span>
						</div>
					</div>        
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">商家入驻</label>
						<div class="col-sm-9">
							<label class="radio-inline">
								<input type="radio" name="is_sjrz" value="1" <?php  if($item['is_sjrz']==1 ) { ?>checked<?php  } ?> />关闭
							</label>
							<label class="radio-inline">
								<input type="radio" name="is_sjrz" value="2" <?php  if($item['is_sjrz']==2 || empty($item['is_sjrz'])) { ?>checked<?php  } ?> />开启
							</label>
							<span class="help-block">*控制商家入驻在个人中心的显示与隐藏</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">会员功能</label>
						<div class="col-sm-9">
							<label class="radio-inline">
								<input type="radio" name="open_member" value="1" <?php  if($item['open_member']==1 ) { ?>checked<?php  } ?> />开启
							</label>
							<label class="radio-inline">
								<input type="radio" name="open_member" value="2" <?php  if($item['open_member']==2 || empty($item['open_member'])) { ?>checked<?php  } ?> />关闭
							</label>
							<span class="help-block">*控制会员功能在个人中心的显示与隐藏</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">积分商城</label>
						<div class="col-sm-9">
							<label class="radio-inline">
								<input type="radio" name="is_score" value="1" <?php  if($item['is_score']==1 ) { ?>checked<?php  } ?> />开启
							</label>
							<label class="radio-inline">
								<input type="radio" name="is_score" value="2" <?php  if($item['is_score']==2 || empty($item['is_score'])) { ?>checked<?php  } ?> />关闭
							</label>
							<span class="help-block">*控制积分商城在个人中心的显示与隐藏</span>
						</div>
					</div>

					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">身份证验证</label>
						<div class="col-sm-9">
							<label class="radio-inline">
								<input type="radio" name="is_sfz" value="1" <?php  if($item['is_sfz']==1 ) { ?>checked<?php  } ?> />开启
							</label>
							<label class="radio-inline">
								<input type="radio" name="is_sfz" value="2" <?php  if($item['is_sfz']==2 || empty($item['is_sfz'])) { ?>checked<?php  } ?> />关闭
							</label>
							<span class="help-block">*控制提交订单时是否需要填写身份证号码</span>
						</div>
					</div>

					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">确认订单</label>
						<div class="col-sm-9">
							<label class="radio-inline">
								<input type="radio" name="is_order" value="1" <?php  if($item['is_order']==1 ) { ?>checked<?php  } ?> />开启
							</label>
							<label class="radio-inline">
								<input type="radio" name="is_order" value="2" <?php  if($item['is_order']==2 || empty($item['is_order'])) { ?>checked<?php  } ?> />关闭
							</label>
							<span class="help-block">*用户下单之后是否需要确认订单？关闭则直接是待入住状态</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-xs-12 col-sm-3 col-md-2 control-label">平台类型</label>
						<div class="col-sm-9">
							<select class="col-sm-5 js_select" name='type'>
								<?php  if($item['type']==2) { ?>
								<option value='2' selected="selected">酒店多店版</option>
								<option value='1' name='dan'>酒店单店版</option>
								<?php  } else if($item['type']==1) { ?>
								<option value='2' >酒店多店版</option>
								<option value='1' selected="selected" name='dan'>酒店单店版</option>
								<?php  } else { ?>
								<option value='2' selected="selected">酒店多店版</option>
								<option value='1' name='dan'>酒店单店版</option>
								<?php  } ?>
							</select>
						</div>
					</div>                

					<div class="form-group select_con">

						<label for="inputEmail3" class="col-sm-2 control-label">选择默认酒店(单店版时选择)</label>
						<div class="col-sm-10">
							<select name="seller_id" class="form-control" id="groupid">

								<option value="0">请选择所属酒店</option>

								<?php  if(is_array($stores)) { foreach($stores as $row) { ?>

								<option value="<?php  echo $row['id'];?>" <?php  if($item['seller_id']==$row['id'] || $storeid==$row['id']) { ?>selected<?php  } ?>><?php  echo $row['name'];?></option>

								<?php  } } ?>

							</select>
							设置为单店时请选择默认酒店
						</div>
					</div>
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">首页默认背景图片</label>
						<div class="col-sm-10">
							<?php  echo tpl_form_field_image('bj_logo',$item['bj_logo']);?> 
							<span class="help-block ">*建议图片宽高为375px*250px</span>
						</div>
					</div>
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">会员注册背景图片</label>
						<div class="col-sm-10">
							<?php  echo tpl_form_field_image('hy_img',$item['hy_img']);?> 
							<span class="help-block ">*建议图片宽高为375px*667px</span>
						</div>
					</div>
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">平台积分规则</label>
						<div class="col-sm-10">
							<?php  echo tpl_ueditor('jf_rule',$item['jf_rule']);?>
						</div>
					</div>
					<div class="form-group">
						<label for="inputEmail3" class="col-sm-2 control-label">平台会员规则</label>
						<div class="col-sm-10">
							<?php  echo tpl_ueditor('hy_rule',$item['hy_rule']);?>
						</div>
					</div>
					<div class="form-group">
						<input type="submit" name="submit" value="提交" class="btn col-lg-3" style="color: white;background-color: #44ABF7;"/>
						<input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
						<input type="hidden" name="id" value="<?php  echo $item['id'];?>" />
					</div>               
				</div>
			</div>
		</form>
	</div>
	<script type="text/javascript">
		$(function(){
			$("#frame-5").show();
			$("#yframe-5").addClass("wyactive");

			/**/
			$(".js_select").change(function(){
				var opt=$(".js_select").val();
				console.log(opt)
				if(opt==1){
					$(".select_con").show()
				}else{
					$(".select_con").hide()
				}
			});


		})
	</script>