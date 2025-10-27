import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

// Configurar axios para incluir el token en todas las peticiones
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada petición
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

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
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

// Funciones del servicio de autenticación
const authService = {
  // Registrar nuevo usuario
  registro: async (userData) => {
    const response = await api.post('registro/', userData);
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Iniciar sesión
  login: async (email, password) => {
    const response = await api.post('login/', { email, password });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Cerrar sesión
  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      await api.post('logout/', { refresh_token: refreshToken });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  // Obtener perfil del usuario
  getPerfil: async () => {
    const response = await api.get('perfil/');
    return response.data;
  },

  // Actualizar perfil
  actualizarPerfil: async (userData) => {
    const response = await api.put('perfil/', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  // Cambiar contraseña
  cambiarPassword: async (passwordData) => {
    const response = await api.put('cambiar-password/', passwordData);
    return response.data;
  },

  // Obtener usuario actual del localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si hay un token válido
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};

export default authService;