import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Evita abrir el detalle al hacer clic en el corazón
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-image-container">
        <img 
          src={product.imagen_url || 'https://via.placeholder.com/150'} 
          alt={product.nombre} 
          className="product-image"
          loading="lazy"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
          onClick={toggleFavorite}
          aria-label="Agregar a favoritos"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="product-info">
        <h4 className="product-name">{product.nombre}</h4>
        
        <div className="product-rating">
          <span className="star-icon">⭐</span>
          <span className="rating-value">{parseFloat(product.calificacion).toFixed(1)}</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">${parseFloat(product.precio).toFixed(2)}</span>
          <span className="add-btn-icon">＋</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
