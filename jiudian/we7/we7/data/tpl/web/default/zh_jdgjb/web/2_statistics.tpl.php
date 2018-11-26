<?php defined('IN_IA') or exit('Access Denied');?><?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/header', TEMPLATE_INCLUDEPATH)) : (include template('public/header', TEMPLATE_INCLUDEPATH));?>
<?php (!empty($this) && $this instanceof WeModuleSite || 1) ? (include $this->template('public/comhead', TEMPLATE_INCLUDEPATH)) : (include template('public/comhead', TEMPLATE_INCLUDEPATH));?>
<style type="text/css">
    .yg9_content{padding:0px;}
    .yg9_content>li>.col-md-12{
        height: 130px;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
        border-radius: 6px;
        overflow: hidden;
    }    
    .yg9_content>li:nth-child(1)>.col-md-12{
        background-color: #32CC7F;
        color: white;
        /*background:url(../addons/zh_jdgjb/template/images/tuceng4.png) no-repeat center;
        background-size: 100%;*/
    }
    .yg9_content>li:nth-child(2)>.col-md-12{
        background-color: #f17c67;
        color: white;
    }
    .yg9_content>li:nth-child(3)>.col-md-12{
        background-color: #99CC33;
        color: white;
    }
    .yg9_content>li:nth-child(4)>.col-md-12{
        background-color: #6C6FBF;
        color: #fff;
    }
    .tmoney{font-size: 26px;margin-top: 30px;text-align: center;}
    .today{font-size: 14px;text-align: center;}
    .vipbanner{padding:0px;}
    .vipbox{
        background-color: white;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
        border-radius: 6px;
        overflow: hidden;
    }
    .vipbig1{padding-left: 0px;} 
    .vipbig2{padding-right: 0px;}
    .vipcontent{
        border-bottom: 1px solid #E4EAEC;
        height: 60px;
        line-height: 60px;
        padding:0px;
    }  
    .vipright{float: right;}
    .vipleft{float: left;}
    .vipleft>img{
        width: 20px;
        height: 20px;
    }
    .vipadd{
        height: 210px;
        text-align: center;
    }
    .vipadd>li{
        padding-top: 50px;
    }
    .font1{font-size: 30px;color: #333;}
    .font2{font-size: 15px;color: #666;margin-top: 15px;}
    .vipsell{padding:0px;}
    .vipsell>li:nth-child(1){padding-left: 0px;}
    .vipsell>li:nth-child(2){padding-right: 0px;}
    .vipsell{
        height: 210px;
        padding: 25px 0px;
    }
    .vipsell>li{height: 100%;}
    .vipsell>li>div{
        background-color: #F7F7F7;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .xuni{color: #666;text-align: center;}
    .xuni>span{color: #ff6363;}
    .viptitle{
        color: #333;
        border-bottom:1px solid #DEDEDE;
        padding-bottom: 15px;
        margin-bottom: 20px;
        text-align: center;
        width: 50%;
        font-size: 16px;
    }
    .botul{
        display: flex;
    }
    .botul>li{
        width: 13%;
        margin-right: 1.5%;
        height: 220px;
        background-color: white;
        padding: 50px 0px;
    }
    .botul>li:last-child{
        margin-right:0px;
        box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
    }
    .boxcon{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .boxcon>img{
        margin-bottom: 10px;
        width: 55px;
        height: 55px;
    }
    .bfont1{
        color: #666;
        font-size: 15px;
        margin-bottom: 5px;
    }
    .bfont2{
        color: #ED5D5D;
        font-size: 20px;
    }
    .backimg{
        width: 71px;
        height: 74px;
        margin-top: 30px;
    }
</style>
<div class="main">
    <div class="panel panel-default">
        <div class="panel-heading">数据概况信息</div>
            <div class="panel-body">        
            <ul class="col-md-12 yg9_content" style="margin-bottom: 10px;">
                <li class="col-md-3">
                    <div class="col-md-12">
                        <div class="col-md-6">
                            <img class="backimg" src="../addons/zh_jdgjb/template/images/xinxi1.png">
                        </div>
                        <div class="col-md-6">
                            <p class="tmoney"><?php  echo $jrorder['total'];?></p>
                            <p class="today">今日订单总数</p>
                        </div>
                    </div>
                </li>
                <li class="col-md-3">
                    <div class="col-md-12">
                        <div class="col-md-6">
                            <img class="backimg" src="../addons/zh_jdgjb/template/images/xinxi2.png">
                        </div>
                        <div class="col-md-6">
                            <p class="tmoney"><?php  if($jrmoney) { ?><?php  echo $jrmoney;?><?php  } else { ?> 0.00<?php  } ?>元</p>
                            <p class="today">今日销售额</p>
                        </div>
                    </div>
                </li>
                <li class="col-md-3">
                    <div class="col-md-12">
                        <div class="col-md-6">
                            <img class="backimg" src="../addons/zh_jdgjb/template/images/xinxi3.png">
                        </div>
                        <div class="col-md-6">
                            <p class="tmoney"><?php  if($zrmoney) { ?><?php  echo $zrmoney;?><?php  } else { ?> 0.00<?php  } ?>元</p>
                            <p class="today">昨日销售额</p>
                        </div>
                    </div>
                </li>
                <li class="col-md-3">
                    <div class="col-md-12">
                    <div class="col-md-6">
                            <img class="backimg" src="../addons/zh_jdgjb/template/images/xinxi4.png">
                        </div>
                        <div class="col-md-6">
                            <p class="tmoney"><?php  if($weekmoney) { ?><?php  echo $weekmoney;?><?php  } else { ?> 0.00<?php  } ?>元</p>
                            <p class="today">近7天销售额</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>        
    </div>
 </div>
 <div class="main" style="height: 270px;">
    <div class="col-md-12 vipbanner">
        <div class="col-md-6 vipbig1">
            <div class="col-md-12 vipbox">
                <div class="col-md-12 vipcontent">
                    <div class="vipleft">
                        <img src="../addons/zh_jdgjb/template/images/ygrz.png">
                        <span>订单信息</span>
                    </div>
                    <div class="vipright">(单位：个)</div>
                </div>
                <ul class="col-md-12 vipadd">           
                    <li class="col-md-3">
                     <a href="<?php  echo $this->createWebUrl('inorder',array('type'=>'rz','status'=>5));?>">
                        <p class="font1"><?php  echo $order['yrz'];?></p>
                        <p class="font2">已入住</p>
                        </a>
                    </li>

                    <li class="col-md-3">
                      <a href="<?php  echo $this->createWebUrl('inorder',array('type'=>'complete','status'=>4));?>">
                        <p class="font1"><?php  echo $order['ywc'];?></p>
                        <p class="font2">已完成</p>
                         </a>
                    </li>
                    <li class="col-md-3">
                     <a href="<?php  echo $this->createWebUrl('inorder',array('type'=>'cancel','status'=>3));?>">
                        <p class="font1"><?php  echo $order['yqx'];?></p>
                        <p class="font2">已取消</p>
                         </a>
                    </li>
                    <li class="col-md-3">
                     <a href="<?php  echo $this->createWebUrl('inorder',array('type'=>'completerefund','status'=>7));?>">
                        <p class="font1"><?php  echo $order['ytk'];?></p>
                        <p class="font2">已退款</p>
                         </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-md-6 vipbig2">
            <div class="col-md-12 vipbox">
                <div class="col-md-12 vipcontent">
                    <div class="vipleft">
                        <img src="../addons/zh_jdgjb/template/images/6.png">
                        <span>房间一览</span>
                    </div>
                    <div class="vipright">(单位：间)</div>
                </div>
                <ul class="col-md-12 vipsell">
                    <li class="col-md-6">
                        <div>
                            <div class="viptitle">房间</div>
                            <div class="col-md-12">
                                <div class="col-md-6 xuni">房间总数：<span><?php  echo $total_nums;?></span></div>
                                <div class="col-md-6 xuni">今日入住：<span><?php  echo $rznums['sl'];?></span></div>
                            </div>
                        </div>
                    </li>
                    <!--  <li class="col-md-6">
                        <div>
                            <div class="viptitle">票卷</div>
                            <div class="col-md-12">
                                <div class="col-md-6 xuni">新增：<span><?php  echo $totalorder;?></span></div>
                                <div class="col-md-6 xuni">总数：<span><?php  echo $dfhorder['count'];?></span></div>
                            </div>
                        </div>
                    </li>  -->
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- <div class="main">
    <ul class="botul">
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/7.png">
                <p class="bfont1">活动审核数量</p>
                <p class="bfont2"><?php  echo $tztotal['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/8.png">
                <p class="bfont1">活动数量</p>
                <p class="bfont2"><?php  echo $shtotal['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/9.png">
                <p class="bfont1">主办方数量</p>
                <p class="bfont2"><?php  echo $pctotal['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/10.png">
                <p class="bfont1">认证审核数量</p>
                <p class="bfont2"><?php  echo $hytotal['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/11.png">
                <p class="bfont1">认证数量</p>
                <p class="bfont2"><?php  echo $zxtotal['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/12.png">
                <p class="bfont1">票卷审核数量</p>
                <p class="bfont2"><?php  echo $shpj_num['count'];?></p>
            </div>
        </li>
        <li>
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/13.png">
                <p class="bfont1">票卷数量</p>
                <p class="bfont2"><?php  echo $pj_num['count'];?></p>
            </div>
        </li>
    </ul>
</div> -->
<div class="main">
    <ul class="botul">
   
        <li>
         <a href="<?php  echo $this->createWebUrl('storeinfo');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata2.png">
                <p class="bfont1">门店信息</p>
            </div>
            </a>
        </li>
        
        <li>
        <a href="<?php  echo $this->createWebUrl('room');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata1.png">
                <p class="bfont1">房型管理</p>
            </div>
            </a>
        </li>
        <li>
        <a href="<?php  echo $this->createWebUrl('inorder');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata3.png">
                <p class="bfont1">订单管理</p>
            </div>
            </a>
        </li>
        <li>
         <a href="<?php  echo $this->createWebUrl('number');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata4.png">
                <p class="bfont1">酒店维护</p>
            </div>
            </a>
        </li>
        <li>
        <a href="<?php  echo $this->createWebUrl('incoupon');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata5.png">
                <p class="bfont1">优惠券管理</p>
            </div>
            </a>
        </li>
        <li>
        <a href="<?php  echo $this->createWebUrl('assess');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata6.png">
                <p class="bfont1">评论管理</p>
            </div>
            </a>
        </li>
        <li>
         <a href="<?php  echo $this->createWebUrl('print');?>">
            <div class="boxcon">
                <img src="../addons/zh_jdgjb/template/images/gkdata7.png">
                <p class="bfont1">打印设置</p>
            </div>
            </a>
        </li>
    </ul>
</div>
<script type="text/javascript">
    $(function(){
        $("#frame-14").show();
        $("#yframe-14").addClass("wyactive");
    })
</script>