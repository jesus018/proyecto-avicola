import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import finanzasService from '../../services/finanzasService';

const Resumen = ({ isOpen }) => {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      cargarResumen();
    }
  }, [isOpen]);

  const cargarResumen = async () => {
    try {
      setLoading(true);
      const data = await finanzasService.getResumen();
      setResumen(data);
      setError('');
    } catch (err) {
      setError('Error al cargar el resumen financiero');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const formatPercent = (value) => {
    return `${parseFloat(value).toFixed(2)}%`;
  };

  const getGananciaColor = (ganancia) => {
    if (ganancia > 0) return '#27ae60';
    if (ganancia < 0) return '#e74c3c';
    return '#95a5a6';
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

        <div id="resumen" className="tab-content active">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Cargando resumen financiero...</p>
            </div>
          ) : resumen ? (
            <>
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>💰 Total Ingresos</h3>
                  <div className="amount" id="total-ingresos">
                    {formatMoney(resumen.total_ingresos)}
                  </div>
                </div>

                <div className="summary-card">
                  <h3>🏗️ Gastos Construcción</h3>
                  <div className="amount" id="total-construccion">
                    {formatMoney(resumen.total_construccion)}
                  </div>
                  <small style={{ opacity: 0.8 }}>
                    {formatPercent(resumen.porcentaje_construccion)} del total
                  </small>
                </div>

                <div className="summary-card">
                  <h3>🐔 Gastos Crianza</h3>
                  <div className="amount" id="total-crianza">
                    {formatMoney(resumen.total_crianza)}
                  </div>
                  <small style={{ opacity: 0.8 }}>
                    {formatPercent(resumen.porcentaje_crianza)} del total
                  </small>
                </div>

                <div className="summary-card">
                  <h3>📊 Total Gastos</h3>
                  <div className="amount" id="total-gastos">
                    {formatMoney(resumen.total_gastos)}
                  </div>
                </div>

                <div className="summary-card" style={{
                  background: getGananciaColor(resumen.ganancia)
                }}>
                  <h3>💵 Ganancia/Pérdida</h3>
                  <div className="amount" id="ganancia-total">
                    {formatMoney(resumen.ganancia)}
                  </div>
                  <small style={{ opacity: 0.9 }}>
                    {resumen.estado_financiero === 'ganancia' && '✅ Con ganancias'}
                    {resumen.estado_financiero === 'perdida' && '⚠️ Con pérdidas'}
                    {resumen.estado_financiero === 'equilibrio' && '➖ En equilibrio'}
                  </small>
                </div>

                <div className="summary-card">
                  <h3>📈 ROI (%)</h3>
                  <div className="amount" id="roi-porcentaje">
                    {formatPercent(resumen.roi)}
                  </div>
                  <small style={{ opacity: 0.8 }}>
                    Retorno de inversión
                  </small>
                </div>
              </div>

              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                marginTop: '20px'
              }}>
                <h3>📋 Análisis del Negocio</h3>
                <div id="analisis-texto" style={{
                  marginTop: '15px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  {resumen.analisis}
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                textAlign: 'center'
              }}>
                <button
                  className="btn"
                  onClick={cargarResumen}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  🔄 Actualizar Resumen
                </button>
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '50px',
              color: '#666'
            }}>
              <p>No hay datos disponibles para mostrar el resumen.</p>
              <p style={{ marginTop: '10px' }}>
                Comienza registrando tus ingresos y gastos.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

Resumen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Resumen;