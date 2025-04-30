// Buttons & Forms
const divRegistration = document.getElementById('divRegistration');
const divLogin = document.getElementById('divLogin');
const btnCancelRegistration = document.getElementById('btnCancelRegistration');
const btnShowLogin = document.getElementById('btnShowLogin');

// Drop-down menu fixes
document.addEventListener('DOMContentLoaded', () => {
    new Choices('#selState', {
      placeholder: false,
      itemSelectText: '',
      searchEnabled: true,
    });
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
    console.log('Create Account button clicked');

    const strEmail = document.getElementById('txtEmail').value.trim();
    const strPassword = document.getElementById('txtPassword').value.trim();
    const strFirstName = document.getElementById('txtFirstName').value.trim();
    const strLastName = document.getElementById('txtLastName').value.trim();
    const strStreetAddress1 = document.getElementById('txtStreetAddress1').value.trim();
    const strStreetAddress2 = document.getElementById('txtStreetAddress2').value.trim();
    const strCity = document.getElementById('txtCity').value.trim();
    const strState = document.getElementById('selState').value.trim();
    const strZipCode = document.getElementById('txtZipCode').value.trim();
    const strPhoneNumber = document.getElementById('telPhone').value.trim();
    const strCoopID = document.getElementById('txtCoopRegistrationID').value.trim();

    // Initialize an array to store errors
    const errors = [];

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (strEmail && !emailRegex.test(strEmail)) {
        errors.push('Invalid email format.');
    } // Check if email is empty
    if (!strEmail) {
        errors.push('Email is required.');
    }

    // Check password format (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strPassword && !passwordRegex.test(strPassword)) {
        errors.push('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
    } // Check if password is empty
    if (!strPassword) {
        errors.push('Password is required.');
    }

    // Check if first name is empty
    if (!strFirstName) {
        errors.push('First name is required.');
    }

    // Check if last name is empty
    if (!strLastName) {
        errors.push('Last name is required.');
    }

    // Check if street address is empty
    if (!strStreetAddress1) {
        errors.push('Street address 1 is required.');
    }

    // Check if street address 2 is empty
    if (!strStreetAddress2) {
        errors.push('Street address 2 is required.');
    }

    // Check if city is empty
    if (!strCity) {
        errors.push('City is required.');
    }

    // Check if state is empty
    if (!strState) {
        errors.push('State is required.');
    }

    // Check zip code format (5 digits)
    const zipCodeRegex = /^\d{5}$/;
    if (strZipCode && !zipCodeRegex.test(strZipCode)) {
        errors.push('Zip code must be 5 digits.');
    }

    // Check phone number format (10 digits)
    const phoneNumberRegex = /^\d{10}$/;
    if (strPhoneNumber && !phoneNumberRegex.test(strPhoneNumber)) {
        errors.push('Phone number must be 10 digits.');
    }

    // Check if coop ID is empty
    if (!strCoopID) {
        errors.push('Coop ID is required.');
    }

    // If there are errors, display them using SweetAlert2
    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Uh-oh! Something went wrong...',
            html: `
                <div style="text-align: center; font-size: 16px; line-height: 1.8;">
                    <p>Please check the following errors:</p>
                    ${errors.map(error => `<div>${error}</div>`).join('')}
                </div>
            `,
            showClass: {
                popup: 'animate__animated animate__heartBeat', // Apply heartBeat animation
            },
            backdrop: `
                rgba(0,0,0,0.4)
                left top
                no-repeat
            `,
        });
        return;
    }
    // Simulate registration success
    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to Smart Chicken Coop!',
    }).then(() => {
        // Redirect to login or perform other actions
        divRegistration.style.opacity = 0;
        setTimeout(() => {
            divRegistration.style.display = 'none';
            divLogin.style.display = 'flex';
            divLogin.style.opacity = 1;
        }, 500);
    });
    document.title = "Smart Chicken Coop | Login";
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