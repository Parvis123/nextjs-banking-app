"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [10, 20, 30, 40, 50],
        backgroundColor: [
          "#0a1f33",
          "#1e4d8c",
          "#3273dc",
          "#5e9eff",
          "#b3d4ff",
        ],
      },
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3", "Bank 4", "Bank 5"],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
