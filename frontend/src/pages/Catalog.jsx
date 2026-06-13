import React, { useState, useEffect } from 'react';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = [
    { id: 1, name: 'Cupcakes', icon: '🧁' },
    { id: 2, name: 'Pasteles', icon: '🎂' },
    { id: 3, name: 'Galletas', icon: '🍪' },
    { id: 4, name: 'Brownies', icon: '🍫' }
  ];

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="catalog-container">
      {/* Header Search Bar */}
      <header className="catalog-header">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Buscar tu postre ideal..." />
        </div>
        <button className="settings-btn">⚙️</button>
      </header>

      {/* Categories Row */}
      <section className="categories-section">
        {categories.map(cat => (
          <div key={cat.id} className="category-item">
            <div className="category-icon-wrapper">{cat.icon}</div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </section>

      {/* Filters Row */}
      <section className="filters-section">
        <select><option>Filtros ⌄</option></select>
        <select><option>Ocasión ⌄</option></select>
        <select><option>Precio ⌄</option></select>
      </section>

      {/* Products Grid */}
      <section className="products-grid">
        {loading ? (
          <p className="loading-text">Cargando postres deliciosos...</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.url_imagen} alt={product.nombre} />
                <button className="favorite-btn">🤍</button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.nombre}</h3>
                <div className="product-rating">
                  {'⭐'.repeat(Math.round(product.rating))} 
                  <span className="rating-value">{product.rating}</span>
                </div>
                <p className="product-price">${parseFloat(product.precio).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Catalog;
