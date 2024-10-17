# GenAI-Chatbox
![logo](./ai-client/src/assets/Asset1.png)

## Overview
This app is built of a multi-level architecture, combining open-source LLM models with a custom-built API server and a client interface.

**Prerequisites:**
- **Python**: 3.10 or higher
- **Node.js**: 18.16.0 or higher

**Language Model:**
- **Mistral-7B** open-source Large Language Model efficiently runs using **LLaMA.cpp** optimized for local inference

**API Server:**
- **FastAPI**: fascilitates the interaction between the client and the language model. **OpenAI API** configured to operate locally with Mistral-7B, without any external calls

**Client Interface:**
- **React** framework is used for building a simple and intuitive frontend


## Installation
1. clone the repository
    ```
    git clone https://github.com/carlshizi/GenAI-Chatbox.git
    ```


2. Create a new virtual environment (Optional)
- Activate the virtual environment:
  - On Windows:

    ```
    python -m venv venv
    venv\Scripts\activate
    ```
  - On MacOS/Linux:
    ```
    python -m venv venv
    source venv/Scripts/activate
    ```

3. Install python dependencies
    ```
    pip install -r requirements.txt
    ```

4. Download .gguf Model
    You have a few options, but I recommend downloading the model from [Huggingface](https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF), and place the model in the `models` folder.


5. Clone the Llama.cpp repository (AI server)
    ```
    git clone https://github.com/ggerganov/llama.cpp
    ```

6. Install Llama.cpp:
    - On MacOS/Linux:
      ```
      make
      ```
    - On Windows (*follow the instruction below*):
      - Installation instruction: [Build llama.c locally](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md)


7. Start the Application Server, AI Server, and Client Interface
    - Open a terminal in the project root, and start the AI Server.
    
      *Replace YOUR_MODEL_FILE.gguf with the path to the model file you'd like to use:*
      
      *(Note: Ensure that the model file is placed in the models folder)*
      ```
      python -m llama_cpp.server --model models\YOUR_MODEL_FILE.gguf --n_gpu -1
      ```
    - Open another terminal in the project root, and start the Application Server
      ```
      python app.py
      ```

    - Open another terminal in the `ai-client` folder, and start the Client Interface
      ```
      npm start
      ```
