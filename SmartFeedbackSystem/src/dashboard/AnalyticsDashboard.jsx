import SentimentPie from "./SentimentPie";
import RatingBar from "./RatingBar";

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl text-center text-purple-400 font-bold mb-10">
        🎬 Movie Review Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SentimentPie />
        <RatingBar />
      </div>
    </div>
  );
}
