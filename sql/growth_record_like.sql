/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-09-24 14:24:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for growth_record_like
-- ----------------------------
DROP TABLE IF EXISTS `growth_record_like`;
CREATE TABLE `growth_record_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `author_type` int(2) DEFAULT NULL,
  `parent_record_id` int(11) DEFAULT NULL,
  `org_author_id` int(11) DEFAULT NULL,
  `org_author_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_rid_utype` (`record_id`,`author_id`,`author_type`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=latin1;
DROP TRIGGER IF EXISTS `tri_like`;
DELIMITER ;;
CREATE TRIGGER `tri_like` AFTER INSERT ON `growth_record_like` FOR EACH ROW insert into new_message (record_id, author_id, author_type, msg_type, parent_record_id, org_author_id, org_author_type)VALUES(NEW.record_id, NEW.author_id, NEW.author_type, 2, NEW.parent_record_id, NEW.org_author_id, NEW.org_author_type)
;;
DELIMITER ;
