from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['POST', 'GET'])
def home():
    data = request.json
    userInput = data.get('userInput', '')
    return jsonify({"lebron": userInput})

if __name__ == '__main__':
    app.run(debug=True)
