/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : minidope

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2018-10-15 20:59:04
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
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `family_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid_rid_utype` (`record_id`,`author_id`,`author_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2578 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of growth_record_like
-- ----------------------------
INSERT INTO `growth_record_like` VALUES ('1211', '431', '164', '2', '430', '164', '2', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1243', '435', '1', '2', '433', '1', '2', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1329', '447', '68', '2', '0', '14', '1', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1472', '613', '4', '1', '408', '4', '1', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1473', '434', '4', '1', '0', '21', '1', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1474', '615', '4', '1', '0', '4', '1', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1475', '567', '4', '1', '447', '68', '1', '2018-10-10 14:16:32', '0');
INSERT INTO `growth_record_like` VALUES ('1736', '677', '3', '1', '673', '221', '1', '2018-10-10 15:36:17', '0');
INSERT INTO `growth_record_like` VALUES ('1738', '678', '3', '1', '673', '221', '1', '2018-10-10 15:36:58', '0');
INSERT INTO `growth_record_like` VALUES ('1759', '685', '4', '1', '684', '4', '1', '2018-10-10 16:47:33', '0');
INSERT INTO `growth_record_like` VALUES ('1834', '675', '3', '1', '673', '3', '1', '2018-10-10 18:00:13', '0');
INSERT INTO `growth_record_like` VALUES ('1835', '681', '3', '1', '673', '3', '1', '2018-10-10 18:07:27', '0');
INSERT INTO `growth_record_like` VALUES ('1864', '693', '3', '1', '674', '3', '1', '2018-10-10 18:20:31', '0');
INSERT INTO `growth_record_like` VALUES ('1874', '674', '221', '2', '0', '3', '1', '2018-10-10 18:43:04', '0');
INSERT INTO `growth_record_like` VALUES ('1977', '692', '3', '1', '674', '3', '1', '2018-10-11 00:02:45', '0');
INSERT INTO `growth_record_like` VALUES ('2011', '702', '3', '1', '700', '3', '1', '2018-10-11 00:56:34', '0');
INSERT INTO `growth_record_like` VALUES ('2012', '701', '3', '1', '700', '3', '1', '2018-10-11 00:56:35', '0');
INSERT INTO `growth_record_like` VALUES ('2013', '700', '3', '1', '0', '3', '1', '2018-10-11 00:57:11', '0');
INSERT INTO `growth_record_like` VALUES ('2014', '699', '3', '1', '0', '3', '1', '2018-10-11 00:57:12', '0');
INSERT INTO `growth_record_like` VALUES ('2015', '703', '3', '1', '700', '3', '1', '2018-10-11 00:57:24', '0');
INSERT INTO `growth_record_like` VALUES ('2016', '704', '3', '1', '700', '3', '1', '2018-10-11 00:57:35', '0');
INSERT INTO `growth_record_like` VALUES ('2017', '704', '221', '2', '700', '3', '1', '2018-10-11 10:30:47', '0');
INSERT INTO `growth_record_like` VALUES ('2031', '448', '68', '2', '0', '14', '1', '2018-10-11 11:00:43', '0');
INSERT INTO `growth_record_like` VALUES ('2048', '705', '164', '2', '432', '164', '2', '2018-10-11 14:00:26', '0');
INSERT INTO `growth_record_like` VALUES ('2080', '689', '3', '1', '673', '3', '1', '2018-10-11 14:28:03', '0');
INSERT INTO `growth_record_like` VALUES ('2081', '686', '3', '1', '673', '3', '1', '2018-10-11 14:28:05', '0');
INSERT INTO `growth_record_like` VALUES ('2082', '691', '3', '1', '673', '3', '1', '2018-10-11 14:28:23', '0');
INSERT INTO `growth_record_like` VALUES ('2086', '698', '3', '1', '673', '3', '1', '2018-10-11 14:51:52', '0');
INSERT INTO `growth_record_like` VALUES ('2087', '688', '3', '1', '673', '3', '1', '2018-10-11 14:51:53', '0');
INSERT INTO `growth_record_like` VALUES ('2088', '682', '3', '1', '673', '3', '1', '2018-10-11 14:51:54', '0');
INSERT INTO `growth_record_like` VALUES ('2133', '707', '3', '1', '706', '3', '1', '2018-10-11 16:14:42', '0');
INSERT INTO `growth_record_like` VALUES ('2152', '718', '3', '1', '713', '3', '1', '2018-10-11 16:25:20', '0');
INSERT INTO `growth_record_like` VALUES ('2154', '716', '3', '1', '713', '3', '1', '2018-10-11 16:25:21', '0');
INSERT INTO `growth_record_like` VALUES ('2156', '721', '3', '1', '713', '3', '1', '2018-10-11 16:30:21', '0');
INSERT INTO `growth_record_like` VALUES ('2158', '723', '3', '1', '713', '3', '1', '2018-10-11 16:31:15', '0');
INSERT INTO `growth_record_like` VALUES ('2164', '724', '3', '1', '712', '3', '1', '2018-10-11 16:32:44', '0');
INSERT INTO `growth_record_like` VALUES ('2165', '725', '3', '1', '714', '3', '1', '2018-10-11 16:32:51', '0');
INSERT INTO `growth_record_like` VALUES ('2166', '726', '3', '1', '712', '3', '1', '2018-10-11 16:41:37', '0');
INSERT INTO `growth_record_like` VALUES ('2167', '727', '3', '1', '713', '3', '1', '2018-10-11 16:41:45', '0');
INSERT INTO `growth_record_like` VALUES ('2168', '711', '3', '1', '673', '3', '1', '2018-10-11 17:21:07', '0');
INSERT INTO `growth_record_like` VALUES ('2169', '728', '3', '1', '713', '3', '1', '2018-10-11 17:26:20', '0');
INSERT INTO `growth_record_like` VALUES ('2170', '729', '3', '1', '714', '3', '1', '2018-10-11 17:26:28', '0');
INSERT INTO `growth_record_like` VALUES ('2171', '730', '3', '1', '712', '3', '1', '2018-10-11 17:34:26', '0');
INSERT INTO `growth_record_like` VALUES ('2172', '731', '3', '1', '713', '3', '1', '2018-10-11 17:34:37', '0');
INSERT INTO `growth_record_like` VALUES ('2173', '732', '3', '1', '712', '3', '1', '2018-10-11 17:36:38', '0');
INSERT INTO `growth_record_like` VALUES ('2174', '733', '3', '1', '713', '3', '1', '2018-10-11 17:36:50', '0');
INSERT INTO `growth_record_like` VALUES ('2175', '734', '3', '1', '712', '3', '1', '2018-10-11 17:37:32', '0');
INSERT INTO `growth_record_like` VALUES ('2176', '735', '3', '1', '713', '3', '1', '2018-10-11 17:37:42', '0');
INSERT INTO `growth_record_like` VALUES ('2179', '739', '3', '1', '713', '3', '1', '2018-10-11 18:07:11', '0');
INSERT INTO `growth_record_like` VALUES ('2180', '738', '3', '1', '713', '3', '1', '2018-10-11 18:07:12', '0');
INSERT INTO `growth_record_like` VALUES ('2181', '741', '3', '1', '714', '3', '1', '2018-10-11 18:07:22', '0');
INSERT INTO `growth_record_like` VALUES ('2182', '740', '3', '1', '714', '3', '1', '2018-10-11 18:07:23', '0');
INSERT INTO `growth_record_like` VALUES ('2183', '742', '3', '1', '714', '3', '1', '2018-10-11 18:08:05', '0');
INSERT INTO `growth_record_like` VALUES ('2184', '743', '3', '1', '714', '3', '1', '2018-10-11 18:08:13', '0');
INSERT INTO `growth_record_like` VALUES ('2189', '744', '3', '1', '714', '3', '1', '2018-10-11 18:13:52', '0');
INSERT INTO `growth_record_like` VALUES ('2190', '745', '3', '1', '714', '3', '1', '2018-10-11 18:15:06', '0');
INSERT INTO `growth_record_like` VALUES ('2191', '746', '3', '1', '714', '3', '1', '2018-10-11 18:15:06', '0');
INSERT INTO `growth_record_like` VALUES ('2192', '747', '3', '1', '714', '3', '1', '2018-10-11 18:15:07', '0');
INSERT INTO `growth_record_like` VALUES ('2193', '748', '3', '1', '714', '3', '1', '2018-10-11 18:15:08', '0');
INSERT INTO `growth_record_like` VALUES ('2194', '709', '3', '1', '706', '3', '1', '2018-10-11 18:15:16', '0');
INSERT INTO `growth_record_like` VALUES ('2196', '737', '3', '1', '712', '3', '1', '2018-10-11 18:19:22', '0');
INSERT INTO `growth_record_like` VALUES ('2198', '736', '3', '1', '712', '3', '1', '2018-10-11 18:19:24', '0');
INSERT INTO `growth_record_like` VALUES ('2199', '751', '3', '1', '714', '3', '1', '2018-10-11 18:20:27', '0');
INSERT INTO `growth_record_like` VALUES ('2200', '750', '3', '1', '714', '3', '1', '2018-10-11 18:20:27', '0');
INSERT INTO `growth_record_like` VALUES ('2201', '749', '3', '1', '714', '3', '1', '2018-10-11 18:21:12', '0');
INSERT INTO `growth_record_like` VALUES ('2203', '754', '3', '1', '752', '3', '1', '2018-10-11 18:23:02', '0');
INSERT INTO `growth_record_like` VALUES ('2205', '714', '3', '1', '0', '3', '1', '2018-10-11 18:23:09', '0');
INSERT INTO `growth_record_like` VALUES ('2207', '752', '3', '1', '0', '3', '1', '2018-10-11 18:25:58', '0');
INSERT INTO `growth_record_like` VALUES ('2220', '562', '97', '2', '0', '12', '1', '2018-10-11 21:32:31', '0');
INSERT INTO `growth_record_like` VALUES ('2221', '512', '97', '2', '0', '12', '1', '2018-10-11 21:32:32', '0');
INSERT INTO `growth_record_like` VALUES ('2226', '561', '97', '2', '0', '12', '1', '2018-10-11 21:33:52', '0');
INSERT INTO `growth_record_like` VALUES ('2227', '511', '97', '2', '0', '12', '1', '2018-10-11 21:33:55', '0');
INSERT INTO `growth_record_like` VALUES ('2228', '754', '221', '2', '752', '3', '1', '2018-10-12 10:20:30', '0');
INSERT INTO `growth_record_like` VALUES ('2275', '761', '3', '1', '752', '3', '1', '2018-10-12 15:59:27', '0');
INSERT INTO `growth_record_like` VALUES ('2277', '755', '3', '1', '752', '3', '1', '2018-10-12 15:59:29', '0');
INSERT INTO `growth_record_like` VALUES ('2280', '762', '3', '1', '752', '3', '1', '2018-10-12 17:55:11', '0');
INSERT INTO `growth_record_like` VALUES ('2281', '753', '3', '1', '752', '3', '1', '2018-10-12 17:56:06', '0');
INSERT INTO `growth_record_like` VALUES ('2282', '763', '3', '1', '714', '3', '1', '2018-10-12 18:42:43', '0');
INSERT INTO `growth_record_like` VALUES ('2283', '793', '3', '1', '764', '221', '1', '2018-10-13 10:31:00', '0');
INSERT INTO `growth_record_like` VALUES ('2298', '448', '42', '2', '0', '14', '1', '2018-10-13 20:01:01', '0');
INSERT INTO `growth_record_like` VALUES ('2356', '432', '164', '2', '0', '21', '1', '2018-10-14 18:25:34', '0');
INSERT INTO `growth_record_like` VALUES ('2371', '710', '164', '2', '432', '164', '2', '2018-10-14 18:29:53', '0');
INSERT INTO `growth_record_like` VALUES ('2395', '447', '42', '2', '0', '14', '1', '2018-10-14 18:45:36', '0');
INSERT INTO `growth_record_like` VALUES ('2397', '823', '3', '1', '822', '3', '1', '2018-10-14 22:05:50', '0');
INSERT INTO `growth_record_like` VALUES ('2401', '813', '221', '2', '811', '3', '1', '2018-10-14 22:10:11', '0');
INSERT INTO `growth_record_like` VALUES ('2445', '837', '3', '1', '832', '3', '1', '2018-10-14 23:18:08', '0');
INSERT INTO `growth_record_like` VALUES ('2452', '831', '221', '2', '0', '3', '1', '2018-10-14 23:39:04', '0');
INSERT INTO `growth_record_like` VALUES ('2464', '825', '3', '1', '822', '221', '1', '2018-10-15 00:32:58', '0');
INSERT INTO `growth_record_like` VALUES ('2465', '824', '3', '1', '822', '221', '1', '2018-10-15 00:32:59', '0');
INSERT INTO `growth_record_like` VALUES ('2466', '845', '3', '1', '832', '221', '1', '2018-10-15 00:41:59', '0');
INSERT INTO `growth_record_like` VALUES ('2467', '836', '3', '1', '831', '3', '1', '2018-10-15 00:42:07', '0');
INSERT INTO `growth_record_like` VALUES ('2475', '764', '221', '2', '0', '3', '1', '2018-10-15 01:34:11', '0');
INSERT INTO `growth_record_like` VALUES ('2476', '797', '114', '2', '0', '12', '1', '2018-10-15 10:05:51', '0');
INSERT INTO `growth_record_like` VALUES ('2477', '530', '114', '2', '0', '12', '1', '2018-10-15 10:05:59', '0');
INSERT INTO `growth_record_like` VALUES ('2478', '529', '114', '2', '0', '12', '1', '2018-10-15 10:06:01', '0');
INSERT INTO `growth_record_like` VALUES ('2490', '447', '221', '2', '0', '14', '1', '2018-10-15 14:25:56', '0');
INSERT INTO `growth_record_like` VALUES ('2509', '823', '221', '2', '822', '3', '1', '2018-10-15 14:46:53', '0');
INSERT INTO `growth_record_like` VALUES ('2511', '829', '221', '2', '826', '3', '1', '2018-10-15 14:48:47', '0');
INSERT INTO `growth_record_like` VALUES ('2514', '828', '221', '2', '826', '3', '1', '2018-10-15 14:49:19', '0');
INSERT INTO `growth_record_like` VALUES ('2516', '830', '221', '2', '826', '3', '1', '2018-10-15 14:51:36', '0');
INSERT INTO `growth_record_like` VALUES ('2518', '861', '221', '2', '859', '221', '2', '2018-10-15 14:52:38', '0');
INSERT INTO `growth_record_like` VALUES ('2519', '862', '221', '2', '859', '221', '2', '2018-10-15 14:52:54', '0');
INSERT INTO `growth_record_like` VALUES ('2520', '864', '221', '2', '859', '221', '2', '2018-10-15 14:54:15', '0');
INSERT INTO `growth_record_like` VALUES ('2521', '863', '221', '2', '859', '221', '2', '2018-10-15 14:54:16', '0');
INSERT INTO `growth_record_like` VALUES ('2524', '865', '3', '1', '859', '221', '2', '2018-10-15 14:56:51', '0');
INSERT INTO `growth_record_like` VALUES ('2526', '859', '221', '2', '0', '3', '1', '2018-10-15 14:57:36', '0');
INSERT INTO `growth_record_like` VALUES ('2529', '892', '3', '1', '890', '221', '1', '2018-10-15 16:01:13', '0');
INSERT INTO `growth_record_like` VALUES ('2532', '900', '3', '1', '890', '221', '1', '2018-10-15 16:37:11', '0');
INSERT INTO `growth_record_like` VALUES ('2533', '905', '221', '2', '0', '3', '1', '2018-10-15 17:10:10', '0');
INSERT INTO `growth_record_like` VALUES ('2534', '906', '3', '1', '905', '221', '1', '2018-10-15 17:11:15', '0');
INSERT INTO `growth_record_like` VALUES ('2535', '907', '221', '2', '905', '3', '1', '2018-10-15 17:12:11', '0');
INSERT INTO `growth_record_like` VALUES ('2544', '905', '3', '1', '0', '3', '1', '2018-10-15 19:56:27', '0');
INSERT INTO `growth_record_like` VALUES ('2545', '909', '3', '1', '0', '3', '1', '2018-10-15 19:56:37', '0');
DROP TRIGGER IF EXISTS `tri_like`;
DELIMITER ;;
CREATE TRIGGER `tri_like` AFTER INSERT ON `growth_record_like` FOR EACH ROW insert into new_message (record_id, author_id, author_type, msg_type, parent_record_id, org_author_id, org_author_type, family_id)VALUES(NEW.record_id, NEW.author_id, NEW.author_type, 2, NEW.parent_record_id, NEW.org_author_id, NEW.org_author_type, NEW.family_id)
;;
DELIMITER ;
