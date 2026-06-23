import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';
import './Profile.css';
import logo from '../assets/logo.png';

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { favoritesCount } = useFavorites();
  const [ordersCount, setOrdersCount] = useState(0);

  // Obtener datos del usuario desde localStorage
  const rawUser = localStorage.getItem('sweetbox_user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const initials = user?.nombre
    ? user.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  useEffect(() => {
    const token = localStorage.getItem('sweetbox_token');
    if (!token) return;

    axios
      .get('http://localhost:3000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrdersCount(res.data.length || 0);
      })
      .catch((err) => {
        console.error('Error al obtener el conteo de pedidos:', err);
      });
  }, []);

  const handleLogout = () => {
    // Limpiar sesión
    localStorage.removeItem('sweetbox_token');
    localStorage.removeItem('sweetbox_user');

    // Notificar al App que el estado de auth cambió
    window.dispatchEvent(new Event('sweetbox-auth-change'));

    if (onLogout) onLogout();

    // Redirigir al login
    navigate('/login');
  };

  return (
    <div className="profile-container">
      {/* Fondo decorativo */}
      <div className="profile-bg-blob blob-1" />
      <div className="profile-bg-blob blob-2" />

      {/* Header */}
      <header className="profile-header">
        <div className="profile-header-logo">
          <img src={logo} alt="SweetBox" />
        </div>
        <h2 className="profile-header-title">Mi Perfil</h2>
        <div className="profile-header-placeholder" />
      </header>

      {/* Avatar */}
      <div className="profile-avatar-section">
        <div className="profile-avatar">
          <span className="profile-avatar-initials">{initials}</span>
        </div>
        <div className="profile-avatar-badge">🍰</div>
        <h1 className="profile-name">{user?.nombre || 'Usuario SweetBox'}</h1>
        <p className="profile-email">{user?.correo || 'correo@ejemplo.com'}</p>
        <span className="profile-member-badge">✨ Miembro Premium</span>
      </div>

      {/* Stats rápidas */}
      <div className="profile-stats">
        <div className="profile-stat-card">
          <span className="stat-icon">📦</span>
          <span className="stat-value">{ordersCount}</span>
          <span className="stat-label">Pedidos</span>
        </div>
        <div className="profile-stat-card" onClick={() => navigate('/favorites')} style={{ cursor: 'pointer' }}>
          <span className="stat-icon">❤️</span>
          <span className="stat-value">{favoritesCount}</span>
          <span className="stat-label">Favoritos</span>
        </div>
        <div className="profile-stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">5.0</span>
          <span className="stat-label">Rating</span>
        </div>
      </div>

      {/* Opciones de perfil */}
      <div className="profile-options">
        <div className="profile-option-item" onClick={() => navigate('/profile/edit')}>
          <div className="option-icon-wrap option-green">
            <span>👤</span>
          </div>
          <div className="option-info">
            <span className="option-title">Editar Perfil</span>
            <span className="option-subtitle">Nombre, foto y datos personales</span>
          </div>
          <span className="option-arrow">›</span>
        </div>

        <div className="profile-option-item">
          <div className="option-icon-wrap option-pink">
            <span>📍</span>
          </div>
          <div className="option-info">
            <span className="option-title">Mis Direcciones</span>
            <span className="option-subtitle">Gestiona tus direcciones de entrega</span>
          </div>
          <span className="option-arrow">›</span>
        </div>

        <div className="profile-option-item">
          <div className="option-icon-wrap option-purple">
            <span>🔔</span>
          </div>
          <div className="option-info">
            <span className="option-title">Notificaciones</span>
            <span className="option-subtitle">Alertas de pedidos y ofertas</span>
          </div>
          <span className="option-arrow">›</span>
        </div>

        <div className="profile-option-item">
          <div className="option-icon-wrap option-blue">
            <span>🔒</span>
          </div>
          <div className="option-info">
            <span className="option-title">Seguridad</span>
            <span className="option-subtitle">Contraseña y privacidad</span>
          </div>
          <span className="option-arrow">›</span>
        </div>
      </div>

      {/* Botón Cerrar Sesión */}
      <button
        id="btn-logout"
        className="btn-logout"
        onClick={() => setShowLogoutModal(true)}
      >
        <span className="btn-logout-icon">🚪</span>
        Cerrar Sesión
      </button>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="logout-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={e => e.stopPropagation()}>
            <div className="logout-modal-icon">👋</div>
            <h3 className="logout-modal-title">¿Cerrar sesión?</h3>
            <p className="logout-modal-text">
              ¿Estás seguro que deseas salir de tu cuenta SweetBox?
            </p>
            <div className="logout-modal-actions">
              <button
                className="btn-modal-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </button>
              <button
                id="btn-logout-confirm"
                className="btn-modal-confirm"
                onClick={handleLogout}
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
