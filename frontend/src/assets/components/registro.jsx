import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import '../css/registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    telefono: '',
    nombre_granja: '',
    ubicacion: ''
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
      await authService.registro(formData);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.password?.[0]
        || err.response?.data?.email?.[0]
        || err.response?.data?.username?.[0]
        || 'Error al registrar. Verifica los datos.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-contenedor">
      <div className="registro-wrapper">
        {/* Encabezado */}
        <div className="registro-header">
          <h2 className="registro-titulo">Registro de Usuario</h2>
          <p className="registro-subtitulo">Sistema de Gestión de Gallinas Ponedoras</p>
        </div>

        {/* Formulario */}
        <div className="registro-form-contenedor">
          <form className="registro-form" onSubmit={handleSubmit}>
            {/* Mensaje de error */}
            {error && (
              <div className="registro-error">
                {error}
              </div>
            )}

            {/* Nombres y Apellidos */}
            <div className="registro-grid">
              <div className="registro-grupo">
                <label htmlFor="first_name" className="registro-label">
                  Nombres *
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className="registro-input"
                />
              </div>

              <div className="registro-grupo">
                <label htmlFor="last_name" className="registro-label">
                  Apellidos *
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className="registro-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="registro-grupo">
              <label htmlFor="email" className="registro-label">
                Correo Electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="registro-input"
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* Username */}
            <div className="registro-grupo">
              <label htmlFor="username" className="registro-label">
                Nombre de Usuario *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="registro-input"
                placeholder="usuario123"
              />
            </div>

            {/* Teléfono */}
            <div className="registro-grupo">
              <label htmlFor="telefono" className="registro-label">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+573001234567"
                className="registro-input"
              />
            </div>

            {/* Nombre Granja y Ubicación */}
            <div className="registro-grid">
              <div className="registro-grupo">
                <label htmlFor="nombre_granja" className="registro-label">
                  Nombre de la Granja
                </label>
                <input
                  id="nombre_granja"
                  name="nombre_granja"
                  type="text"
                  value={formData.nombre_granja}
                  onChange={handleChange}
                  className="registro-input"
                  placeholder="Mi Granja"
                />
              </div>

              <div className="registro-grupo">
                <label htmlFor="ubicacion" className="registro-label">
                  Ubicación
                </label>
                <input
                  id="ubicacion"
                  name="ubicacion"
                  type="text"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  placeholder="Ciudad, Depto"
                  className="registro-input"
                />
              </div>
            </div>

            {/* Contraseñas */}
            <div className="registro-grid">
              <div className="registro-grupo">
                <label htmlFor="password" className="registro-label">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="registro-input"
                />
              </div>

              <div className="registro-grupo">
                <label htmlFor="password2" className="registro-label">
                  Confirmar Contraseña *
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  required
                  value={formData.password2}
                  onChange={handleChange}
                  className="registro-input"
                />
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={loading}
              className="registro-btn"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            {/* Footer */}
            <div className="registro-footer">
              <p className="registro-footer-texto">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="registro-link">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;