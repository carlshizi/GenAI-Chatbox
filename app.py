from openai import OpenAI


client = OpenAI(
    api_key="sk-no-key-required",
    base_url="http://localhost:8000/v1/",
)

response = client.chat.completions.create(
    model="mistral-7b",
    # messages=[
    #     {"role": "system", "content": "You are ChatGPT, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests."},
    #     {"role": "user", "content": "Write a limerick about python exceptions"}
    # ]

    messages=[
        {"role": "user", "content": "reverse a linked list in java"}
    ]
)

print(response)