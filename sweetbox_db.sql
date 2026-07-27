-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2026 a las 21:51:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sweetbox_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `nombre`) VALUES
(1, 'Cupcakes'),
(2, 'Pasteles'),
(3, 'Galletas'),
(4, 'Brownies'),
(5, 'Macarons');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorites`
--

INSERT INTO `favorites` (`user_id`, `product_id`) VALUES
(2, 23),
(2, 24),
(5, 1),
(5, 2),
(5, 13),
(5, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('Confirmado','En Preparacion','En Camino','Entregado') DEFAULT 'Confirmado',
  `metodo_pago` varchar(50) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `estado`, `metodo_pago`, `direccion`, `created_at`) VALUES
(1, 2, 70.00, 'Confirmado', 'Efectivo contra entrega', 'barrio eden', '2026-06-17 21:40:16'),
(2, 2, 70.00, 'Confirmado', 'PayPal', 'barrio mercedes', '2026-06-23 00:50:32'),
(3, 5, 50.00, 'Confirmado', 'Efectivo', 'Calle rumiñahui', '2026-06-30 20:47:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `cantidad`, `precio_unitario`) VALUES
(7, 3, 6, 2, 25.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `url_imagen` varchar(255) DEFAULT NULL,
  `ingredientes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `categoria_id`, `precio`, `rating`, `url_imagen`, `ingredientes`) VALUES
(1, 'Strawberry Cupcake', 1, 4.50, 4.90, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', 'Fresa, Crema Pastelera, Harina'),
(2, 'Red Velvet Cupcake', 1, 5.00, 4.80, 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80', 'Chocolate Rojo, Queso Crema, Vainilla'),
(3, 'Lemon Cupcake', 1, 4.75, 4.70, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80', 'Limón, Mantequilla, Betún de Vainilla'),
(4, 'Choco-Mint Cupcake', 1, 5.50, 4.60, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80', 'Chocolate Amargo, Menta, Crema'),
(5, 'Unicorn Cupcake', 1, 6.00, 5.00, 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?w=800&q=80', 'Vainilla, Colorantes Naturales, Fondant'),
(6, 'Personalized Rainbow Cake', 2, 25.00, 5.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', 'Vainilla, Fresa, Crema'),
(7, 'Choco-Berry Delight', 2, 30.00, 4.80, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', 'Chocolate, Fresas, Mora'),
(8, 'Tres Leches Cake', 2, 22.00, 4.90, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', 'Leche Condensada, Crema, Canela'),
(9, 'Cheesecake de Frutos Rojos', 2, 28.00, 4.70, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', 'Queso Crema, Frambuesa, Blueberry'),
(10, 'Naked Cake de Vainilla', 2, 35.00, 4.90, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', 'Vainilla, Crema Batida, Flores Comestibles'),
(11, 'Box of Macarons', 3, 15.00, 4.50, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80', 'Almendra, Azúcar, Pistacho'),
(12, 'Choco Chip Cookies', 3, 8.50, 4.80, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', 'Chispas de Chocolate, Mantequilla, Avena'),
(13, 'Galletas de Avena', 3, 7.00, 4.60, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', 'Avena, Pasas, Canela, Miel'),
(14, 'Galletas de Jengibre', 3, 9.00, 4.70, 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800&q=80', 'Jengibre, Melaza, Canela, Nuez Moscada'),
(15, 'Sandwich Cookies', 3, 10.50, 4.90, 'https://images.unsplash.com/photo-1590080876351-41daaeb94c7a?w=800&q=80', 'Oreo, Crema de Vainilla, Chocolate'),
(16, 'Classic Fudge Brownie', 4, 9.00, 4.90, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Chocolate 70%, Mantequilla, Huevos'),
(17, 'Brownie con Nuez', 4, 10.00, 4.80, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'Nuez Pecana, Chocolate, Azúcar Morena'),
(18, 'Brownie Red Velvet', 4, 11.50, 4.70, 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800&q=80', 'Colorante Rojo, Queso Crema, Cacao'),
(19, 'Brownie de Caramelo', 4, 10.50, 4.60, 'https://images.unsplash.com/photo-1559181567-c3190e573a0a?w=800&q=80', 'Caramelo Salado, Chocolate Amargo'),
(20, 'Blondie de Maracuyá', 4, 11.00, 4.50, 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80', 'Maracuyá, Chocolate Blanco, Vainilla'),
(21, 'Macarons de Fresa', 5, 12.00, 4.90, 'https://images.unsplash.com/photo-1558326567-98166e232c52?w=800&q=80', 'Almendra, Fresa Liofilizada, Crema'),
(22, 'Macarons de Pistacho', 5, 13.00, 4.80, 'https://images.unsplash.com/photo-1534119428213-bd2626145164?w=800&q=80', 'Pistacho, Almendra, Betún Suizo'),
(23, 'Macarons de Lavanda', 5, 14.00, 4.70, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', 'Lavanda, Vainilla Bourbon, Mantequilla'),
(24, 'Macarons de Limón', 5, 12.50, 4.60, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80', 'Limón Meyer, Almendra, Crema de Limón'),
(25, 'Macarons de Chocolate', 5, 13.50, 5.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Cacao Belga, Ganache 70%, Almendra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `correo`, `password`, `created_at`) VALUES
(1, 'Anny Test', 'test@sweetbox.com', '$2b$10$SCJna4n.72/EgqNTlGAStO9EOsZ213/FNo/JKExI/d9V5Le5FgqAS', '2026-06-16 07:17:51'),
(2, 'Anny', 'cancheanny21@gmail.com', '$2b$10$23A19WuJVNggUI5lHSytoe75pWRLF9f3Uv7s0vEo7foYJC/Y0faoe', '2026-06-16 07:19:32'),
(3, 'Darwin', 'Darwincabezas2003@gmail.com', '$2b$10$ED.dalBFOx7HuEve39LE7O6w4cgaCCEemu20tXXKgToaiFQRuQNPq', '2026-06-16 07:20:34'),
(4, 'Daniela', 'Daniela@gmail.com', '$2b$10$P9Covd1mBPMCIxzKsbgSQup6hUKY1wV.0ARpycP4cRW8APDnn643K', '2026-06-16 19:33:00'),
(5, 'Cristian Canacuan', 'ccanacuan@istae.edu.ec', '$2b$10$vdVVLSlbT6lrZ51IqRASousU3B6T7bqk3sRKJoWBgQ4Y1B9Xl.aQS', '2026-06-30 20:44:41');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
