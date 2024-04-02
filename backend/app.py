import os

import voyageai
vo = voyageai.Client()

from openai import OpenAI
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


from pinecone import Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))




@app.route('/', methods=['POST'])
def home():
    data = request.json
    userInput = data.get('userInput', '')

    embedding = vo.embed([userInput], model="voyage-lite-02-instruct", input_type="document").embeddings[0]

    index = pc.Index("crim-pro-outline")

    similar_articles = index.query(
        vector=embedding,
        top_k=3,
        include_values=True,
        include_metadata=True
    ).to_dict()


    article_content = [article["metadata"]["original_text"] for article in similar_articles["matches"]]

    

    user_prompt = f"""
    
        Notes: {article_content}

        Question: {userInput}
    
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You're going to receive some excerpts of law school notes along with a question. Your task is to provide an answer in markdown that is EXCLUSIVELY based on the law school notes. If the answer is not contained in the notes, say that the answer is not contained in the notes. Do not answer with anything that isn't explicitly contained in the ntoes.",
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        model="gpt-4-turbo-preview" # always points to latest gpt-4-turbo-preview model,
    )

    chat_response = chat_completion.choices[0].message.content

    articles_list = [
    {
        "id": match['id'],
        "score": match['score'],
        "original_text": match['metadata']['original_text']
    } 
    for match in similar_articles['matches']
    ]

    response = {
        "chatResponse": chat_response,
        "articles": articles_list
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
