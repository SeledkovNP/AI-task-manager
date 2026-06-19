from flask import Flask, request, jsonify

app = Flask(__name__)


def analyze_task(title, description=""):
    text = f"{title} {description}".lower()

    high_keywords = ['srochno', 'asap', 'deadline', 'urgent', 'vazhno']
    medium_keywords = ['zavtra', 'skoro', 'prezentaciya', 'klient', 'otchet']

    if any(word in text for word in high_keywords):
        priority = "high"
    elif any(word in text for word in medium_keywords):
        priority = "medium"
    else:
        priority = "low"

    business_words = ['prezentaciya', 'klient', 'otchet', 'proekt', 'kontrakt']
    personal_words = ['magazin', 'kupit', 'uborka', 'remont', 'produkty']
    learning_words = ['izuchit', 'kurs', 'kniga', 'urok', 'lekciya']
    sports_words = ['sport', 'trenirovka', 'bassein', 'yoga', 'zaryadka']

    if any(word in text for word in business_words):
        category = "business"
    elif any(word in text for word in personal_words):
        category = "personal"
    elif any(word in text for word in learning_words):
        category = "learning"
    elif any(word in text for word in sports_words):
        category = "sports"
    else:
        category = "general"

    return {"priority": priority, "category": category}


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    if not data or 'text' not in data:
        return jsonify({"error": "Field 'text' is required"}), 400

    title = data.get('text', '')
    description = data.get('description', '')

    try:
        result = analyze_task(title, description)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})


if __name__ == '__main__':
    print("=" * 50)
    print("AI Service started on port 5001")
    print("=" * 50)
    app.run(debug=True, port=5001, host='0.0.0.0')
