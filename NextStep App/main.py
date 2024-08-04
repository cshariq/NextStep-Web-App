from flask import Flask, render_template, request, jsonify, Response, redirect, url_for, flash
from generateQuestion import ChatSession
# from model import Model
import threading
import yaml
import cv2
import os
import time
import random

chat_session = None
response = ""
app = Flask(__name__)
app.secret_key = os.urandom(24)
messages = ""
chat_session = ChatSession()
gemini_responses = 0
@app.route('/initialize', methods=['POST'])
def initialize():
    global chat_session
    print("hello")
    # data = request.json
    jobs = request.json.get('message')
    print(jobs)
    chat_session = ChatSession(jobs)


# Load users from YAML file
def load_users():
    if not os.path.exists('users.yaml'):
        with open('users.yaml', 'w') as file:
            yaml.safe_dump({}, file)
    with open('users.yaml', 'r') as file:
        return yaml.safe_load(file) or {}

# Save users to YAML file
def save_users(users):
    with open('users.yaml', 'w') as file:
        yaml.safe_dump(users, file)

camera = cv2.VideoCapture(0)

def long_running_function():
    # Your long-running function logic here
    print("hello")
    time.sleep(30)  # Simulate a long-running task

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # frame = cv2.resize(frame, (240, 480))
            # cv2.imwrite("image.jpg", frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/home')
def home():
    return render_template('MockInterviewPage.html')

@app.route('/login')
def login():
    return render_template('LoginPage.html')

@app.route('/')
def about():
    return render_template('LandingPage.html')

@app.route('/resources')
def resources():
    return render_template('eduResources.html')

@app.route('/questionnaire')
def questionnaire():
    return render_template('Questionnaire.html')

@app.route('/start-task', methods=['POST'])
def start_task():
    thread = threading.Thread(target=long_running_function)
    thread.start()
    return jsonify({'status': 'Task started'})

@app.route('/generate-audio')
def generate_audio():
    # Logic to generate unique audio files
    unique_audio_id = 'unique_audio_file.mp3'  # Example
    return jsonify({'audio_id': unique_audio_id})


@app.route('/send_message', methods=['POST'])
def send_message():
    global response
    global messages
    global gemini_responses
    message = request.json.get('message')
    messages = message + messages
    gemini_responses += 1
    if gemini_responses == 7:
        text_length = len(messages)
        # Define a base score and a scaling factor
        base_score = 50
        scaling_factor = 0.5
        
        # Calculate the score based on text length
        score = base_score + (text_length * scaling_factor)
        
        # Generate a random adjustment to make the score more dynamic
        random_adjustment = random.uniform(-5, 5)
        
        # Final score with random adjustment
        final_score = score + random_adjustment
        
        # Ensure the score is within a reasonable range (e.g., 0 to 100)
        final_score = max(0, min(final_score, 100))
        
        response = round(final_score, 2)
    else:
        response = chat_session.send_message(message)
        return jsonify({'message': response.text})

@app.route('/receive_message')
def receive_message():
    global response
    global gemini_responses
    if gemini_responses == 7:
        return jsonify({'message': response})
    else:
        return jsonify({'message': response.text})

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/submit-signup', methods=['POST'])
def submit_signup():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    users = load_users()
    if username in users:
        flash('Username already exists!')
    users[username] = {'email': email, 'password': password}
    save_users(users)
    flash('Signup successful!')
    return redirect(url_for('home'))

@app.route('/submit-login', methods=['POST'])
def submit_login():
    username = request.form['username']
    password = request.form['password']

    users = load_users()
    if username in users and users[username]['password'] == password:
        flash('Login successful!')
        return redirect(url_for('home'))
    flash('Invalid username or password!')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
