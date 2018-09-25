/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-09-24 14:25:05
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
