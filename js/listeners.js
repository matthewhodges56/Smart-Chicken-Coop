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

// btnShowLogin.addEventListener('click', function() {
//     // If registration is showing, fade it out and show login
//     if (divRegistration.style.display === 'flex' || divRegistration.style.opacity === '1') {
//         divRegistration.style.transition = 'opacity 0.5s ease';
//         divRegistration.style.opacity = 0;

//         setTimeout(() => {
//             divRegistration.style.display = 'none';  // Hide registration form after fade-out

//             // Now show and fade in the login form
//             divLogin.style.display = 'flex';
//             setTimeout(() => {
//                 divLogin.style.opacity = 1;  // Fade in login form
//             }, 10);
//         }, 500);  // Wait for registration fade-out before showing login
//     } else {
//         // If registration isn't showing, just fade in login
//         divLogin.style.display = 'flex';
//         setTimeout(() => {
//             divLogin.style.opacity = 1;  // Fade in login form
//         }, 10);
//     }

//     document.title = "Smart Chicken Coop | Login";
// });

// "Show Registration" button fades div in click, fades out login form, and sets title
// document.getElementById('btnShowRegistration').addEventListener('click', function() {
//     // Fade out login form (if it is visible)
//     if (divLogin.style.display === 'flex' || divLogin.style.opacity === '1') {
//         divLogin.style.transition = 'opacity 0.5s ease';
//         divLogin.style.opacity = 0;

//         setTimeout(() => {
//             divLogin.style.display = 'none';  // Hide login form after fade out

//             // Now show and fade in the registration form
//             divRegistration.style.display = 'flex';
//             setTimeout(() => {
//                 divRegistration.style.opacity = 1;  // Fade in registration form
//             }, 10);
//         }, 500);  // Wait for login fade-out before showing registration
//     } else {
//         // Fade in registration form if login isn't showing
//         divRegistration.style.display = 'flex';
//         setTimeout(() => {
//             divRegistration.style.opacity = 1;
//         }, 10);
//     }

//     document.title = "Smart Chicken Coop | Registration";
// });

// "Show Dashboard" button fades out login and registration, shows dashboard, and sets the title
// document.getElementById('btnShowDashboard').addEventListener('click', async function() {
//     // Fade in dashboard 
//     const divDashboard = document.getElementById('divDashboard');
//     divDashboard.style.display = 'flex';
//     divDashboard.style.opacity = 0;
    
//     // Get the SessionID from localStorage
//     const sessionID = localStorage.getItem('SessionID');
//     if (sessionID) {
//         try {
//             // Get temperature unit setting
//             const temperatureUnitSetting = await settingsApiHandler('GET', {
//                 SessionID: sessionID,
//                 setting: 'temperatureUnit'
//             });

//             // If setting is Fahrenheit, update the dashboard
//             if (temperatureUnitSetting?.Value === 'Fahrenheit') {
//                 updateDashboardTemperatures('Fahrenheit');
//             }
//         } catch (error) {
//             console.error('Error fetching temperature unit setting:', error);
//         }
//     }

//     setTimeout(() => {
//         divDashboard.style.transition = 'opacity 0.5s ease';
//         divDashboard.style.opacity = 1;
//     }, 10);

//     document.title = "Smart Chicken Coop | Dashboard";
// });

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
                    // Step 4: Create default settings for the user
                    try {
                        await settingsApiHandler('POST', {
                            SessionID: loginData.SessionID,
                            setting: 'darkMode',
                            value: 'disabled'
                        });

                        await settingsApiHandler('POST', {
                            SessionID: loginData.SessionID,
                            setting: 'temperatureUnit',
                            value: 'Celsius'
                        });

                        console.log('Default settings created successfully.');
                    } catch (error) {
                        console.error('Error creating default settings:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred while creating default settings. Please try again later.',
                        });
                    }

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

            // Fetch and apply temperature unit setting before showing dashboard
            try {
                const temperatureUnitSetting = await settingsApiHandler('GET', {
                    SessionID: loginData.SessionID,
                    setting: 'temperatureUnit'
                });

                if (temperatureUnitSetting?.Value === 'Fahrenheit') {
                    updateDashboardTemperatures('Fahrenheit');
                    document.getElementById('chkTemperatureUnit').checked = true;
                }
            } catch (error) {
                console.error('Error fetching temperature unit setting:', error);
            }

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

// Whenever button with id of btnSettings is clicked, show the settings div it should appear over top the 
// dashboard. It should be a popup that is centered on the screen. The dashboard should be blurred out behind it.
document.getElementById('btnSettings').addEventListener('click', async () => {
    const divSettings = document.getElementById('divSettings');
    const divDashboard = document.getElementById('divDashboard');

    // Show the settings div and blur the dashboard
    divSettings.style.display = 'flex';
    divDashboard.style.filter = 'blur(5px)';
    divSettings.style.opacity = 0;

    setTimeout(() => {
        divSettings.style.transition = 'opacity 0.5s ease';
        divSettings.style.opacity = 1;
    }, 10);

    // Get the SessionID from localStorage
    const sessionID = localStorage.getItem('SessionID');
    if (!sessionID) {
        console.error('No SessionID found. Please log in again.');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No session found. Please log in again.',
        });
        return;
    }

    try {
        // Fetch saved settings from the backend
        const darkModeSetting = await settingsApiHandler('GET', { SessionID: sessionID, setting: 'darkMode' });
        const temperatureUnitSetting = await settingsApiHandler('GET', { SessionID: sessionID, setting: 'temperatureUnit' });

        // Update the toggles based on the fetched settings or default values
        const chkDarkMode = document.getElementById('chkDarkMode');
        const chkTemperatureUnit = document.getElementById('chkTemperatureUnit');

        chkDarkMode.checked = darkModeSetting?.Value === 'enabled' || false; // Default: false
        chkTemperatureUnit.checked = temperatureUnitSetting?.Value === 'Fahrenheit' || false; // Default: Celsius

        // Store the original state of the settings
        chkDarkMode.dataset.originalState = chkDarkMode.checked;
        chkTemperatureUnit.dataset.originalState = chkTemperatureUnit.checked;

    } catch (error) {
        console.error('Error fetching settings:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while fetching your settings. Please try again later.',
        });
    }
});

// Whenever the checkbox with id of chkDarkMode is clicked, toggle the dark mode class on the body element.
// It also saves the user's preference in localStorage so that it persists across page reloads.
// The dark mode class is applied to the body element, which changes the background color and text color of the page.
document.getElementById('chkDarkMode').addEventListener('click', () => {
    const body = document.body;
    const isChecked = document.getElementById('chkDarkMode').checked;
    const btnSaveSettings = document.getElementById('btnSaveSettings');

    if (isChecked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');

        if (btnSaveSettings) {
            btnSaveSettings.disabled = false;
        } 
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');

        if (btnSaveSettings) {
            btnSaveSettings.disabled = false;
        }
    }
});

// Whenever the button with id of btnSaveSettings is clicked, save the settings and close the settings div
// It should also remove the blur effect from the dashboard and hide the settings div.
// The settings are saved in localStorage so that they persist across page reloads.
// The function also updates the document title to reflect the current page.
document.getElementById('btnSaveSettings').addEventListener('click', async () => {
    const divSettings = document.getElementById('divSettings');
    const divDashboard = document.getElementById('divDashboard');

    // Get the current state of the settings
    const chkDarkMode = document.getElementById('chkDarkMode');
    const chkTemperatureUnit = document.getElementById('chkTemperatureUnit');

    // Get the SessionID from localStorage
    const sessionID = localStorage.getItem('SessionID');
    if (!sessionID) {
        console.error('No SessionID found. Please log in again.');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No session found. Please log in again.',
        });
        return;
    }

    try {
        // Update Dark Mode setting
        await settingsApiHandler('PUT', {
            SessionID: sessionID,
            setting: 'darkMode',
            value: chkDarkMode.checked ? 'enabled' : 'disabled',
        });

        // Update Temperature Unit setting
        await settingsApiHandler('PUT', {
            SessionID: sessionID,
            setting: 'temperatureUnit',
            value: chkTemperatureUnit.checked ? 'Fahrenheit' : 'Celsius',
        });

        // Save the settings in localStorage
        localStorage.setItem('darkMode', chkDarkMode.checked ? 'enabled' : 'disabled');
        localStorage.setItem('temperatureUnit', chkTemperatureUnit.checked ? 'Fahrenheit' : 'Celsius');

        // Apply the dark mode class to the body if enabled
        if (chkDarkMode.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Show success notification with a 2000ms timer
        Swal.fire({
            icon: 'success',
            title: 'Settings Saved',
            text: 'Your settings have been successfully updated.',
            timer: 1000,
            showConfirmButton: false,
        });

        // Wait for the notification to finish before hiding the settings div
        setTimeout(() => {
            // Hide the settings div and remove the blur from the dashboard
            divSettings.style.transition = 'opacity 0.5s ease';
            divSettings.style.opacity = 0;

            setTimeout(() => {
                divSettings.style.display = 'none';
                divDashboard.style.filter = 'none';
            }, 500);

            document.title = "Smart Chicken Coop | Dashboard";

            // Disable the save settings button after saving
            const btnSaveSettings = document.getElementById('btnSaveSettings');
            if (btnSaveSettings) {
                btnSaveSettings.disabled = true;
            }
        }, 1000); // Wait for the notification timer to finish
    } catch (error) {
        console.error('Error updating settings:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating your settings. Please try again later.',
        });
    }
});

// Whenever the button with id of btnCloseSettings is clicked, close the settings div and remove the blur from the dashboard
// It should also hide the settings div and remove the blur effect from the dashboard.
// The function also updates the document title to reflect the current page.
// It should also disable the save settings button after closing the settings div.
// It should also revert back any changes made in the settings div to their original state.
document.getElementById('btnCloseSettings').addEventListener('click', () => {
    const divSettings = document.getElementById('divSettings');
    const divDashboard = document.getElementById('divDashboard');

    // Restore the original state of the settings
    const chkDarkMode = document.getElementById('chkDarkMode');
    const chkTemperatureUnit = document.getElementById('chkTemperatureUnit');

    // Revert to the original state stored in data attributes
    chkDarkMode.checked = chkDarkMode.dataset.originalState === 'true';
    chkTemperatureUnit.checked = chkTemperatureUnit.dataset.originalState === 'true';

    // Remove the dark mode class from the body if it was toggled
    if (!chkDarkMode.checked) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }

    // Hide the settings div and remove the blur from the dashboard
    divSettings.style.transition = 'opacity 0.5s ease';
    divSettings.style.opacity = 0;

    setTimeout(() => {
        divSettings.style.display = 'none';
        divDashboard.style.filter = 'none';
    }, 500);

    document.title = "Smart Chicken Coop | Dashboard";

    // Disable the save settings button after closing
    const btnSaveSettings = document.getElementById('btnSaveSettings');
    if (btnSaveSettings) {
        btnSaveSettings.disabled = true;
    }
});

// Update the door toggle event listener
btnToggleDoor.addEventListener('click', () => {
    const doorOpenSound = new Audio('sounds/door-open.mp3');  // Create sound for door opening
    const doorCloseSound = new Audio('sounds/door-close.mp3'); // Create sound for door closing

    const doorStatusElement = document.getElementById('doorStatus');
    const button = document.getElementById('btnToggleDoor');

    // Get the current door status from localStorage
    const currentStatus = localStorage.getItem('doorStatus') || 'Closed';

    // Determine the new status
    const newStatus = currentStatus === 'Closed' ? 'Open' : 'Closed';

    // Play the appropriate sound based on the new status
    if (newStatus === 'Open') {
        doorOpenSound.play();
    } else {
        doorCloseSound.play();
    }

    // Update localStorage
    localStorage.setItem('doorStatus', newStatus);

    // Update the UI
    doorStatusElement.textContent = newStatus;
    button.textContent = newStatus === 'Closed' ? 'Open Door' : 'Close Door';

    // Show a success message
    Swal.fire({
        icon: 'success',
        title: 'Door Status Updated',
        text: `The door is now ${newStatus}.`,
        timer: 2000,
        showConfirmButton: false,
    });
});

// Fetch the current door status on page load
document.addEventListener('DOMContentLoaded', () => {
    const doorStatusElement = document.getElementById('doorStatus');
    const button = document.getElementById('btnToggleDoor');

    // Get the current door status from localStorage
    const currentStatus = localStorage.getItem('doorStatus') || 'Closed';

    // Update the UI
    doorStatusElement.textContent = currentStatus;
    button.textContent = currentStatus === 'Closed' ? 'Open Door' : 'Close Door';
});

document.addEventListener('DOMContentLoaded', async () => {
    const eggCounter = document.getElementById('eggCounter');
    const btnAddEggs = document.getElementById('btnAddEggs');
    const ctx = document.getElementById('eggChart').getContext('2d');
    const sessionID = localStorage.getItem('SessionID');

    if (!sessionID) {
        console.error('No SessionID found. Please log in again.');
        return;
    }

    // Initialize the chart
    const eggChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Dates
            datasets: [{
                label: 'Eggs Harvested',
                data: [], // Number of eggs
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Fetch existing egg data from the API
    async function fetchEggData() {
        try {
            // Use the eggApiHandler to fetch egg data
            const eggData = await eggApiHandler('GET', {
                SessionID: sessionID,
                days: 1
            });
    
            // Check if eggData is an array
            if (Array.isArray(eggData)) {
                // Get today's date in YYYY-MM-DD format
                const today = new Date().toISOString().split('T')[0];
                
                // Filter entries for today and sum the Harvested eggs
                const todaysEggs = eggData
                    .filter(entry => entry.LogDateTime.startsWith(today))
                    .reduce((sum, entry) => sum + entry.Harvested, 0);
    
                // Update the egg counter with today's total
                eggCounter.textContent = todaysEggs;
    
                // Update the chart with combined daily totals
                const dailyTotals = new Map();
                eggData.forEach(entry => {
                    const date = new Date(entry.LogDateTime).toLocaleDateString();
                    dailyTotals.set(date, (dailyTotals.get(date) || 0) + entry.Harvested);
                });
    
                // Clear existing chart data
                eggChart.data.labels = [];
                eggChart.data.datasets[0].data = [];
    
                // Add the daily totals to the chart
                dailyTotals.forEach((eggs, date) => {
                    eggChart.data.labels.push(date);
                    eggChart.data.datasets[0].data.push(eggs);
                });
    
                eggChart.update();
            } else {
                console.warn('No egg data found or invalid format.');
            }
        } catch (error) {
            console.error('Error fetching egg data:', error);
        }
    }

    // Call fetchEggData on page load
    await fetchEggData();

    // Add eggs functionality
    btnAddEggs.addEventListener('click', () => {
        Swal.fire({
            title: 'Add Eggs',
            input: 'number',
            inputLabel: 'Enter the number of eggs',
            inputPlaceholder: 'e.g., 5',
            inputAttributes: {
                min: 1,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'Cancel',
            // button color should be #eb6863
            confirmButtonColor: '#eb6863',
            preConfirm: (value) => {
                if (!value || value <= 0) {
                    Swal.showValidationMessage('Please enter a valid number of eggs.');
                }
                return value;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const numEggs = parseInt(result.value, 10);
                const currentCount = parseInt(eggCounter.textContent, 10) || 0;
                const newCount = currentCount + numEggs;

                try {
                    // Add the new egg count to the backend using eggApiHandler
                    const eggsData = await eggApiHandler('POST', {
                        SessionID: sessionID,
                        observationDateTime: new Date().toISOString(),
                        eggs: numEggs
                    });

                    if (eggsData) {
                        // Update the egg counter
                        eggCounter.textContent = newCount;

                        // Update the chart
                        const today = new Date().toLocaleDateString(); // Use today's date as the label
                        const labelIndex = eggChart.data.labels.indexOf(today);

                        if (labelIndex === -1) {
                            // Add a new label and data point
                            eggChart.data.labels.push(today);
                            eggChart.data.datasets[0].data.push(numEggs);
                        } else {
                            // Increment the existing data point
                            eggChart.data.datasets[0].data[labelIndex] += numEggs;
                        }

                        eggChart.update();

                        // declare chicken sound 
                        const chickenSound = new Audio('sounds/chicken.mp3');
                        chickenSound.play();

                        Swal.fire({
                            icon: 'success',
                            title: 'Eggs Added',
                            text: `${numEggs} eggs have been added to the chart.`,
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } else {
                        throw new Error('Failed to add egg.');
                    }
                } catch (error) {
                    console.error('Error adding egg:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while adding the egg. Please try again later.',
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heaterStatus = document.getElementById('heaterStatus');
    const fanStatus = document.getElementById('fanStatus');
    const btnSetHeaterThreshold = document.getElementById('btnSetHeaterThreshold');
    const btnSetFanThreshold = document.getElementById('btnSetFanThreshold');
    const autoHeaterThreshold = document.getElementById('autoHeaterThreshold');
    const autoFanThreshold = document.getElementById('autoFanThreshold');

    // Load thresholds from localStorage or set defaults
    autoHeaterThreshold.value = localStorage.getItem('heaterThreshold') || 18; // Default: 18°C
    autoFanThreshold.value = localStorage.getItem('fanThreshold') || 25; // Default: 25°C

    // Set Heater Threshold
    btnSetHeaterThreshold.addEventListener('click', () => {
        const threshold = autoHeaterThreshold.value;

        if (!threshold) {
            alert('Please enter a valid heater threshold.');
            return;
        }

        // Save the threshold to localStorage
        localStorage.setItem('heaterThreshold', threshold);

        Swal.fire({
            icon: 'success',
            title: 'Heater Threshold Set',
            text: `Heater will turn on below ${threshold}°C.`,
            timer: 2000,
            showConfirmButton: false,
        });
    });

    // Set Fan Threshold
    btnSetFanThreshold.addEventListener('click', () => {
        const threshold = autoFanThreshold.value;

        if (!threshold) {
            alert('Please enter a valid fan threshold.');
            return;
        }

        // Save the threshold to localStorage
        localStorage.setItem('fanThreshold', threshold);

        Swal.fire({
            icon: 'success',
            title: 'Fan Threshold Set',
            text: `Fan will turn on above ${threshold}°C.`,
            timer: 2000,
            showConfirmButton: false,
        });
    });

    // Monitor Temperature and Automatically Control Heater/Fan
    setInterval(() => {
        // Check if dashboard is visible before showing alerts
        const divDashboard = document.getElementById('divDashboard');
        if (divDashboard.style.display !== 'flex' || divDashboard.style.opacity !== '1') {
            return; // Exit if dashboard isn't fully visible
        }

        const heaterThreshold = parseFloat(localStorage.getItem('heaterThreshold') || 18); // Default: 18°C
        const fanThreshold = parseFloat(localStorage.getItem('fanThreshold') || 25); // Default: 25°C
        const currentTemp = parseFloat(document.getElementById('temperature').textContent);

        // Hysteresis margins
        const hysteresisMargin = 1; // 1°C buffer

        // In the temperature monitoring interval section:

        // Heater logic with hysteresis
        if (currentTemp < heaterThreshold - hysteresisMargin && heaterStatus.textContent === 'Off') {
            heaterStatus.textContent = 'On';
            // Add this line to update the button text
            btnToggleHeater.textContent = 'Turn Off Heater';
            Swal.fire({
                icon: 'info',
                title: 'Heater Turned On',
                text: `The heater was turned on because the temperature dropped below ${heaterThreshold - hysteresisMargin}°C.`,
                timer: 2000,
                showConfirmButton: false,
            });
        }

        if (currentTemp >= heaterThreshold + hysteresisMargin && heaterStatus.textContent === 'On') {
            heaterStatus.textContent = 'Off';
            // Add this line to update the button text
            btnToggleHeater.textContent = 'Turn On Heater';
            Swal.fire({
                icon: 'info',
                title: 'Heater Turned Off',
                text: `The heater was turned off because the temperature rose above ${heaterThreshold + hysteresisMargin}°C.`,
                timer: 2000,
                showConfirmButton: false,
            });
        }

        // Fan logic with hysteresis
        if (currentTemp > fanThreshold + hysteresisMargin && fanStatus.textContent === 'Off') {
            fanStatus.textContent = 'On';
            // Add this line to update the button text
            btnToggleFan.textContent = 'Turn Off Fan';
            Swal.fire({
                icon: 'info',
                title: 'Fan Turned On',
                text: `The fan was turned on because the temperature exceeded ${fanThreshold + hysteresisMargin}°C.`,
                timer: 2000,
                showConfirmButton: false,
            });
        }

        if (currentTemp <= fanThreshold - hysteresisMargin && fanStatus.textContent === 'On') {
            fanStatus.textContent = 'Off';
            // Add this line to update the button text
            btnToggleFan.textContent = 'Turn On Fan';
            Swal.fire({
                icon: 'info',
                title: 'Fan Turned Off',
                text: `The fan was turned off because the temperature dropped below ${fanThreshold - hysteresisMargin}°C.`,
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }, 5000); // Check every 5 seconds
});

document.addEventListener('DOMContentLoaded', () => {
    const heaterStatusElement = document.getElementById('heaterStatus');
    const fanStatusElement = document.getElementById('fanStatus');
    const btnToggleHeater = document.getElementById('btnToggleHeater');
    const btnToggleFan = document.getElementById('btnToggleFan');

    // Load initial statuses from localStorage or set defaults
    const heaterStatus = localStorage.getItem('heaterStatus') || 'Off';
    const fanStatus = localStorage.getItem('fanStatus') || 'Off';

    // Update the UI with the initial statuses
    heaterStatusElement.textContent = heaterStatus;
    btnToggleHeater.textContent = heaterStatus === 'Off' ? 'Turn On Heater' : 'Turn Off Heater';

    fanStatusElement.textContent = fanStatus;
    btnToggleFan.textContent = fanStatus === 'Off' ? 'Turn On Fan' : 'Turn Off Fan';

    // Toggle Heater
    btnToggleHeater.addEventListener('click', () => {
        const currentStatus = localStorage.getItem('heaterStatus') || 'Off';
        const newStatus = currentStatus === 'Off' ? 'On' : 'Off';

        // Play heater sound only when turning heater ON
        if (currentStatus === 'Off') {
            const heaterSound = new Audio('sounds/heater.mp3');
            heaterSound.volume = 0.3; // Set volume to 30%
            heaterSound.play();
        }

        // Update localStorage and UI
        localStorage.setItem('heaterStatus', newStatus);
        heaterStatusElement.textContent = newStatus;
        btnToggleHeater.textContent = newStatus === 'Off' ? 'Turn On Heater' : 'Turn Off Heater';

        Swal.fire({
            icon: 'success',
            title: 'Heater Status Updated',
            text: `The heater is now ${newStatus}.`,
            timer: 2000,
            showConfirmButton: false,
        });
    });

    // Toggle Fan
btnToggleFan.addEventListener('click', () => {
    const currentStatus = localStorage.getItem('fanStatus') || 'Off';
    const newStatus = currentStatus === 'Off' ? 'On' : 'Off';

    // Play heater sound only when turning fan ON
    if (currentStatus === 'Off') {
        const fanSound = new Audio('sounds/fan.mp3');
        fanSound.volume = 0.3; // Set volume to 30%
        // set duration of sound to 2 seconds
        fanSound.currentTime = 0; // Reset to start
        fanSound.duration = 2; // Set duration to 2 seconds
        fanSound.play();
    }

    // Update localStorage and UI
    localStorage.setItem('fanStatus', newStatus);
    fanStatusElement.textContent = newStatus;
    btnToggleFan.textContent = newStatus === 'Off' ? 'Turn On Fan' : 'Turn Off Fan';

    Swal.fire({
        icon: 'success',
        title: 'Fan Status Updated',
        text: `The fan is now ${newStatus}.`,
        timer: 2000,
        showConfirmButton: false,
    });
});
});

document.addEventListener('DOMContentLoaded', async () => {
    const temperatureElement = document.getElementById('temperature');
    const ctx = document.getElementById('environmentChart').getContext('2d');

    // Initialize the environment chart
    const environmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Timestamps
            datasets: [
                {
                    label: 'Temperature (°C)', // Default to Celsius
                    data: [], // Temperature values
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                },
{
                    label: 'Humidity (%)',
                    data: [], // Humidity values
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperature',
                    },
                },
            },
        },
    });

    // Helper function to convert Celsius to Fahrenheit
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9) / 5 + 32;
    }

    // Helper function to update the temperature display and chart
    function updateTemperatureDisplay(temperature, unit) {
        const convertedTemperature =
            unit === 'Fahrenheit' ? celsiusToFahrenheit(temperature) : temperature;

        // Update the temperature display
        temperatureElement.textContent = `${convertedTemperature.toFixed(1)} °${unit === 'Fahrenheit' ? 'F' : 'C'}`;

        // Update the chart label
        environmentChart.data.datasets[0].label = `Temperature (°${unit === 'Fahrenheit' ? 'F' : 'C'})`;

        // Add the data to the chart
        const now = new Date().toLocaleTimeString();
        environmentChart.data.labels.push(now);
        environmentChart.data.datasets[0].data.push(convertedTemperature);

        // Limit the number of data points to 10
        if (environmentChart.data.labels.length > 10) {
            environmentChart.data.labels.shift();
            environmentChart.data.datasets[0].data.shift();
        }

        // Update the chart
        environmentChart.update();
    }

    // Fetch the user's preferred temperature unit
    const sessionID = localStorage.getItem('SessionID');
    if (!sessionID) {
        console.error('No SessionID found. Please log in again.');
        return;
    }

    let temperatureUnit = 'Celsius'; // Default to Celsius
    try {
        const temperatureUnitSetting = await settingsApiHandler('GET', {
            SessionID: sessionID,
            setting: 'temperatureUnit',
        });
        if (temperatureUnitSetting?.value) {
            temperatureUnit = temperatureUnitSetting.value; // Use the user's preferred unit
        }
    } catch (error) {
        console.error('Error fetching temperature unit setting:', error);
    }

    // Fetch weather data and update the UI
    async function fetchWeatherData() {
        const latitude = 36.1627; // Latitude for Nashville
        const longitude = -86.7816; // Longitude for Nashville
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok && data.current_weather) {
                const temperature = data.current_weather.temperature; // Temperature in °C
                const humidity = data.hourly?.relativehumidity_2m?.[0] || '--'; // Humidity in %
                const observationTime = data.current_weather.time || null; // Observation time

                // Update the temperature display and chart
                updateTemperatureDisplay(temperature, temperatureUnit);

                // Update the humidity display
                const humidityElement = document.getElementById('humidity');
                humidityElement.textContent = `${humidity} %`;

                // Update the "Last Observation" field
                const observationElement = document.getElementById('observationDateTime');
                // Inside the fetchWeatherData function, update the observation time handling:
                if (observationTime) {
                    // Convert UTC time to local time
                    const date = new Date(observationTime + 'Z'); // Add 'Z' to indicate UTC
                    const formattedTime = date.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    });
                    observationElement.textContent = formattedTime;
                } else {
                    observationElement.textContent = '--';
                }
            } else {
                console.error('Error fetching weather data:', data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Fetch weather data every 5 minutes
    setInterval(fetchWeatherData, 300000); // 300,000 ms = 5 minutes

    // Fetch weather data immediately on page load
    fetchWeatherData();
});

document.addEventListener('DOMContentLoaded', () => {
    const feedLevelElement = document.getElementById('feedLevel');
    const waterLevelElement = document.getElementById('waterLevel');

    // Function to update levels
    function updateLevels(feedLevel, waterLevel) {
        // Update feed level
        feedLevelElement.style.width = `${feedLevel}%`;
        feedLevelElement.setAttribute('aria-valuenow', feedLevel);
        feedLevelElement.textContent = `${feedLevel}%`;
        feedLevelElement.classList.remove('bg-success', 'bg-warning', 'bg-danger');
        feedLevelElement.classList.add(feedLevel < 10 ? 'bg-danger' : feedLevel < 30 ? 'bg-warning' : 'bg-success');

        // Update water level
        waterLevelElement.style.width = `${waterLevel}%`;
        waterLevelElement.setAttribute('aria-valuenow', waterLevel);
        waterLevelElement.textContent = `${waterLevel}%`;
        waterLevelElement.classList.remove('bg-success', 'bg-warning', 'bg-danger');
        waterLevelElement.classList.add(waterLevel < 10 ? 'bg-danger' : waterLevel < 30 ? 'bg-warning' : 'bg-success');

        // Trigger alerts if levels are below 10%
        if (feedLevel < 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Low Feed Level',
                text: 'Feed level is below 10%. Please refill the feed.',
            });
        }

        if (waterLevel < 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Low Water Level',
                text: 'Water level is below 10%. Please refill the water.',
            });
        }
    }

});
document.addEventListener('DOMContentLoaded', () => {
    const lightBulbIcon = document.getElementById('lightBulbIcon');
    const lightStatus = document.getElementById('lightStatus');
    const btnToggleLight = document.getElementById('btnToggleLight');
    const btnSetSchedule = document.getElementById('btnSetSchedule');
    const lightOnTimeInput = document.getElementById('lightOnTime');
    const lightOffTimeInput = document.getElementById('lightOffTime');

    let lightIsOn = false; // Track light state
    let lightSchedule = { onTime: null, offTime: null }; // Track schedule

    // Toggle Light
    btnToggleLight.addEventListener('click', () => {
        const lightSwitch = new Audio('sounds/light-switch.mp3');
        lightSwitch.play();
        lightSwitch.volume = 0.5; // Set volume to 50%

        lightIsOn = !lightIsOn;
        lightBulbIcon.classList.toggle('text-warning', lightIsOn); // Yellow when on
        lightBulbIcon.classList.toggle('text-dark', !lightIsOn); // Dark when off
        lightStatus.textContent = lightIsOn ? 'On' : 'Off';
    });

    // Set Light Schedule
    btnSetSchedule.addEventListener('click', () => {
        const onTime = lightOnTimeInput.value;
        const offTime = lightOffTimeInput.value;

        if (!onTime || !offTime) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Schedule',
                text: 'Please set both On and Off times.',
            });
            return;
        }

        lightSchedule.onTime = onTime;
        lightSchedule.offTime = offTime;

        Swal.fire({
            icon: 'success',
            title: 'Schedule Set',
            text: `Light will turn on at ${onTime} and off at ${offTime}.`,
        });
    });

    // Check Schedule Every Minute
    setInterval(() => {
        const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format

        if (lightSchedule.onTime === currentTime && !lightIsOn) {
            lightIsOn = true;
            lightBulbIcon.classList.add('text-warning');
            lightBulbIcon.classList.remove('text-dark');
            lightStatus.textContent = 'On';
        }

        if (lightSchedule.offTime === currentTime && lightIsOn) {
            lightIsOn = false;
            lightBulbIcon.classList.add('text-dark');
            lightBulbIcon.classList.remove('text-warning');
            lightStatus.textContent = 'Off';
        }
    }, 60000); // Check every minute
});
document.addEventListener('DOMContentLoaded', () => {
    const doorStatusElement = document.getElementById('doorStatus');
    const btnToggleDoor = document.getElementById('btnToggleDoor');
    const btnSetDoorSchedule = document.getElementById('btnSetDoorSchedule');
    const doorOpenTimeInput = document.getElementById('doorOpenTime');
    const doorCloseTimeInput = document.getElementById('doorCloseTime');

    let doorIsOpen = false; // Track door state
    let doorSchedule = { openTime: null, closeTime: null }; // Track schedule

    // Set Door Schedule
    btnSetDoorSchedule.addEventListener('click', () => {
        const openTime = doorOpenTimeInput.value;
        const closeTime = doorCloseTimeInput.value;

        if (!openTime || !closeTime) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Schedule',
                text: 'Please set both Open and Close times.',
            });
            return;
        }

        doorSchedule.openTime = openTime;
        doorSchedule.closeTime = closeTime;

        Swal.fire({
            icon: 'success',
            title: 'Schedule Set',
            text: `Door will open at ${openTime} and close at ${closeTime}.`,
        });
    });

    // Check Schedule Every Minute
    setInterval(() => {
        const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format

        if (doorSchedule.openTime === currentTime && !doorIsOpen) {
            doorIsOpen = true;
            doorStatusElement.textContent = 'Open';
            btnToggleDoor.textContent = 'Close Door';
        }

        if (doorSchedule.closeTime === currentTime && doorIsOpen) {
            doorIsOpen = false;
            doorStatusElement.textContent = 'Closed';
            btnToggleDoor.textContent = 'Open Door';
        }
    }, 60000); // Check every minute
});

// Function to update all temperature displays
function updateDashboardTemperatures(unit) {
    // Helper function to convert between units
    function convertTemperature(value, toUnit) {
        if (toUnit === 'Fahrenheit') {
            return (value * 9/5) + 32;
        } else {
            return (value - 32) * 5/9;
        }
    }

    // Update main temperature display
    const temperatureDisplay = document.getElementById('temperature');
    if (temperatureDisplay) {
        const currentTemp = parseFloat(temperatureDisplay.textContent);
        if (!isNaN(currentTemp)) {
            const currentUnit = temperatureDisplay.textContent.includes('F') ? 'Fahrenheit' : 'Celsius';
            if (currentUnit !== unit) {
                const convertedTemp = convertTemperature(currentTemp, unit);
                temperatureDisplay.textContent = `${convertedTemp.toFixed(1)} °${unit.charAt(0)}`;
            }
        }
    }

    // Update environment chart
    const environmentChart = Chart.getChart('environmentChart');
    if (environmentChart) {
        const dataset = environmentChart.data.datasets[0];
        dataset.label = `Temperature (°${unit.charAt(0)})`;
        
        // Convert all temperature values in the chart
        const currentUnit = dataset.label.includes('F') ? 'Fahrenheit' : 'Celsius';
        if (currentUnit !== unit) {
            dataset.data = dataset.data.map(value => 
                convertTemperature(value, unit)
            );
        }
        environmentChart.update();
    }

    // Update threshold displays
    const heaterThreshold = document.getElementById('autoHeaterThreshold');
    const fanThreshold = document.getElementById('autoFanThreshold');

    if (heaterThreshold) {
        const currentValue = parseFloat(heaterThreshold.value);
        if (!isNaN(currentValue)) {
            const convertedValue = convertTemperature(currentValue, unit);
            heaterThreshold.value = convertedValue.toFixed(1);
        }
    }

    if (fanThreshold) {
        const currentValue = parseFloat(fanThreshold.value);
        if (!isNaN(currentValue)) {
            const convertedValue = convertTemperature(currentValue, unit);
            fanThreshold.value = convertedValue.toFixed(1);
        }
    }
}

// When user checks the checkbox chkTemperatureUnit, it should change the 
// temperature unit from Celsius to Fahrenheit and vice versa
// It should also update the temperature unit using api handler settingsApiHandler
// do it

document.getElementById('chkTemperatureUnit').addEventListener('change', async (event) => {
    const isChecked = event.target.checked;
    const temperatureUnit = isChecked ? 'Fahrenheit' : 'Celsius';

    // Get the SessionID from localStorage
    const sessionID = localStorage.getItem('SessionID');
    if (!sessionID) {
        console.error('No SessionID found. Please log in again.');
        return;
    }

    try {
        // Update the temperature unit setting using settingsApiHandler
        await settingsApiHandler('PUT', {
            SessionID: sessionID,
            setting: 'temperatureUnit',
            value: temperatureUnit,
        });

        // Save the setting in localStorage
        localStorage.setItem('temperatureUnit', temperatureUnit);

        // Update all temperature displays on the dashboard
        updateDashboardTemperatures(temperatureUnit);

        // enable the save settings button
        const btnSaveSettings = document.getElementById('btnSaveSettings');
        if (btnSaveSettings) {
            btnSaveSettings.disabled = false;
        }
    } catch (error) {
        console.error('Error updating temperature unit:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the temperature unit. Please try again later.',
        });
    }
});