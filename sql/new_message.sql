/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-09-24 14:24:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for new_message
-- ----------------------------
DROP TABLE IF EXISTS `new_message`;
CREATE TABLE `new_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `author_type` int(2) DEFAULT '1' COMMENT '1:teacher, 2:parent',
  `msg_type` int(2) DEFAULT NULL COMMENT '1:text, 2:like',
  `parent_record_id` int(11) DEFAULT NULL,
  `org_author_id` int(11) DEFAULT NULL,
  `org_author_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=latin1;
