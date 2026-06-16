import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit'; // Importamos el nuevo componente
import BottomNav from './components/BottomNav';

// ─── Ruta protegida: solo accesible con token JWT ─────────────────────────────
const PrivateRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/login" replace />;
};

// ─── Componente interno que tiene acceso al router ────────────────────────────
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('sweetbox_token'));

  // Determinar tab activo según la ruta actual
  const getActiveTab = () => {
    if (location.pathname === '/catalog') return 'home';
    if (location.pathname === '/profile') return 'profile';
    return 'home';
  };

  const handleTabChange = (tab) => {
    if (tab === 'home') navigate('/catalog');
    if (tab === 'profile') navigate('/profile');
    // Favoritos y Carrito se implementarán en sprints posteriores
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate('/login');
  };

  // Escucha cambios en localStorage para refrescar el estado de auth
  useEffect(() => {
    const syncAuth = () => {
      setIsAuth(!!localStorage.getItem('sweetbox_token'));
    };
    window.addEventListener('storage', syncAuth);
    window.addEventListener('sweetbox-auth-change', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('sweetbox-auth-change', syncAuth);
    };
  }, []);

  return (
    <div className="app-container" style={{ paddingBottom: isAuth ? '70px' : '0' }}>
      <Routes>
        {/* Pantalla de bienvenida (pública) */}
        <Route path="/" element={<Welcome />} />

        {/* Autenticación (pública) */}
        <Route path="/login" element={<Login onLoginSuccess={() => setIsAuth(true)} />} />
        <Route path="/register" element={<Register />} />

        {/* Catálogo (protegido) */}
        <Route
          path="/catalog"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Catalog />
            </PrivateRoute>
          }
        />

        {/* Perfil (protegido) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Profile onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Editar Perfil (protegido) */}
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute isAuth={isAuth}>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
        {/* Ruta comodín → redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Barra de navegación solo si el usuario está autenticado */}
      {isAuth && (
        <BottomNav
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
