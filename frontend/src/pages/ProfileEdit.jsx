import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Reutilizamos estilos globales del perfil y añadimos específicos si es necesario

const ProfileEdit = () => {
  const navigate = useNavigate();
  const rawUser = localStorage.getItem('sweetbox_user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre.trim()) {
      setError('El nombre es requerido.');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('sweetbox_token');
      const res = await axios.put(
        'http://localhost:3000/api/auth/profile',
        { nombre, password: password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Guardar el usuario actualizado en localStorage
      localStorage.setItem('sweetbox_user', JSON.stringify(res.data.user));

      // Emitir el evento de cambio para actualizar el resto de la interfaz
      window.dispatchEvent(new Event('sweetbox-auth-change'));

      setSuccess('¡Perfil actualizado con éxito!');
      setPassword('');
      confirmPassword('');

      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      setError(err.response?.data?.error || 'Ocurrió un error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.nombre
    ? user.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <div className="profile-container">
      {/* Fondo decorativo */}
      <div className="profile-bg-blob blob-1" />
      <div className="profile-bg-blob blob-2" />

      {/* Header */}
      <header className="profile-header">
        <button className="profile-back-button" onClick={() => navigate('/profile')}>
          ‹ Volver
        </button>
        <h2 className="profile-header-title">Editar Perfil</h2>
        <div className="profile-header-placeholder" />
      </header>

      {/* Avatar */}
      <div className="profile-avatar-section" style={{ marginBottom: '1.5rem' }}>
        <div className="profile-avatar">
          <span className="profile-avatar-initials">{initials}</span>
        </div>
        <div className="profile-avatar-badge">✏️</div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleUpdate} className="profile-edit-form">
        {error && <div className="profile-alert profile-alert-error">{error}</div>}
        {success && <div className="profile-alert profile-alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={user?.correo || ''}
            disabled
            className="form-input disabled"
          />
          <small className="form-tip">El correo electrónico no puede ser modificado.</small>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar en blanco para mantener actual"
            className="form-input"
          />
        </div>

        {password && (
          <div className="form-group animate-fade-in">
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              required
              className="form-input"
            />
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-save-profile">
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;