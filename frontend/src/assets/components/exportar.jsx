import { useState } from 'react';
import PropTypes from 'prop-types';
import finanzasService from '../../services/finanzasService';

const Exportar = ({ isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleExportarCSV = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await finanzasService.exportarCSV();

      setSuccess('✅ Archivo CSV descargado exitosamente');

      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Error al exportar:', err);
      setError('❌ Error al exportar los datos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section>
        <div id="exportar" className="tab-content active">
          <div className="export-section">
            <h3>📁 Exportar Datos</h3>

            {error && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                background: '#d4edda',
                color: '#155724',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #c3e6cb'
              }}>
                {success}
              </div>
            )}

            <p style={{ marginBottom: '20px' }}>
              Descarga todos tus datos financieros en formato CSV para usar en LibreOffice Calc,
              Excel u otro programa de hojas de cálculo.
            </p>

            <div style={{
              background: '#e7f3ff',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '25px',
              borderLeft: '4px solid #2196F3'
            }}>
              <strong>📋 El archivo incluirá:</strong>
              <ul style={{
                marginTop: '10px',
                marginLeft: '20px',
                lineHeight: '1.8'
              }}>
                <li>✓ Resumen ejecutivo financiero</li>
                <li>✓ Todos los gastos de construcción</li>
                <li>✓ Todos los gastos de crianza y mantenimiento</li>
                <li>✓ Registro completo de ventas</li>
                <li>✓ Cálculos de ROI y análisis</li>
              </ul>
            </div>

            <button
              className="btn"
              onClick={handleExportarCSV}
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                minWidth: '250px'
              }}
            >
              {loading ? (
                <>⏳ Generando archivo...</>
              ) : (
                <>📥 Descargar CSV Completo</>
              )}
            </button>

            <p style={{
              color: '#666',
              fontSize: '14px',
              marginTop: '20px',
              fontStyle: 'italic'
            }}>
              💡 Tip: El archivo CSV está optimizado para abrirse en español
              con LibreOffice Calc o Excel
            </p>

            <div style={{
              marginTop: '30px',
              padding: '15px',
              background: '#fff9e6',
              borderRadius: '8px',
              borderLeft: '4px solid #ffc107'
            }}>
              <strong>⚠️ Nota importante:</strong>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                Los datos exportados corresponden únicamente a tu cuenta y
                reflejan la información hasta el momento de la descarga.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Exportar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Exportar;