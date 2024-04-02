import os

from dotenv import load_dotenv
load_dotenv() 

from pinecone import Pinecone, ServerlessSpec
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

pc.delete_index("crim-pro-outline")
pc.create_index(
  name="crim-pro-outline",
  dimension=1024,
  metric="cosine",
  spec=ServerlessSpec(
    cloud="aws",
    region="us-east-1"
  )
)


