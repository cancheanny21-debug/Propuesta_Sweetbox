import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      await login(email, password);
      // Redirigir al catálogo de postres
      navigate('/catalog');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ←
        </button>
        <h2 className="login-title">Iniciar Sesión</h2>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-alert">{error}</div>}

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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary login-submit"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="login-footer">
        <p>¿No tienes cuenta? <span onClick={() => navigate('/register')} className="footer-link">Regístrate</span></p>
      </div>
    </div>
  );
};

export default Login;
