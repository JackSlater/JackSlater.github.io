/**
 * Main JavaScript file for the portfolio website
 * 
 * This file contains all the interactive functionality for the portfolio website.
 * It includes:
 * 1. Mobile navigation handling
 * 2. Form validation
 * 3. Scroll animations
 * 4. Interactive elements
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded. Scripts initialized.');
    
    // Call initialization functions
    initFormValidation();
    initScrollAnimations();
    
    // Add any other initialization functions here
});

/**
 * Form Validation
 * Validates the contact form before submission
 */
function initFormValidation() {
    // Get the contact form if it exists on the page
    const contactForm = document.getElementById('contact-form');
    
    // Only proceed if the contact form exists on the current page
    if (contactForm) {
        console.log('Contact form found. Setting up validation...');
        
        // Add submit event listener to the form
        contactForm.addEventListener('submit', function(event) {
            // Prevent the form from submitting by default
            event.preventDefault();
            
            // Get form input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Track form validation status
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('name');
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('email');
            }
            
            // Validate subject
            if (subject === '') {
                showError('subject', 'Please enter a subject');
                isValid = false;
            } else {
                clearError('subject');
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else {
                clearError('message');
            }
            
            // If all validations pass, show success message
            if (isValid) {
                // In a real application, you would submit the form data to a server here
                // For this template, we'll just show a success message
                const successMessage = document.getElementById('form-success');
                successMessage.style.display = 'block';
                
                // Clear form fields
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

/**
 * Show error message for a form field
 * @param {string} fieldId - The ID of the form field
 * @param {string} message - The error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error class to the input
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
}

/**
 * Clear error message for a form field
 * @param {string} fieldId - The ID of the form field
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // Remove error class from the input
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
}

/**
 * Validate email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email format is valid
 */
function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize scroll animations
 * Add smooth animations when scrolling through the page
 */
function initScrollAnimations() {
    // Get all sections that should be animated on scroll
    const sections = document.querySelectorAll('section');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollPosition = window.scrollY + window.innerHeight * 0.8;
        
        // Check each section
        sections.forEach(section => {
            // Get section position
            const sectionTop = section.offsetTop;
            
            // Add animation class when section is in view
            if (scrollPosition > sectionTop) {
                section.classList.add('animate');
            }
        });
    });
    
    // Trigger scroll event once to check initial view
    window.dispatchEvent(new Event('scroll'));
}