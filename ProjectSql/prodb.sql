-- MySQL dump 10.13  Distrib 8.0.17, for Linux (x86_64)
--
-- Host: localhost    Database: cdac_project
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Batch`
--

DROP TABLE IF EXISTS `Batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Batch` (
  `batch_id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(50) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `FK_batch_course_id` (`course_id`),
  CONSTRAINT `FK_batch_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Batch`
--

LOCK TABLES `Batch` WRITE;
/*!40000 ALTER TABLE `Batch` DISABLE KEYS */;
INSERT INTO `Batch` VALUES (1,'DMC-AUG-2019[W2]',1);
/*!40000 ALTER TABLE `Batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassType`
--

DROP TABLE IF EXISTS `ClassType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClassType` (
  `classtype_id` int(11) NOT NULL AUTO_INCREMENT,
  `classtype_name` varchar(50) NOT NULL,
  PRIMARY KEY (`classtype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassType`
--

LOCK TABLES `ClassType` WRITE;
/*!40000 ALTER TABLE `ClassType` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClassType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Course` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES (1,'PG-DMC');
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CourseCo`
--

DROP TABLE IF EXISTS `CourseCo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CourseCo` (
  `coco_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `fac_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`coco_id`),
  KEY `FK_coco_course_id` (`course_id`),
  KEY `FK_coco_batch_id` (`batch_id`),
  KEY `FK_coco_fac_id` (`fac_id`),
  CONSTRAINT `FK_coco_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `Batch` (`batch_id`),
  CONSTRAINT `FK_coco_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`),
  CONSTRAINT `FK_coco_fac_id` FOREIGN KEY (`fac_id`) REFERENCES `Faculty` (`fac_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CourseCo`
--

LOCK TABLES `CourseCo` WRITE;
/*!40000 ALTER TABLE `CourseCo` DISABLE KEYS */;
INSERT INTO `CourseCo` VALUES (1,1,1,101);
/*!40000 ALTER TABLE `CourseCo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DailySchedule`
--

DROP TABLE IF EXISTS `DailySchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DailySchedule` (
  `dsch_id` int(11) NOT NULL AUTO_INCREMENT,
  `dsch_date` date NOT NULL,
  `classtype_id` int(11) DEFAULT NULL,
  `dsch_start` time NOT NULL,
  `dsch_end` time NOT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `sub_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `fac_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`dsch_id`),
  KEY `FK_dsch_course_id` (`course_id`),
  KEY `FK_dsch_batch_id` (`batch_id`),
  KEY `FK_dsch_sub_id` (`sub_id`),
  KEY `FK_dsch_fac_id` (`fac_id`),
  KEY `FK_dsch_venue_id` (`venue_id`),
  KEY `FK_dsch_classtype_id` (`classtype_id`),
  CONSTRAINT `FK_dsch_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `Batch` (`batch_id`),
  CONSTRAINT `FK_dsch_classtype_id` FOREIGN KEY (`classtype_id`) REFERENCES `ClassType` (`classtype_id`),
  CONSTRAINT `FK_dsch_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`),
  CONSTRAINT `FK_dsch_fac_id` FOREIGN KEY (`fac_id`) REFERENCES `Faculty` (`fac_id`),
  CONSTRAINT `FK_dsch_sub_id` FOREIGN KEY (`sub_id`) REFERENCES `Subject` (`sub_id`),
  CONSTRAINT `FK_dsch_venue_id` FOREIGN KEY (`venue_id`) REFERENCES `Venue` (`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DailySchedule`
--

LOCK TABLES `DailySchedule` WRITE;
/*!40000 ALTER TABLE `DailySchedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `DailySchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Faculty` (
  `fac_id` int(11) NOT NULL AUTO_INCREMENT,
  `fac_name` varchar(50) NOT NULL,
  `fac_email` varchar(50) NOT NULL,
  `factype_id` int(11) DEFAULT NULL,
  `fac_gender` varchar(10) NOT NULL,
  `fac_propic` varchar(200) NOT NULL,
  `fac_bdate` date NOT NULL,
  `fac_password` varchar(50) NOT NULL,
  PRIMARY KEY (`fac_id`),
  KEY `FK_factype_id` (`factype_id`),
  CONSTRAINT `FK_factype_id` FOREIGN KEY (`factype_id`) REFERENCES `FacultyType` (`factype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Faculty`
--

LOCK TABLES `Faculty` WRITE;
/*!40000 ALTER TABLE `Faculty` DISABLE KEYS */;
INSERT INTO `Faculty` VALUES (101,'Rohan Parmane','rohanparmane@gmail.com',1,'Male','www.gmail.com','1990-10-10','rohanparmane123'),(102,'Sachin Pawar','sachinpawar@gmail.com',2,'Male','www.gmail.com','1987-01-01','sachinpawar123'),(103,'Admin','admin@gmail.com',3,'Male','www.gmail.com','1980-10-10','admin123');
/*!40000 ALTER TABLE `Faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FacultyType`
--

DROP TABLE IF EXISTS `FacultyType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FacultyType` (
  `factype_id` int(11) NOT NULL AUTO_INCREMENT,
  `factype_name` varchar(50) NOT NULL,
  PRIMARY KEY (`factype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FacultyType`
--

LOCK TABLES `FacultyType` WRITE;
/*!40000 ALTER TABLE `FacultyType` DISABLE KEYS */;
INSERT INTO `FacultyType` VALUES (1,'Course Co-ordinator'),(2,'Teaching Faculty'),(3,'Admin');
/*!40000 ALTER TABLE `FacultyType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Instruction`
--

DROP TABLE IF EXISTS `Instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Instruction` (
  `ins_id` int(11) NOT NULL AUTO_INCREMENT,
  `ins_title` varchar(100) NOT NULL,
  `ins_description` varchar(300) NOT NULL,
  `int_attachment` varchar(200) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `ins_type` varchar(50) NOT NULL,
  PRIMARY KEY (`ins_id`),
  KEY `FK_ins_course_id` (`course_id`),
  KEY `FK_ins_batch_id` (`batch_id`),
  CONSTRAINT `FK_ins_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `Batch` (`batch_id`),
  CONSTRAINT `FK_ins_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Instruction`
--

LOCK TABLES `Instruction` WRITE;
/*!40000 ALTER TABLE `Instruction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Instruction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Options`
--

DROP TABLE IF EXISTS `Options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Options` (
  `opt_id` int(11) NOT NULL AUTO_INCREMENT,
  `opt_desc` varchar(200) NOT NULL,
  `qs_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`opt_id`),
  KEY `FK_opt_qs_id` (`qs_id`),
  CONSTRAINT `FK_opt_qs_id` FOREIGN KEY (`qs_id`) REFERENCES `Question` (`qs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Options`
--

LOCK TABLES `Options` WRITE;
/*!40000 ALTER TABLE `Options` DISABLE KEYS */;
/*!40000 ALTER TABLE `Options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Performance`
--

DROP TABLE IF EXISTS `Performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Performance` (
  `per_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_id` int(11) DEFAULT NULL,
  `per_theorymarks` float NOT NULL,
  `per_labmarks` float NOT NULL,
  `per_internalmarks` float NOT NULL,
  `per_total` float NOT NULL,
  `per_maxmarks` float NOT NULL,
  `per_status` varchar(50) NOT NULL,
  `stud_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`per_id`),
  KEY `FK_per_stud_id` (`stud_id`),
  KEY `FK_per_sub_id` (`sub_id`),
  CONSTRAINT `FK_per_stud_id` FOREIGN KEY (`stud_id`) REFERENCES `Student` (`stud_id`),
  CONSTRAINT `FK_per_sub_id` FOREIGN KEY (`sub_id`) REFERENCES `Subject` (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Performance`
--

LOCK TABLES `Performance` WRITE;
/*!40000 ALTER TABLE `Performance` DISABLE KEYS */;
/*!40000 ALTER TABLE `Performance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QryAns`
--

DROP TABLE IF EXISTS `QryAns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QryAns` (
  `qryans_id` int(11) NOT NULL AUTO_INCREMENT,
  `qryans_ans` varchar(300) NOT NULL,
  `qry_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`qryans_id`),
  KEY `FK_qryans_quries_id` (`qry_id`),
  CONSTRAINT `FK_qryans_quries_id` FOREIGN KEY (`qry_id`) REFERENCES `Queries` (`qry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QryAns`
--

LOCK TABLES `QryAns` WRITE;
/*!40000 ALTER TABLE `QryAns` DISABLE KEYS */;
INSERT INTO `QryAns` VALUES (1,'Ok it will be uploaded in daily schedule section soon',1);
/*!40000 ALTER TABLE `QryAns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QsAns`
--

DROP TABLE IF EXISTS `QsAns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QsAns` (
  `qsans_id` int(11) NOT NULL AUTO_INCREMENT,
  `qs_id` int(11) DEFAULT NULL,
  `opt_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`qsans_id`),
  KEY `FK_qsans_qs_id` (`qs_id`),
  KEY `FK_qsans_opt_id` (`opt_id`),
  CONSTRAINT `FK_qsans_opt_id` FOREIGN KEY (`opt_id`) REFERENCES `Options` (`opt_id`),
  CONSTRAINT `FK_qsans_qs_id` FOREIGN KEY (`qs_id`) REFERENCES `Question` (`qs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QsAns`
--

LOCK TABLES `QsAns` WRITE;
/*!40000 ALTER TABLE `QsAns` DISABLE KEYS */;
/*!40000 ALTER TABLE `QsAns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Queries`
--

DROP TABLE IF EXISTS `Queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Queries` (
  `qry_id` int(11) NOT NULL AUTO_INCREMENT,
  `qry_title` varchar(50) NOT NULL,
  `qry_description` varchar(300) NOT NULL,
  `qry_type` varchar(50) NOT NULL,
  `stud_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`qry_id`),
  KEY `FK_queries_stud_id` (`stud_id`),
  CONSTRAINT `FK_queries_stud_id` FOREIGN KEY (`stud_id`) REFERENCES `Student` (`stud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Queries`
--

LOCK TABLES `Queries` WRITE;
/*!40000 ALTER TABLE `Queries` DISABLE KEYS */;
INSERT INTO `Queries` VALUES (1,'Time table related','Sir please send tomorrow time table for lecture and lab','Other',32175);
/*!40000 ALTER TABLE `Queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Question`
--

DROP TABLE IF EXISTS `Question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Question` (
  `qs_id` int(11) NOT NULL AUTO_INCREMENT,
  `qs_description` varchar(200) NOT NULL,
  `sub_id` int(11) DEFAULT NULL,
  `stud_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`qs_id`),
  KEY `FK_qs_sub_id` (`sub_id`),
  KEY `FK_qs_stud_id` (`stud_id`),
  CONSTRAINT `FK_qs_stud_id` FOREIGN KEY (`stud_id`) REFERENCES `Student` (`stud_id`),
  CONSTRAINT `FK_qs_sub_id` FOREIGN KEY (`sub_id`) REFERENCES `Subject` (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Question`
--

LOCK TABLES `Question` WRITE;
/*!40000 ALTER TABLE `Question` DISABLE KEYS */;
/*!40000 ALTER TABLE `Question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudRank`
--

DROP TABLE IF EXISTS `StudRank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudRank` (
  `rank_id` int(11) NOT NULL AUTO_INCREMENT,
  `per_id` int(11) DEFAULT NULL,
  `stud_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`rank_id`),
  KEY `FK_rank_stud_id` (`stud_id`),
  KEY `FK_rank_per_id` (`per_id`),
  CONSTRAINT `FK_rank_per_id` FOREIGN KEY (`per_id`) REFERENCES `Performance` (`per_id`),
  CONSTRAINT `FK_rank_stud_id` FOREIGN KEY (`stud_id`) REFERENCES `Student` (`stud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudRank`
--

LOCK TABLES `StudRank` WRITE;
/*!40000 ALTER TABLE `StudRank` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudRank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `stud_id` int(11) NOT NULL AUTO_INCREMENT,
  `stud_name` varchar(50) NOT NULL,
  `stud_email` varchar(50) NOT NULL,
  `stud_prn` double NOT NULL,
  `stud_gender` varchar(10) NOT NULL,
  `stud_bdate` date NOT NULL,
  `stud_propic` varchar(200) NOT NULL,
  `stud_password` varchar(50) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`stud_id`),
  KEY `FK_stud_course_id` (`course_id`),
  KEY `FK_batch_id` (`batch_id`),
  CONSTRAINT `FK_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `Batch` (`batch_id`),
  CONSTRAINT `FK_stud_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES (32168,'Pranjal Punja Rahinj','ishwarirahinj275@gmail.com',190844221031,'Female','1996-10-29','www.google.com','pranjalrahinj210',1,1),(32175,'Arti Eknath Bokse','artibokse@gmail.com',190844221009,'Female','1993-10-02','www.google.com','artibokse210',1,1);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudyMaterial`
--

DROP TABLE IF EXISTS `StudyMaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StudyMaterial` (
  `sm_id` int(11) NOT NULL AUTO_INCREMENT,
  `sm_title` varchar(100) NOT NULL,
  `sub_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `sm_attachment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`sm_id`),
  KEY `FK_sm_course_id` (`course_id`),
  KEY `FK_sm_batch_id` (`batch_id`),
  KEY `FK_sm_sub_id` (`sub_id`),
  CONSTRAINT `FK_sm_batch_id` FOREIGN KEY (`batch_id`) REFERENCES `Batch` (`batch_id`),
  CONSTRAINT `FK_sm_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`),
  CONSTRAINT `FK_sm_sub_id` FOREIGN KEY (`sub_id`) REFERENCES `Subject` (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudyMaterial`
--

LOCK TABLES `StudyMaterial` WRITE;
/*!40000 ALTER TABLE `StudyMaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudyMaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subject`
--

DROP TABLE IF EXISTS `Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subject` (
  `sub_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(50) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `FK_sub_course_id` (`course_id`),
  CONSTRAINT `FK_sub_course_id` FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `Subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venue`
--

DROP TABLE IF EXISTS `Venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venue` (
  `venue_id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(50) NOT NULL,
  PRIMARY KEY (`venue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venue`
--

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
INSERT INTO `Venue` VALUES (1,'Pravara'),(2,'Purna'),(3,'Krishna'),(4,'Koyana');
/*!40000 ALTER TABLE `Venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-11 12:18:03
