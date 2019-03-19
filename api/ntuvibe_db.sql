# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: ntuvibe_db
# Generation Time: 2019-03-18 06:13:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table auth_group
# ------------------------------------------------------------

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_censored_word_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_censored_word_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(64) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_censored_word_tab_value_f8904834` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_class_schedule_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_class_schedule_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `index` int(11) NOT NULL,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL,
  `day` int(11) NOT NULL,
  `type` varchar(16) NOT NULL,
  `venue` varchar(16) NOT NULL,
  `group` varchar(16) NOT NULL,
  `weeks` varchar(128) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_clas_course__a076eb_idx` (`course_id`,`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `webapi_config_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `key` bigint(20) NOT NULL,
  `value` varchar(128) NOT NULL,
  `notes` varchar(256) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_config_tab_key_f9a90213` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_course_pe_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_course_pe_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `pe_type` varchar(16) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_course_pe_tab_course_id_fa5499d8` (`course_id`),
  KEY `webapi_course_pe_tab_pe_type_8f3769c1` (`pe_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_course_rating_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_course_rating_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `useful` int(11) NOT NULL,
  `easy` int(11) NOT NULL,
  `like` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_course_rating_tab_user_id_bd968d59` (`user_id`),
  KEY `webapi_course_rating_tab_course_id_4f64f5ef` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `webapi_course_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_code` varchar(8) NOT NULL,
  `course_title` varchar(128) NOT NULL,
  `au` double NOT NULL,
  `description` longtext NOT NULL,
  `constraint` longtext NOT NULL,
  `grade_type` int(11) NOT NULL,
  `as_pe` tinyint(1) NOT NULL,
  `as_ue` tinyint(1) NOT NULL,
  `semesters` longtext NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_course_tab_course_code_b972f365` (`course_code`),
  KEY `webapi_course_tab_course_title_6f2ddb95` (`course_title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `webapi_exam_schedule_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `start_time` bigint(20) NOT NULL,
  `end_time` bigint(20) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_exam_schedule_tab_course_id_e6850eff` (`course_id`),
  KEY `webapi_exam_schedule_tab_start_time_c10b6ff2` (`start_time`),
  KEY `webapi_exam_schedule_tab_end_time_7eabc3a5` (`end_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `webapi_professor_rating_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `prof_id` bigint(20) NOT NULL,
  `clarity` int(11) NOT NULL,
  `enthusiasm` int(11) NOT NULL,
  `helpful` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_professor_rating_tab_user_id_8b985c7a` (`user_id`),
  KEY `webapi_professor_rating_tab_prof_id_704c40d3` (`prof_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `webapi_professor_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `title` varchar(16) NOT NULL,
  `photo` varchar(64) NOT NULL,
  `description` longtext NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_professor_tab_course_id_3a6c8c4b` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_reserved_word_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_reserved_word_tab` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(64) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webapi_reserved_word_tab_value_65e57c6b` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table webapi_user_profile_tab
# ------------------------------------------------------------

CREATE TABLE `webapi_user_profile_tab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `major` varchar(128) NOT NULL,
  `avatar` varchar(512) NOT NULL,
  `create_time` int(10) unsigned NOT NULL,
  `update_time` int(10) unsigned NOT NULL,
  `user_id` int(11) NOT NULL,
  `schedule` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `webapi_user_profile_tab_user_id_a9395101_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
