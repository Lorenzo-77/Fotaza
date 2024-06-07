-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2024 a las 19:04:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fotazaprueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `comment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `img_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `creation_date` date DEFAULT NULL,
  `format` varchar(50) DEFAULT NULL,
  `resolution` varchar(50) DEFAULT NULL,
  `rights` varchar(255) NOT NULL,
  `watermark_type` varchar(255) DEFAULT NULL,
  `watermark_config` varchar(255) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `label1` varchar(50) DEFAULT NULL,
  `label2` varchar(50) DEFAULT NULL,
  `label3` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`img_id`, `user_id`, `image_url`, `title`, `category`, `creation_date`, `format`, `resolution`, `rights`, `watermark_type`, `watermark_config`, `state`, `label1`, `label2`, `label3`) VALUES
(109, 3, 'wallhaven-49yx1x.jpg', 'Mural', 'Arte y Cultura', '2024-05-28', 'jpeg', '1600x1200', 'Commons', 'MarcaAgua-wallhaven-49yx1x.jpg', NULL, 'Publica', 'Exotico', 'Abstracto', 'Arte'),
(113, 3, 'wallhaven-4le2py.jpg', 'Ciervo', 'Naturaleza', '2024-06-07', 'jpeg', '1920x1200', 'Copyleft', 'MarcaAgua-wallhaven-4le2py.jpg', NULL, 'Publica', 'Animal', '', ''),
(114, 3, 'wallhaven-kweml6.jpg', 'Macarrones', 'Comida y Bebida', '2024-06-07', 'jpeg', '2000x1368', 'Copyright', 'MarcaAgua-wallhaven-kweml6.jpg', 'f41b9f78-eecd-4744-9718-4c30e5c5c181.jpg', 'Privada', 'Colores', 'Comida', ''),
(115, 4, 'wallhaven-nryop7.jpg', 'Vaqueross', 'Tecnología y Ciencia', '2024-06-07', 'jpeg', '1920x1200', 'Copyleft', 'MarcaAgua-wallhaven-nryop7.jpg', NULL, 'Privada', 'Robot', 'Oeste', ''),
(116, 4, 'wallhaven-lq79rq.jpg', 'Leon', 'Naturaleza', '2024-06-07', 'jpeg', '1920x1200', 'Copyleft', 'MarcaAgua-wallhaven-lq79rq.jpg', NULL, 'Publica', 'Animal', 'Foto', 'Exotico'),
(117, 4, 'wallhaven-kw79pd.jpg', 'Auto Rojo', 'Viajes y Aventuras', '2024-06-07', 'jpeg', '3600x2400', 'Copyleft', 'MarcaAgua-wallhaven-kw79pd.jpg', NULL, 'Publica', 'Auto', 'Rojo', ''),
(118, 5, 'wallhaven-nk112m.jpg', 'Barco', 'Naturaleza', '2024-06-07', 'jpeg', '1152x864', 'Copyright', 'MarcaAgua-wallhaven-nk112m.jpg', 'wallhaven-jxlwpm.jpg', 'Privada', '', '', ''),
(119, 5, 'wallhaven-43d1l9.jpg', 'Aguila', 'Naturaleza', '2024-06-07', 'jpeg', '1920x1200', 'Copyleft', 'MarcaAgua-wallhaven-43d1l9.jpg', NULL, 'Publica', 'Animal', 'ave', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL,
  `image_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `rating_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-kO0htz6e_zL5NU8hgMpxTCWguC-gbTr', 1717805070, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":3}}'),
('zIMeuvHfZX77KQb3VKywbUEjfxjQkx1O', 1717866212, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `system_created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `name`, `lastname`, `dni`, `email`, `password`, `system_created`) VALUES
(3, 'Laura', 'López', '67890123', 'laura.lopez@example.com', '$2a$10$.0D5Xgs/YETwcvJc.ltunOwgeCP2SakROXMOMeGXNnLt5ICUlhgEe', '2023-11-17'),
(4, 'Roberto', 'Sánchez', '78901234', 'roberto.sanchez@example.com', '$2a$10$sqz0ohokGP0cfPOr.c7Mw.1wzGF8Czup9qXtopaBXHXeVUZwO.59W', '2023-11-17'),
(5, 'Patricia', 'Torres	', '89012345', 'patricia.torres@example.com', '$2a$10$gOhx8rKlBE.mCFfOj/bx0.NPJyUMNuXiLjZByYge7uY4mZYWjT3m.', '2023-11-17'),
(6, 'Sergio', 'Ramírez', '90123456', 'sergio.ramirez@example.com', '$2a$10$MknAZY2k5xc1GtnaxzkYWeT.bBcNg/F6LZF8OYwYhVJKmQ56pT2r.', '2023-11-17'),
(7, 'Carmen', 'Vargas', '01234567', 'carmen.vargas@example.com', '$2a$10$SnpSrCIKaNgFbJyRsib/vekHl/oUDnLEIoEn0x55Bd0t.JYoTRO6.', '2023-11-17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `image_id` (`image_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`img_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`img_id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
