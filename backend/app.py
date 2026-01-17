from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from textblob import TextBlob
from flask_bcrypt import Bcrypt
from datetime import datetime
import jwt

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client.movie_feedback_db
reviews_col = db.reviews
users_col = db.users

client = MongoClient("mongodb://localhost:27017/")
db = client["feedback_system"]
users_col = db["users"]

bcrypt = Bcrypt(app)


# Health Check
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "MongoDB Movie Feedback API running"})

#Signup Route
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user already exists
    if users_col.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    users_col.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": "user"   # default role
    })

    return jsonify({"message": "Signup successful"}), 201


#Login Route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    user = users_col.find_one({"email": email})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "user")
        }
    }), 200
@app.route("/api/adminLogin", methods=["POST"])
def admin_login():
    admin_email = "admin@cinema.com"
    admin_password = "Admin@123"

    if not users_col.find_one({"email": admin_email, "role": "admin"}):
        users_col.insert_one({
            "name": "System Admin",
            "email": admin_email,
            "password": bcrypt.generate_password_hash(admin_password).decode("utf-8"),
            "role": "admin"
        })
        print("Admin created")
    else:
        print("Admin already exists")

        return jsonify({"message": "Admin Login Successful"}), 200


# POST: Save Movie Review
@app.route("/api/reviews", methods=["POST"])
def submit_review():
    # token = request.headers.get("Authorization")
    # user_id = None
    # is_anonymous = True

    # if token:
    #     decoded = jwt.decode(token, algorithms=["HS256"])
    #     user_id = decoded["userId"]
    #     is_anonymous = False

    data = request.json
    polarity = TextBlob(data["review"]).sentiment.polarity
    sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"

    reviews_col.insert_one({
        "userId": None,
        "isAnonymous": True,
        "movie": data["movieTitle"],
        "rating": data["rating"],
        "review": data["review"],
        "sentiment": sentiment,
        "created_at": datetime.utcnow()
    })

    return jsonify({"message": "Feedback submitted"})



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
