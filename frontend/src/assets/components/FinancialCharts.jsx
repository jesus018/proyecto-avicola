import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../css/financialCharts.css';
import finanzasService from '../../services/finanzasService';

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const FinancialCharts = ({ resumenFinanciero }) => {
    const [historicalData, setHistoricalData] = useState(null);
    const [gastosPorCategoria, setGastosPorCategoria] = useState(null);

    useEffect(() => {
        cargarDatosHistoricos();
        cargarGastosPorCategoria();
    }, []);

    const cargarDatosHistoricos = async () => {
        try {
            // Intentar obtener datos históricos del servicio
            const datos = await finanzasService.getHistorico();
            setHistoricalData(datos);
        } catch (error) {
            console.log('No hay datos históricos disponibles, usando datos actuales');
            // Si no hay endpoint histórico, crear datos de ejemplo con el resumen actual
            setHistoricalData(null);
        }
    };

    const cargarGastosPorCategoria = async () => {
        try {
            const gastos = await finanzasService.getGastos();
            //console.log('Gastos recibidos:', gastos);

            // Agrupar gastos por categoría
            const categorias = {};
            gastos.forEach(gasto => {
                const cat = gasto.categoria || 'Sin categoría';
                // Intentar diferentes nombres de campo para el monto
                const monto = parseFloat(gasto.monto || gasto.cantidad || gasto.valor || 0);
                // console.log(`Procesando gasto - Categoría: ${cat}, Monto: ${monto}`, gasto);
                categorias[cat] = (categorias[cat] || 0) + monto;
            });

            //console.log('Categorías agrupadas:', categorias);

            // Si no hay datos, usar datos de ejemplo
            if (Object.keys(categorias).length === 0 || Object.values(categorias).every(v => v === 0)) {
                //console.log('No hay datos reales, usando datos de ejemplo');
                setGastosPorCategoria({
                    'Construcción': 1500,
                    'Crianza': 2000
                });
            } else {
                setGastosPorCategoria(categorias);
            }
        } catch (error) {
            //console.error('Error al cargar gastos por categoría:', error);
            // En caso de error, usar datos de ejemplo
            setGastosPorCategoria({
                'Construcción': 1500,
                'Crianza': 2000
            });
        }
    };

    // Configuración del gráfico de líneas (Evolución temporal)
    const lineChartData = {
        labels: historicalData?.labels || ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Ingresos',
                data: historicalData?.ingresos || [4000, 4500, 3800, 5200, 4800, resumenFinanciero?.total_ingresos || 0],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Gastos',
                data: historicalData?.gastos || [3000, 3200, 2800, 3500, 3300, resumenFinanciero?.total_gastos || 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            },
            title: {
                display: true,
                text: 'Evolución de Ingresos y Gastos',
                color: '#ffffff',
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', sans-serif"
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#e0e0e0',
                borderColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '$' + context.parsed.y.toFixed(2);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#e0e0e0',
                    callback: function (value) {
                        return '$' + value.toFixed(0);
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#e0e0e0'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };

    // Configuración del gráfico de barras (Comparativo)
    const barChartData = {
        labels: ['Total'],
        datasets: [
            {
                label: 'Ingresos',
                data: [resumenFinanciero?.total_ingresos || 0],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
            },
            {
                label: 'Gastos',
                data: [resumenFinanciero?.total_gastos || 0],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
            },
            {
                label: 'Balance',
                data: [resumenFinanciero?.ganancia || 0],
                backgroundColor: resumenFinanciero?.ganancia >= 0
                    ? 'rgba(144, 238, 144, 0.8)'
                    : 'rgba(255, 182, 193, 0.8)',
                borderColor: resumenFinanciero?.ganancia >= 0
                    ? 'rgb(144, 238, 144)'
                    : 'rgb(255, 182, 193)',
                borderWidth: 2,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0',
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            },
            title: {
                display: true,
                text: 'Comparativo Financiero',
                color: '#ffffff',
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', sans-serif"
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#e0e0e0',
                borderColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '$' + context.parsed.y.toFixed(2);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#e0e0e0',
                    callback: function (value) {
                        return '$' + value.toFixed(0);
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#e0e0e0'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };

    // Configuración del gráfico de dona (Distribución de gastos)
    const doughnutChartData = {
        labels: gastosPorCategoria ? Object.keys(gastosPorCategoria) : ['Alimento', 'Mantenimiento', 'Veterinario', 'Otros'],
        datasets: [
            {
                label: 'Gastos por Categoría',
                data: gastosPorCategoria
                    ? Object.values(gastosPorCategoria)
                    : [1500, 800, 500, 200],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#e0e0e0',
                    font: {
                        size: 11,
                        family: "'Inter', sans-serif"
                    },
                    padding: 10
                }
            },
            title: {
                display: true,
                text: 'Distribución de Gastos por Categoría',
                color: '#ffffff',
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', sans-serif"
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#e0e0e0',
                borderColor: 'rgba(75, 192, 192, 0.5)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += '$' + context.parsed.toFixed(2);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ' (' + percentage + '%)';
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className="financial-charts-container">
            <div className="charts-grid">
                {/* Gráfico de líneas */}
                <div className="chart-card chart-large">
                    <div className="chart-wrapper">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Gráfico de barras */}
                <div className="chart-card">
                    <div className="chart-wrapper">
                        <Bar data={barChartData} options={barChartOptions} />
                    </div>
                </div>

                {/* Gráfico de dona */}
                <div className="chart-card">
                    <div className="chart-wrapper">
                        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

FinancialCharts.propTypes = {
    resumenFinanciero: PropTypes.shape({
        total_ingresos: PropTypes.number,
        total_gastos: PropTypes.number,
        ganancia: PropTypes.number,
    }),
};

export default FinancialCharts;
