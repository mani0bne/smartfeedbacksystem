import React, { useState } from 'react';
import { Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // ✅ Store token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🚀 Redirect to admin dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* UI remains SAME */}

      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-orange-400 mx-auto" />
          <h1 className="text-4xl font-black text-orange-400 mt-4">
            ADMIN LOGIN
          </h1>
        </div>

        <div className="bg-black/60 border border-orange-500/30 rounded-2xl p-8">

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-orange-400 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-black border border-orange-500/30 text-orange-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-orange-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-black border border-orange-500/30 text-orange-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 py-3 rounded-lg font-bold text-black flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              ACCESS ADMIN PANEL
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-orange-400 text-sm">
              ← Back to User Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
