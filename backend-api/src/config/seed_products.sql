-- ═══════════════════════════════════════════════════════════
-- seed_products.sql — Script para agregar productos nuevos
-- Ejecutar en sweetbox_db (XAMPP / WAMP / terminal MySQL)
-- ═══════════════════════════════════════════════════════════
USE sweetbox_db;

-- Agregar categoría Macarons si no existe
INSERT IGNORE INTO Categories (id, nombre) VALUES (5, 'Macarons');

-- Limpiar productos viejos (IDs 1-4) para reinsertarlos con datos actualizados
DELETE FROM Order_Items WHERE product_id IN (1, 2, 3, 4);
DELETE FROM Favorites   WHERE product_id IN (1, 2, 3, 4);
DELETE FROM Products    WHERE id IN (1, 2, 3, 4);

-- Reinsertar todos los productos (1-25) con datos correctos
INSERT INTO Products (id, nombre, categoria_id, precio, rating, url_imagen, ingredientes) VALUES

-- Cupcakes
(1,  'Strawberry Cupcake',         1,  4.50, 4.9, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', 'Fresa, Crema Pastelera, Harina'),
(2,  'Red Velvet Cupcake',         1,  5.00, 4.8, 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80', 'Chocolate Rojo, Queso Crema, Vainilla'),
(3,  'Lemon Cupcake',              1,  4.75, 4.7, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80', 'Limón, Mantequilla, Betún de Vainilla'),
(4,  'Choco-Mint Cupcake',         1,  5.50, 4.6, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80', 'Chocolate Amargo, Menta, Crema'),
(5,  'Unicorn Cupcake',            1,  6.00, 5.0, 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?w=800&q=80', 'Vainilla, Colorantes Naturales, Fondant'),

-- Pasteles
(6,  'Personalized Rainbow Cake',  2, 25.00, 5.0, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', 'Vainilla, Fresa, Crema'),
(7,  'Choco-Berry Delight',        2, 30.00, 4.8, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', 'Chocolate, Fresas, Mora'),
(8,  'Tres Leches Cake',           2, 22.00, 4.9, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', 'Leche Condensada, Crema, Canela'),
(9,  'Cheesecake de Frutos Rojos', 2, 28.00, 4.7, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', 'Queso Crema, Frambuesa, Blueberry'),
(10, 'Naked Cake de Vainilla',     2, 35.00, 4.9, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', 'Vainilla, Crema Batida, Flores Comestibles'),

-- Galletas
(11, 'Box of Macarons',            3, 15.00, 4.5, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80', 'Almendra, Azúcar, Pistacho'),
(12, 'Choco Chip Cookies',         3,  8.50, 4.8, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', 'Chispas de Chocolate, Mantequilla, Avena'),
(13, 'Galletas de Avena',          3,  7.00, 4.6, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', 'Avena, Pasas, Canela, Miel'),
(14, 'Galletas de Jengibre',       3,  9.00, 4.7, 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800&q=80', 'Jengibre, Melaza, Canela, Nuez Moscada'),
(15, 'Sandwich Cookies',           3, 10.50, 4.9, 'https://images.unsplash.com/photo-1590080876351-41daaeb94c7a?w=800&q=80', 'Oreo, Crema de Vainilla, Chocolate'),

-- Brownies
(16, 'Classic Fudge Brownie',      4,  9.00, 4.9, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Chocolate 70%, Mantequilla, Huevos'),
(17, 'Brownie con Nuez',           4, 10.00, 4.8, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', 'Nuez Pecana, Chocolate, Azúcar Morena'),
(18, 'Brownie Red Velvet',         4, 11.50, 4.7, 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800&q=80', 'Colorante Rojo, Queso Crema, Cacao'),
(19, 'Brownie de Caramelo',        4, 10.50, 4.6, 'https://images.unsplash.com/photo-1559181567-c3190e573a0a?w=800&q=80', 'Caramelo Salado, Chocolate Amargo'),
(20, 'Blondie de Maracuyá',        4, 11.00, 4.5, 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80', 'Maracuyá, Chocolate Blanco, Vainilla'),

-- Macarons
(21, 'Macarons de Fresa',          5, 12.00, 4.9, 'https://images.unsplash.com/photo-1558326567-98166e232c52?w=800&q=80', 'Almendra, Fresa Liofilizada, Crema'),
(22, 'Macarons de Pistacho',       5, 13.00, 4.8, 'https://images.unsplash.com/photo-1534119428213-bd2626145164?w=800&q=80', 'Pistacho, Almendra, Betún Suizo'),
(23, 'Macarons de Lavanda',        5, 14.00, 4.7, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80', 'Lavanda, Vainilla Bourbon, Mantequilla'),
(24, 'Macarons de Limón',          5, 12.50, 4.6, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80', 'Limón Meyer, Almendra, Crema de Limón'),
(25, 'Macarons de Chocolate',      5, 13.50, 5.0, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Cacao Belga, Ganache 70%, Almendra');

SELECT CONCAT('✅ Insertados ', COUNT(*), ' productos en ', COUNT(DISTINCT categoria_id), ' categorías.') AS resultado FROM Products;
