from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from textblob import TextBlob
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client.movie_feedback_db
reviews_col = db.reviews

# Health Check
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "MongoDB Movie Feedback API running"})

# POST: Save Movie Review
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

    review_doc = {
        "name": data.get("name"),
        "email": data.get("email"),
        "movie": data.get("movieTitle"),
        "rating": data.get("rating"),
        "genre": data.get("genre"),
        "review": review_text,
        "recommend": data.get("recommend"),
        "sentiment": sentiment,
        "polarity": round(polarity, 3),
        "created_at": datetime.utcnow()
    }

    reviews_col.insert_one(review_doc)

    return jsonify({"message": "Review saved successfully"}), 201


# GET: Sentiment Analysis (Pie Chart)
@app.route("/api/analysis/sentiment", methods=["GET"])
def sentiment_analysis():
    pipeline = [
        {"$group": {"_id": "$sentiment", "count": {"$sum": 1}}}
    ]

    result = reviews_col.aggregate(pipeline)

    response = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for r in result:
        response[r["_id"]] = r["count"]

    return jsonify(response)

# GET: Movie vs Average Rating (Bar Chart)
@app.route("/api/analysis/ratings", methods=["GET"])
def rating_analysis():
    pipeline = [
        {
            "$group": {
                "_id": "$movie",
                "avgRating": {"$avg": "$rating"}
            }
        }
    ]

    result = reviews_col.aggregate(pipeline)

    response = {
        r["_id"]: round(r["avgRating"], 2)
        for r in result
    }

    return jsonify(response)

# GET: All Reviews (Admin / Debug)
@app.route("/api/reviews", methods=["GET"])
def get_all_reviews():
    data = []
    for r in reviews_col.find({}, {"_id": 0}):
        data.append(r)
    return jsonify(data)

# Run App
if __name__ == "__main__":
    app.run(debug=True)
