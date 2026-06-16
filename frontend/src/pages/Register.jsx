import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import logo from '../assets/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', correo: '', password: '', confirmar: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.nombre || !form.correo || !form.password || !form.confirmar) {
      return setError('Por favor completa todos los campos.');
    }
    if (form.password !== form.confirmar) {
      return setError('Las contraseñas no coinciden.');
    }
    if (form.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        nombre: form.nombre,
        correo: form.correo,
        password: form.password,
      });
      // Registro exitoso → ir al login con mensaje
      navigate('/login', { state: { message: '¡Cuenta creada! Ahora inicia sesión.' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse. Intenta de nuevo.');
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

        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Únete a SweetBox y descubre postres únicos 🍰</p>

        {/* Mensaje de error */}
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: María López"
              value={form.nombre}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input
              id="confirmar"
              name="confirmar"
              type="password"
              placeholder="Repite tu contraseña"
              value={form.confirmar}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button
            id="btn-register-submit"
            type="submit"
            className="btn-auth-primary"
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Crear Cuenta'}
          </button>
        </form>

        {/* Divisor social */}
        <div className="auth-divider">
          <span className="divider-line"></span>
          <span className="divider-text">Únete o inicia con</span>
          <span className="divider-line"></span>
        </div>

        {/* Botones sociales */}
        <div className="social-buttons">
          {/* Google */}
          <button
            id="btn-register-google"
            type="button"
            className="social-btn social-btn--google"
            aria-label="Registrarse con Google"
            onClick={() => alert('Google login próximamente')}
          >
            <svg viewBox="0 0 24 24" className="social-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </button>

          {/* Facebook */}
          <button
            id="btn-register-facebook"
            type="button"
            className="social-btn social-btn--facebook"
            aria-label="Registrarse con Facebook"
            onClick={() => alert('Facebook login próximamente')}
          >
            <svg viewBox="0 0 24 24" className="social-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              <path d="M16.671 15.543l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.513V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="white"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-link">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
