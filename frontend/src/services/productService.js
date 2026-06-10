import API from '../utils/api';

const productService = {
  getAllProducts: async (categoria = '', search = '') => {
    try {
      const response = await API.get('/postres', {
        params: { categoria, search }
      });
      return response.data.postres;
    } catch (error) {
      throw error.response?.data?.error || 'Error al obtener productos';
    }
  },

  getProductById: async (id) => {
    try {
      const response = await API.get(`/postres/${id}`);
      return response.data.postre;
    } catch (error) {
      throw error.response?.data?.error || 'Error al obtener detalles del postre';
    }
  }
};

export default productService;
