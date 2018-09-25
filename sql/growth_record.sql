/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-09-24 14:24:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for growth_record
-- ----------------------------
DROP TABLE IF EXISTS `growth_record`;
CREATE TABLE `growth_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text CHARACTER SET utf8,
  `picture_urls` text CHARACTER SET utf8,
  `author_id` int(11) NOT NULL,
  `author_type` int(2) NOT NULL DEFAULT '1' COMMENT '1:teacher,2:parent',
  `student_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `record_type` int(2) NOT NULL DEFAULT '1' COMMENT '1: text, 2: append',
  `parent_record_id` int(32) NOT NULL DEFAULT '0',
  `org_author_id` int(11) DEFAULT NULL,
  `org_author_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=latin1;
DROP TRIGGER IF EXISTS `tri_growth_record_insert`;
DELIMITER ;;
CREATE TRIGGER `tri_growth_record_insert` AFTER INSERT ON `growth_record` FOR EACH ROW insert into new_message (record_id, author_id, author_type, msg_type, parent_record_id, org_author_id, org_author_type)VALUES(NEW.id, NEW.author_id, NEW.author_type, 1, NEW.parent_record_id,  NEW.org_author_id, NEW.org_author_type)
;;
DELIMITER ;
