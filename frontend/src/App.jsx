import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Catalog from './pages/Catalog/Catalog';

// Componente para proteger rutas que requieren inicio de sesión
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        color: '#F48FB1'
      }}>
        <h2>Cargando SweetBox... 🧁</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Componente para evitar que usuarios autenticados vayan a login/register/welcome
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to="/catalog" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Rutas Protegidas */}
          <Route path="/catalog" element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
