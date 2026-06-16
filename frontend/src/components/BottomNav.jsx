import React from 'react';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = ({ activeTab, onTabChange }) => {
  const { totalItems } = useCart();

  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Inicio</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        <span className="nav-icon">❤️</span>
        <span className="nav-label">Favoritos</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'cart' ? 'active' : ''}`}
        onClick={() => onTabChange('cart')}
      >
        <div className="nav-icon-wrapper">
          <span className="nav-icon">🛒</span>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </div>
        <span className="nav-label">Carrito</span>
      </div>

      <div
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-label">Perfil</span>
      </div>
    </nav>
  );
};

export default BottomNav;