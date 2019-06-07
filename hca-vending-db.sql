-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hca_vending_machine_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machine` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(50) DEFAULT NULL,
  `quarterStock` int(11) DEFAULT NULL,
  `dollarStock` int(11) DEFAULT NULL,
  `allowDollar` tinyint(1) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
INSERT INTO `machine` VALUES (1,'spring hill',16,6,0,'HASMONEY'),(2,NULL,NULL,NULL,0,'OUTOFSODA');
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `machineId` bigint(20) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `imgName` varchar(50) DEFAULT NULL,
  `currentStock` int(11) DEFAULT NULL,
  `minStock` int(11) DEFAULT NULL,
  `maxStock` int(11) DEFAULT NULL,
  `stockStatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IXFK_Product_Machine` (`machineId`),
  CONSTRAINT `FK_Product_Machine` FOREIGN KEY (`machineId`) REFERENCES `machine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'CocaCola',0.25,'CocaCola.jpg',5,5,10,'INSTOCK'),(2,1,'Sprite',0.25,'Sprite.jpg',9,5,10,'INSTOCK'),(3,1,'Dr Pepper',0.25,'DrPepper.jpg',5,5,10,'INSTOCK'),(4,1,'A&W',0.25,'AW.jpg',10,5,10,'INSTOCK'),(5,1,'Fanta',0.25,'Fanta.jpg',10,5,10,'INSTOCK'),(6,1,'Diet Coke',0.25,'DietCoke.jpg',9,5,10,'INSTOCK');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `machineId` bigint(20) DEFAULT NULL,
  `productId` bigint(20) DEFAULT NULL,
  `changeAmount` decimal(10,2) DEFAULT NULL,
  `amountPaid` decimal(10,2) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IXFK_Sales_Machine` (`machineId`),
  CONSTRAINT `FK_Sales_Machine` FOREIGN KEY (`machineId`) REFERENCES `machine` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (53,1,1,0.00,0.25,0.25,'SODASOLD'),(54,1,1,0.00,0.25,0.25,'SODASOLD'),(55,1,3,0.00,0.25,0.25,'SODASOLD'),(56,1,6,0.00,0.25,0.25,'SODASOLD'),(57,1,1,0.00,0.25,0.25,'SODASOLD'),(58,1,1,0.75,1.00,0.25,'SODASOLD'),(59,1,1,0.00,0.25,0.25,'SODASOLD'),(60,1,1,0.00,0.25,0.25,'SODASOLD'),(61,1,1,0.00,0.25,0.25,'SODASOLD'),(62,1,3,0.00,0.25,0.25,'SODASOLD'),(63,1,2,0.00,0.25,0.25,'SODASOLD'),(64,1,1,0.00,0.25,0.25,'SODASOLD'),(65,1,1,0.00,0.25,0.25,'SODASOLD'),(66,1,1,0.00,0.25,0.25,'SODASOLD'),(67,1,3,0.00,0.25,0.25,'SODASOLD'),(68,1,3,0.00,0.25,0.25,'SODASOLD'),(69,1,3,0.00,0.25,0.25,'SODASOLD'),(70,1,3,0.00,0.25,0.25,'SODASOLD'),(71,1,3,0.00,0.25,0.25,'SODASOLD'),(72,1,3,0.00,0.25,0.25,'SODASOLD'),(73,1,3,0.00,0.25,0.25,'SODASOLD'),(74,1,3,0.00,0.25,0.25,'SODASOLD');
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-07 10:12:19
