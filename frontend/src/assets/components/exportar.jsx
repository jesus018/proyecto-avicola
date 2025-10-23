import React from 'react'
import PropTypes from 'prop-types'

const Exportar = (isOpen) => {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section>
        <div id="exportar" class="tab-content active">
          <div class="export-section">
            <h3>📁 Exportar Datos</h3>
            <p>Descarga tus datos en formato CSV para usar en LibreOffice Calc u otro programa de hojas de cálculo
            </p>
            <br />
            <button class="btn" onclick="exportToCSV()">📥 Descargar CSV Completo</button>
            <br /><br />
            <p style={{ color: '#666', fontSize: '14px' }}>
              El archivo incluirá todas las transacciones y un resumen financiero completo
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

Exportar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Exportar