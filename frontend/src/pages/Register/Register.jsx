import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import './Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await register(nombre, email, password);
      // Redirigir al catálogo de postres
      navigate('/catalog');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ←
        </button>
        <h2 className="register-title">Crear Cuenta</h2>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="error-alert">{error}</div>}

        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            id="nombre"
            type="text"
            placeholder="Anny Canche"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary register-submit"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="register-footer">
        <p>¿Ya tienes cuenta? <span onClick={() => navigate('/login')} className="footer-link">Inicia Sesión</span></p>
      </div>
    </div>
  );
};

export default Register;
