import React, { useState } from 'react';
import { Star, Film, Send, Sparkles } from 'lucide-react';
import axios from 'axios';

const MovieFeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movieTitle: '',
    rating: 0,
    genre: '',
    review: '',
    recommend: null
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'];

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://127.0.0.1:5000/api/reviews", {
      name: formData.name,
      email: formData.email,
      movieTitle: formData.movieTitle,
      rating: formData.rating,
      genre: formData.genre,
      review: formData.review,
      recommend: formData.recommend
    });

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        movieTitle: '',
        rating: 0,
        genre: '',
        review: '',
        recommend: null
      });
    }, 3000);

  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to submit feedback");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
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

        .genre-chip {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(138, 43, 226, 0.5);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .genre-chip::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .genre-chip:hover::before {
          left: 100%;
        }

        .genre-chip:hover {
          border-color: #8a2be2;
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
          transform: translateY(-2px);
        }

        .genre-chip.selected {
          background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 255, 255, 0.2));
          border-color: #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
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

        .success-message {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .star-rating {
          filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
        }

        label {
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 500;
          font-size: 0.75rem;
        }
      `}</style>

      {/* Main form container */}
      <div className="relative w-full max-w-2xl z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 space-x-3">
            <Film className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 neon-text tracking-wider">
              CINEMA
            </h1>
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />
          </div>
          <p className="text-cyan-300 text-sm sm:text-base md:text-lg font-light tracking-widest">
            SHARE YOUR CINEMATIC EXPERIENCE
          </p>
        </div>

        {/* Form */}
        <div className="holographic-border rounded-2xl p-6 sm:p-8 md:p-10 relative">
          {isSubmitted ? (
            <div className="success-message text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-3 neon-text" style={{ fontFamily: 'Orbitron' }}>
                FEEDBACK RECEIVED
              </h2>
              <p className="text-purple-300 text-sm sm:text-base">
                Thank you for sharing your thoughts!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-cyan-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input-futuristic w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-cyan-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="input-futuristic w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Movie Title */}
              <div>
                <label className="block text-cyan-400 mb-2">Movie Title</label>
                <input
                  type="text"
                  name="movieTitle"
                  value={formData.movieTitle}
                  onChange={handleChange}
                  placeholder="Which movie did you watch?"
                  className="input-futuristic w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-cyan-400 mb-3">Rating</label>
                <div className="flex items-center space-x-2 star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-all duration-200 transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                          star <= (hoveredStar || formData.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="ml-3 text-cyan-300 font-bold text-lg">
                      {formData.rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-cyan-400 mb-3">Genre</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, genre }))}
                      className={`genre-chip px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold ${
                        formData.genre === genre ? 'selected text-cyan-300' : 'text-purple-300'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-cyan-400 mb-2">Review</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Share your thoughts about the movie..."
                  rows="4"
                  className="input-futuristic w-full px-4 py-3 rounded-lg resize-none"
                  required
                />
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-cyan-400 mb-3">Would you recommend this movie?</label>
                <div className="flex space-x-4">
                  {[
                    { value: true, label: 'YES' },
                    { value: false, label: 'NO' }
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, recommend: option.value }))}
                      className={`genre-chip flex-1 py-3 rounded-lg font-bold text-sm sm:text-base ${
                        formData.recommend === option.value ? 'selected text-cyan-300' : 'text-purple-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-button w-full py-4 rounded-lg text-black font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>SUBMIT FEEDBACK</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer text */}
        <p className="text-center text-cyan-400/40 text-xs sm:text-sm mt-6 tracking-widest">
          POWERED BY FUTURE CINEMA SYSTEMS
        </p>
      </div>
    </div>
  );
};

export default MovieFeedbackForm;
