import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';   // Sprint 5
import Tracking from './pages/Tracking';   // Sprint 5
import Favorites from './pages/Favorites'; // Sprint 6
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext'; // Sprint 6
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
    if (location.pathname === '/cart') return 'cart';
    if (location.pathname === '/favorites') return 'favorites';
    return 'home';
  };

  const handleTabChange = (tab) => {
    if (tab === 'home') navigate('/catalog');
    if (tab === 'profile') navigate('/profile');
    if (tab === 'cart') navigate('/cart');
    if (tab === 'favorites') navigate('/favorites');
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
    <div className="app-container" style={{ paddingBottom: isAuth && !['/', '/login', '/register'].includes(location.pathname) ? '70px' : '0' }}>
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

        {/* Carrito de Compras (protegido) */}
        <Route
          path="/cart"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Favoritos (Sprint 6, protegido) */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />

        {/* Checkout — Pagos (Sprint 5, protegido) */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Checkout />
            </PrivateRoute>
          }
        />

        {/* Seguimiento de Pedido (Sprint 5, protegido) */}
        <Route
          path="/tracking"
          element={
            <PrivateRoute isAuth={isAuth}>
              <Tracking />
            </PrivateRoute>
          }
        />

        {/* Ruta comodín → redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Barra de navegación solo si el usuario está autenticado y no está en pantallas públicas */}
      {isAuth && !['/', '/login', '/register'].includes(location.pathname) && (
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
      <CartProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
