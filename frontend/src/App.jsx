import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import BottomNav from './components/BottomNav';

// ─── Ruta protegida: solo accesible con token JWT ─────────────────────────────
const PrivateRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/login" replace />;
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  // Estado reactivo de autenticación — se actualiza al login/logout
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('sweetbox_token'));

  // Escucha cambios en localStorage para refrescar el estado de auth
  useEffect(() => {
    const syncAuth = () => {
      setIsAuth(!!localStorage.getItem('sweetbox_token'));
    };
    window.addEventListener('storage', syncAuth);
    // También escucha el evento personalizado que disparan Login/Register
    window.addEventListener('sweetbox-auth-change', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('sweetbox-auth-change', syncAuth);
    };
  }, []);

  return (
    <Router>
      <div className="app-container" style={{ paddingBottom: isAuth ? '70px' : '0' }}>
        <Routes>
          {/* Pantalla de bienvenida (pública) */}
          <Route path="/" element={<Welcome />} />

          {/* Autenticación (pública) */}
          <Route path="/login" element={<Login onLoginSuccess={() => setIsAuth(true)} />} />
          <Route path="/register" element={<Register />} />

          {/* Catálogo (protegido — requiere haber iniciado sesión) */}
          <Route
            path="/catalog"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Catalog />
              </PrivateRoute>
            }
          />

          {/* Ruta comodín → redirige al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Barra de navegación solo si el usuario está autenticado */}
        {isAuth && (
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </Router>
  );
}

export default App;
