<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>

<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<style>
		.storespans{
			padding:3px 15px;
			color: #44ABF7;
			border-radius:5px;
			border:1px solid #44ABF7;
		}
		.storespans:hover{
			background: #44ABF7;
			color: #fff;
		}
</style>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">

<ul class="nav nav-tabs">
	<span class="ygxian"></span>
	<div class="ygdangq">当前位置:</div>
	<?php  if($_W['role']=='operator') { ?>
	<li class="active"><a href="<?php  echo $this->createWebUrl('hotel')?>">酒店管理</a></li>
	<?php  } else { ?>
	<li class="active"><a href="<?php  echo $this->createWebUrl('hotel');?>">酒店管理</a></li>
	<li ><a href="<?php  echo $this->createWebUrl('addhotel');?>">添加酒店</a></li>
	<?php  } ?>
</ul>
<div class="row ygrow">
	<div class="col-lg-12">
		<form action="" method="get" class="col-md-6">
			<input type="hidden" name="c" value="site" />
			<input type="hidden" name="a" value="entry" />
			<input type="hidden" name="m" value="zh_jdgjb" />
			<input type="hidden" name="do" value="hotel" />
			<div class="input-group" style="width: 300px">
				<input type="text" name="keywords" class="form-control"  value="<?php  echo $_GPC['keywords'];?>" placeholder="请输入酒店名称">
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
			酒店列表
		</div>
		<div class="panel-body" style="padding: 0px 15px;">
			<div class="row">
				<table class="yg5_tabel col-md-12">
					<!-- tabel标题开始 -->
					<tr class="yg5_tr1">
						<td class="store_td1">排序</td>
						<td class="store_td1">酒店id</td>
						<td class="store_td1">酒店名称</td>
						<td>图片</td>
						<td style="width: 200px;">地址</td>
						<td>酒店电话</td>
						<td>联系人</td>
						<td>联系手机</td>
						<td>入驻时间</td>

						<!--   <td>房型添加</td> -->
						<td style="width: 170px;">操作</td>
						<td style="width: 170px;">酒店管理入口</td>
					</tr>
					<!-- tabel标题结束 -->
					<?php  if(is_array($list)) { foreach($list as $key => $item) { ?>
					<tr class="yg5_tr2">
						<td><?php  echo $item['scort'];?></td>
						<td><?php  echo $item['id'];?></td>
						<td class="store_td1"> <?php  echo $item['name'];?></td>
						<td>
							<img class="store_list_img" src="<?php  echo tomedia($item['ewm_logo'])?>">
						</td>
						<td><?php  echo $item['address'];?></td>
						<td><?php  echo $item['tel'];?></td>
						<td><?php  echo $item['link_name'];?></td>
						<td><?php  echo $item['link_tel'];?></td>
						<td><?php  echo date('Y-m-d H:i:s',$item['time'])?></td>
						<td>
							
							<a href="<?php  echo $this->createWebUrl('addhotel', array('id' => $item['id']))?>" class="storespan btn btn-xs">
								<span class="fa fa-pencil"></span>
								<span class="bianji">编辑
									<span class="arrowdown"></span>
								</span>                            
							</a>
							<a class="storespan btn btn-xs" href="<?php  echo $this->createWebUrl('hotel', array('id' => $item['id'],'op'=>'delete'))?>" onclick="return confirm('确认删除吗？');return false;">
								<span class="fa fa-trash-o"></span>
								<span class="bianji">删除
									<span class="arrowdown"></span>
								</span>
							</a>
						</td>
						<td>
							<a href="<?php  echo $this->createWebUrl('statistics',array('id'=>$item['id']))?>" class="storespans btn btn-xs">
							<!-- 	<span class="fa fa-database"></span>
								<span class="bianji">管理
									<span class="arrowdown"></span>
								</span>    -->
								管理                         
							</a>
						</td>
					</tr>
					<?php  } } ?>
					<?php  if(empty($list)) { ?>
					<tr class="yg5_tr2">
						<td colspan="9">
							暂无商家信息
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