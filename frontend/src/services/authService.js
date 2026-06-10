import API from '../utils/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('sweetbox_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error al iniciar sesión';
    }
  },

  register: async (nombre, email, password) => {
    try {
      const response = await API.post('/auth/register', { nombre, email, password });
      if (response.data.token) {
        localStorage.setItem('sweetbox_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error al registrar usuario';
    }
  },

  logout: () => {
    localStorage.removeItem('sweetbox_token');
  },

  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      localStorage.removeItem('sweetbox_token');
      throw error.response?.data?.error || 'Sesión no válida';
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('sweetbox_token');
  }
};

export default authService;
