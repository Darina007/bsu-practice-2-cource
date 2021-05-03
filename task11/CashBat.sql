-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: usersdb
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `COMMENT_ID` int NOT NULL AUTO_INCREMENT,
  `POST_ID` int DEFAULT NULL,
  `USER_ID` int DEFAULT NULL,
  `CREATED_AT` date DEFAULT NULL,
  `RATING` tinyint DEFAULT NULL,
  `COMMENT_TEXT` varchar(201) DEFAULT NULL,
  PRIMARY KEY (`COMMENT_ID`),
  KEY `POST_ID` (`POST_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `post` (`POST_ID`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,5,'2021-05-17',5,'I like it!'),(2,2,6,'2021-07-29',5,'Cool'),(3,2,6,'2021-05-17',4,'I have two cats, but i want meow more!'),(4,8,1,'2021-05-29',5,'I like it!'),(5,1,5,'2021-06-17',5,'I like it!'),(6,3,9,'2021-06-20',3,'interesting'),(7,5,12,'2020-12-17',2,'It\'s not cool'),(8,6,13,'2021-03-29',5,'Ithink it can be usefull'),(9,7,5,'2021-01-17',3,'Can you teach me?'),(10,7,1,'2021-03-29',4,'He is good!'),(11,12,8,'2021-04-22',2,'It\'s too expensive'),(12,18,6,'2021-07-29',5,'I like it!'),(13,18,3,'2021-05-17',5,'I want to buy it! How much?');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `LIKE_ID` int NOT NULL AUTO_INCREMENT,
  `POST_ID` int DEFAULT NULL,
  `USER_ID` int DEFAULT NULL,
  PRIMARY KEY (`LIKE_ID`),
  KEY `POST_ID` (`POST_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `post` (`POST_ID`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1,3),(2,1,5),(3,1,13),(4,1,2),(5,2,3),(6,6,5),(7,4,13),(8,2,2),(9,7,3),(10,8,5),(11,5,13),(12,7,2),(13,3,3),(14,1,5),(15,1,13),(16,16,2),(17,4,3),(18,9,4),(19,14,13),(20,1,2),(21,12,3),(22,10,5),(23,17,13),(24,17,2);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `POST_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int DEFAULT NULL,
  `POST_DESCRIPTION` varchar(201) DEFAULT NULL,
  `CREATED_AT` date DEFAULT NULL,
  `VALIDATE_UNTIL` date DEFAULT NULL,
  `PHOTO_LINK` blob,
  `RATING` tinyint DEFAULT NULL,
  `DISCOUNT` tinyint DEFAULT NULL,
  `HASH_TAGS` text,
  PRIMARY KEY (`POST_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'More than 76 thousand people around the world have already recovered from the disease provoked by the new coronavirus. New vaccine especially for you! ','2021-05-17','2021-05-27',NULL,4,25,'krone virus vaccine'),(2,2,'The cat will always cheer you up! Take the cat to your house. ','2021-05-17','2021-06-27',NULL,5,100,'kat love'),(3,2,'If not today to take a new furry friend, then when?','2021-06-12','2021-06-27',NULL,5,100,'kat love friend'),(4,2,'Fluffy Briton is looking for his home!','2021-05-05','2021-05-20',NULL,5,100,'kat love little_kitty'),(5,3,'Core Glow are extraordinarily beautiful glowing stones that are often compared to the Milky Way. Now it is one of the most popular ways to register a land plot. ','2020-12-12','2021-02-27',NULL,3,60,'garden beauty'),(6,3,'The most difficult thing in the morning is to get up. You can\'t get up with a flying alarm. ','2021-03-18','2021-04-27',NULL,4,95,'technology morning'),(7,4,'Nothing is impossible. If you want to do something, you will do it. Guitar Basics. ','2021-01-12','2021-09-27',NULL,3,25,'guitar learning_online'),(8,4,' Guitar Basics. All you need is a little practice.','2021-05-30','2021-08-08',NULL,4,25,'guitar learning_online your_chanse love'),(9,5,'In the center of Lviv, in its historical part, there is a four-star Swiss hotel.','2021-04-21','2021-05-27',NULL,2,30,'tourist love'),(10,6,'Any cards eventually fall into disrepair, but it is difficult to understand the players who, serenely losing significant amounts of preference,\' save \'on the deck.','2021-04-02','2021-05-07',NULL,1,12,'game cards'),(11,7,'At a specialized furniture exhibition, Prostor-Mebel presents a fundamentally new furniture system for Latvia under an intriguing name. Prostor-Mebel is a Russian company. ','2021-04-21','2021-05-21',NULL,2,30,'furniture sleep'),(12,8,'The Plantbook has a flexible display, touch keyboard, and ... it rolls up into a tube! Also, to charge it, you can not only use ordinary solar energy, but also water! ','2021-04-21','2021-05-29',NULL,4,65,'technology science'),(13,9,'Across the Atlantic in hot air balloons.','2021-06-28','2021-07-10',NULL,2,10,'tourist love'),(14,10,'In the center of Lviv, in its historical part, there is a four-star Swiss hotel.','2021-04-21','2021-00-27',NULL,2,30,'tourist travel love'),(15,11,'Recently, a truly unique attraction called Takabisha was built in the land of the rising sun. This attraction differs in that only on it you can ride at an angle of 121 degrees! ','2021-04-01','2021-05-31',NULL,5,30,'tourist love roller_coaster'),(16,12,'The inventor Gauri Nanda, of the Massachusetts Institute of Technology, invented a very interesting alarm clock. He will run away from you, hide under the bed until you are completely out of bed. ','2021-04-30','2022-07-07',NULL,3,56,'clock technology alarm_clock love'),(17,12,'Alarm clock. He will run away from you, hide under the bed until you are completely out of bed. ','2021-05-30','2022-09-07',NULL,3,56,'clock technology alarm_clock'),(18,13,'If you do not know what you want from this life, then get my self-study guide on motivation and cats.','2021-04-04','2021-12-07',NULL,5,15,'cats love book');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ivanov Ivan'),(2,'Kitty_love'),(3,'Lylalyuk Anna'),(4,'Guitar genius'),(5,'Solovieva Evgeniya'),(6,'Ivanov Alexander'),(7,'Just furniture'),(8,'Alexey Novikov'),(9,'Jonathan Trapp'),(10,'Popova Ksenia'),(11,'Sokolov Ivan'),(12,'Mazhey Victor'),(13,'Darroman');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03 18:13:20
