# lib/services.py
import os
import voyageai
from openai import OpenAI
from pinecone import Pinecone

# API Clients Initialization
def get_vo_client():
    return voyageai.Client()

def get_openai_client():
    api_key = os.environ.get("OPENAI_API_KEY")
    return OpenAI(api_key=api_key)

def get_pinecone_index(index_name="crim-pro-outline"):
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    return pc.Index(index_name)


# There should be a config or JSON file that contains stuff like the system prompt and the k value. We probably shouldn't be messing with this in the code
# But I don't know whether it's worthwhile to handle this right now or wait a little bit longer
SYSTEM_PROMPT = f"""
    You're going to receive some excerpts of law school notes along with a question. 
    Your task is to provide an answer in markdown that is EXCLUSIVELY based on the law school notes. 
    If the answer is not contained in the notes, say that the answer is not contained in the notes. 
    Do not answer with anything that isn't explicitly contained in the ntoes.
"""

# This function always returns all the information we need from the articles as simply as possible
# It will change as we play around with the metadata more, we should never have to deal with the "metadata" field outside of this function
def get_articles(embedding, k, index):
    similar_articles = index.query(vector=embedding, top_k=k, include_values=False, include_metadata=True).to_dict()["matches"]
    return [{"id": article['id'], "score": article['score'], "original_text": article['metadata']['original_text']} for article in similar_articles]

def get_gpt_response(articles, question, client):
    user_prompt = f"""Notes: {[article['original_text'] for article in articles]} Question: {question}"""
    chat_completion = client.chat.completions.create(messages=[{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": user_prompt}], model="gpt-4-turbo-preview")
    return chat_completion.choices[0].message.content

