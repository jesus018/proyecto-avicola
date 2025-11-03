import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import finanzasService from '../../services/finanzasService';

const Gastos = ({ isOpen, onUpdate }) => {
  const [gastosConstruccion, setGastosConstruccion] = useState([]);
  const [gastosCrianza, setGastosCrianza] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estados para formularios
  const [formConstruccion, setFormConstruccion] = useState({
    descripcion: '',
    cantidad: '',
    precio_unitario: ''
  });

  const [formCrianza, setFormCrianza] = useState({
    tipo: 'pollitos',
    descripcion: '',
    costo: ''
  });

  useEffect(() => {
    if (isOpen) {
      cargarGastos();
    }
  }, [isOpen]);

  const cargarGastos = async () => {
    try {
      setLoading(true);
      const [construccion, crianza] = await Promise.all([
        finanzasService.getGastosConstruccion(),
        finanzasService.getGastosCrianza()
      ]);
      setGastosConstruccion(construccion.results || construccion);
      setGastosCrianza(crianza.results || crianza);
      setError('');
    } catch (err) {
      setError('Error al cargar los gastos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConstruccionSubmit = async (e) => {
    e.preventDefault();
    try {
      await finanzasService.createGastoConstruccion(formConstruccion);
      setFormConstruccion({ descripcion: '', cantidad: '', precio_unitario: '' });
      cargarGastos();
      if (onUpdate) onUpdate();
      alert('Gasto de construcción agregado exitosamente');
    } catch (err) {
      alert('Error al agregar gasto: ' + (err.response?.data?.message || 'Error desconocido'));
    }
  };

  const handleCrianzaSubmit = async (e) => {
    e.preventDefault();
    try {
      await finanzasService.createGastoCrianza(formCrianza);
      setFormCrianza({ tipo: 'pollitos', descripcion: '', costo: '' });
      cargarGastos();
      alert('Gasto de crianza agregado exitosamente');
    } catch (err) {
      alert('Error al agregar gasto: ' + (err.response?.data?.message || 'Error desconocido'));
    }
  };

  const eliminarConstruccion = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este gasto?')) {
      try {
        await finanzasService.deleteGastoConstruccion(id);
        cargarGastos();
      } catch (err) {
        alert('Error al eliminar el gasto: ' + err.message);
      }
    }
  };

  const eliminarCrianza = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este gasto?')) {
      try {
        await finanzasService.deleteGastoCrianza(id);
        cargarGastos();
      } catch (err) {
        alert('Error al eliminar el gasto: ' + (err?.message || 'Error desconocido'));
        console.error(err);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section>
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <div id="gastos" className="tab-content active">
          {/* GASTOS DE CONSTRUCCIÓN */}
          <div className="construction-section">
            <h3 className="section-title">🏗️ Gastos de Construcción del Galpón</h3>

            <form onSubmit={handleConstruccionSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Descripción del Material/Servicio:</label>
                  <input
                    type="text"
                    value={formConstruccion.descripcion}
                    onChange={(e) => setFormConstruccion({ ...formConstruccion, descripcion: e.target.value })}
                    placeholder="Ej: Cemento, ladrillos, mano de obra..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    value={formConstruccion.cantidad}
                    onChange={(e) => setFormConstruccion({ ...formConstruccion, cantidad: e.target.value })}
                    placeholder="1"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio Unitario ($):</label>
                  <input
                    type="number"
                    value={formConstruccion.precio_unitario}
                    onChange={(e) => setFormConstruccion({ ...formConstruccion, precio_unitario: e.target.value })}
                    step="0.01"
                    placeholder="0.00"
                    min="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Agregando...' : 'Agregar'}
                  </button>
                </div>
              </div>
            </form>

            <table className="table" id="construccion-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>Cargando...</td>
                  </tr>
                )}
                {!loading && gastosConstruccion.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No hay gastos registrados</td>
                  </tr>
                )}
                {!loading && gastosConstruccion.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                    <td>{gasto.descripcion}</td>
                    <td>{gasto.cantidad}</td>
                    <td>${parseFloat(gasto.precio_unitario).toFixed(2)}</td>
                    <td>${parseFloat(gasto.total).toFixed(2)}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => eliminarConstruccion(gasto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* GASTOS DE CRIANZA */}
          <div className="poultry-section">
            <h3 className="section-title">🐣 Gastos de Crianza y Mantenimiento</h3>

            <form onSubmit={handleCrianzaSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Gasto:</label>
                  <select
                    value={formCrianza.tipo}
                    onChange={(e) => setFormCrianza({ ...formCrianza, tipo: e.target.value })}
                  >
                    <option value="pollitos">Compra de Pollitos</option>
                    <option value="concentrado">Concentrado/Alimento</option>
                    <option value="vacunas">Vacunas</option>
                    <option value="medicamentos">Medicamentos</option>
                    <option value="vitaminas">Vitaminas/Suplementos</option>
                    <option value="agua">Agua</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="limpieza">Productos de Limpieza</option>
                    <option value="mantenimiento">Mantenimiento Equipos</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cantidad/Descripción:</label>
                  <input
                    type="text"
                    value={formCrianza.descripcion}
                    onChange={(e) => setFormCrianza({ ...formCrianza, descripcion: e.target.value })}
                    placeholder="Ej: 100 pollitos, 50kg"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Costo Total ($):</label>
                  <input
                    type="number"
                    value={formCrianza.costo}
                    onChange={(e) => setFormCrianza({ ...formCrianza, costo: e.target.value })}
                    step="0.01"
                    placeholder="0.00"
                    min="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Agregando...' : 'Agregar'}
                  </button>
                </div>
              </div>
            </form>

            <table className="table" id="crianza-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Costo</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>Cargando...</td>
                  </tr>
                )}
                {!loading && gastosCrianza.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>No hay gastos registrados</td>
                  </tr>
                )}
                {!loading && gastosCrianza.map((gasto) => (
                  <tr key={gasto.id}>
                    <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                    <td>{gasto.tipo_display}</td>
                    <td>{gasto.descripcion}</td>
                    <td>${parseFloat(gasto.costo).toFixed(2)}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => eliminarCrianza(gasto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

Gastos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func
};

export default Gastos;