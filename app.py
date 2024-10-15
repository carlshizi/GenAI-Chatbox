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
        {"role": "user", "content": "What is the meaning of life?"},
    ],
    stream=True,
)

for response_line in response:
    if response_line.choices[0].delta.content:
        print(response_line.choices[0].delta.content, end="")
    else:
        print(".", end="")
    # if response_line.choices[0].delta.content is not None:
    #     print(response_line.choices[0].delta.content, flush=True, end="")


