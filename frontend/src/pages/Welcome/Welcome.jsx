import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="logo-section">
          <div className="logo-box">
            <span className="logo-emoji">🧁</span>
          </div>
          <h1 className="brand-title">Welcome to<br /><span className="highlight">SweetBox</span></h1>
        </div>

        <div className="illustration-container">
          {/* Representación de la cajita de postres */}
          <div className="dessert-box">
            <div className="box-lid"></div>
            <div className="box-body">
              <span className="cherry">🍒</span>
              <span className="cupcake">🧁</span>
              <span className="cookie">🍪</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/register')}
          >
            Crear Cuenta
          </button>
          
          <button 
            className="btn btn-secondary-outline"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
        </div>

        <div className="social-login">
          <p className="social-text">Sociale y Inicias ato:</p>
          <div className="social-icons">
            <button className="social-btn facebook" aria-label="Facebook">
              f
            </button>
            <button className="social-btn twitter" aria-label="Twitter">
              t
            </button>
            <button className="social-btn google-plus" aria-label="Google Plus">
              g+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
