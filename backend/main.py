import voyageai
from openai import OpenAI

import os
from dotenv import load_dotenv
load_dotenv() 

# print(os.getenv("OPENAI_API_KEY"))

# client = OpenAI(
#     # This is the default and can be omitted
#     api_key=os.environ.get("OPENAI_API_KEY")
# )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": "Tell me a story about a duck",
#         }
#     ],
#     model="gpt-4-turbo-preview" # always points to latest gpt-4-turbo-preview model,
# )

# print(chat_completion.choices[0].message.content)


from pinecone import Pinecone



