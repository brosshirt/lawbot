# Chunks and loads vector DBs

import os
import glob

from dotenv import load_dotenv
load_dotenv() 

import voyageai
vo = voyageai.Client()

from pinecone import Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

import hashlib

def hash_string(input_string):
    # Use SHA-256 hashing algorithm
    hash_object = hashlib.sha256(input_string.encode())
    # Convert the hash object to a hexadecimal string
    hash_hex = hash_object.hexdigest()
    return hash_hex


def chunk_class_notes():
    chunks = []
    directory = os.path.join('class-notes', 'upload')
    
    chunk_size = 700  
    overlap_size = 100  

    for filepath in glob.glob(os.path.join(directory, '*')):
        with open(filepath, 'r', encoding='utf-8') as file:
            text = file.read()
            start = 0
            end = 0
            while end < len(text):
                end = min(start + chunk_size, len(text))
                chunks.append(text[start:end])
                
                start = end - overlap_size  

    return chunks

def load_db():
    chunks = chunk_class_notes()
    embeddings = vo.embed(chunks, model="voyage-lite-02-instruct", input_type="document").embeddings
    
    index = pc.Index("crim-pro-outline")

    # result.embeddings is a list of lists, so you've gotta turn it into a list of tuples with the ID defined




    vector_tuples = [
        (hash_string(chunks[i]), 
        embeddings[i], 
        {"original_text": chunks[i]})  # Assuming chunks[i] contains the original text for the ith embedding
        for i in range(len(chunks))
    ]

    # for chunk in chunks:
    #     print(chunk)
    #     print('\n\n#####\n\n')
    # exit(0)


    # for tuple in vector_tuples:
    #     print(tuple[2])
    #     print('\n\n#####\n\n')
    # exit(0)
    
    index.upsert(vectors=vector_tuples)









load_db()
