import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Signup successful!");
      console.log(data);

    } catch (err) {
      alert("Server not running");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Rajdhani', sans-serif;
        }

        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.2); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .holographic-border {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 255, 0.3);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .holographic-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 255, 0.1),
            transparent
          );
          animation: scan 3s ease-in-out infinite;
          pointer-events: none;
        }

        .neon-text {
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8),
                       0 0 20px rgba(0, 255, 255, 0.5),
                       0 0 30px rgba(0, 255, 255, 0.3);
        }

        .input-futuristic {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(0, 255, 255, 0.3);
          color: #00ffff;
          transition: all 0.3s ease;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .input-futuristic:focus {
          outline: none;
          border-color: #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1);
          background: rgba(0, 255, 255, 0.05);
        }

        .input-futuristic::placeholder {
          color: rgba(0, 255, 255, 0.4);
        }

        .submit-button {
          background: linear-gradient(135deg, #8a2be2, #00ffff);
          position: relative;
          overflow: hidden;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .submit-button:hover {
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.6), 0 0 60px rgba(0, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .link-futuristic {
          color: #8a2be2;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .link-futuristic:hover {
          color: #00ffff;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        label {
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 500;
          font-size: 0.75rem;
        }
      `}</style>

      {/* Main container */}
      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Film className="w-12 h-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 neon-text tracking-wider mb-2">
            SIGN UP
          </h1>
          <p className="text-cyan-300 text-sm tracking-widest">
            CREATE YOUR CINEMA ACCOUNT
          </p>
        </div>

        {/* Signup Form */}
        <div className="holographic-border rounded-2xl p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-cyan-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input-futuristic w-full pl-12 pr-4 py-3 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-cyan-400 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-futuristic w-full pl-12 pr-4 py-3 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-cyan-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="input-futuristic w-full pl-12 pr-12 py-3 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-purple-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-cyan-400 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input-futuristic w-full pl-12 pr-12 py-3 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-purple-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button w-full py-4 rounded-lg text-black font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2 mt-6"
            >
              <UserPlus className="w-5 h-5" />
              <span>CREATE ACCOUNT</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-cyan-300/60 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="link-futuristic">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-cyan-400/40 text-xs mt-6 tracking-widest">
          POWERED BY FUTURE CINEMA SYSTEMS
        </p>
      </div>
    </div>
  );
}
