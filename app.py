from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from fastapi.responses import StreamingResponse

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

client = OpenAI(
    api_key="sk-no-key-required",
    base_url="http://localhost:8000/v1/",
)

class ChatRequest(BaseModel):
    message: str
    conversation_history: list

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="mistral-7b",
            messages=request.conversation_history + [
                {"role": "user", "content": request.message},
            ],
            stream=True,
        )

        def generate():
            for response_line in response:
                if response_line.choices[0].delta.content:
                    yield response_line.choices[0].delta.content


        return StreamingResponse(generate(), media_type="text/plain")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
