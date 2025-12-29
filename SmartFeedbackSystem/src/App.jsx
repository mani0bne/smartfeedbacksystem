import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MovieFeedbackForm from "./movie-feedback";
import AnalyticsDashboard from "./dashboard/AnalyticsDashboard";
import Navbar from "./navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<MovieFeedbackForm />} />
      <Route path="/dashboard" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;