<?php
/**
 * [WeEngine System] Copyright (c) 2014 WE7.CC
 * WeEngine is NOT a free software, it under the license terms, visited http://www.maomikj.cn/ for more details.
 */

defined('IN_IA') or exit('Access Denied');

class UsersprofileTable extends We7Table {
	protected $tableName = 'users_profile';
	protected $primaryKey = 'id';

	protected $field = array('send_expire_status');

}