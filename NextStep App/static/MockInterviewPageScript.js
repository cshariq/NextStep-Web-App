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
        console.log("heu")
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
            // text = text.replace(/*([^*]+)*/g, '');
            // text = text.replace(/**/g, '');
            newMessage.textContent = text;
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
    if (document.querySelector('.textbox').value.trim() == '') {
        document.getElementById('mic-button').style.display = 'flex';
        document.getElementById('loader').style.display = 'block';
        document.getElementById('chat-button').style.display = 'none';
    } else {
        document.getElementById('mic-button').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('chat-button').style.display = 'flex';
    }
    const textbox = document.querySelector('.textbox');

    textbox.addEventListener('input', () => {
        if (textbox.value.trim() === '') {
            document.getElementById('mic-button').style.display = 'flex';
            document.getElementById('loader').style.display = 'block';
            document.getElementById('chat-button').style.display = 'none';
        } else {
            document.getElementById('mic-button').style.display = 'none';
            document.getElementById('loader').style.display = 'none';
            document.getElementById('chat-button').style.display = 'flex';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var chatContainer = document.getElementById("chatContainer");
    // chatContainer.scrollTop = chatContainer.scrollHeight;
  });

// document.addEventListener('DOMContentLoaded', function() {
//     var wavesurfer = WaveSurfer.create({
//         container: '#waveform',
//         waveColor: 'black',
//         progressColor: 'darkgrey',
//         backend: 'MediaElement',
//         barWidth: 2,
//         barHeight: 1, // the height of the wave
//         barGap: null, // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
//         height: 35
//     });

//     wavesurfer.load("static/recorded_audio_file.mp3");

//     var audioElement = document.getElementById('audio');
//     audioElement.addEventListener('play', function() {
//         wavesurfer.play();
//     });
//     audioElement.addEventListener('pause', function() {
//         wavesurfer.pause();
//     });
//     audioElement.addEventListener('seeked', function() {
//         wavesurfer.seekTo(audioElement.currentTime / audioElement.duration);
//     });
// });

function startLoading() {
    document.getElementById('loader').classList.add('active');
    fetch('/start-task', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
            setTimeout(stopLoading, 30000);
            fetch('/generate-audio')
                .then(response => response.json())
                .then(data => {
                    createAudioElement(data.audio_id);
                });
        });
}

function stopLoading() {
    document.getElementById('loader').classList.remove('active');
}

function playAudio(unique_audio_id) {
    var audio = document.getElementById(unique_audio_id);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function createAudioElement(audio_id) {
    var container = document.getElementById('messageContainer');
    var audioDiv = document.createElement('div');
    audioDiv.className = 'message sent';
    audioDiv.id = 'displayAudio';

    var button = document.createElement('button');
    button.className = 'circle-button';
    button.innerHTML = '<span class="material-symbols-outlined" id="audio-icon" onclick="playAudio(\'' + audio_id + '\')">volume_up</span>';
    audioDiv.appendChild(button);

    var waveformDiv = document.createElement('div');
    waveformDiv.id = 'waveform';
    audioDiv.appendChild(waveformDiv);

    var audioElement = document.createElement('audio');
    audioElement.id = audio_id;
    audioElement.src = '/static/' + audio_id;
    audioElement.controls = true;
    audioElement.style.display = 'none';
    audioDiv.appendChild(audioElement);

    container.appendChild(audioDiv);

    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        progressColor: 'darkgrey',
        backend: 'MediaElement',
        barWidth: 2,
        barHeight: 1,
        barGap: null,
        height: 35
    });

    wavesurfer.load(audioElement.src);

    audioElement.addEventListener('play', function() {
        wavesurfer.play();
    });
    audioElement.addEventListener('pause', function() {
        wavesurfer.pause();
    });
    audioElement.addEventListener('seeked', function() {
        wavesurfer.seekTo(audioElement.currentTime / audioElement.duration);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-button').addEventListener('click', startLoading);
});


// function startLoading() {
//     document.getElementById('loader').classList.add('active');
// }

// function stopLoading() {
//     document.getElementById('loader').classList.remove('active');
// }

function playAudio() {
    var audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// document.getElementById('textbox').addEventListener('input', function() {
//     document.getElementById('mic-button').style.display = 'none';
// });

document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.getElementById('settings');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popupClose');

    settingsButton.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    popupClose.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});

document.getElementById('end-button').addEventListener('click', function() {
    window.location.href = 'LandingPage.html';
});