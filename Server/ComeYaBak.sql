CREATE DATABASE  IF NOT EXISTS `comeya` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `comeya`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: comeya
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `User_Id` int NOT NULL,
  `Item_Id` int NOT NULL,
  `Quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`User_Id`,`Item_Id`),
  KEY `Item_Id` (`Item_Id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (11,43,3),(11,45,4),(11,46,3),(16,1,3),(16,2,3);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorytype`
--

DROP TABLE IF EXISTS `categorytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorytype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorytype`
--

LOCK TABLES `categorytype` WRITE;
/*!40000 ALTER TABLE `categorytype` DISABLE KEYS */;
INSERT INTO `categorytype` VALUES (1,'Comida Rapida'),(2,'Vegana'),(3,'Postre'),(4,'Refresco'),(5,'Alcohol'),(6,'Mariscos'),(7,'Pasta'),(8,'Jugo'),(9,'Comida Mexicana'),(10,'Picadera'),(11,'Cafe'),(12,'Asiatica');
/*!40000 ALTER TABLE `categorytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FoodType_Id` int DEFAULT NULL,
  `CategoryType_Id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FoodType_Id` (`FoodType_Id`),
  KEY `CategoryType_Id` (`CategoryType_Id`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`FoodType_Id`) REFERENCES `foodtype` (`Id`),
  CONSTRAINT `food_ibfk_2` FOREIGN KEY (`CategoryType_Id`) REFERENCES `categorytype` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,1,1),(2,5,3),(3,11,1),(4,30,4),(5,31,4),(6,26,11),(7,27,11),(8,28,11),(9,29,11),(10,32,11),(11,33,1),(12,13,3),(13,34,3),(14,9,1),(15,11,1),(16,10,2),(17,10,1),(18,23,8),(19,35,8),(20,36,1),(21,2,12),(22,6,7);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodtype`
--

DROP TABLE IF EXISTS `foodtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodtype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodtype`
--

LOCK TABLES `foodtype` WRITE;
/*!40000 ALTER TABLE `foodtype` DISABLE KEYS */;
INSERT INTO `foodtype` VALUES (1,'Hamburguesa'),(2,'Sushi'),(3,'Carne a la Parrilla'),(4,'Pizza'),(5,'Helado'),(6,'Spaghetti'),(7,'Donuts'),(8,'Sandwich'),(9,'Papas Fritas'),(10,'Ensalada'),(11,'Nuggets'),(12,'Cerveza'),(13,'Pastel'),(14,'Pollo Frito'),(15,'Croqueta'),(16,'Taco'),(17,'Burrito'),(18,'Hot Dog'),(19,'Pastelito'),(20,'Pescado'),(21,'Quipe'),(22,'Camaron'),(23,'Limonada'),(24,'Jugo de Naranja'),(25,'Jugo de Manzana'),(26,'Latte'),(27,'Expresso'),(28,'Capuccino'),(29,'Mochaccino'),(30,'Coca Cola'),(31,'Sprite'),(32,'Frappe'),(33,'Caja Feliz'),(34,'Galleta'),(35,'Té'),(36,'Wrap');
/*!40000 ALTER TABLE `foodtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Food_Id` int NOT NULL,
  `Description` text NOT NULL,
  `Price` decimal(12,2) NOT NULL,
  `Image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Restaurant_Id` int NOT NULL,
  `Combo` bit(1) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `MarketingImg1` text,
  `MarketingImg2` text,
  PRIMARY KEY (`Id`),
  KEY `Restaurant_Id` (`Restaurant_Id`),
  KEY `item_ibfk_1` (`Food_Id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`Food_Id`) REFERENCES `food` (`Id`),
  CONSTRAINT `item_ibfk_2` FOREIGN KEY (`Restaurant_Id`) REFERENCES `restaurant` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,1,'Descubre nuestra icónica Big Mac ahora más caliente, más jugosa y ¡mucho más sabrosa!. Disfruta de sus dos carnes 100% vacuno, crujiente lechuga fresca, delicioso queso Cheddar fundido, pepinillos, cebolla y la famosa salsa Big Mac.',481.05,'https://i.imgur.com/CEsYW0P.jpg',1,_binary '\0','Big Mac','Pendiente','Pendiente'),(2,2,'Qué mejor forma de alegrar tu día que disfrutar de un delicioso McFlurry® con Oreo® . Puedes combinarlo con sirope de chocolate, chocolate blanco o caramelo, a tu gusto.\n\n',359.19,'https://i.imgur.com/Q1bCIyI.jpg',1,_binary '\0','OREO McFlurry','Pendiente','Pendiente'),(3,1,'¡Prepárate para conquistar tus antojos con el legendario Baconator de Wendy\'s! Esta hamburguesa icónica es una obra maestra de sabor y generosidad. Imagina una parrilla caliente donde se cocina a la perfección una suculenta carne de res, jugosa y sazonada a la perfección.',400.39,'https://imgur.com/GHbm41U.png',5,_binary '\0','Baconator','Pendiente','Pendiente'),(4,1,'Imagina tres generosas porciones de jugosa carne de res, cada una acompañada por una loncha irresistible de queso fundido. Este sándwich no escatima en sabor, llevando la experiencia de la hamburguesa a nuevas alturas. Entre capas de carne y queso, cada mordisco es una sinfonía de sabores que te dejará boquiabierto. El Triple Cheeseburger es la opción perfecta para aquellos que buscan la máxima satisfacción y un festín de proporciones legendarias. ',539.08,'https://imgur.com/ScztZ3c.jpg',1,_binary '','Triple Cheeseburger','https://imgur.com/nGCXgBJ.png','No disponible'),(5,1,'¡Haz espacio para la grandeza con el Classic Big Mac® Pack acompañado de un toque dulce de nuestro Apple Pie en McDonald\'s! Imagina dos jugosas porciones de carne de res, queso derretido, lechuga crujiente, cebolla, encurtidos y nuestra icónica salsa especial, todo entre tres suaves panes. Este pack es una sinfonía de sabores clásicos que te transportarán a la deliciosa tradición de la Big Mac®.',1960.77,'https://imgur.com/CpTtLNG.jpg',1,_binary '','Classic Big Mac® Pack ','https://imgur.com/97czwAu.png','No disponible'),(6,13,'¡Endulza tu día con nuestra irresistible 13 Cookie Tote de McDonald\'s! Imagina un festín de galletas recién horneadas, suaves por dentro y con trozos generosos de chocolate que se derriten en tu boca. Esta selección de galletas es perfecta para compartir con amigos y familiares, o simplemente para satisfacer tu antojo de algo dulce. ',423.02,'https://imgur.com/WLhAKuX.jpg',1,_binary '\0','13 Cookie Tote','https://imgur.com/RYFZCea.png','No disponible'),(7,7,'¡Despierta tus sentidos con el Coffee Box de McDonald\'s! Imagina el aroma embriagador de nuestro café recién hecho, listo para acompañarte en cualquier momento del día. Este coffee box es la combinación perfecta de conveniencia y sabor, ofreciéndote una experiencia de café premium en cada sorbo.',696.34,'https://imgur.com/tEmCLJE.jpg',1,_binary '','Coffee Box','No disponible','No disponible'),(8,12,'¡Deléitate con la dulce nostalgia de nuestro irresistible Apple Pie en McDonald\'s! Imagina una mezcla perfecta de manzanas tiernas, canela y azúcar, envueltas en una masa dorada y crujiente. Cada bocado es una explosión de sabores reconfortantes que te transporta a la calidez de un postre casero.',144.49,'https://imgur.com/eNRwOEh.jpg',1,_binary '\0','Apple Pie','https://imgur.com/HGy5tQo.png','No disponible'),(9,12,'La Pumpkin & Creme Pie es el postre perfecto para aquellos que buscan una experiencia única y festiva. Su equilibrio entre la calidez de la calabaza y la suavidad del cremoso relleno te envolverá en una sensación reconfortante. ',162.34,'https://imgur.com/iQmUUeG.jpg',1,_binary '\0','Pumpkin & Creme Pie','https://imgur.com/yKGx3uz.png','No disponible'),(10,1,'¡Haz que cada mordisco cuente con nuestro clásico McChicken de McDonald\'s! Imagina una jugosa pechuga de pollo empanizada, acompañada de lechuga fresca y nuestra sabrosa mayonesa, todo entre dos panes tiernos y suaves. Este sándwich es la combinación perfecta de texturas y sabores que te hará volver por más.',283.76,'https://imgur.com/IsYpYuX.jpg',1,_binary '\0','McChicken®','https://imgur.com/OVqQts3.png','No disponible'),(11,1,'El Bacon McDouble es una obra maestra de la satisfacción salada y jugosa. Cada bocado es un festín de sabores intensos, donde la combinación del tocino ahumado y la carne jugosa se complementa a la perfección. Este sándwich es la elección ideal para aquellos que buscan un toque extra de sabor en su hamburguesa clásica. ',347.59,'https://imgur.com/YIHI5Wx.jpg',1,_binary '\0','Bacon McDouble®','No disponible','No disponible'),(12,1,'La Spicy McCrispy™ es un homenaje al equilibrio perfecto entre lo crujiente y lo picante. Cada bocado es una aventura sensorial, donde la jugosidad del pollo se fusiona con el toque picante, creando una experiencia de sabor emocionante. Si eres amante de los sabores intensos, este sándwich es una elección que no te decepcionará.',794.40,'https://imgur.com/gdgLZpd.jpg',1,_binary '','Spicy McCrispy™ ','No disponible','No disponible'),(13,11,'Este Happy Meal® no solo es una delicia para el paladar, sino también una experiencia que llena de alegría a los más pequeños. Además de la hamburguesa, el Happy Meal incluye papas fritas crujientes, una bebida refrescante y un juguete sorpresa que hará que cada comida sea una aventura.',347.59,'https://imgur.com/DMMOkzu.jpg',1,_binary '','Hamburger Happy Meal®','https://imgur.com/wrVkgHP.png','No disponible'),(14,7,'¡Eleva tu día con la perfección de nuestro café en McDonald\'s! Imagina una taza humeante de café recién hecho, elaborado con granos de alta calidad y tostado para ofrecer un sabor robusto y equilibrado.',200.00,'https://imgur.com/1EuxXK2.jpg',1,_binary '\0','Café','No disponible','No disponible'),(15,6,'El Caramel Latte es una indulgencia suave y dulce que combina la intensidad del café con la dulzura del caramelo, creando una experiencia de sabor irresistible. Cada sorbo es una mezcla perfecta de notas robustas y cremosas, que te envolverán en una sensación de placer y satisfacción.',290.00,'https://imgur.com/892QU2e.jpg',1,_binary '\0','Caramel Latte','No disponible','No disponible'),(16,8,'El Caramel Cappuccino es una obra maestra de sabores, donde la intensidad del café se equilibra con la cremosidad de la leche y la dulzura del caramelo. Cada sorbo es una deliciosa sinfonía de texturas y matices que te envuelve en un placer reconfortante.',290.00,'https://imgur.com/EChP3Kl.jpg',1,_binary '\0','Caramel Capuccino','No disponible','No disponible'),(17,9,'El Mocaccino es una fusión perfecta de intensidad, suavidad y dulzura. Cada sorbo es una indulgencia celestial que combina la riqueza del café con la cremosidad del chocolate, creando una bebida sofisticada y deliciosamente equilibrada.',290.00,'https://imgur.com/BSYVzdk.jpg',1,_binary '\0','Moca','No disponible','No disponible'),(18,10,'El Caramel Frappé es la bebida ideal para aquellos momentos en los que necesitas una dosis de frescura y energía. Cada sorbo es una experiencia refrescante que combina la intensidad del café con la dulzura irresistible del caramelo, creando una indulgencia helada que deleitará tu paladar.',290.00,'https://imgur.com/irQKC8L.jpg',1,_binary '\0','Caramel Frappé','No disponible','No disponible'),(19,5,'La Sprite de McDonald\'s es el compañero perfecto para cualquier comida. Su sabor limpio y chispeante te brinda una experiencia de bebida revitalizante que complementa a la perfección tus favoritos del menú.',80.00,'https://imgur.com/A5Sjgj8.png',1,_binary '\0','Sprite','No disponible','No disponible'),(20,8,'Este Iced French Vanilla Latte es una obra maestra de sabores, donde la intensidad del café se fusiona perfectamente con la suavidad de la leche y la dulzura sofisticada de la vainilla francesa. Cada sorbo es una indulgencia fresca y deliciosa que te brinda un escape de la rutina diaria.',290.00,'https://imgur.com/lD9BEN5.png',1,_binary '\0','Iced French Vanilla Latte','No disponible','No disponible'),(21,1,'¡Explora la deliciosa robustez con el Dave\'s Double de Wendy\'s! Imagina dos jugosas y sabrosas hamburguesas de carne fresca, cada una con queso americano, crujiente lechuga, tomate fresco, pepinillos, cebolla morada y mayonesa, todo entre dos panes suaves y tostados. El Dave\'s Double es una explosión de sabor con cada mordisco, ofreciendo una experiencia de hamburguesa clásica y abundante. La calidad de la carne fresca y los ingredientes frescos se combinan para crear una hamburguesa que deleitará a los amantes de la carne.',406.21,'https://imgur.com/o40hvSX.jpg',5,_binary '\0','Dave\'s Double®','https://imgur.com/QIXhU96.png','No disponible'),(22,16,'¡Experimenta la frescura y el sabor con la ensalada Apple Pecan de Wendy\'s! Imagina una mezcla fresca y crujiente de lechugas mixtas, pollo a la parrilla, queso azul, manzanas frescas y trozos de nueces caramelizadas. Todo ello se combina de manera armoniosa con un aderezo de vinagreta de manzana para crear una ensalada que cautiva tus sentidos. La Apple Pecan Salad de Wendy\'s es una opción deliciosa y equilibrada que combina la frescura de las frutas con la proteína del pollo a la parrilla y el crujiente de las nueces. Si buscas una opción más ligera y llena de sabor en el menú de ensaladas, la Apple Pecan Salad podría ser una elección tentadora.',388.22,'https://imgur.com/CG4ayPD.jpg',5,_binary '\0','Apple Pecan Salad','No disponible','No disponible'),(23,14,'¡Sumérgete en la perfección crujiente con las papas fritas de Wendy\'s! Imagina patatas frescas, cortadas en tiras deliciosamente delgadas, y luego doradas a la perfección para obtener ese crujido irresistible por fuera y esa suavidad deliciosa por dentro.',116.06,'https://imgur.com/blR059o.jpg',5,_binary '\0','Papas Fritas','No disponible','No disponible'),(24,15,'¡Eleva tu experiencia picante con los 10 PC. Spicy Chicken Nuggets de Wendy\'s! Imagina diez jugosos trozos de pechuga de pollo empanizados con un toque de especias picantes, que te brindan la cantidad perfecta de calor y sabor en cada bocado.',348.18,'https://imgur.com/U1qZL1Q.jpg',5,_binary '\0','10 PC. Spicy Chicken Nuggets','No disponible','No disponible'),(25,1,'¡Embárcate en un viaje de sabores con el Asiago Ranch Classic Chicken Club de Wendy\'s! Imagina una jugosa pechuga de pollo a la parrilla, cubierta con queso asiago, tiras de tocino ahumado, lechuga fresca, tomate, cebolla roja y aderezo ranch, todo entre dos panes tostados y suaves. Este sándwich es una explosión de sabores y texturas, desde la cremosidad del queso asiago hasta la intensidad del tocino ahumado y la frescura de los vegetales. La combinación del aderezo ranch agrega un toque de sabor adicional que eleva la experiencia.',434.64,'https://imgur.com/EvLpimX.jpg',5,_binary '','Asiago Ranch Classic Chicken Club','https://imgur.com/fu4h8hH.jpg','No disponible'),(26,1,'¡Prepárate para una experiencia audaz y deliciosa con el Big Bacon Classic® Double de Wendy\'s! Imagina dos jugosas y sabrosas hamburguesas de carne fresca, cada una acompañada de dos lonchas de tocino ahumado, queso americano, lechuga fresca, tomate, cebolla, mayonesa y ketchup, todo entre dos panes suaves y tostados.',464.24,'https://imgur.com/Fz5s1bl.jpg',5,_binary '','Big Bacon Classic® Double','No disponible','No disponible'),(27,20,'¡Deléitate con la frescura y la jugosidad del Grilled Chicken Ranch Wrap de Wendy\'s! Imagina una tortilla suave rellena con una pechuga de pollo a la parrilla, lechuga fresca, tomate, queso cheddar rallado y un generoso toque de aderezo ranch. Este wrap es una opción deliciosa y equilibrada que combina la proteína magra del pollo a la parrilla con la frescura de los vegetales y la cremosidad del aderezo ranch. La tortilla suave completa la experiencia, creando una comida portátil perfecta para quienes buscan una opción más ligera y sabrosa.',580.30,'https://imgur.com/6eR5Car.jpg',5,_binary '','Grilled Chicken Ranch Wrap','https://imgur.com/qBaslKJ.png','No disponible'),(28,17,'¡Descubre la fusión perfecta de sabores con el BBQ Ranch Chicken de Wendy\'s! Imagina una jugosa pechuga de pollo a la parrilla, cubierta con queso americano, tocino ahumado, cebolla crujiente, lechuga fresca y un delicioso aderezo BBQ ranch, todo entre dos panes suaves y tostados. Este sándwich es una celebración de sabores audaces y complementarios. La combinación de la dulzura del aderezo BBQ, la cremosidad del queso, la intensidad del tocino y la frescura de los ingredientes crea una experiencia de sabor única.',290.15,'https://imgur.com/Ota5tuP.png',5,_binary '\0','BBQ Ranch Chicken','No disponible','No disponible'),(29,18,'¡Refresca tu día con la vibrante y deliciosa All-Natural Lemonade de Wendy\'s! Imagina una bebida naturalmente endulzada con el jugo fresco de limones y combinada con agua y azúcar para crear una limonada perfectamente equilibrada. Si buscas una bebida refrescante y llena de sabor, la All-Natural Lemonade de Wendy\'s es una elección perfecta. ¡Disfruta de cada sorbo y refréscate con la pureza de la limonada natural! ',202.52,'https://imgur.com/YuVn8BJ.jpg',5,_binary '\0','All-Natural Lemonade','No disponible','No disponible'),(30,18,'¡Dale un giro deliciosamente frutal a tu día con la refrescante Strawberry Lemonade de Wendy\'s! Imagina la combinación perfecta de limonada naturalmente endulzada con jugo fresco de limones y realzada con la dulzura jugosa de las fresas. La Strawberry Lemonade de Wendy\'s es una explosión de sabores frescos y frutales que te transportará a un oasis de delicias. Cada sorbo es una mezcla armoniosa de acidez cítrica y la dulzura jugosa de las fresas, creando una bebida vibrante y deliciosa.',202.52,'https://imgur.com/mtG3d4E.jpg',5,_binary '\0','Strawberry Lemonade','No disponible','No disponible'),(31,19,'El Sweetened Iced Tea es la opción ideal para aquellos que buscan una bebida refrescante y con un toque justo de dulzura. Ya sea que lo disfrutes solo o como compañero perfecto de tus comidas, este té helado endulzado es una elección clásica y satisfactoria.',214.71,'https://imgur.com/Urae0O7.jpg',5,_binary '\0','Sweetened Iced Tea','No disponible','No disponible'),(32,1,'¡Descubre la perfecta combinación de dulce y salado con el Honey Butter Chicken Sandwich de Wendy\'s! Imagina una jugosa pechuga de pollo frita, cubierta con una irresistible mezcla de mantequilla de miel y acompañada de pepinillos crujientes, todo entre dos panes suaves y tostados.',254.75,'https://imgur.com/KOf5iaC.jpg',5,_binary '\0','Honey Butter Chicken Sandwich','No disponible','No disponible'),(33,1,'¡Despierta tus sentidos con el clásico sabor del Bacon, Egg, & Cheese Sandwich de Wendy\'s! Imagina un huevo fresco y esponjoso, tiras de tocino crujiente, y una generosa porción de queso derretido, todo entre dos panes suaves y tostados. Este sándwich es la combinación perfecta de ingredientes para comenzar tu día con energía y sabor. El huevo, el tocino y el queso se unen para crear una experiencia de desayuno satisfactoria y deliciosa.',298.27,'https://imgur.com/BWR7e6z.jpg',5,_binary '\0','Classic Bacon, Egg, & Cheese Sandwich','No disponible','No disponible'),(34,13,'¡Deléitate con la dulzura y la suavidad de nuestras Sugar Cookies en Wendy\'s! Imagina galletas recién horneadas, suaves y esponjosas, con una sutil capa de azúcar que agrega ese toque dulce y crujiente en cada bocado. Las Sugar Cookies de Wendy\'s son el acompañamiento perfecto para satisfacer tus antojos de algo dulce. Ya sea que las disfrutes como postre o como un capricho durante el día, estas galletas ofrecen una experiencia indulgente y reconfortante.',75.44,'https://imgur.com/H7i5Lle.jpg',5,_binary '\0','Sugar Cookie','No disponible','No disponible'),(35,13,'¡Prepárate para una explosión de sabor con nuestras Chocolate Chunk Cookies en Wendy\'s! Imagina galletas recién horneadas, repletas de generosos trozos de chocolate que se derriten en tu boca, creando la combinación perfecta de suavidad y riqueza chocolatada. Las Chocolate Chunk Cookies de Wendy\'s son una indulgencia irresistible para los amantes del chocolate. Cada mordisco es una experiencia de texturas y sabores, desde la masa suave hasta los trozos decadentes de chocolate.',174.09,'https://imgur.com/bI5wBtp.jpg',5,_binary '\0','Chocolate Chunk Cookie','No disponible','No disponible'),(36,1,'¡Prepárate para una experiencia jugosa y llena de sabor con Dave\'s Hot \'n Juicy 1/4 lb. Single with Cheese en Wendy\'s! Imagina una hamburguesa de carne fresca de 1/4 de libra, sazonada a la perfección y cocida a fuego para mantener todo su jugo y sabor. Esta hamburguesa clásica incluye queso, lechuga fresca, tomate, cebolla, pepinillos, mostaza y ketchup, todo entre dos panes suaves y tostados. La combinación de la carne jugosa, el queso derretido y los ingredientes frescos crea una experiencia de hamburguesa clásica y satisfactoria.',464.24,'https://imgur.com/45IkBjR.jpg',5,_binary '','Dave’s Hot ‘n Juicy 1/4 lb. Single with Cheese','No disponible','No disponible'),(37,21,'Pollo empanizado en salsa de anguila y miel, con un toque de puerro picadito y aguacate.',450.00,'https://imgur.com/W4WNbqt.png',3,_binary '\0','�au �au','No disponible','No disponible'),(38,21,'Camaron tempura envuelto en bacon, cream cheese, puerro, platano maduro ba�ado en salsa anguila y miel.',395.00,'https://imgur.com/blGiOrr.png',3,_binary '\0','Watafok Roll','https://imgur.com/R4kkD4Q.jpg','No disponible'),(39,21,'Camaron tempura, cream cheese, aguacate por dentro tooping tempura crocante, atun, puerro, spicy mayo en salsa de anquila y miel',395.00,'https://imgur.com/O08d9FB.png',3,_binary '\0','Abuken Roll','https://imgur.com/HEikd5S.jpg','No disponible'),(40,21,'Base de platano verde frito, con topping de pollo empanizando, bacon, chicharroncito, puerro, salsa de anguila y miel.',475.00,'https://imgur.com/fO0E1Rt.png',3,_binary '\0','Kukaramakara','https://imgur.com/KQoXxF8.jpg','No disponible'),(41,21,'Camaron, spicy king crab, cream cheese, platano maduro, aguacate, topping de tallarines por fuera, ba�ado en salsa de anguila y miel.',395.00,'https://imgur.com/kvGY9aM.png',3,_binary '\0','Yokomo Roll','No disponible','No disponible'),(42,21,'Pollo empanizado, envuelto en bacon, puerro, cream cheese en salsa anguila y miel.',375.00,'https://imgur.com/Bh5iw9n.png',3,_binary '\0','Kirikiki Roll','https://imgur.com/kPQKroz.png','No disponible'),(43,21,'Camaron tempura, cream cheese, platano maduro dentro en salsa de anquila y miel.',395.00,'https://imgur.com/FXd7EJm.png',3,_binary '\0','Rollito Playbe','No disponible','No disponible'),(44,21,'Camaron tempura envuelto en platano maduro, con salsa de anguila y miel.',495.00,'https://imgur.com/nV1SPou.png',3,_binary '\0','Camaron Aplatanao','No disponible','No disponible'),(45,21,'Rollo sin arroz  con salmon, spicy king crab, aguacate, camaron al vapor, puerro y toque de picante japones con salsa anguila y miel.',795.00,'https://imgur.com/wS6xKn9.png',3,_binary '\0','David Sakayama','https://imgur.com/DZUSt8P.jpg','No disponible'),(46,21,'Base de arroz con toppings de pollo o camaron, bacon, king crab, aguacate, zanahoria, puerro, con salsitas Yoko y anguila.',475.00,'https://imgur.com/qlePTJy.png',3,_binary '\0','Pokesemeimpolta','No disponible','No disponible');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Order_Code` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Order_Status_Id` int NOT NULL DEFAULT '1',
  `Created_At` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Receipt` text NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Order_Code` (`Order_Code`),
  KEY `Order_Status_Id` (`Order_Status_Id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`Order_Status_Id`) REFERENCES `order_status` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (15,'ORDER-d6c5797e1',1,'2023-12-31 20:19:46','https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xT0ZnbjFCRk11SUM0T0k0KMCex6wGMgboglW5NSU6LBbuTr7LyVo6TgpM3_zu5EdUqkOfX93ykIkfYkMZ8-QEt3oP28Z6ZhoWlsQw'),(16,'ORDER-54e78932d',1,'2023-12-31 23:21:49','No disponible'),(17,'ORDER-8a383dad9',1,'2023-12-31 23:25:19','No disponible'),(18,'ORDER-0463f0675',1,'2024-01-05 01:38:09','https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xT0ZnbjFCRk11SUM0T0k0KMCr3qwGMgaqMMe93Iw6LBbG02JnqdeZP_VwzWszRoAOo648XL5AulEsuq_AAb8Z0ywJ8uQ-PXyGJ57V');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_history`
--

DROP TABLE IF EXISTS `order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history` (
  `Order_Id` int NOT NULL,
  `User_Id` int NOT NULL,
  PRIMARY KEY (`User_Id`,`Order_Id`),
  UNIQUE KEY `Order_Id_UNIQUE` (`Order_Id`),
  CONSTRAINT `order_history_ibfk_1` FOREIGN KEY (`Order_Id`) REFERENCES `order` (`Id`),
  CONSTRAINT `order_history_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `user` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_history`
--

LOCK TABLES `order_history` WRITE;
/*!40000 ALTER TABLE `order_history` DISABLE KEYS */;
INSERT INTO `order_history` VALUES (15,11),(16,11),(17,11),(18,11);
/*!40000 ALTER TABLE `order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `Order_Id` int NOT NULL,
  `Item_Id` int NOT NULL,
  `Amount` decimal(15,2) NOT NULL,
  `Quantity` int NOT NULL,
  `Taxes` decimal(15,2) NOT NULL,
  PRIMARY KEY (`Order_Id`,`Item_Id`),
  KEY `Item_Id` (`Item_Id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`Order_Id`) REFERENCES `order` (`Id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`Item_Id`) REFERENCES `item` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (15,1,165.80,3,29.84),(15,2,30.95,5,5.57),(16,1,48.91,5,8.80),(16,2,29.22,4,5.25),(17,1,391.29,40,70.43),(18,1,48.91,5,8.80),(18,2,29.22,4,5.26);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'En camino'),(2,'Recibido'),(3,'Recibido');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Logo` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Description` text NOT NULL,
  `Rating` decimal(2,1) NOT NULL,
  `Background` varchar(500) NOT NULL,
  `MarketingImg` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'McDonald\'s','https://imgur.com/rK8tuGW.png','Bienvenido a McDonald\'s, donde los sabores inolvidables se combinan con la irresistible conveniencia. Disfruta de un festín de delicias icónicas en nuestro diverso y delicioso menú, que incluye jugosas hamburguesas, crujientes papas fritas doradas y McNuggets de pollo. Cada visita es una experiencia única que satisface todos los antojos.',4.5,'https://imgur.com/MtHJdBp.jpg','https://imgur.com/rF2NNop.jpg'),(2,'Pizza Hut','https://imgur.com/8IOiesP.png','Sumérgete en el mundo de las pizzas irresistibles, donde cada bocado es una experiencia extraordinaria. Nuestro menú presenta una gama emocionante de sabores, desde las clásicas y amadas Pepperoni Lovers hasta las innovadoras pizzas Signature con combinaciones de ingredientes únicas..',4.8,'https://imgur.com/IwwoVfg.jpg','https://imgur.com/x5GmCQn.jpg'),(3,'Yokomo | Sushi Aplatanao\'','https://imgur.com/wTw82o0.png','Prepárate para una experiencia única de sushi en Yokomo Sushi Aplatanao, donde disfrutarás de sabores frescos y auténticos que te transportarán a Japón. Ofrecen una exquisita selección de rolls y platillos japoneses que satisfacen todos los antojos. ',4.2,'https://imgur.com/MIVbIJv.jpg','https://imgur.com/TZs48S4.jpg'),(4,'Rolling Steaks','https://imgur.com/YubMnKY.png','Adéntrate en una experiencia culinaria de sabores intensos en Rolling Steaks, donde la devoción por la carne se fusiona con la magia de la parrilla. Más que simplemente platos, creamos momentos gastronómicos memorables. Sumérgete en la suculencia de nuestras selectas carnes, elegidas minuciosamente para asegurar calidad en cada mordisco. ',4.6,'https://imgur.com/Vn20IQa.jpg','https://imgur.com/EOMOGk3.jpg'),(5,'Wendy\'s','https://imgur.com/aqTZZzz.png','¡Bienvenido a Wendy\'s, donde cada bocado es una explosión de frescura y sabor en nuestra experiencia única de comida rápida! Nuestras hamburguesas jugosas, hechas a la parrilla con carne de res de alta calidad y acompañadas de ingredientes frescos y crujientes, son la joya de la corona, desde la clásica Dave\'s Single hasta creaciones innovadoras. Pero no nos limitamos a las hamburguesas; también ofrecemos opciones como pollo crujiente y ensaladas frescas con ingredientes de primera calidad. ',4.9,'https://imgur.com/8jJIxTV.jpg','https://imgur.com/Tv3GaLV.jpg'),(6,'Olive Garden','https://imgur.com/cvHQONf.png','Olive Garden, un auténtico refugio culinario italiano, deleita a sus comensales con una experiencia gastronómica única. Sumérgete en la encantadora atmósfera de la Toscana, donde los platos están meticulosamente elaborados con ingredientes frescos y sabrosos, capturando la esencia de la cocina italiana tradicional. Desde las renombradas ensaladas frescas y los exquisitos aperitivos hasta las especialidades de pasta artesanal y los decadentes postres, cada bocado es un viaje a la tierra del sol y la pasión culinaria. ',4.7,'https://imgur.com/l6WBAH2.jpg','https://imgur.com/RtKKFX9.jpg'),(7,'Solo Pastelitos','https://imgur.com/OA1oJOH.png','Solo Pastelitos es un encantador restaurante especializado que deleita a sus clientes con una exquisita selecci�n de croquetas, quipes y pastelitos. Este acogedor lugar ofrece una variedad de sabores, desde deliciosas croquetas rellenas de jam�n hasta quipes sabrosos y pastelitos irresistibles de pollo y queso, entre otros.',4.5,'https://imgur.com/NoOEDei.jpg','https://imgur.com/PUNXmVH.jpg'),(8,'Taco Bell','https://imgur.com/GdW5S7y.png','Taco Bell te invita a disfrutar de una experiencia culinaria �nica con su vibrante mezcla de sabores inspirados en la cocina mexicana. Desde sus ic�nicos tacos hasta las innovadoras opciones en su men�, como los Crunchwrap Supremes y los Doritos Locos Tacos, Taco Bell ofrece una explosi�n de delicias tex-mex.',4.6,'https://imgur.com/RL4Hucs.jpg','https://imgur.com/ryN2sSM.jpg'),(9,'Barra Payan','https://imgur.com/LUt7LLe.png','Barra Payan es el lugar ideal para los amantes de los sandwiches, donde la frescura y la calidad se fusionan en cada bocado. Ofreciendo una amplia variedad de opciones, desde cl�sicos s�ndwiches de jam�n y queso hasta creaciones �nicas y sabores exquisitos.',4.7,'https://imgur.com/L2QEB7K.jpg','https://imgur.com/OU56xew.jpg'),(10,'Helados Bon','https://imgur.com/X4poUD7.png','Helados Bon es un para�so helado que fusiona la tradici�n dominicana con una explosi�n de sabores innovadores. Sum�rgete en un mundo de delicias refrescantes, donde cada cucharada es una experiencia �nica. Desde los cl�sicos sabores tropicales que evocan los aromas de la isla hasta creaciones vanguardistas que despiertan el paladar, Helados Bon se enorgullece de ofrecer momentos dulces y memorables.',4.5,'https://imgur.com/0otTrmS.jpg','https://imgur.com/fivpaTo.jpg'),(11,'Krispy Kreme','https://imgur.com/VgGdZqi.png','Krispy Kreme, el para�so de los donuts, te invita a sumergirte en una experiencia glaseada inigualable. Con sus caracter�sticos donuts calientes y reci�n horneados, Krispy Kreme ofrece una amplia gama de delicias dulces que van desde los cl�sicos glaseados hasta creativas y tentadoras creaciones. Cada bocado es una fusi�n de suave esponjosidad y dulzura irresistible.',4.8,'https://imgur.com/UJhcZiY.jpg','https://imgur.com/Xr6BbHk.jpg'),(12,'KFC','https://imgur.com/hFeJQYE.png','KFC, Kentucky Fried Chicken, te invita a experimentar la magia del pollo frito con su receta secreta de hierbas y especias. Sum�rgete en la crujiente delicia de piezas de pollo perfectamente sazonadas y doradas a la perfecci�n. Con su distintivo sabor y calidad reconocida a nivel mundial, KFC ofrece una variedad de opciones, desde cubos de pollo originales hasta especialidades como el pollo extra crujiente.',4.4,'https://imgur.com/D495TB6.jpg','https://imgur.com/7jSlweu.jpg'),(13,'Subway','https://imgur.com/gCJQvse.png','Subway, la cadena de restaurantes de comida r�pida especializada en s�ndwiches personalizados, te invita a construir tu propio fest�n de sabores frescos. En Subway, cada cliente es el chef, eligiendo entre una variedad de panes reci�n horneados, carnes, verduras y salsas para crear el s�ndwich perfecto.',4.8,'https://imgur.com/Hg1Hdek.png','https://imgur.com/rpDKbed.jpg'),(14,'Starbucks','https://imgur.com/n5Pt1UT.png','Starbucks, el �cono global del caf�, te invita a disfrutar de una experiencia �nica en cada taza. Con su distintiva sirena verde, Starbucks es mucho m�s que una cafeter�a; es un lugar donde el arte del caf� se encuentra con la comodidad moderna. Desde el cl�sico Latte hasta las innovadoras bebidas de temporada, Starbucks ofrece una amplia variedad de opciones de caf� y t� para satisfacer todos los gustos.',4.6,'https://imgur.com/sCxbsLi.jpg','https://imgur.com/uNq4YsE.jpg'),(15,'Chipotle Mexican Grill','https://imgur.com/60Lr3oH.png','Chipotle Mexican Grill te invita a descubrir la frescura y la autenticidad de la comida mexicana con un giro moderno. En Chipotle, cada plato es una creaci�n personalizada, comenzando con ingredientes de calidad como arroz, frijoles, carne asada a la parrilla, pollo, cerdo o tofu, y una variedad de salsas y toppings frescos.',4.5,'https://imgur.com/D7rq0nM.jpg','https://imgur.com/N0P0Y6q.jpg'),(16,'Sonic Drive-In','https://imgur.com/89mQzB3.png','Sonic Drive-In te invita a disfrutar de una experiencia �nica en comida r�pida desde la comodidad de tu autom�vil. Con su ic�nico servicio en autoservicio y una amplia variedad de opciones, desde hamburguesas y perros calientes hasta batidos y bebidas heladas, Sonic ofrece un toque retro y divertido a la experiencia de comer fuera.',4.5,'https://imgur.com/D97AvLZ.jpg','https://imgur.com/64vldWn.jpg'),(17,'In-N-Out Burger','https://imgur.com/b9tiVX5.png','In-N-Out Burger, el �cono de la comida r�pida en la costa oeste, te invita a deleitarte con sabores simples y genuinos. Con su men� limitado pero cl�sico, In-N-Out se especializa en hamburguesas frescas y deliciosas, papas fritas cortadas a mano y batidos cremosos.',4.5,'https://imgur.com/cPQEsgg.jpg','https://imgur.com/MghWUXW.jpg'),(18,'Burger King','https://imgur.com/K5NaVAm.png','Burger King, el hogar del Whopper, te invita a disfrutar de la experiencia del fuego a la parrilla. Con su distintiva llama como s�mbolo, Burger King ofrece hamburguesas jugosas, opciones de pollo, ensaladas frescas y mucho m�s. La posibilidad de personalizar tu orden es una caracter�stica destacada, permiti�ndote adaptar tu comida a tus gustos �nicos.',4.7,'https://imgur.com/E5gHnze.jpg','https://imgur.com/O1HRj76.jpg'),(19,'Chick-fil-A','https://imgur.com/x95Kt1Q.png','Chick-fil-A, reconocido por su compromiso con la calidad y el servicio excepcional, te invita a disfrutar de deliciosas opciones de pollo. Desde sus famosos s�ndwiches de pollo hasta las tiernas tiras y nuggets, Chick-fil-A se destaca por su pollo fresco y sabroso. La calidez y la hospitalidad son parte integral de la experiencia, y su men� tambi�n incluye opciones saludables como ensaladas y wraps.',4.8,'https://imgur.com/7kGp7jP.jpg','https://imgur.com/6bFBWmY.png'),(20,'Dairy Queen','https://imgur.com/U9b9PXE.png','Dairy Queen, el rey de los postres helados, te invita a disfrutar de una experiencia dulce y refrescante. Conocido por sus ic�nicos Blizzard, Dairy Queen ofrece una amplia gama de helados, batidos y suculentos conos de crema. Adem�s de los postres helados, su men� incluye hamburguesas, hot dogs y otros platos deliciosos.',4.6,'https://imgur.com/mE7YX6e.jpg','https://imgur.com/8AAGulo.jpg'),(21,'Papa John\'s','https://imgur.com/V4GYPsc.png','Papa John\'s, el hogar de las pizzas de calidad superior, te invita a experimentar el sabor artesanal en cada rebanada. Con su compromiso con ingredientes frescos y una masa hecha a mano, Papa John\'s ofrece una variedad de pizzas con sabores innovadores y deliciosos.',4.8,'https://imgur.com/uh7TNAL.jpg','https://imgur.com/hffMfFM.jpg'),(22,'Carl\'s Jr.','https://imgur.com/C6GsALU.png','Carl\'s Jr., la cadena de restaurantes de comida r�pida, te invita a disfrutar de audaces y deliciosas hamburguesas en un ambiente informal. Con su enfoque en sabores intensos y creatividad culinaria, Carl\'s Jr. ofrece una variedad de opciones de hamburguesas, desde las cl�sicas hasta las innovadoras.',4.5,'https://imgur.com/GlGB05X.jpg','https://imgur.com/Ut918dR.jpg'),(23,'Jack in the Box','https://imgur.com/OTaeNkJ.png','Jack in the Box, el lugar donde la creatividad y la diversidad se encuentran en cada comida r�pida, te invita a disfrutar de una experiencia gastron�mica �nica. Con su ecl�ctico men� que abarca desde hamburguesas cl�sicas y tacos hasta opciones de desayuno durante todo el d�a, Jack in the Box se destaca por su innovaci�n y versatilidad.',4.7,'https://imgur.com/FcL27hj.jpg','https://imgur.com/g99mgU3.jpg');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Password` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Salt` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Updated_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Lname` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Phone` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Genre` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Balance` decimal(14,3) NOT NULL DEFAULT '100.000',
  `Status_Id` int NOT NULL DEFAULT '1',
  `ActivationCode` varchar(10) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UQ_Email_Unique` (`Email`),
  UNIQUE KEY `ActivationCode_UNIQUE` (`ActivationCode`),
  KEY `user_ibfk_1` (`Status_Id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Status_Id`) REFERENCES `user_status` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'usuario@example.com','hashed_password','salt_value','2023-11-22 22:52:45','2023-11-22 22:52:45','Juan','Pérez','555-1234','Masculino',100.000,1,'A3B7X9K2R8'),(7,'mariolora975@gmail.com','$2a$13$oo1tV5kdTgbUNxDEB0phWOqwmYoFCUExNkSdn/0.IGhgjNegik0SG','12/7/2023 1:15:00 AM','2023-12-07 01:15:15','2023-12-07 01:15:15','Mario','Lora','8097765456','Masculino',100.000,2,'M6P4Q1Y5Z2'),(8,'theexama123@gmail.com','$2a$13$me5tK.CUyUZpgRllXcKEZOSN8OBEBK0pgNUrZAwW9uN..oi/Q9FX.','12/7/2023 1:19:48 AM','2023-12-07 01:19:50','2023-12-07 01:19:50','Mario','Lora','8097765456','Masculino',100.000,2,'N8F2J4V6P1'),(9,'mariolora97@gmail.com','$2a$13$u76ptVUgrQjH26AEMj4geeePpmcy6JCyG7Dn2HHRD.f5GrdCiI1w.','12/7/2023 1:40:24 AM','2023-12-07 01:40:26','2023-12-07 01:40:26','Mario','Lora','8097765456','Masculino',100.000,1,'L9D5K2Q6R7'),(10,'mariolor975@gmail.com','$2a$13$C78k6fjVuVEmy3Y7XB0C0OOs9m.Ar20FbIjX3dUvuu0DQEOtle9dm','12/7/2023 1:48:40 AM','2023-12-07 01:48:41','2023-12-07 01:48:41','Mario','Lora','8097765456','Masculino',100.000,1,'H3P7V1R6X8'),(11,'pepe@gmail.com','$2a$13$RLzMCDf3rhRSLi8IqCeON.a/m.X6ZZSRFI7dzL0BZdfrs2o/f6aBK','12/7/2023 2:44:57 PM','2023-12-07 14:44:59','2023-12-07 14:44:59','Pepe','Lora','66544456','Masculino',9608.710,2,'B4Y2C7J1K9'),(15,'ma@gmail.com','$2a$13$mUkXE7vAaW7nUJhxPdMKf.TyrV8tNBqFnjbUrgqbMIruYk5QkmxPi','12/7/2023 10:11:47 PM','2023-12-07 22:11:48','2023-12-07 22:11:48','maria','coste','555','Femenino',100.000,1,'X8L1M6Z2V4'),(16,'maria@gmail.com','$2a$13$Z2ADTjbJMgPiPA1mgN3zceec3MNldnQvnfMl/.4CUXj1fxzUzriWq','12/18/2023 8:55:35 PM','2023-12-18 20:55:36','2023-12-18 20:55:36','Maria','Coste','8492018755','Femenino',100.000,2,'R9H5K3X7Y1'),(17,'maicol@gmail.com','$2a$13$wI5ft8i7R2wJOoLZjmwiz.oUkXU/JAoGONeRWRDkBN55Jpbzgn.Ji','1/1/2024 5:44:38 PM','2024-01-01 17:44:39','2024-01-01 17:44:39','maicol','lopez','40984485','Masculino',100.000,2,'8792004ED7');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_status`
--

DROP TABLE IF EXISTS `user_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_status` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Status` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_status`
--

LOCK TABLES `user_status` WRITE;
/*!40000 ALTER TABLE `user_status` DISABLE KEYS */;
INSERT INTO `user_status` VALUES (1,'No activo'),(2,'Activo');
/*!40000 ALTER TABLE `user_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'comeya'
--

--
-- Dumping routines for database 'comeya'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 12:50:04
