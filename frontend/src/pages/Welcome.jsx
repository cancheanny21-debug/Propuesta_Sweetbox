import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import logo from '../assets/logo.png';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Background Decorative Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="welcome-content">
        <h1 className="welcome-title">Bienvenido a<br />SweetBox</h1>

        <div className="logo-container">
          <img src={logo} alt="SweetBox Logo" className="welcome-logo" />
        </div>

        <h2 className="brand-name">Caja Dulce</h2>

        <div className="action-buttons">
          {/* ✅ Ahora redirige al formulario de registro */}
          <button
            id="btn-crear-cuenta"
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            Crear Cuenta
          </button>

          {/* ✅ Ahora redirige al formulario de login */}
          <button
            id="btn-iniciar-sesion"
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
        </div>

        <div className="social-login">
          <p>Únete o Inicia con:</p>
          <div className="social-icons">
            <button className="social-btn facebook" aria-label="Iniciar con Facebook">f</button>
            <button className="social-btn twitter" aria-label="Iniciar con Twitter">t</button>
            <button className="social-btn google" aria-label="Iniciar con Google">G+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
