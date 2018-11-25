<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<link rel="stylesheet" type="text/css" href="../addons/zh_jdgjb/template/public/ygcsslist.css">
<ul class="nav nav-tabs">    
    <li class="active"><a href="javascript:void(0);">房量维护</a></li>
</ul>
<div style="flex:1;padding:30px;">
<div class="main" style="margin-top: 0px;">

    <div class="main" style="margin-top: 0px;">
        <div class="panel panel-default">
            <div class="panel-heading">
                维护房量 (单击修改房间数量，按回车键确认,只能维护28天内的信息)
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <div class="col-sm-9 col-xs-12">
                        <?php  echo tpl_form_field_daterange('datelimit',array('starttime'=>date('Y-m-d', $startime),'endtime'=>date('Y-m-d', $endtime)))?>
                        <input class="" id="search_button" type="button" value="" style="opacity: 0;" />
                </div>
            </div>
        </div>
        
           
            <div class="panel-body table-responsive">
                <div class="sub-content" id="d_list"></div>
            </div>
     
    </div>
    </div>
    <input type="hidden" id="hotelid" value="<?php  echo $hotel_id;?>" />
    <script type="text/javascript">
        $(function () {
             $("#frame-17").show();
    $("#yframe-17").addClass("wyactive");
            // $("#nav13").addClass("in");
            var next_page = 0;
            window.get_list  = function(start, end, page) {
                $("#d_list").html("正在加载...");
                $.post("<?php  echo url('site/entry/number',array('m'=>'zh_jdgjb'));?>", {ac: 'getDate',  page: page, start: start, end: end}, function (data) {
                    data = eval("(" + data + ")");
                    if (data.result == 1) {
                        $("#d_list").html(data.code);
                        window.bindEvents();
                    }
                });
            }
            //上10天价格
            window.prePage = function(){
                var start = $(":hidden[name='datelimit[start]']").val();
                var end = $(":hidden[name='datelimit[end]']").val();
                window.get_list(start, end, parseInt($("#page").val())-1);
            }
            //后10天价格
            window.nextPage = function(){
                var start = $(":hidden[name='datelimit[start]']").val();
                var end = $(":hidden[name='datelimit[end]']").val();
                window.get_list(start, end, parseInt($("#page").val())+1);
            }
            //绑定修改价格事件
            window.bindEvents = function(){
                $(".price_input").unbind("keydown");
                $(".price_span").click(function(){
                    $(".price_editspan").addClass('hide');

                    $(".price_span").removeClass('hide');
                    var obj =$(this);
                    obj.addClass('hide');
                    obj.parent().find(".price_editspan").removeClass('hide');
                    obj.next().find(".price_input").unbind("keydown");
                    obj.next().find(".price_input").val($.trim(obj.html())).select().keydown(function(event){
                        if(event.keyCode==13){
                            window.submitPrice( $(this) );
                        }
                    }).blur(function(){
                        $(this).parent().parent().find(".price_span").removeClass('hide');
                        $(this).parent().addClass('hide');
                    });
                
                });
            }
            window.submitPrice = function(input){
                var pid = input.attr("pid");
                var dateday = input.attr("dateday");
                var rid = input.attr("rid");
                var price = $.trim( input.val() );
               if(isNaN(price)){
                     util.message('请输入数字类型','','error');
                     
                      return;
                    }
                
                input.parent().parent().find(".price_span").html( price ).removeClass('hide');
                input.parent().addClass('hide');
                $.post("<?php  echo url('site/entry/editnumber',array('m'=>'zh_jdgjb'));?>",
                        {ac: 'submitPrice',pid:pid,nums:price,dateday:dateday,rid:rid}, function (data) {
                            data = eval("(" + data + ")");
                            if (data.result == 1) {
                            }
                        });
            }
            $("#search_button").click(function () {
                var start = $(":hidden[name='datelimit[start]']").val();
                var end = $(":hidden[name='datelimit[end]']").val();
                window.get_list(start, end, 1);
            });
            $("#search_button").click();
        });
        
        
    </script>



