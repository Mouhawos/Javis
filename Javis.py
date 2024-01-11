import requests
from fastapi import FastAPI
from pydantic import BaseModel
import openai
import re
import pylint

app = FastAPI()

# Set up OpenAI API credentials
openai.api_key = "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"

# Set up Google CSE API key and ID
GOOGLE_CSE_API_KEY = "votre_clé_d_api_google_cse"
GOOGLE_CSE_ID = "votre_id_cse"

# Set up VirusTotal API key
VIRUSTOTAL_API_KEY = "votre_clé_d_api_virustotal"

# Set up Snyk API key
SNYK_API_KEY = "votre_clé_api_snyk"

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

def google_cse_search(api_key, cx, query):
    base_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        'key': api_key,
        'cx': cx,
        'q': query,
    }

    response = requests.get(base_url, params=params)
    return response.json()

def scan_file_with_virustotal(file_path):
    url = "https://www.virustotal.com/vtapi/v2/file/scan"
    params = {'apikey': VIRUSTOTAL_API_KEY}
    
    with open(file_path, 'rb') as file:
        files = {'file': (file_path, file)}
        response = requests.post(url, files=files, params=params)
        
    return response.json()

def check_code_quality(code):
    try:
        pylint_output = pylint.lint.py_run(code, return_std=True)
        return pylint_output.stdout.getvalue()
    except Exception as e:
        return f"Error during code quality check: {str(e)}"

def check_code_vulnerabilities(file_path):
    try:
        snyk_url = "https://snyk.io/api/v1/test/python"
        headers = {"Authorization": f"Bearer {SNYK_API_KEY}"}

        with open(file_path, 'r') as file:
            code_content = file.read()

        payload = {"files": {"target.py": {"content": code_content}}}
        response = requests.post(snyk_url, headers=headers, json=payload)

        return response.json()
    except Exception as e:
        return f"Error during Snyk code check: {str(e)}"

def respond_to_input(user_input):
    user_input = preprocess_input(user_input)

    cybersecurity_keywords = ["cybersecurity", "security", "threats", "vulnerabilities", "phishing", "malware", "hacking", "data breach", "firewall", "Cyber threats", "network security", "data protection", "information security", "cyber hygiene", "social engineering", "encryption", "incident response", "access control", "security awareness", "vulnerability management", "patch management", "phishing attacks", "ransomware", "intrusion detection", "malware analysis", "digital forensics", "identity theft", "secure coding", "data stolen"]

    if check_for_keywords(user_input, cybersecurity_keywords):
        search_results = google_cse_search(GOOGLE_CSE_API_KEY, GOOGLE_CSE_ID, user_input)
        file_path = "chemin_vers_votre_fichier"
        virustotal_result = scan_file_with_virustotal(file_path)
        gpt_response = generate_response(model_prompt, model_engine)

        # Intégrez la détection des bugs de code
        code_to_check = "votre_code_source"
        code_quality_result = check_code_quality(code_to_check)

        # Intégrez le vérificateur de code Snyk
        code_file_path = "chemin_vers_votre_code"
        code_vulnerabilities_result = check_code_vulnerabilities(code_file_path)

        final_response = f"Response from GPT-4: {gpt_response} | Google CSE Results: {search_results} | VirusTotal Scan Result: {virustotal_result} | Code Quality: {code_quality_result} | Snyk Code Check: {code_vulnerabilities_result}"

        return final_response
    else:
        return "I'm sorry, I didn't understand your cybersecurity question. Can you please try again?"

@app.post('/api/chat')
def chat(input_data: ChatInput):
    user_input = input_data.user_input
    response = respond_to_input(user_input)
    return {"response": response}     

# Liste de patterns de phishing à détecter dans l'adresse e-mail
phishing_patterns = [
    r'\bphish\b',  # Détecte le mot "phish"
    r'\b(?:[a-z]+\.)*hack(?:\.[a-z]+)*\b',  # Détecte les variations de "hack"
    r'\b(?:[a-z]+\.)*evil\.com\b',  # Détecte le domaine "evil.com"
    # Ajoutez d'autres patterns de phishing au besoin
]

def evaluate_email_security(email_address):
    for pattern in phishing_patterns:
        if re.search(pattern, email_address, re.IGNORECASE):
            return "Attention : Des risques potentiels de phishing ont été détectés dans cette boîte e-mail. Veuillez prendre des mesures appropriées."

    return "Cette boîte e-mail semble être sécurisée."

# Exemple d'utilisation dans la fonction respond_to_input
def respond_to_input(user_input):
    user_input = preprocess_input(user_input)

    cybersecurity_keywords = ["cybersecurity", "security", "threats", "vulnerabilities", "phishing", "malware", "hacking", "data breach", "firewall", "Cyber threats", "network security", "data protection", "information security", "cyber hygiene", "social engineering", "encryption", "incident response", "access control", "security awareness", "vulnerability management", "patch management", "phishing attacks", "ransomware", "intrusion detection", "malware analysis", "digital forensics", "identity theft", "secure coding", "data stolen"]

    if check_for_keywords(user_input, cybersecurity_keywords):
        if "analyses de menaces personnalisées" in user_input:
            response = perform_custom_threat_analysis()
        elif "conseils d’implémentation de politiques de sécurité" in user_input:
            response = implement_security_policy_recommendations()
        # Ajoutez des conditions similaires pour les autres points énumérés
        else:
            response = generate_response(model_prompt, model_engine)
        
        return response
    else:
        return "Je suis désolé, je n'ai pas compris votre question sur la cybersécurité. Pouvez-vous réessayer s'il vous plaît?"
