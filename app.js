// Buttons & Forms
const divRegistration = document.getElementById('divRegistration');
const divLogin = document.getElementById('divLogin');
const btnCancelRegistration = document.getElementById('btnCancelRegistration');
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

    // Check if the select element exists
    const stateSelect = $('#selState');
    if (stateSelect.length) {
        // Add validation for Select2
        stateSelect.on('change', function () {
            const value = $(this).val();
            if (value) {
                $(this).next('.select2-container').find('.select2-selection').addClass('is-valid').removeClass('is-invalid');
            } else {
                $(this).next('.select2-container').find('.select2-selection').addClass('is-invalid').removeClass('is-valid');
            }
        });
    }

    // Email validation
    const emailInput = document.getElementById('txtEmail');
    if (emailInput) {
        const emailFeedback = document.createElement('div');
        emailFeedback.className = 'invalid-feedback'; // Bootstrap class for invalid feedback
        emailFeedback.textContent = 'Please enter a valid email address.';
        emailInput.parentNode.appendChild(emailFeedback); // Add feedback below the input

        emailInput.addEventListener('input', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                emailFeedback.style.display = 'none'; // Hide feedback if valid
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                emailFeedback.style.display = 'block'; // Show feedback if invalid
            }
        });
    }

    // Password validation
    const passwordInput = document.getElementById('txtPassword');
    if (passwordInput) {
        const passwordFeedback = document.createElement('div');
        passwordFeedback.className = 'invalid-feedback'; // Bootstrap class for invalid feedback
        passwordFeedback.textContent = 'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
        passwordInput.parentNode.appendChild(passwordFeedback); // Add feedback below the input

        passwordInput.addEventListener('input', function () {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (passwordRegex.test(this.value)) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                passwordFeedback.style.display = 'none'; // Hide feedback if valid
            } else {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                passwordFeedback.style.display = 'block'; // Show feedback if invalid
            }
        });
    }

    // Validation for required fields
    const requiredFields = [
        { id: 'txtFirstName', feedback: 'First name is required.' },
        { id: 'txtLastName', feedback: 'Last name is required.' },
        { id: 'txtStreetAddress1', feedback: 'Street Address 1 is required.' },
        { id: 'txtCity', feedback: 'City is required.' },
        { id: 'txtCoopRegistrationID', feedback: 'Coop Registration ID is required.' }
    ];

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback'; // Bootstrap class for invalid feedback
            feedback.textContent = field.feedback;
            input.parentNode.appendChild(feedback); // Add feedback below the input

            input.addEventListener('input', function () {
                if (this.value.length > 0) { // Check if the input length is greater than 0
                    this.classList.add('is-valid');
                    this.classList.remove('is-invalid');
                    feedback.style.display = 'none'; // Hide feedback if valid
                } else {
                    this.classList.add('is-invalid');
                    this.classList.remove('is-valid');
                    feedback.style.display = 'block'; // Show feedback if invalid
                }
            });
        }
    });

    // Optional validation for Street Address 2
    const streetAddress2Input = document.getElementById('txtStreetAddress2');
    if (streetAddress2Input) {
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback'; // Bootstrap class for invalid feedback
        feedback.textContent = 'Street Address 2 is invalid.';
        streetAddress2Input.parentNode.appendChild(feedback); // Add feedback below the input

        streetAddress2Input.addEventListener('input', function () {
            if (this.value.length > 0) { // If the field is filled out
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                feedback.style.display = 'none'; // Hide feedback if valid
            } else {
                this.classList.remove('is-valid'); // Remove valid class if empty
                this.classList.remove('is-invalid'); // Remove invalid class if empty
                feedback.style.display = 'none'; // Hide feedback if empty
            }
        });
    }

    // ZIP Code validation
    const zipInput = document.getElementById('txtZipCode');
    if (zipInput) {
        const zipFeedback = document.createElement('div');
        zipFeedback.className = 'invalid-feedback';
        zipFeedback.textContent = 'ZIP code must be exactly 5 digits.';
        zipInput.parentNode.appendChild(zipFeedback);

        zipInput.addEventListener('input', function () {
            const zipRegex = /^\d{5}$/; // ZIP code must be 5 digits
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
        const phoneFeedback = document.createElement('div');
        phoneFeedback.className = 'invalid-feedback';
        phoneFeedback.textContent = 'Phone number must be exactly 10 digits.';
        phoneInput.parentNode.appendChild(phoneFeedback);

        phoneInput.addEventListener('input', function () {
            const phoneRegex = /^\d{10}$/; // Phone number must be 10 digits
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

// "Cancel Registration" button fades div out on click, fades in login form, and sets title
btnCancelRegistration.addEventListener('click', () => {
    // Fade out Registration
    divRegistration.style.transition = 'opacity 0.5s ease';
    divRegistration.style.opacity = 0;

    setTimeout(() => {
        divRegistration.style.display = 'none';
        divLogin.style.display = 'flex';
        divLogin.style.opacity = 0;

        // Fade in Login
        setTimeout(() => {
            divLogin.style.transition = 'opacity 0.5s ease';
            divLogin.style.opacity = 1;
        }, 10);
    }, 500);
    document.title = "Smart Chicken Coop | Login";
});

btnShowLogin.addEventListener('click', function() {
    // If registration is showing, fade it out and show login
    if (divRegistration.style.display === 'flex' || divRegistration.style.opacity === '1') {
        divRegistration.style.transition = 'opacity 0.5s ease';
        divRegistration.style.opacity = 0;

        setTimeout(() => {
            divRegistration.style.display = 'none';  // Hide registration form after fade-out

            // Now show and fade in the login form
            divLogin.style.display = 'flex';
            setTimeout(() => {
                divLogin.style.opacity = 1;  // Fade in login form
            }, 10);
        }, 500);  // Wait for registration fade-out before showing login
    } else {
        // If registration isn't showing, just fade in login
        divLogin.style.display = 'flex';
        setTimeout(() => {
            divLogin.style.opacity = 1;  // Fade in login form
        }, 10);
    }

    document.title = "Smart Chicken Coop | Login";
});

// "Show Registration" button fades div in click, fades out login form, and sets title
document.getElementById('btnShowRegistration').addEventListener('click', function() {
    // Fade out login form (if it is visible)
    if (divLogin.style.display === 'flex' || divLogin.style.opacity === '1') {
        divLogin.style.transition = 'opacity 0.5s ease';
        divLogin.style.opacity = 0;

        setTimeout(() => {
            divLogin.style.display = 'none';  // Hide login form after fade out

            // Now show and fade in the registration form
            divRegistration.style.display = 'flex';
            setTimeout(() => {
                divRegistration.style.opacity = 1;  // Fade in registration form
            }, 10);
        }, 500);  // Wait for login fade-out before showing registration
    } else {
        // Fade in registration form if login isn't showing
        divRegistration.style.display = 'flex';
        setTimeout(() => {
            divRegistration.style.opacity = 1;
        }, 10);
    }

    document.title = "Smart Chicken Coop | Registration";
});

// "Show Dashboard" button fades out login and registration, shows dashboard, and sets the title
document.getElementById('btnShowDashboard').addEventListener('click', function() {
    // Fade in dashboard 
    const divDashboard = document.getElementById('divDashboard');
    divDashboard.style.display = 'flex';
    divDashboard.style.opacity = 0;
    setTimeout(() => {
        divDashboard.style.transition = 'opacity 0.5s ease';
        divDashboard.style.opacity = 1;
    }
    , 10);

    document.title = "Smart Chicken Coop | Dashboard";
});


// "Close Everything" button fades out registration and login divs
document.getElementById('btnCloseEverything').addEventListener('click', function() {
    divRegistration.style.opacity = 0;
    divLogin.style.opacity = 0;
  
    setTimeout(() => {
      divRegistration.style.display = 'none';
      divRegistration.classList.remove('d-flex'); 
      divLogin.style.display = 'none';
      divLogin.classList.remove('d-flex'); 
    }, 500); 
    document.title = "Smart Chicken Coop";
});

// Validation for Registration Form
document.getElementById('btnCreateAccount').addEventListener('click', () => {
    const formFields = [
        'txtFirstName',
        'txtLastName',
        'txtEmail',
        'txtPassword',
        'txtStreetAddress1',
        'txtCity',
        'txtZipCode',
        'telPhone',
        'txtCoopRegistrationID'
    ];

    let allValid = true;

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (!field.classList.contains('is-valid')) {
                field.classList.add('is-invalid'); // Mark as invalid if not valid
                allValid = false;
            }
        }
    });

    // Always set Street Address 2 to valid
    const streetAddress2Input = document.getElementById('txtStreetAddress2');
    if (streetAddress2Input) {
        streetAddress2Input.classList.add('is-valid');
        streetAddress2Input.classList.remove('is-invalid');
    }

    // Check if a state is selected
    const stateSelect = document.getElementById('selState');
    if (stateSelect) {
        if (stateSelect.value === '' || stateSelect.value === null) {
            stateSelect.classList.add('is-invalid'); // Mark as invalid if no state is selected
            stateSelect.classList.remove('is-valid');
            allValid = false;
        } else {
            stateSelect.classList.add('is-valid'); // Mark as valid if a state is selected
            stateSelect.classList.remove('is-invalid');
        }
    }

    if (allValid) {
        console.log('Success');
    } else {
        console.log('Some fields are invalid.');
    }
});

//Validation for Login
document.getElementById('btnLogin').addEventListener('click', async () => {
    const email = document.getElementById('txtLoginEmail').value.trim();
    const password = document.getElementById('txtLoginPassword').value.trim();

    // Initialize an array to store errors
    const errors = [];

    // Check if email is empty
    if (!email) {
        errors.push('Email is required.');
    } else {
        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format.');
        }
    }

    // Check if password is empty
    if (!password) {
        errors.push('Password is required.');
    }

    // If there are errors, display them using SweetAlert2
    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Errors',
            html: `<ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`,
        });
        return;
    }

    try {
        // Make a POST request to the sessions.php endpoint
        const response = await fetch('https://simplecoop.swollenhippo.com/sessions.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: email, Password: password }),
        });

        const data = await response.json();

        if (data.Outcome === 'Success' && data.SessionID) {
            // Store the SessionID in localStorage
            localStorage.setItem('SessionID', data.SessionID);

            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back!',
            }).then(() => {
                // Redirect to dashboard or perform other actions
                document.getElementById('divLogin').style.opacity = 0;
                setTimeout(() => {
                    document.getElementById('divLogin').style.display = 'none';
                    const divDashboard = document.getElementById('divDashboard');
                    divDashboard.style.display = 'flex';
                    divDashboard.style.opacity = 1;
                }, 500);
                document.title = "Smart Chicken Coop | Dashboard";
            });
        } else {
            // Show error message if login fails
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.Outcome || 'Invalid email or password. Please try again.',
            });
        }
    } catch (error) {
        // Handle network or server errors
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to log in. Please try again later.',
        });
        console.error('Login error:', error);
    }
});