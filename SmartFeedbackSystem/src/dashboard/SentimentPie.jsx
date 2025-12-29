import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentPie() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/analysis/sentiment")
      .then(res => {
        setChartData({
          labels: Object.keys(res.data),
          datasets: [
            {
              data: Object.values(res.data),
              backgroundColor: [
                "#ef4444", // negative
                "#facc15", // neutral
                "#22c55e"  // positive
              ]
            }
          ]
        });
      });
  }, []);

  if (!chartData) return <p className="text-cyan-300">Loading sentiment data...</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-xl text-cyan-400 mb-4 text-center">
        Sentiment Distribution
      </h2>
      <Pie data={chartData} />
    </div>
  );
}
