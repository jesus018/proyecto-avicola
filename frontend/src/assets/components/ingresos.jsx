import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import finanzasService from '../../services/finanzasService';

const Ingresos = ({ isOpen, onUpdate }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formVenta, setFormVenta] = useState({
    cliente: '',
    cantidad: '',
    precio_unitario: ''
  });

  useEffect(() => {
    if (isOpen) {
      cargarVentas();
    }
  }, [isOpen]);

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const data = await finanzasService.getVentas();
      setVentas(data.results || data);
      setError('');
    } catch (err) {
      setError('Error al cargar las ventas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await finanzasService.createVenta(formVenta);
      setFormVenta({ cliente: '', cantidad: '', precio_unitario: '' });
      cargarVentas();
      alert('Venta registrada exitosamente');
    } catch (err) {
      const errorMsg = err.response?.data?.cantidad?.[0]
        || err.response?.data?.precio_unitario?.[0]
        || err.response?.data?.message
        || 'Error al registrar la venta';
      alert('Error: ' + errorMsg);
    }
  };

  const eliminarVenta = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        await finanzasService.deleteVenta(id);
        cargarVentas();
        alert('Venta eliminada exitosamente');
        if (onUpdate) onUpdate();
      } catch (err) {
        alert('Error al eliminar la venta');
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
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <div id="ingresos" className="tab-content active">
          <h3 className="section-title">🥚 Registro de Ventas de Huevos</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Cliente/Comprador:</label>
                <input
                  type="text"
                  value={formVenta.cliente}
                  onChange={(e) => setFormVenta({ ...formVenta, cliente: e.target.value })}
                  placeholder="Ej: Tienda local, Mayorista..."
                  required
                />
              </div>
              <div className="form-group">
                <label>Cantidad (docenas/cubetas):</label>
                <input
                  type="number"
                  value={formVenta.cantidad}
                  onChange={(e) => setFormVenta({ ...formVenta, cantidad: e.target.value })}
                  placeholder="12"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio por Unidad ($):</label>
                <input
                  type="number"
                  value={formVenta.precio_unitario}
                  onChange={(e) => setFormVenta({ ...formVenta, precio_unitario: e.target.value })}
                  step="0.01"
                  placeholder="0.00"
                  min="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar Venta'}
                </button>
              </div>
            </div>
          </form>

          <table className="table" id="ventas-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
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
              {!loading && ventas.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No hay ventas registradas</td>
                </tr>
              )}
              {!loading && ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.cantidad}</td>
                  <td>${parseFloat(venta.precio_unitario).toFixed(2)}</td>
                  <td>${parseFloat(venta.total).toFixed(2)}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => eliminarVenta(venta.id)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

Ingresos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func
};

export default Ingresos;