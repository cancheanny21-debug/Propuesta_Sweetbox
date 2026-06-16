import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Catalog.css'; // Asumiendo un archivo CSS para estilos

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Asumiendo que el token se guarda en localStorage después del login
        const token = localStorage.getItem('sweetbox_token');
        const response = await axios.get('http://localhost:3000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos. Asegúrate de haber iniciado sesión.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return <div className="catalog-container loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="catalog-container error-message">{error}</div>;
  }

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        {/* Placeholder para la barra de búsqueda y filtros como se describe en documentacion_tecnica.md */}
        <h2 className="catalog-title">Nuestro Catálogo</h2>
        <div className="search-filter-section">
          <input type="text" placeholder="Buscar tu postre ideal..." className="search-input" />
          <button className="filter-button">Filtros</button>
        </div>
      </header>

      <div className="category-nav">
        {/* Placeholder para la navegación por categorías */}
        <div className="category-item">Cupcakes</div>
        <div className="category-item">Pasteles</div>
        <div className="category-item">Galletas</div>
        <div className="category-item">Brownies</div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.url_imagen} alt={product.nombre} className="product-image" />
              <button className="favorite-button" aria-label="Añadir a favoritos">❤️</button> {/* Placeholder para botón de favoritos */}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.nombre}</h3>
              <div className="product-rating">
                {'⭐'.repeat(Math.round(product.rating))} ({product.rating})
              </div>
              <p className="product-price">${parseFloat(product.precio).toFixed(2)}</p>
              <button className="btn-add-to-cart" onClick={() => handleAddToCart(product)}>
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;