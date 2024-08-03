// Get the slider and body elements
const themeSlider = document.getElementById('themeSlider');
const body = document.body;

// Check the saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeSlider.checked = savedTheme === 'light-mode';
} else {
    // Default to dark mode
    body.classList.add('dark-mode');
}

// Function to toggle theme
function toggleTheme() {
    if (themeSlider.checked) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
}

// Add event listener to the slider
themeSlider.addEventListener('change', toggleTheme);
