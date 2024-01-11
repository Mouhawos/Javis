from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import re

app = FastAPI()

# Set up OpenAI API credentials
openai.api_key = "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"

# Load the GPT-4 model
model_engine = "GPT-4"
model_prompt = "I am a cybersecurity chatbot. How can I assist you today?"

class ChatInput(BaseModel):
    user_input: str

def generate_response(prompt, model):
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=1020,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response.choices[0].text.strip()

def preprocess_input(input_text):
    input_text = re.sub(r'\W+', ' ', input_text)
    input_text = input_text.lower()
    return input_text

def check_for_keywords(input_text, keywords):
    for word in keywords:
        if word in input_text:
            return True
    return False

def respond_to_input(user_input):
    user_input = preprocess_input(user_input)

    cybersecurity_keywords = ["cybersecurity", "security", "threats", "vulnerabilities", "phishing", "malware", "hacking", "data breach", "firewall", "Cyber threats", "network security", "data protection", "information security", "cyber hygiene", "social engineering", "encryption", "incident response", "access control", "security awareness", "vulnerability management", "patch management", "phishing attacks", "ransomware", "intrusion detection", "malware analysis", "digital forensics", "identity theft", "secure coding", "data stolen"]

    if check_for_keywords(user_input, cybersecurity_keywords):
        response = generate_response(model_prompt, model_engine)
        return response
    else:
        return "I'm sorry, I didn't understand your question. Can you please try again?"

@app.post('/api/chat')
def chat(input_data: ChatInput):
    user_input = input_data.user_input
    response = respond_to_input(user_input)
    return {"response": response}
