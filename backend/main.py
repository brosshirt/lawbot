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




vo = voyageai.Client()
# This will automatically use the environment variable VOYAGE_API_KEY.
# Alternatively, you can use vo = voyageai.Client(api_key="<your secret key>")

texts = [
    "The Mediterranean diet emphasizes fish, olive oil, ...",
    "Photosynthesis in plants converts light energy into ...",
    "20th-century innovations, from radios to smartphones ...",
    "Rivers provide water, irrigation, and habitat for ...",
    "Apple’s conference call to discuss fourth fiscal ...",
    "Shakespeare's works, like 'Hamlet' and ...",
]

# Embed the documents
result = vo.embed(texts, model="voyage-lite-02-instruct", input_type="document")
print(result.embeddings)

from pinecone import Pinecone

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index = pc.Index("crim-pro-outline")


# result.embeddings is a list of lists, so you've gotta turn it into a list of tuples with the ID defined
vector_tuples = [("id_{}".format(i), result.embeddings[i]) for i in range(len(result.embeddings))]


index.upsert(vectors=vector_tuples)

