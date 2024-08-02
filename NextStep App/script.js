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
        // container.classList.add('dark-mode');
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

function sendMessage() {
    var input = document.querySelector('.textbox').value;
    var newMessage = document.createElement('div');
    newMessage.className = 'message sent';
    newMessage.textContent = input;
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
    document.querySelector('.textbox').value = '';
}

function recieveMessage(input) {
    var newMessage = document.createElement('div');
    newMessage.className = 'message received';
    newMessage.textContent = input;
    var chatContainer = document.querySelector('.chat-container');
    chatContainer.insertBefore(newMessage, chatContainer.querySelector('.container'));
    document.querySelector('.textbox').value = '';
}

function checkEnter(event) {
    if (event.key === 'Enter' && document.querySelector('.textbox').value.trim() !== '') {
        sendMessage();
    }
}