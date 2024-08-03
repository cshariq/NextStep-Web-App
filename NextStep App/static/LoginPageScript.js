document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeSlider');
    const login = document.getElementById('login-form');
    
    // Check the saved theme in localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        login.classList.add('light-mode');
        toggle.checked = true;
    } else {
        document.body.classList.add('dark-mode'); // Default is dark mode
        login.classList.add('dark-mode');
    }
    
    // Add an event listener for the toggle switch
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            login.classList.remove('dark-mode');
            login.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            login.classList.remove('light-mode');
            login.classList.add('dark-mode');
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