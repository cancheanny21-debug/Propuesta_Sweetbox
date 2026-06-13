CREATE DATABASE IF NOT EXISTS sweetbox_db;
USE sweetbox_db;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria_id INT,
    precio DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0,
    url_imagen VARCHAR(255),
    ingredientes TEXT,
    FOREIGN KEY (categoria_id) REFERENCES Categories(id)
);

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('Confirmado', 'En Preparacion', 'En Camino', 'Entregado') DEFAULT 'Confirmado',
    metodo_pago VARCHAR(50),
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Order_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Favorites (
    user_id INT,
    product_id INT,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Insertar categorías por defecto
INSERT IGNORE INTO Categories (id, nombre) VALUES (1, 'Cupcakes'), (2, 'Pasteles'), (3, 'Galletas'), (4, 'Brownies');

-- Insertar productos de prueba
INSERT IGNORE INTO Products (id, nombre, categoria_id, precio, rating, url_imagen, ingredientes) VALUES 
(1, 'Personalized Rainbow Cake', 2, 25.00, 5.0, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Vainilla, Fresa, Crema'),
(2, 'Choco-Berry Delight', 2, 30.00, 4.8, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chocolate, Fresas, Mora'),
(3, 'Box of Macarons', 3, 15.00, 4.5, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Almendra, Azúcar, Pistacho'),
(4, 'Strawberry Cupcake', 1, 4.50, 4.9, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Fresa, Crema Pastelera');
