import React from 'react'
import PropTypes from 'prop-types'

const Gastos = (isOpen) => {

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section>
        <div id="gastos" className="tab-content active">
          <div className="construction-section">
            <h3 className="section-title">🏗️ Gastos de Construcción del Galpón</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Descripción del Material/Servicio:</label>
                <input type="text" id="construccion-desc" placeholder="Ej: Cemento, ladrillos, mano de obra..." />
              </div>
              <div className="form-group">
                <label>Cantidad:</label>
                <input type="number" id="construccion-cantidad" placeholder="1" />
              </div>
              <div className="form-group">
                <label>Precio Unitario ($):</label>
                <input type="number" id="construccion-precio" step="0.01" placeholder="0.00" />
              </div>
              <div className="form-group">
                <button className="btn" onclick="addConstruccionGasto()">Agregar</button>
              </div>
            </div>
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
              <tbody></tbody>
            </table>
          </div>

          <div className="poultry-section">
            <h3 className="section-title">🐣 Gastos de Crianza y Mantenimiento</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Gasto:</label>
                <select id="crianza-tipo">
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
                <input type="text" id="crianza-cantidad" placeholder="Ej: 100 pollitos, 50kg" />
              </div>
              <div className="form-group">
                <label>Costo Total ($):</label>
                <input type="number" id="crianza-costo" step="0.01" placeholder="0.00" />
              </div>
              <div className="form-group">
                <button className="btn" onclick="addCrianzaGasto()">Agregar</button>
              </div>
            </div>
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
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

Gastos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Gastos