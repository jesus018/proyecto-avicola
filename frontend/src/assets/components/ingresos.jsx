import React from 'react'
import PropTypes from 'prop-types'

const Ingresos = ({ isOpen }) => {

  if (!isOpen) {
    return null;
  };

  return (
    <>
      <section>
        <div id="ingresos" className="tab-content active">
          <h3 className="section-title">🥚 Registro de Ventas de Huevos</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Cliente/Comprador:</label>
              <input type="text" id="venta-cliente" placeholder="Ej: Tienda local, Mayorista..." />
            </div>
            <div className="form-group">
              <label>Cantidad (docenas/cubetas):</label>
              <input type="number" id="venta-cantidad" placeholder="12" />
            </div>
            <div className="form-group">
              <label>Precio por Unidad ($):</label>
              <input type="number" id="venta-precio" step="0.01" placeholder="0.00" />
            </div>
            <div className="form-group">
              <button className="btn" onclick="addVenta()">Registrar Venta</button>
            </div>
          </div>
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
            <tbody></tbody>
          </table>
        </div>
      </section>
    </>
  )
}

Ingresos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Ingresos