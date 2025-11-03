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
    <>
      <section className='login-section'>
        <div className="login-contenedor">
          <div className="login-contenido-principal">
            <div className='login-header'>
              <h2 className="login-titulo">
                Iniciar Sesión
              </h2>
              <p className="login-subtitulo">
                Sistema de Gestión de Gallinas Ponedoras
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="targeta-contenido_error">
                  <p className="targeta-error">{error}</p>
                </div>
              )}

              <div className='login-row'>

                <div className="targeta-login">
                  <div>
                    <label htmlFor="email" className="label-email">
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
                      className="input-email"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="label-password">
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
                      className="input-password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="targeta-recordarme">
                  <div className="div-recordarme">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="input-recordarme"
                    />
                    <label htmlFor="remember-me" className="label-recordarme">
                      Recordarme
                    </label>
                  </div>

                  <div className="div-olvidar-password">
                    <a href="#" className="link-olvidar-password">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                <div className='targeta-login'>
                  <button
                    type="submit"
                    disabled={loading}
                    className="boton-iniciar_sesion"
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </button>
                </div>

                <div className="targeta-login">
                  <p className="p-resgistrar">
                    ¿No tienes cuenta?{' '}
                    <Link to="/registro" className="link-registro">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;