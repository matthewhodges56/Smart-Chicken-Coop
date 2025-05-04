// Buttons & Forms
const divRegistration = document.getElementById('divRegistration');
const divLogin = document.getElementById('divLogin');
const btnShowLogin = document.getElementById('btnShowLogin');

document.addEventListener('DOMContentLoaded', () => {
    $('#selState').select2( {
        theme: "bootstrap-5",
        width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
        placeholder: $( this ).data( 'placeholder' ),
        dropdownParent: $( '#selState' ).parent(),
        allowClear: false,
        minimumResultsForSearch: Infinity, // Disable search box
    } );

    // Validation for required fields
    const requiredFields = [
        { id: 'txtLoginEmail', feedback: 'Email is required.' },
        { id: 'txtLoginPassword', feedback: 'Password is required.' },
        { id: 'txtFirstName', feedback: 'First name is required.' },
        { id: 'txtLastName', feedback: 'Last name is required.' },
        { id: 'txtStreetAddress1', feedback: 'Street Address 1 is required.' },
        { id: 'txtCity', feedback: 'City is required.' },
        { id: 'txtCoopRegistrationID', feedback: 'Coop Registration ID is required.' }
    ];

    // Email validation for login form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = document.getElementById('txtEmail');
    if (emailInput) {
        let loginEmailFeedback = emailInput.parentNode.querySelector('.invalid-feedback');

        if (!loginEmailFeedback) {
            loginEmailFeedback = document.createElement('div');
            loginEmailFeedback.className = 'invalid-feedback';
            loginEmailFeedback.textContent = 'Please enter a login email address.';
            emailInput.parentNode.appendChild(loginEmailFeedback);
        }

        loginEmailFeedback.style.display = 'none';

        emailInput.addEventListener('input', function () {
            if (emailRegex.test(this.value.trim())) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                loginEmailFeedback.style.display = 'none';
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                loginEmailFeedback.style.display = 'block';
            }
        });
    }

    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordInput = document.getElementById('txtPassword');
    if (passwordInput) {
        let loginPasswordFeedback = passwordInput.parentNode.querySelector('.invalid-feedback');

        if (!loginPasswordFeedback) {
            loginPasswordFeedback = document.createElement('div');
            loginPasswordFeedback.className = 'invalid-feedback';
            loginPasswordFeedback.textContent = 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.';
            passwordInput.parentNode.appendChild(loginPasswordFeedback);
        }

        loginPasswordFeedback.style.display = 'none';

        passwordInput.addEventListener('input', function () {
            if (passwordRegex.test(this.value.trim())) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                loginPasswordFeedback.style.display = 'none';
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                loginPasswordFeedback.style.display = 'block';
            }
        });
    }

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
            // Check if feedback already exists
            let feedback = input.parentNode.querySelector('.invalid-feedback');
            
            // Create new feedback if it doesn't exist
            if (!feedback) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = field.feedback;
                input.parentNode.appendChild(feedback);
            }

            // Set initial display to none
            feedback.style.display = 'none';

            // Add input event listener
            input.addEventListener('input', function () {
                if (this.value.trim().length > 0) {
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                    feedback.style.display = 'none';
                } else {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                    feedback.style.display = 'block';
                }
            });
        }
    });

    // Optional validation for Street Address 2
    const streetAddress2Input = document.getElementById('txtStreetAddress2');
    if (streetAddress2Input) {
        let feedback = streetAddress2Input.parentNode.querySelector('.invalid-feedback');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = 'Street Address 2 is invalid.';
            streetAddress2Input.parentNode.appendChild(feedback);
        }

        feedback.style.display = 'none';

        streetAddress2Input.addEventListener('input', function () {
            if (this.value.length > 0) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                feedback.style.display = 'none';
            } else {
                this.classList.remove('is-valid');
                this.classList.remove('is-invalid');
                feedback.style.display = 'none';
            }
        });
    }

    // ZIP Code validation
    const zipInput = document.getElementById('txtZipCode');
    if (zipInput) {
        let zipFeedback = zipInput.parentNode.querySelector('.invalid-feedback');
        
        if (!zipFeedback) {
            zipFeedback = document.createElement('div');
            zipFeedback.className = 'invalid-feedback';
            zipFeedback.textContent = 'ZIP code must be exactly 5 digits.';
            zipInput.parentNode.appendChild(zipFeedback);
        }

        zipFeedback.style.display = 'none';

        zipInput.addEventListener('input', function () {
            const zipRegex = /^\d{5}$/;
            if (zipRegex.test(this.value)) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                zipFeedback.style.display = 'none';
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                zipFeedback.style.display = 'block';
            }
        });
    }

    // Phone number validation
    const phoneInput = document.getElementById('telPhone');
    if (phoneInput) {
        let phoneFeedback = phoneInput.parentNode.querySelector('.invalid-feedback');
        
        if (!phoneFeedback) {
            phoneFeedback = document.createElement('div');
            phoneFeedback.className = 'invalid-feedback';
            phoneFeedback.textContent = 'Phone number must be exactly 10 digits.';
            phoneInput.parentNode.appendChild(phoneFeedback);
        }

        phoneFeedback.style.display = 'none';

        phoneInput.addEventListener('input', function () {
            const phoneRegex = /^\d{10}$/;
            if (phoneRegex.test(this.value)) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                phoneFeedback.style.display = 'none';
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                phoneFeedback.style.display = 'block';
            }
        });
    }
});
