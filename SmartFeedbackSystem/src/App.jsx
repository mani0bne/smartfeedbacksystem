import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MovieFeedbackForm from "./movie-feedback";
import AnalyticsDashboard from "./dashboard/AnalyticsDashboard";
import Navbar from "./navbar";
import Login from "./Login";
import Signup from "./Signup";
import AdminLogin from "./AdminLogin";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<MovieFeedbackForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;