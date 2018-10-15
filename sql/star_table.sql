/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-10-15 20:59:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for star_table
-- ----------------------------
DROP TABLE IF EXISTS `star_table`;
CREATE TABLE `star_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `utype` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid_uid_utype` (`student_id`,`uid`,`utype`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of star_table
-- ----------------------------
INSERT INTO `star_table` VALUES ('86', '9', '3', '1');
INSERT INTO `star_table` VALUES ('83', '41', '4', '1');
INSERT INTO `star_table` VALUES ('88', '45', '4', '1');
INSERT INTO `star_table` VALUES ('89', '94', '4', '1');
INSERT INTO `star_table` VALUES ('82', '115', '21', '1');
INSERT INTO `star_table` VALUES ('85', '141', '3', '1');
INSERT INTO `star_table` VALUES ('92', '142', '3', '1');
INSERT INTO `star_table` VALUES ('91', '143', '3', '1');
