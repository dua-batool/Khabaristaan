from flask import Flask, request, jsonify
from pymongo import MongoClient
from collections import Counter
import re

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")  
db = client['keywords_trend']
collection = db['fyp']

# Urdu stopwords list
urdu_stopwords = ["کا", "کے", "کی", "گیا", ...]  

@app.route('/analyze-trend', methods=['POST'])
def analyze_trend():
    data = request.json
    keyword = data.get("keyword", "")

    # Validate input
    if not isinstance(keyword, str) or not keyword.strip():
        return jsonify({"error": "Keyword must be a non-empty string"}), 400

    if keyword in urdu_stopwords:
        return jsonify({"error": "Keyword is a stopword"}), 400

    # Escape special regex characters
    sanitized_keyword = re.escape(keyword)

    try:
        # MongoDB regex query
        articles = list(collection.find({"content": {"$regex": sanitized_keyword, "$options": "i"}}))

        if not articles:
            return jsonify({"message": "No articles found"}), 404

        # Count keyword frequency by date
        keyword_frequency = Counter()
        for article in articles:
            content = article.get('content', '')
            date = article.get('date', 'Unknown Date')
            keyword_frequency[date] += len(re.findall(sanitized_keyword, content, re.IGNORECASE))

        # Set UTF-8 encoding explicitly in response header
        response = jsonify({"frequency": keyword_frequency})
        response.headers["Content-Type"] = "application/json; charset=utf-8"
        return response
    except Exception as e:
        # Log and return error
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(port=5000)
