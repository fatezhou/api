<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcss.css">
<style type="text/css">
    input[type="radio"] + label::before {
        content: "\a0"; /*不换行空格*/
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        width: 1em;
        height: 1em;
        margin-right: .4em;
        border-radius: 50%;
        border: 2px solid #ddd;
        text-indent: .15em;
        line-height: 1; 
    }
    input[type="radio"]:checked + label::before {
        background-color: #44ABF7;
        background-clip: content-box;
        padding: .1em;
        border: 2px solid #44ABF7;
    }
    input[type="radio"] {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>
<ul class="nav nav-tabs">
    <span class="ygxian"></span>
    <div class="ygdangq">当前位置:</div>
    <li class="active"><a href="<?php  echo $this->createWebUrl('notice')?>">消息设置</a></li>
</ul>
<div class="main">
    <form action="" method="post" class="form-horizontal form" enctype="multipart/form-data" id="invitative">
        <div class="panel panel-default ygdefault">
            <div class="panel-heading wyheader">
                消息设置(聚合短息服务)
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">接收人手机号</label>
                    <div class="col-sm-9">
                        <input type="text" name="js_tel" value="<?php  echo $item['js_tel'];?>" id="web_name" class="form-control" placeholder="请输入接收人手机号" />
                    </div>
                </div>
                 <div class="form-group">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">应用key</label>
                    <div class="col-sm-9">
                        <input type="text" name="appkey" value="<?php  echo $item['appkey'];?>" id="web_name" class="form-control" placeholder="请输入应用key" />
                    </div>
                </div> 
      
                <div class="form-group ygyi2">
                    <label class="col-xs-12 col-sm-3 col-md-2 control-label">模板ID</label>
                    <div class="col-sm-9">
                        <input type="text" name="tpl_id" value="<?php  echo $item['tpl_id'];?>" id="web_name" class="form-control" placeholder="请输入模板id" />
                    </div>
                </div>
              
            </div>
        </div>
        
        <div class="form-group">
            <input type="submit" name="submit" value="保存设置" class="btn col-lg-3" style="color: white;background-color: #44ABF7;" />
            <input type="hidden" name="token" value="<?php  echo $_W['token'];?>" />
            <input type="hidden" name="id" value="<?php  echo $item['id'];?>" />
        </div>
    </form>
</div>
<!-- <?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('common/footer', TEMPLATE_INCLUDEPATH)) : (include template('common/footer', TEMPLATE_INCLUDEPATH));?> -->
<script type="text/javascript">
  $(function(){

    //$("select#ygadd").change(function(){
        // console.log($(this).val())
        // var ygtype = $(this).val()
        // if(ygtype==1){
        //     $(".ygyi").css({"display":"none"})
        // }else if(ygtype==2){
        //     $(".ygyi").css({"display":"block"})
        // }
    //})
    "<?php  if($item) { ?>"
        "<?php  if($item['type']=='1') { ?>"
            $('.ygyi').hide();
            $('.ygyi3').hide();
        "<?php  } ?>"
        "<?php  if($item['type']=='2') { ?>"
            $('.ygyi2').hide();
            $('.ygyi3').hide();
        "<?php  } ?>"
        "<?php  if($item['type']=='3') { ?>"
            $('.ygyi').hide();
            $('.ygyi2').hide();
        "<?php  } ?>"            
    "<?php  } else { ?>"
        $('.ygyi').hide();
        $('.ygyi3').hide();
    "<?php  } ?>"
    $('#type').change(function(){
        $('.ygyi').show();
        $('.ygyi2').show();
        $('.ygyi3').show();
        if($(this).val() == '1') {
            $('.ygyi').hide();
            $('.ygyi3').hide();
        }
        if($(this).val() == '2') {
            $('.ygyi2').hide();
            $('.ygyi3').hide();
        }
        if($(this).val() == '3') {
            $('.ygyi').hide();
            $('.ygyi2').hide();
        }
    });
    // $("#frame-7").addClass("in");
    $("#frame-4").show();
    $("#yframe-4").addClass("wyactive");
});
</script>
