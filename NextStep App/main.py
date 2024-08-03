from flask import Flask, render_template, request, jsonify, Response, redirect, url_for, flash
from generateQuestion import ChatSession
import yaml
import cv2
import os

chat_session = ChatSession()
response = ""
app = Flask(__name__)
app.secret_key = os.urandom(24)

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

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # frame = cv2.resize(frame, (240, 480))
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def home():
    return render_template('MockInterviewPage.html')

@app.route('/login')
def login():
    return render_template('LoginPage.html')

@app.route('/about')
def about():
    return render_template('LandingPage.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    global response
    message = request.json.get('message')
    response = chat_session.send_message(message)
    return jsonify({'message': response.text})

@app.route('/receive_message')
def receive_message():
    global response
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
