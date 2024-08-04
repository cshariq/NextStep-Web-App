document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeSlider');
    
    // Check the saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        toggle.checked = true;
    } else {
        document.body.classList.add('dark-mode'); // Default is dark mode
    }
    
    // Add an event listener for the toggle switch
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});


function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}
function sendMessage() {
    var input = document.querySelector('.textbox').value;
    var newMessage = document.createElement('div');
    var chatContainer = document.getElementById("chatContainer");
    newMessage.className = 'message sent';
    newMessage.textContent = input;
    var chatContainer = document.querySelector('.messages');
    chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
    document.querySelector('.textbox').value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
    })
    .then(response => response.json())
    .then(data => {
        receiveMessage(data.response);
    });
}

function recieveMessage(input) {
    var newMessage = document.createElement('div');
    var chatContainer = document.getElementById("chatContainer");
    newMessage.className = 'message received';
    newMessage.textContent = input;
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
    document.querySelector('.textbox').value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function checkEnter(event) {
    if (event.key === 'Enter' && document.querySelector('.textbox').value.trim() !== '') {
        sendMessage();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var chatContainer = document.getElementById("chatContainer");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });