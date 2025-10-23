import React from 'react'
import PropTypes from 'prop-types'

const Resumen = (isOpen) => {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section>
        <div id="resumen" class="tab-content active">
          <div class="summary-cards">
            <div class="summary-card">
              <h3>💰 Total Ingresos</h3>
              <div class="amount" id="total-ingresos">$0.00</div>
            </div>
            <div class="summary-card">
              <h3>🏗️ Gastos Construcción</h3>
              <div class="amount" id="total-construccion">$0.00</div>
            </div>
            <div class="summary-card">
              <h3>🐔 Gastos Crianza</h3>
              <div class="amount" id="total-crianza">$0.00</div>
            </div>
            <div class="summary-card">
              <h3>📊 Total Gastos</h3>
              <div class="amount" id="total-gastos">$0.00</div>
            </div>
            <div class="summary-card">
              <h3>💵 Ganancia/Pérdida</h3>
              <div class="amount" id="ganancia-total">$0.00</div>
            </div>
            <div class="summary-card">
              <h3>📈 ROI (%)</h3>
              <div class="amount" id="roi-porcentaje">0%</div>
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            <h3>📋 Análisis del Negocio</h3>
            <div id="analisis-texto"></div>
          </div>
        </div>
      </section>
    </>
  )
}

Resumen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Resumen