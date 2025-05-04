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
// The function is triggered by the click event on the "Create Account" button.
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
            // Check validation based on field type
            let isValid = false;
            
            if (fieldId === 'txtZipCode') {
                // ZIP code must be 5 digits
                const zipRegex = /^\d{5}$/;
                isValid = zipRegex.test(field.value.trim());
            } else if (fieldId === 'telPhone') {
                // Phone number must be 10 digits
                const phoneRegex = /^\d{10}$/;
                isValid = phoneRegex.test(field.value.trim());
            } else {
                // Default validation - non-empty
                isValid = field.value.trim() !== '';
            }
            
            if (isValid) {
                field.classList.add('is-valid');
                field.classList.remove('is-invalid');
                values[fieldId] = field.value.trim();
                // Hide the feedback message
                const feedback = field.parentNode.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'none';
                }
            } else {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                // Show the feedback message
                const feedback = field.parentNode.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'block';
                }
                allValid = false;
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
        // Step 1: Create a new user account
        const userData = await userApiHandler('POST', {
            Email: values['txtEmail'],
            Password: values['txtPassword'],
            FirstName: values['txtFirstName'],
            LastName: values['txtLastName'],
            Phone: values['telPhone'],
            CoopID: values['txtCoopRegistrationID']
        });

        if (userData.Outcome === 'New User Created') {
            // Step 2: Now log in to get a SessionID
            const loginData = await sessionApiHandler('POST', {
                Email: values['txtEmail'],
                Password: values['txtPassword']
            });

            if (loginData.SessionID) {
                console.log('Login Successful:', loginData);

                // Step 3: Update the users information with the address
                const addressData = await userAddressApiHandler('POST', {
                    Email: values['txtEmail'], // Use the email of the logged-in user
                    Street1: values['txtStreetAddress1'],
                    Street2: values['txtStreetAddress2'] || '',
                    City: values['txtCity'],
                    State: values['selState'],
                    ZIP: values['txtZipCode']
                });

                if (addressData.Outcome === 'Address Added') {
                    // Save the session ID for logged-in state
                    localStorage.setItem('SessionID', loginData.SessionID);
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Account Created',
                        text: 'Your account has been successfully created with all your information. Directing you to the dashboard...',
                        timer: 2000,
                        showConfirmButton: false,
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
// Login button event listener
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
            // Check if the field is empty
            if (field.value.trim() === '') {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                // Show the feedback message
                const feedback = field.parentNode.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'block';
                }
                allValid = false;
            } else {
                field.classList.add('is-valid');
                field.classList.remove('is-invalid');
                values[fieldId] = field.value.trim();
                // Hide the feedback message
                const feedback = field.parentNode.querySelector('.invalid-feedback');
                if (feedback) {
                    feedback.style.display = 'none';
                }
            }
        }
    });

    if (!allValid) {
        console.log('Some fields are invalid.');
        return;
    }

    try {
        // Step 1: Validate the session ID (if any)
        const sessionID = localStorage.getItem('SessionID');

        // If a session ID exists, validate it
        if (sessionID) {
            const sessionData = await sessionApiHandler('GET', { SessionID: sessionID });
            if (sessionData.Outcome != null) {
                // If the session is valid, redirect to the dashboard
                document.getElementById('divLogin').style.display = 'none';
                const divDashboard = document.getElementById('divDashboard');
                divDashboard.style.display = 'flex';
                divDashboard.style.opacity = 1;
                document.title = "Smart Chicken Coop | Dashboard";
                return;
            } else {
                // If the session is invalid, clear it from localStorage
                localStorage.removeItem('SessionID');
            }
        } 

        // Use userApiHandler for login
        const loginData = await sessionApiHandler('POST', {
            Email: values['txtLoginEmail'],
            Password: values['txtLoginPassword']
        });

        if (loginData.SessionID) {
            localStorage.setItem('SessionID', loginData.SessionID);

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