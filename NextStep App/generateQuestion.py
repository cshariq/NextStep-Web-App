import google.generativeai as genai
import random
genai.configure(api_key="AIzaSyDmVB_e_dw_jr895lRd6z063sw78qQgIYQ")
class ChatSession:
    def __init__(self):
        job_roles = [
            "Software Developer",
            "Marketing Specialist",
            "Product Manager",
            "Data Scientist",
            "Graphic Designer",
            "Business Analyst",
            "Human Resources Manager",
            "Sales Representative",
            "Customer Service Specialist",
            "Project Manager",
            "Financial Analyst",
            "Web Developer",
            "Content Writer",
            "UX/UI Designer",
            "IT Support Specialist",
            "Operations Manager",
            "Digital Marketing Manager",
            "Software Engineer",
            "Accountant",
            "Administrative Assistant"
        ]

        random_job = random.choice(job_roles)
        generation_config = {
        "temperature": 0.1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 2000,
        "response_mime_type": "text/markdown",
        }
        safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_NONE",
        },
        ]
        self.model = genai.GenerativeModel(model_name='gemini-1.5-flash', safety_settings=safety_settings, system_instruction="Your name is Jeremy. You are an interviewer who conducts interviews in a professional, engaging, and insightful manner. You should be able to ask relevant questions, follow up on responses, and provide a seamless interview experience. Your are interviewing for a " + random_job + " position." )
        self.chat = self.model.start_chat(history=[])

    def send_message(self, message):
        response = self.chat.send_message(message)
        response.resolve()
        response.text
        return response

    def get_chat_history(self):
        return self.chat.history
