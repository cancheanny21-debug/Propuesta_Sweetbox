import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import logo from '../assets/logo.png';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Mostrar mensaje de éxito si viene de Register
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.correo || !form.password) {
      return setError('Por favor ingresa tu correo y contraseña.');
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        correo: form.correo,
        password: form.password,
      });

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('sweetbox_token', res.data.token);
      localStorage.setItem('sweetbox_user', JSON.stringify(res.data.user));

      // Notificar al App que el estado de auth cambió
      if (onLoginSuccess) onLoginSuccess();
      window.dispatchEvent(new Event('sweetbox-auth-change'));

      // Redirigir al catálogo
      navigate('/catalog');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Decoraciones de fondo */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="auth-card">
        {/* Logo pequeño */}
        <div className="auth-logo-mini">
          <img src={logo} alt="SweetBox Logo" />
        </div>

        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">¡Bienvenido de vuelta! 👋</p>

        {/* Mensaje de éxito (viene de registro) */}
        {successMsg && (
          <div className="auth-success">
            <span>✅</span> {successMsg}
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              value={form.correo}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Tu contraseña"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            className="btn-auth-primary"
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-switch">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="auth-link">Crear Cuenta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
