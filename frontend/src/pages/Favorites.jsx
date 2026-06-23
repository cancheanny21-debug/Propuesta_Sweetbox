import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import './Favorites.css';

// Configuración visual por categoría
const CATEGORY_CONFIG = {
  'Magdalenas': { icon: '🧁' },
  'Cupcakes':   { icon: '🧁' },
  'Pasteles':   { icon: '🎂' },
  'Galletas':   { icon: '🍪' },
  'Donas':      { icon: '🥩' },
  'Brownies':   { icon: '🍫' },
  'Macarons':   { icon: '🌈' },
};
const DEFAULT_CFG = { icon: '🍬' };
const getCatIcon = (nombre) => (CATEGORY_CONFIG[nombre] || DEFAULT_CFG).icon;

const Favorites = () => {
  const { favorites, loading, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedMap, setAddedMap] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [product.id]: false })), 1200);
  };

  const renderStars = (rating) => {
    const full  = Math.floor(rating);
    const half  = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  return (
    <div className="favorites-container">
      {/* Fondo decorativo */}
      <div className="favorites-bg-blob blob-1" />
      <div className="favorites-bg-blob blob-2" />

      {/* Header */}
      <header className="favorites-header">
        <h1 className="favorites-title">Mis Favoritos ❤️</h1>
        <p className="favorites-subtitle">Tus postres preferidos en un solo lugar</p>
      </header>

      {/* Cargando */}
      {loading && (
        <div className="favorites-state-screen">
          <div className="favorites-spinner" />
          <p>Cargando tus favoritos...</p>
        </div>
      )}

      {/* Lista vacía */}
      {!loading && favorites.length === 0 && (
        <div className="favorites-state-screen">
          <span className="favorites-state-icon">💖</span>
          <h3>Aún no tienes favoritos</h3>
          <p>Explora nuestro catálogo y guarda los postres que más te gusten.</p>
          <button className="btn-explore" onClick={() => navigate('/catalog')}>
            Explorar Catálogo
          </button>
        </div>
      )}

      {/* Grid de favoritos */}
      {!loading && favorites.length > 0 && (
        <div className="favorites-grid">
          {favorites.map(product => {
            const catName = product.categoria_nombre || 'Producto';
            const catIcon = getCatIcon(catName);
            return (
              <div key={product.id} className="favorites-card">
                <div className="favorites-image-wrapper">
                  <img
                    src={product.url_imagen}
                    alt={product.nombre}
                    className="favorites-image"
                    loading="lazy"
                  />
                  <button
                    className="fav-toggle-button active"
                    onClick={() => toggleFavorite(product)}
                    aria-label="Quitar de favoritos"
                  >
                    ❤️
                  </button>
                  <div className="favorites-category-badge">
                    {catIcon} {catName}
                  </div>
                </div>
                <div className="favorites-info">
                  <h3 className="favorites-name">{product.nombre}</h3>
                  <div className="favorites-rating">
                    <span className="stars">{renderStars(product.rating)}</span>
                    <span className="rating-val">({product.rating})</span>
                  </div>
                  {product.ingredientes && (
                    <p className="favorites-ingredients">🌿 {product.ingredientes}</p>
                  )}
                  <div className="favorites-footer">
                    <p className="favorites-price">${parseFloat(product.precio).toFixed(2)}</p>
                    <button
                      id={`add-cart-fav-${product.id}`}
                      className={`btn-add-to-cart ${addedMap[product.id] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedMap[product.id] ? '✓' : '+ 🛒'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
