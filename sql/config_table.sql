/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-10-15 20:58:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for config_table
-- ----------------------------
DROP TABLE IF EXISTS `config_table`;
CREATE TABLE `config_table` (
  `config_key` varchar(255) DEFAULT NULL,
  `config_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of config_table
-- ----------------------------
INSERT INTO `config_table` VALUES ('app_t_sec', 'eac688a46b0f56b4167f0fd71771fc67');
INSERT INTO `config_table` VALUES ('app_p_sec', '285ffafb6f37b788ce240984e8e28eee');
