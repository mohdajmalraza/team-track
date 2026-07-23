import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const colors = ["#0dcaf0", "#6f42c1", "#20c997", "#fd7e14", "#dc3545"];

export function WeeklyBarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: values,
        backgroundColor: "#0dcaf0",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function DoughnutReport({ items, labelKey }) {
  const data = {
    labels: items.map((item) => item[labelKey]),
    datasets: [
      {
        data: items.map((item) => item.closedTasks),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // Controls the hole size
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export function PieReport({ items, labelKey }) {
  const data = {
    labels: items.map((item) => item[labelKey]),
    datasets: [
      {
        data: items.map((item) => item.closedTasks),
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export function PendingBarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Pending Days",
        data: values,
        backgroundColor: "#6f42c1",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Makes the chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Pending Days",
        },
      },
      y: {
        title: {
          display: true,
          text: "Projects",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
