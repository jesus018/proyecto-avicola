import { useState } from 'react'
import './App.css'
import LayoutOverlay from './assets/components/LayoutOverlay';
import Sidebar from './assets/components/sidebar';
import Gastos from './assets/components/gastos';
import Ingresos from './assets/components/ingresos';
import Resumen from './assets/components/resumen';
import Exportar from './assets/components/exportar';

function App() {
  const [isGastosOpen, setIsGastosOpen] = useState(false);
  const [isIngresosOpen, setIsIngresosOpen] = useState(false);
  const [isResumenOpen, setIsResumenOpen] = useState(false);
  const [isExportarOpen, setIsExportarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('gastos'); // Estado para controlar qué tab está activa

  const mostrarGastosClick = () => {
    setIsGastosOpen(true);
    setIsIngresosOpen(false);
    setIsResumenOpen(false);
    setActiveTab('gastos');
  }

  const mostrarIngresosClick = () => {
    setIsIngresosOpen(true);
    setIsGastosOpen(false);
    setIsResumenOpen(false);
    setActiveTab('ingresos');
  }

  const mostrarResumenClick = () => {
    setIsResumenOpen(true);
    setIsGastosOpen(false);
    setIsIngresosOpen(false);
    setActiveTab('resumen');
  }

  const mostrarExportarClick = () => {
    setIsExportarOpen(true);
    setIsGastosOpen(false);
    setIsIngresosOpen(false);
    setIsResumenOpen(false);
    setActiveTab('exportar');
  }



  return (
    <>
      <Sidebar></Sidebar>
      <section>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'gastos' ? 'active' : ''}`}
            onClick={mostrarGastosClick}
          >
            📋 Registro de Gastos
          </button>
          <button
            className={`tab ${activeTab === 'ingresos' ? 'active' : ''}`}
            onClick={mostrarIngresosClick}
          >
            💰 Ingresos por Ventas
          </button>
          <button
            className={`tab ${activeTab === 'resumen' ? 'active' : ''}`}
            onClick={mostrarResumenClick}
          >
            📊 Resumen Financiero
          </button>
          <button
            className={`tab ${activeTab === 'exportar' ? 'active' : ''}`}
            onClick={mostrarExportarClick}
          >
            📄 Exportar Datos
          </button>
        </div>
      </section>
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
    </>
  )
}

export default App