<?php
/**
 * 志汇酒店营销版模块定义
 *本源码由QQ614096466 猫咪科技独家提供
 * @author 武汉志汇科技
 * @url http://bbs.we7.cc/
 */
defined('IN_IA') or exit('Access Denied');

class Zh_jdgjbModule extends WeModule {

	public function welcomeDisplay()

    {   
    	global $_GPC, $_W;

        $url = $this->createWebUrl('ptdata');
        if ($_W['role'] == 'operator') {
        	$url = $this->createWebUrl('hotel');
        }

        Header("Location: " . $url);

    }

}