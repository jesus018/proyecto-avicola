import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/dashboard.css';
import authService from '../../services/authService';
import LayoutOverlay from '../components/LayoutOverlay';
import Gastos from '../components/gastos';
import Ingresos from '../components/ingresos';
import Resumen from '../components/resumen';
import Exportar from '../components/exportar';



const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGastosOpen, setIsGastosOpen] = useState(false);
  const [isIngresosOpen, setIsIngresosOpen] = useState(false);
  const [isResumenOpen, setIsResumenOpen] = useState(false);
  const [isExportarOpen, setIsExportarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const perfil = await authService.getPerfil();
        setUser(perfil);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const mostrarGastosClick = () => {
    setIsGastosOpen(true);
    setIsIngresosOpen(false);
    setIsResumenOpen(false);
    setIsExportarOpen(false);
    setActiveTab('accion-gasto');
  }

  const mostrarIngresosClick = () => {
    setIsIngresosOpen(true);
    setIsGastosOpen(false);
    setIsResumenOpen(false);
    setIsExportarOpen(false);
    setActiveTab('accion-ingreso');
  }

  const mostrarResumenClick = () => {
    setIsResumenOpen(true);
    setIsGastosOpen(false);
    setIsIngresosOpen(false);
    setIsExportarOpen(false);
    setActiveTab('accion-resumen');
  }

  const mostrarConfiguracionClick = () => {
    setIsExportarOpen(true);
    setIsGastosOpen(false);
    setIsIngresosOpen(false);
    setIsResumenOpen(false);
    setActiveTab('accion-configuracion');
  }

  if (loading) {
    return (
      <div className="cargando-contenedor">
        <div className="cargando-texto">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      <section className="dashboard-seccion">
        <div className="dashboard-contenedor">
          {/* Navbar */}
          <nav className="dashboard-navbar">
            <div className="navbar-contenido">
              <div className="navbar-header">
                <div className="navbar-titulo">
                  <h1>🐔 Control Financiero</h1>
                  <p>Empresa de Gallinas Ponedoras</p>
                </div>
                {/* <div className="navbar-acciones">
                <span className="usuario-nombre">
                  {user?.first_name} {user?.last_name}
                </span>
                <button onClick={handleLogout} className="btn-cerrar-sesion">
                  Cerrar Sesión
                </button>
              </div> */}
              </div>
            </div>
          </nav>

          {/* Contenido Principal */}
          <div className="dashboard-contenido-principal">
            <div className="dashboard-contenido-interno">
              {/* Tarjeta de bienvenida */}
              <div className="tarjeta-bienvenida">
                <div className="tarjeta-contenido_bienvenido">
                  <h2 className="bienvenida-titulo">
                    ¡Bienvenido, {user?.first_name}!
                  </h2>
                  <p className="bienvenida-texto">
                    Has iniciado sesión exitosamente en el sistema.
                  </p>
                </div>
                <div className="tarjeta-acciones">
                  {/* <span className="usuario-nombre">
                    {user?.first_name} {user?.last_name}
                  </span> */}
                  <button onClick={handleLogout} className="btn-cerrar-sesion">
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              {/* Información del usuario */}
              <div className="tarjeta-perfil">
                <div className="tarjeta-contenido">
                  <h3 className="perfil-titulo">Información del Perfil</h3>
                  <div className="perfil-grid">
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Email</p>
                      <p className="campo-valor">{user?.email}</p>
                    </div>
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Usuario</p>
                      <p className="campo-valor">{user?.username}</p>
                    </div>
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Teléfono</p>
                      <p className="campo-valor">{user?.telefono || 'No especificado'}</p>
                    </div>
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Nombre de la Granja</p>
                      <p className="campo-valor">{user?.nombre_granja || 'No especificado'}</p>
                    </div>
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Ubicación</p>
                      <p className="campo-valor">{user?.ubicacion || 'No especificado'}</p>
                    </div>
                    <div className="perfil-campo">
                      <p className="campo-etiqueta">Fecha de Registro</p>
                      <p className="campo-valor">
                        {new Date(user?.fecha_creacion).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards de estadísticas */}
              <div className="estadisticas-grid">
                <div className="estadistica-card estadistica-ingresos">
                  <div className="estadistica-contenido">
                    <div className="estadistica-flex">
                      <div className="estadistica-icono-contenedor icono-ingresos">
                        <svg className="estadistica-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="estadistica-info">
                        <dt className="estadistica-etiqueta">Total Ingresos</dt>
                        <dd className="estadistica-monto">$0.00</dd>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="estadistica-card estadistica-gastos">
                  <div className="estadistica-contenido">
                    <div className="estadistica-flex">
                      <div className="estadistica-icono-contenedor icono-gastos">
                        <svg className="estadistica-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="estadistica-info">
                        <dt className="estadistica-etiqueta">Gastos Totales</dt>
                        <dd className="estadistica-monto">$0.00</dd>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="estadistica-card estadistica-balance">
                  <div className="estadistica-contenido">
                    <div className="estadistica-flex">
                      <div className="estadistica-icono-contenedor icono-balance">
                        <svg className="estadistica-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="estadistica-info">
                        <dt className="estadistica-etiqueta">Balance</dt>
                        <dd className="estadistica-monto">$0.00</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="acciones-rapidas-contenedor">
                <div className="tarjeta-contenido">
                  <h3 className="acciones-titulo">Acciones Rápidas</h3>
                  <div className="acciones-grid">
                    <button className={`accion-btn accion-ingreso ${activeTab === 'accion-ingreso' ? 'active' : ''}`}
                      onClick={mostrarIngresosClick}
                    >
                      <svg className="accion-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Registrar Ingreso
                    </button>
                    <button className={`accion-btn accion-gasto ${activeTab === 'accion-gasto' ? 'active' : ''}`}
                      onClick={mostrarGastosClick}
                    >
                      <svg className="accion-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                      Registrar Gasto
                    </button>
                    <button className={`accion-btn accion-resumen ${activeTab === 'accion-resumen' ? 'active' : ''}`}
                      onClick={mostrarResumenClick}
                    >
                      <svg className="accion-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Ver Resumen
                    </button>
                    <button className={`accion-btn accion-configuracion ${activeTab === 'accion-configuracion' ? 'active' : ''}`}
                      onClick={mostrarConfiguracionClick}
                    >
                      <svg className="accion-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Configuración

                    </button>
                  </div>
                </div>
              </div>

              <div className="tab-botones">
                {
                  isIngresosOpen ? (
                    <Ingresos isOpen={isIngresosOpen} onClose={() => setIsIngresosOpen(false)} />
                  ) : isGastosOpen ? (
                    <Gastos isOpen={isGastosOpen} onClose={() => setIsGastosOpen(false)} />
                  ) : isResumenOpen ? (
                    <Resumen isOpen={isResumenOpen} onClose={() => setIsResumenOpen(false)} />
                  ) : isExportarOpen ? (
                    <Exportar isOpen={isExportarOpen} onClose={() => setIsExportarOpen(false)} />
                  ) : <LayoutOverlay />
                }
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Dashboard;