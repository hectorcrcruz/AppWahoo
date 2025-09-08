// src/feature/core/component/DashboardReports.tsx
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export const DashboardReports = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false as const, // permite controlar el tamaño con Tailwind
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const pieData = {
    labels: ["Pedidos completados", "Pedidos pendientes", "Pedidos cancelados"],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Ventas",
        data: [120, 150, 180, 90],
        backgroundColor: "#2196F3",
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Usuarios Activos", "Usuarios Inactivos"],
    datasets: [
      {
        data: [200, 50],
        backgroundColor: ["#673AB7", "#E0E0E0"],
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Ingresos",
        data: [500, 700, 800, 650],
        borderColor: "#FF9800",
        backgroundColor: "rgba(255, 152, 0, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-2xl shadow p-6 h-64">
        <h2 className="text-lg font-semibold mb-2">Estado de Pedidos</h2>
        <div className="h-48">
          <Pie data={pieData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-64">
        <h2 className="text-lg font-semibold mb-2">Ventas por Mes</h2>
        <div className="h-48">
          <Bar data={barData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-64">
        <h2 className="text-lg font-semibold mb-2">Usuarios</h2>
        <div className="h-48">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-64">
        <h2 className="text-lg font-semibold mb-2">Ingresos Mensuales</h2>
        <div className="h-48">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};
