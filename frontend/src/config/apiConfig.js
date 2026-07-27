// Punto central de configuración de la API.
// Vite reemplaza VITE_API_URL automáticamente según el entorno.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_URL;
