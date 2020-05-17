/*
Navicat MySQL Data Transfer

Source Server         : pbl
Source Server Version : 50728
Source Host           : 47.98.241.195:3306
Source Database       : project_based_learning_system

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2020-05-17 20:46:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(20) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `max_student_number` int(11) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for discussion
-- ----------------------------
DROP TABLE IF EXISTS `discussion`;
CREATE TABLE `discussion` (
  `discussion_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `likes` int(20) DEFAULT '0',
  `parents_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`discussion_id`),
  KEY `project_id` (`project_id`),
  KEY `parents_id` (`parents_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `discussion_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `discussion_ibfk_2` FOREIGN KEY (`parents_id`) REFERENCES `discussion` (`discussion_id`),
  CONSTRAINT `discussion_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `file_id` int(4) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `file_name` varchar(20) NOT NULL,
  `path` varchar(25) NOT NULL,
  PRIMARY KEY (`file_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for participate
-- ----------------------------
DROP TABLE IF EXISTS `participate`;
CREATE TABLE `participate` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score_type` int(1) NOT NULL DEFAULT '0' COMMENT '0:讨论得分 1:表示自评得分 2:互评得分 3:老师评分',
  `distirbute` double NOT NULL,
  `value` int(3) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`project_id`,`user_id`,`score_type`),
  KEY `participate_ibfk_2_idx` (`user_id`),
  CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `participate_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(40) NOT NULL,
  `theme` varchar(100) DEFAULT NULL,
  `leader_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `project_ibfk_1_idx` (`leader_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for take
-- ----------------------------
DROP TABLE IF EXISTS `take`;
CREATE TABLE `take` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  KEY `course_id_idx` (`course_id`),
  KEY `s_id_idx` (`user_id`),
  CONSTRAINT `take_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `take_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(40) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `contnet` text NOT NULL,
  `state` int(1) DEFAULT '0' COMMENT '0表示未分配，1表示已分配未完成，2表示已完成',
  PRIMARY KEY (`task_id`),
  KEY `project_id` (`project_id`),
  KEY `task_ibfk_2_idx` (`user_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for teach
-- ----------------------------
DROP TABLE IF EXISTS `teach`;
CREATE TABLE `teach` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  KEY `course_id_idx` (`course_id`),
  KEY `t_id_idx` (`user_id`),
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `password` varchar(16) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `role` int(1) NOT NULL COMMENT '0表示管理员 1表示老师 2表示学生',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
