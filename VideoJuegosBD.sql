-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para videojuegos
CREATE DATABASE IF NOT EXISTS `videojuegos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `videojuegos`;

-- Volcando estructura para tabla videojuegos.plataforma
CREATE TABLE IF NOT EXISTS `plataforma` (
  `id_plat` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_plat`) USING BTREE,
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla videojuegos.plataforma: ~2 rows (aproximadamente)
DELETE FROM `plataforma`;
INSERT INTO `plataforma` (`id_plat`, `nombre`, `id_user`) VALUES
	(1, 'Playstation', 1),
	(2, 'Nintendo', 1);

-- Volcando estructura para tabla videojuegos.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  `apellido` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user` varchar(16) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla videojuegos.usuario: ~2 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id_user`, `nombre`, `apellido`, `user`, `password`, `activo`) VALUES
	(1, 'Daniel', 'San Martin', 'dsanmartin', '$2b$10$zFiAinRv6QQTTHMkNlsNfexed0IRfwe4OT6zHI8kXoi.DlouWSi9G', 1),
	(2, 'Julio', 'Soto', 'jsoto', '$2b$10$XwOB1UjB.9S8A5IZKKne8ekCQuIFR7DrU7HCYjF516y1EZX3mOQWq', 1);

-- Volcando estructura para tabla videojuegos.videojuegos
CREATE TABLE IF NOT EXISTS `videojuegos` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `id_plat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_game`) USING BTREE,
  UNIQUE KEY `titulo` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla videojuegos.videojuegos: ~2 rows (aproximadamente)
DELETE FROM `videojuegos`;
INSERT INTO `videojuegos` (`id_game`, `titulo`, `descripcion`, `id_plat`, `id_user`) VALUES
	(1, 'Final Fantasy XVI', ' Juegos de rol...', 1, 1),
	(2, 'Super Mario Bros', ' Juegos estilo Libre...', 2, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
