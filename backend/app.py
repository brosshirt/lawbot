
from lib.services import get_vo_client, get_openai_client, get_pinecone_index, get_articles, get_gpt_response
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS


vo_client = get_vo_client()
openai_client = get_openai_client()
pinecone_index = get_pinecone_index()

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)  # Enable CORS for all routes


# Serve the appropriate webpage based on the react app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # Serve the file (if exists) from the build folder
    return send_from_directory(app.static_folder, path)

# API
@app.route('/chat', methods=['POST'])
def chat():
    # Get user input
    question = request.json.get('question', '')

    # Embed the question
    embedding = vo_client.embed([question], model="voyage-lite-02-instruct", input_type="query", truncation=False).embeddings[0]
    
    # Query pinecone and get the articles
    articles = get_articles(embedding, 3, pinecone_index)    


    # Query gpt and get the response (This part gets skipped now)
    gpt_response = get_gpt_response(articles, question, openai_client)
    
    return jsonify({
        "gptResponse": gpt_response,
        "articles": articles
    })

# API
@app.route('/search', methods=['POST'])
def search():
    # Get user input
    question = request.json.get('question', '')

    # Embed the question
    embedding = vo_client.embed([question], model="voyage-lite-02-instruct", input_type="query", truncation=False).embeddings[0]
    
    # Query pinecone and get the articles
    articles = get_articles(embedding, 5, pinecone_index)   

    print(articles) 

    
    return jsonify({
        "articles": articles
    })



if __name__ == '__main__':
    app.run(debug=True)
