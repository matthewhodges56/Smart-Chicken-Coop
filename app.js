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
        { id: 'txtEmail', feedback: 'Password is required.' },
        { id: 'txtPassword', feedback: 'Password is required.' },
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

// "Cancel Registration" button fades out registration, resets fields, and shows login
// This function handles the transition from the registration form back to the login form when the "Cancel Registration" button is clicked.
// It resets the registration form fields, hides the registration form, and shows the login form with a fade-in effect.
// It also sets the document title to "Smart Chicken Coop | Login" after the transition is complete.
document.getElementById('btnCancelRegistration').addEventListener('click', () => {
    // Fade out Registration
    divRegistration.style.transition = 'opacity 0.5s ease';
    divRegistration.style.opacity = 0;

    setTimeout(() => {
        // Reset registration form fields, errors, and validation styles
        divRegistration.querySelectorAll('input, select, textarea').forEach(el => {
            el.value = '';
            el.classList.remove('is-valid', 'is-invalid');
        });

        // Reset any error messages
        divRegistration.querySelectorAll('.invalid-feedback').forEach(el => {
            el.style.display = 'none';
        });

        // Reset Select2 dropdown if it exists
        if ($('#selState').length) {
            $('#selState').val(null).trigger('change');
            $('#selState').next('.select2-container').find('.select2-selection')
                .removeClass('is-valid is-invalid');
        }

        // Hide registration and show login
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

// The function is triggered by the click event on the "Create Account" button.
// It validates the input fields, collects their values, and sends a POST request to create a new user account.
// If the account creation is successful, it shows a success message and transitions to the login form.
document.getElementById('btnCreateAccount').addEventListener('click', async () => {
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

    // Validate fields and collect values
    const values = {};

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (!field.classList.contains('is-valid')) {
                field.classList.add('is-invalid');
                allValid = false;
            } else {
                values[fieldId] = field.value.trim();
            }
        }
    });

    // Always mark Street Address 2 as valid
    const streetAddress2Input = document.getElementById('txtStreetAddress2');
    if (streetAddress2Input) {
        streetAddress2Input.classList.add('is-valid');
        streetAddress2Input.classList.remove('is-invalid');
        values['txtStreetAddress2'] = streetAddress2Input.value.trim();
    }

    // Check State (from Select2)
    const stateSelect = $('#selState');
    const selectedState = stateSelect.val();
    const stateSelectUI = stateSelect.next('.select2-container').find('.select2-selection');

    if (!selectedState) {
        stateSelectUI.addClass('is-invalid').removeClass('is-valid');
        allValid = false;
    } else {
        stateSelectUI.addClass('is-valid').removeClass('is-invalid');
        values['selState'] = selectedState;
    }

    if (!allValid) {
        console.log('Some fields are invalid.');
        return;
    }

    console.log('Success');

    try {
        // Step 1: Create the user account first
        const userFormData = new URLSearchParams();
        userFormData.append('Email', values['txtEmail']);
        userFormData.append('Password', values['txtPassword']);
        userFormData.append('FirstName', values['txtFirstName']);
        userFormData.append('LastName', values['txtLastName']);
        userFormData.append('CoopID', values['txtCoopRegistrationID']);

        const userResponse = await fetch('https://simplecoop.swollenhippo.com/users.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: userFormData.toString(),
        });

        const userResponseText = await userResponse.text();
        console.log('User Creation Raw Response:', userResponseText);

        const userData = JSON.parse(userResponseText);

        if (userData.Outcome === 'New User Created') {
            // Step 2: Now log in to get a SessionID
            const loginFormData = new URLSearchParams();
            loginFormData.append('Email', values['txtEmail']);
            loginFormData.append('Password', values['txtPassword']);

            const loginResponse = await fetch('https://simplecoop.swollenhippo.com/sessions.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: loginFormData.toString(),
            });

            const loginResponseText = await loginResponse.text();
            console.log('Login Raw Response:', loginResponseText);

            const loginData = JSON.parse(loginResponseText);

            if (loginData.SessionID) {
                // Step 3: Update the coop information with the address
                const coopFormData = new URLSearchParams();
                coopFormData.append('SessionID', loginData.SessionID);
                coopFormData.append('Street1', values['txtStreetAddress1']);
                coopFormData.append('Street2', values['txtStreetAddress2'] || '');
                coopFormData.append('City', values['txtCity']);
                coopFormData.append('State', values['selState']);
                coopFormData.append('ZIP', values['txtZipCode']);

                const coopResponse = await fetch('https://simplecoop.swollenhippo.com/coop.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: coopFormData.toString(),
                });

                // Main session id --> 3b5b4d6b-e65d-4fdc-ab59-0b489adc256b

                const coopResponseText = await coopResponse.text();
                console.log('Coop Update Raw Response:', coopResponseText);

                const coopData = JSON.parse(coopResponseText);

                if (coopData.Outcome === 'Address Updated' || coopData.Outcome.includes('success')) {
                    // Save the session ID for logged-in state
                    localStorage.setItem('SessionID', loginData.SessionID);
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Account Created',
                        text: 'Your account has been successfully created with all your information. Directing you to the dashboard...',
                    }).then(() => {
                        const divRegistration = document.getElementById('divRegistration');
                        const divDashboard = document.getElementById('divDashboard');

                        divRegistration.style.transition = 'opacity 0.5s ease';
                        divRegistration.style.opacity = 0;

                        setTimeout(() => {
                            divRegistration.style.display = 'none';
                            divDashboard.style.display = 'flex';
                            divDashboard.style.opacity = 0;

                            setTimeout(() => {
                                divDashboard.style.transition = 'opacity 0.5s ease';
                                divDashboard.style.opacity = 1;
                            }, 10);
                        }, 500);

                        document.title = "Smart Chicken Coop | Dashboard";
                    });
                } else {
                    // If coop update fails, still direct to login but with a warning
                    Swal.fire({
                        icon: 'warning',
                        title: 'Account Created',
                        text: 'Your account was created, but there was an issue saving your address information. You can update it later.',
                    }).then(() => {
                        const divRegistration = document.getElementById('divRegistration');
                        const divLogin = document.getElementById('divLogin');

                        divRegistration.style.transition = 'opacity 0.5s ease';
                        divRegistration.style.opacity = 0;

                        setTimeout(() => {
                            divRegistration.style.display = 'none';
                            divLogin.style.display = 'flex';
                            divLogin.style.opacity = 0;

                            setTimeout(() => {
                                divLogin.style.transition = 'opacity 0.5s ease';
                                divLogin.style.opacity = 1;
                            }, 10);
                        }, 500);

                        document.title = "Smart Chicken Coop | Login";
                    });
                }
            } else {
                // If login fails after account creation
                Swal.fire({
                    icon: 'warning',
                    title: 'Account Created',
                    text: 'Your account was created, but there was an issue with automatic login. Please log in manually.',
                }).then(() => {
                    const divRegistration = document.getElementById('divRegistration');
                    const divLogin = document.getElementById('divLogin');

                    divRegistration.style.transition = 'opacity 0.5s ease';
                    divRegistration.style.opacity = 0;

                    setTimeout(() => {
                        divRegistration.style.display = 'none';
                        divLogin.style.display = 'flex';
                        divLogin.style.opacity = 0;

                        setTimeout(() => {
                            divLogin.style.transition = 'opacity 0.5s ease';
                            divLogin.style.opacity = 1;
                        }, 10);
                    }, 500);

                    document.title = "Smart Chicken Coop | Login";
                });
            }
        } else {
            // If account creation fails
            Swal.fire({
                icon: 'error',
                title: 'Account Creation Failed',
                text: userData.Outcome || 'An error occurred while creating your account.',
            });
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to create your account. Please try again later.',
        });
        console.error('Account creation error:', error);
    }
});

// Login button event listener
// This function handles the login process when the "Login" button is clicked
// It validates the email and password fields, sends a POST request to the server, and handles the response.
// It also provides feedback to the user using SweetAlert2 for success and error messages.
// The function is asynchronous to handle the fetch request and response processing.
// It uses the Fetch API to send the login data to the server and processes the response accordingly.
// The function also handles the display of the login form and the dashboard based on the login status.
// It uses localStorage to store the session ID upon successful login and updates the document title to reflect the current page.
// The function also includes error handling for network issues and invalid responses from the server.
document.getElementById('btnLogin').addEventListener('click', async () => {
    const formFields = [
        'txtLoginEmail',
        'txtLoginPassword'
    ];

    let allValid = true;

    // Validate fields and collect values
    const values = {};

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (!field.classList.contains('is-valid')) {
                field.classList.add('is-invalid');
                allValid = false;
            } else {
                values[fieldId] = field.value.trim();
            }
        }
    });

    if (!allValid) {
        console.log('Some fields are invalid.');
        return;
    }

    try {
        const bodyData = new URLSearchParams();
        bodyData.append('Email', values['txtLoginEmail']);
        bodyData.append('Password', values['txtLoginPassword']);

        const response = await fetch('https://simplecoop.swollenhippo.com/sessions.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyData.toString(),
        });

        const text = await response.text();
        console.log('Login raw response:', text);

        const data = JSON.parse(text);

        if (data.SessionID) {
            localStorage.setItem('SessionID', data.SessionID);

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Welcome back, redirecting you to the dashboard...',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
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
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
            });
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while trying to log in. Please try again later.',
        });
        console.error('Login error:', error);
    }
});

// "Create New User" button event listener
// This function handles the transition from the login form to the registration form when the "Create New User" button is clicked.
document.getElementById('btnCreateNewUser').addEventListener('click', () => {
    const divLogin = document.getElementById('divLogin');
    const divRegistration = document.getElementById('divRegistration');

    // Hide the login form
    divLogin.style.transition = 'opacity 0.5s ease';
    divLogin.style.opacity = 0;

    setTimeout(() => {
        divLogin.querySelectorAll('input, select, textarea').forEach(el => {
            el.value = '';
            el.classList.remove('is-valid', 'is-invalid');
        });

        // Reset any error messages
        divLogin.querySelectorAll('.invalid-feedback').forEach(el => {
            el.style.display = 'none';
        });

        divLogin.style.display = 'none';

        // Show the registration form
        divRegistration.style.display = 'flex';
        divRegistration.style.opacity = 0;

        setTimeout(() => {
            divRegistration.style.transition = 'opacity 0.5s ease';
            divRegistration.style.opacity = 1;
        }, 10);
    }, 500);

    document.title = "Smart Chicken Coop | Registration";
});