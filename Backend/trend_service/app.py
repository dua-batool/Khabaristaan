from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
from collections import Counter
import spacy

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb+srv://neillakhani7:NT2M2aEZaFz6CW4T@trend-analysis.tzwcj.mongodb.net/")  # Replace with your connection string
db = client['keywords_trend']
collection = db['fyp']

# Load spaCy language model
nlp = spacy.blank("ur")

# Stopwords list
urdu_stopwords = [
    "کا", "کے", "کی", "گیا", "گئی", "ہے", "ہیں", "تھا", "تھی",
    "تھے", "نے", "پر", "سے", "اور", "یہ", "وہ", "میں", "تم",
    "بھی", "کرنے", "گے", "گا", "لیے", "اس", "جس", "کو", "کہا",
    "آپ", "ہم", "ان", "جن", "جنہیں", "جو", "کیا", "کیوں", "یہی",
    "۔", "،", " ", "ہو", "کہ"
]

@app.route('/analyze', methods=['GET'])
def analyze_keyword():
    keyword = request.args.get('keyword', default='', type=str)
    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400
    
    if keyword in urdu_stopwords:
        return jsonify({"error": "Keyword is a stopword and not suitable for analysis"}), 400

    # Fetch articles containing the keyword
    query = {"content": {"$regex": keyword, "$options": "i"}}
    articles = list(collection.find(query))

    if not articles:
        return jsonify({"message": f"No articles found for keyword '{keyword}'"}), 404

    # Analyze articles and calculate keyword trends
    keyword_frequency = Counter()
    yearly_counts = Counter()

    for article in articles:
        content = article['content']
        date = article.get('date', 'Unknown Date')

        # Tokenize content
        doc = nlp(content)
        tokens = [token.text for token in doc if token.text not in urdu_stopwords]

        # Count keyword occurrences
        keyword_frequency[date] += content.count(keyword)

        if date != 'Unknown Date':
            year = datetime.fromisoformat(date).year
            yearly_counts[year] += content.count(keyword)

    # Prepare data for response
    response_data = {
        "keyword": keyword,
        "total_occurrences": sum(keyword_frequency.values()),
        "articles_count": len(articles),
        "yearly_trends": dict(yearly_counts)
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)

