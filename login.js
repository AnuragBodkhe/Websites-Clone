// Main login functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginForm();
});

/**
 * Initialize the login form with event listeners and validation
 */
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Check if credentials match (username: 123, password: 123)
        if (username === '123' && password === '123') {
            // Show success message
            alert('Login successful!');
            // Redirect to main page
            window.location.href = 'index.html';
        } else {
            // Show error message
            alert('Invalid username or password. Please use "123" for both fields.');
        }
    });
}

// Add input validation for better user experience
document.getElementById('username').addEventListener('input', function() {
    if (this.value && this.value !== '123') {
        this.style.borderColor = '#ff4444';
    } else {
        this.style.borderColor = '#ddd';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value && this.value !== '123') {
        this.style.borderColor = '#ff4444';
    } else {
        this.style.borderColor = '#ddd';
    }
}); 