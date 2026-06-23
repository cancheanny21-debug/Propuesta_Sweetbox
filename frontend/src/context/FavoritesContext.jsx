import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => {
    const token = localStorage.getItem('sweetbox_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadFavorites = async () => {
    const token = localStorage.getItem('sweetbox_token');
    if (!token) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/favorites', {
        headers: getHeaders(),
      });
      setFavorites(res.data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (product) => {
    const token = localStorage.getItem('sweetbox_token');
    if (!token) return;

    const isFav = favorites.some((fav) => fav.id === product.id);

    try {
      if (isFav) {
        // Eliminar de favoritos
        await axios.delete(`http://localhost:3000/api/favorites/${product.id}`, {
          headers: getHeaders(),
        });
        setFavorites((prev) => prev.filter((fav) => fav.id !== product.id));
      } else {
        // Agregar a favoritos
        await axios.post(
          'http://localhost:3000/api/favorites',
          { product_id: product.id },
          { headers: getHeaders() }
        );
        // Agregar el producto al estado local (incluyendo categoría)
        setFavorites((prev) => [...prev, product]);
      }
    } catch (error) {
      console.error('Error al modificar favorito:', error);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  // Escuchar cuando el usuario inicie o cierre sesión
  useEffect(() => {
    loadFavorites();

    const handleAuthChange = () => {
      loadFavorites();
    };

    window.addEventListener('sweetbox-auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('sweetbox-auth-change', handleAuthChange);
    };
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        toggleFavorite,
        isFavorite,
        loadFavorites,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de FavoritesProvider');
  }
  return context;
};
