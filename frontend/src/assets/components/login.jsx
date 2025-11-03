import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas. Verifica tu email y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-contenedor">
      <div className="login-wrapper">
        {/* Encabezado */}
        <div className="login-header">
          <h2 className="login-titulo">Iniciar Sesión</h2>
          <p className="login-subtitulo">Sistema de Gestión de Gallinas Ponedoras</p>
        </div>

        {/* Formulario */}
        <div className="login-form-contenedor">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Mensaje de error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="login-grupo">
              <label htmlFor="email" className="login-label">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="login-input"
                placeholder="tu@email.com"
              />
            </div>

            {/* Contraseña */}
            <div className="login-grupo">
              <label htmlFor="password" className="login-label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                placeholder="••••••••"
              />
            </div>

            {/* Recordarme y olvidar contraseña */}
            <div className="login-opciones">
              <div className="login-recordarme">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="login-checkbox"
                />
                <label htmlFor="remember-me" className="login-recordarme-label">
                  Recordarme
                </label>
              </div>

              <a href="#" className="login-olvidar-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            {/* Footer */}
            <div className="login-footer">
              <p className="login-footer-texto">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="login-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;