// // Get the slider and body elements
// const themeSlider = document.getElementById('themeSlider');
// const body = document.body;

// // Check the saved theme preference in localStorage
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme) {
//     body.classList.add(savedTheme);
//     themeSlider.checked = savedTheme === 'light-mode';
// } else {
//     // Default to dark mode
//     body.classList.add('dark-mode');
// }

// // Function to toggle theme
// function toggleTheme() {
//     if (themeSlider.checked) {
//         body.classList.remove('dark-mode');
//         body.classList.add('light-mode');
//         localStorage.setItem('theme', 'light-mode');
//     } else {
//         body.classList.remove('light-mode');
//         body.classList.add('dark-mode');
//         localStorage.setItem('theme', 'dark-mode');
//     }
// }

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

// Add event listener to the slider
themeSlider.addEventListener('change', toggleTheme);
