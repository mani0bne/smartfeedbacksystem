import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function RatingBar() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/analysis/ratings")
      .then(res => {
        setChartData({
          labels: Object.keys(res.data),
          datasets: [
            {
              label: "Average Rating",
              data: Object.values(res.data),
              backgroundColor: "#06b6d4"
            }
          ]
        });
      });
  }, []);

  if (!chartData) return <p className="text-cyan-300">Loading rating data...</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-xl text-cyan-400 mb-4 text-center">
        Movie vs Average Rating
      </h2>
      <Bar data={chartData} />
    </div>
  );
}
