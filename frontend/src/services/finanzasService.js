import axios from 'axios';

const API_URL = 'http://localhost:8000/api/finanzas/';

// Configurar axios para incluir el token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const finanzasService = {
  // ========== GASTOS DE CONSTRUCCIÓN ==========
  getGastosConstruccion: async () => {
    const response = await api.get('gastos-construccion/');
    return response.data;
  },

  createGastoConstruccion: async (data) => {
    const response = await api.post('gastos-construccion/', data);
    return response.data;
  },

  updateGastoConstruccion: async (id, data) => {
    const response = await api.put(`gastos-construccion/${id}/`, data);
    return response.data;
  },

  deleteGastoConstruccion: async (id) => {
    const response = await api.delete(`gastos-construccion/${id}/`);
    return response.data;
  },

  // ========== GASTOS DE CRIANZA ==========
  getGastosCrianza: async () => {
    const response = await api.get('gastos-crianza/');
    return response.data;
  },

  createGastoCrianza: async (data) => {
    const response = await api.post('gastos-crianza/', data);
    return response.data;
  },

  updateGastoCrianza: async (id, data) => {
    const response = await api.put(`gastos-crianza/${id}/`, data);
    return response.data;
  },

  deleteGastoCrianza: async (id) => {
    const response = await api.delete(`gastos-crianza/${id}/`);
    return response.data;
  },

  getGastosCrianzaPorTipo: async () => {
    const response = await api.get('gastos-crianza/por_tipo/');
    return response.data;
  },

  // ========== VENTAS ==========
  getVentas: async () => {
    const response = await api.get('ventas/');
    return response.data;
  },

  createVenta: async (data) => {
    const response = await api.post('ventas/', data);
    return response.data;
  },

  updateVenta: async (id, data) => {
    const response = await api.put(`ventas/${id}/`, data);
    return response.data;
  },

  deleteVenta: async (id) => {
    const response = await api.delete(`ventas/${id}/`);
    return response.data;
  },

  // ========== RESUMEN FINANCIERO ==========
  getResumen: async () => {
    const response = await api.get('resumen/resumen/');
    return response.data;
  },

  exportarCSV: async () => {
    const response = await api.get('resumen/exportar_csv/', {
      responseType: 'blob',
    });

    // Crear un enlace para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'control_financiero_gallinas.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();

    return response.data;
  },
};

export default finanzasService;