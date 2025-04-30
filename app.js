// Buttons & Forms
const divRegistration = document.getElementById('divRegistration');
const divLogin = document.getElementById('divLogin');
const btnCancelRegistration = document.getElementById('btnCancelRegistration');
const btnCreateAccount = document.getElementById('btnCreateAccount');
const btnShowLogin = document.getElementById('btnShowLogin');


// Drop-down menu fixes
document.addEventListener('DOMContentLoaded', () => {
    new Choices('#txtState', {
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

// "Create Account" button fades out registration and clears page, sets title
btnCreateAccount.addEventListener('click', () => {
    divRegistration.style.transition = 'opacity 0.5s ease';
    divRegistration.style.opacity = 0;

    setTimeout(() => {
        divRegistration.style.display = 'none';  
        document.body.innerHTML = ''; 
    }, 500);  
    document.title = "Smart Chicken Coop | Dashboard";
});

// Validation for Registration Form
