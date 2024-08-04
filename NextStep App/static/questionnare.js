function toggleDisabilityDetails() {
    const disability = document.getElementById('disability').value;
    const disabilityDetails = document.getElementById('disability-details');
    disabilityDetails.style.display = disability === 'yes' ? 'block' : 'none';
}

function toggleEducationDetails() {
    const education = document.getElementById('education').value;
    const educationDetails = document.getElementById('education-details');
    educationDetails.style.display = education === 'college-university' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form[action="/submit-survey"]').onsubmit = function(event) {
        event.preventDefault(); 
        window.location.href = "home";
    };
});

document.getElementById('survey-form').addEventListener('submit', function(event) {
    initialize();
    event.preventDefault(); 
    
});

async function initialize() {
    // var desiredRoles = document.getElementById('desired-roles').value;
    var job = "desiredRoles"; 
    try {
        const response = await fetch('/initialize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: job })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}