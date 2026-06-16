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

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-link">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
