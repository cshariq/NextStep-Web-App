document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeSlider');
    // const paymentCheckout = document.getElementById('paymentCheckout');
    const chat = document.getElementById('chat');
    const camera = document.getElementById('camera');
    const container = document.getElementById('chatbox');
    
    // Check the saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        camera.classList.add('light-mode');
        chat.classList.add('light-mode');
        container.classList.add('light-mode');
        toggle.checked = true;
    } else {
        document.body.classList.add('dark-mode'); // Default is dark mode
        camera.classList.add('dark-mode');
        chat.classList.add('dark-mode');
        container.classList.add('dark-mode');
    }
    
    // Add an event listener for the toggle switch
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            camera.classList.remove('dark-mode');
            camera.classList.add('light-mode');
            chat.classList.remove('dark-mode');
            chat.classList.add('light-mode');
            container.classList.remove('dark-mode');
            container.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            camera.classList.remove('light-mode');
            camera.classList.add('dark-mode');
            chat.classList.remove('light-mode');
            chat.classList.add('dark-mode');
            container.classList.remove('light-mode');
            container.classList.add('dark-mode');
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

async function sendMessage() {
    try {
        var input = document.querySelector('.textbox').value;
        var newMessage = document.createElement('div');
        var chatContainer = document.getElementById("messageContainer");
        newMessage.className = 'message sent';
        newMessage.textContent = input;
        var chatContainer = document.querySelector('.messages');
        chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
        document.querySelector('.textbox').value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
        const response = await fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
    receiveMessage();
}

function receiveMessage() {
    fetch('/receive_message')
        .then(response => response.json())
        .then(data => {
            var element = document.getElementById('myElement');
            var newMessage = document.createElement('div');
            var chatContainer = document.getElementById("messageContainer");
            newMessage.className = 'message received';
            text = data.message
            // text = text.replace(/*(.*?)*/g, '<strong>$1</strong>');
            // text = text.replace(/\n/g, '<br>');
            newMessage.textContent = "__text__";
            var chatContainer = document.querySelector('.messages');
            chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
            document.querySelector('.textbox').value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        })
        .catch(error => console.error('Error:', error));
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

function startLoading() {
    document.getElementById('loader').classList.add('active');
}

function stopLoading() {
    document.getElementById('loader').classList.remove('active');
}