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
        <h1 className="welcome-title">Welcome to<br />SweetBox</h1>
        
        <div className="logo-container">
          <img src={logo} alt="SweetBox Logo" className="welcome-logo" />
        </div>

        <h2 className="brand-name">SweetBox</h2>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/catalog')}>Crear Cuenta</button>
          <button className="btn btn-secondary" onClick={() => navigate('/catalog')}>Iniciar Sesión</button>
        </div>

        <div className="social-login">
          <p>Únete o Inicia con:</p>
          <div className="social-icons">
            <button className="social-btn facebook">f</button>
            <button className="social-btn twitter">t</button>
            <button className="social-btn google">G+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
