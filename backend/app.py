from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "movie_reviews.json"

# Utility functions
def load_reviews():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return []


def save_reviews(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Health Check API
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Movie Feedback API running"})

# POST: Save Movie Feedback
@app.route("/api/reviews", methods=["POST"])
def submit_review():
    data = request.json

    review_text = data.get("review", "")
    polarity = TextBlob(review_text).sentiment.polarity

    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    review_entry = {
        "name": data.get("name"),
        "email": data.get("email"),
        "movie": data.get("movieTitle"),
        "rating": data.get("rating"),
        "genre": data.get("genre"),
        "review": review_text,
        "recommend": data.get("recommend"),
        "sentiment": sentiment,
        "polarity": round(polarity, 3),
        "timestamp": datetime.now().isoformat()
    }

    reviews = load_reviews()
    reviews.append(review_entry)
    save_reviews(reviews)

    return jsonify({"message": "Feedback stored successfully"}), 201

# GET: Sentiment Analysis (Pie Chart)
@app.route("/api/analysis/sentiment", methods=["GET"])
def sentiment_analysis():
    reviews = load_reviews()

    sentiment_count = {
        "Positive": 0,
        "Neutral": 0,
        "Negative": 0
    }

    for r in reviews:
        sentiment_count[r["sentiment"]] += 1

    return jsonify(sentiment_count)

# GET: Movie vs Average Rating (Bar Chart)
@app.route("/api/analysis/ratings", methods=["GET"])
def rating_analysis():
    reviews = load_reviews()
    movie_ratings = {}

    for r in reviews:
        movie = r["movie"]
        movie_ratings.setdefault(movie, []).append(r["rating"])

    avg_ratings = {
        movie: round(sum(ratings) / len(ratings), 2)
        for movie, ratings in movie_ratings.items()
    }

    return jsonify(avg_ratings)

# GET: All Reviews (Optional – Admin View)
@app.route("/api/reviews", methods=["GET"])
def get_all_reviews():
    return jsonify(load_reviews())

# Run Server
if __name__ == "__main__":
    app.run(debug=True)
