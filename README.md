# GenAI-Chatbox
![logo](./ai-client/src/assets/Asset1.png)

## Overview
This app is built of a multi-level architecture, combining open-source LLM models with a custom-built API server and a client interface.


**Language Model:**
- **Mistral-7B** open-source Large Language Model efficiently runs using **LLaMA.cpp** optimized for local inference

**Application Server:**
- **FastAPI**: fascilitates the interaction between the client and the language model. **OpenAI API** configured to operate locally with Mistral-7B, without any external calls

**Client Interface:**
- **React** framework is used for building a simple and intuitive frontend

## Prerequisites
- **Python**: 3.10 or higher
- **Node.js**: 18.16.0 or higher

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
    
      *Replace YOUR_MODEL_FILE.gguf with the path to the model file you'd like to use (Note: Ensure that the model file is placed in the models folder).*
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


## Final NOtes
I have configured the ports to load without conflicts:
- Llama.cpp runs on port 8000.
- The Application Server runs on port 8001.
- The React app opens on port 3000 (or another port if you choose to specify one).

There shouldn't be any conflicts, but you can check for any running processes on these ports if needed.

- On Windows:

  1. Open Command Prompt or PowerShell as an administrator.

  2. Run the following command to check for running processes:
      ```
      netstat -ano | findstr :8000
      netstat -ano | findstr :8001
      netstat -ano | findstr :3000
      ```
  
  3. This will display the PID of any process using the specified port.

  4. To terminate a process, use:
      ```
      taskkill /PID <PID> /F
      ```
  
- On Linux/Mac:

  1. Open a terminal.

  2. Run the following command to check for running processes:
      ```
      sudo lsof -i :8000
      sudo lsof -i :8001
      sudo lsof -i :3000
      ```

  3. This will display a list of processes using the specified port along with their PID.

  4. To terminate a process, use:
      ```
      sudo kill -9 <PID>
      ```

___

Feel free to open an issue on GitHub if you encounter any issues or have suggestions for improvement.