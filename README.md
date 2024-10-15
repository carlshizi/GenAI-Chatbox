# GenAI-Chatbox
Using open-source large language model (LLM)

## clone repo
git clone https://github.com/carlshizi/GenAI-Chatbox.git


## Download .gguf Model
[Huggingface](https://huggingface.co/TheBloke/Mistral-7B-v0.1-GGUF)




## AI Client
check versaions:
node -v
npm -v

### if not installed:
npm install


## AI Server
git clone https://github.com/ggerganov/llama.cpp

cd llama.cpp

## Installation instruction
[Build llama.c locally](https://github.com/ggerganov/llama.cpp/blob/master/docs/build.md)

Using make:

On Linux or MacOS:

make
On Windows (x86/x64 only, arm64 requires cmake):

Download the latest fortran version of w64devkit.
Extract w64devkit on your pc.
Run w64devkit.exe.
Use the cd command to reach the llama.cpp folder.
From here you can run:
make

## For running llama.cpp on a Windows machine, I prefer Windows Subsystem for Linux
Setting Up WSL (Windows Subsystem for Linux)
1. Install WSL:

Open PowerShell or Command Prompt as Administrator and run the following command:
wsl --install
This will install the latest version of WSL and set up the default Linux distribution (Ubuntu).

2. Check if WSL is Installed:
After installation, you can check if WSL is installed and list available distributions by running:
wsl --list --verbose

3. Start Ubuntu:
To start the default WSL distribution (e.g., Ubuntu), use the following command:
wsl
If you have multiple distributions, specify Ubuntu by running:
wsl -d Ubuntu

4. Install Necessary Build Tools:
Once inside the Ubuntu terminal, update the package list and install the necessary build tools:
```
sudo apt update
sudo apt install build-essential
```

5. Compile and Run the Project:
Run the following command to compile:
`make`


## Install python dependencies
```
pip install openai 'llama-cpp-python[server]' pydantic instructor
```

## Running the LLaMA.cpp Server
To run the server with a model, use the following command, replacing YOUR_MODEL_FILE.gguf with the path to the model file you'd like to use:

```
python -m llama_cpp.server --model models\YOUR_MODEL_FILE.gguf --n_gpu -1
```

Note: Ensure that the model file is placed in the models folder, and you can replace YOUR_MODEL_FILE.gguf with any model file (e.g., mistral-7b-v0.1.Q4_K_M.gguf).


python -m llama_cpp.server --model models\mistral-7b-instruct-v0.1.Q4_0.gguf --n_gpu -1