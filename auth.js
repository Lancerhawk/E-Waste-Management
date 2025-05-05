// Authentication and form validation functionality
const AUTH_KEY = 'green_exchange_auth';

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateFullName(name) {
    return name.length >= 2;
}

function showError(formElement, message) {
    const errorDiv = formElement.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formElement.querySelector('.error-message')) {
        formElement.appendChild(errorDiv);
    }
}

function showSuccess(formElement, message) {
    const successDiv = formElement.querySelector('.success-message') || document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    if (!formElement.querySelector('.success-message')) {
        formElement.appendChild(successDiv);
    }
}

function clearMessages(formElement) {
    const messages = formElement.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
}

// Authentication functions
function setAuthToken(token) {
    localStorage.setItem(AUTH_KEY, token);
}

function getAuthToken() {
    return localStorage.getItem(AUTH_KEY);
}

function removeAuthToken() {
    localStorage.removeItem(AUTH_KEY);
}

function isAuthenticated() {
    return !!getAuthToken();
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessages(loginForm);

        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;

        if (!validateEmail(email)) {
            showError(loginForm, 'Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            showError(loginForm, 'Password must be at least 8 characters long');
            return;
        }

        try {
            // Simulate authentication - Replace with actual API call
            const token = 'dummy_token';
            setAuthToken(token);
            showSuccess(loginForm, 'Login successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            showError(loginForm, 'Login failed. Please try again.');
        }
    });
}

// Register form handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessages(registerForm);

        const fullName = registerForm.fullName.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        if (!validateFullName(fullName)) {
            showError(registerForm, 'Please enter your full name');
            return;
        }

        if (!validateEmail(email)) {
            showError(registerForm, 'Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            showError(registerForm, 'Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            showError(registerForm, 'Passwords do not match');
            return;
        }

        try {
            // Simulate registration - Replace with actual API call
            showSuccess(registerForm, 'Registration successful!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } catch (error) {
            showError(registerForm, 'Registration failed. Please try again.');
        }
    });
}

// Check authentication status on main page
document.addEventListener('DOMContentLoaded', () => {
    const isMainPage = window.location.pathname.endsWith('index.html');
    const isAuthPage = window.location.pathname.includes('login.html') || 
                       window.location.pathname.includes('register.html');

    if (isMainPage && !isAuthenticated()) {
        window.location.href = 'login.html';
    } else if (isAuthPage && isAuthenticated()) {
        window.location.href = 'index.html';
    }
});

// Logout functionality
const logoutLink = document.getElementById('logoutLink');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        removeAuthToken();
        window.location.href = 'login.html';
    });
}