// Check if the user is logged in when the page loads using only localStorage
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // Load stored credentials if "Remember Me" was checked
        const rememberMe = getCookie("rememberMe") === "true";
        if (rememberMe) {
            const storedUsername = localStorage.getItem("storedUsername");
            const storedPassword = localStorage.getItem("storedPassword");
            if (storedUsername && storedPassword) {
                document.getElementById("login-username").value = storedUsername;
                document.getElementById("login-password").value = storedPassword;
                document.getElementById("remember-me").checked = true;
            }
        }
    }
});

// Handle the Login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent the form from submitting normally

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    const storedUsername = getCookie("storedUsername");
    const storedPassword = getCookie("storedPassword");

    // Check if the entered credentials match the stored data
    if (username === storedUsername && password === storedPassword) {
        // Store the login session in localStorage
        setCookie("loggedInUser", true,1);
        setCookie("rememberMe", rememberMe ? "true" : "false",1);

        // If the user wants to be remembered, store the credentials
        if (rememberMe) {
            setCookie("storedUsername", username,365);
            setCookie("storedPassword", password,365);
        }

        // Redirect to the main menu page after login
        window.location.href = "mainmenu.html";  
    } else {
        // If credentials are invalid, show an error message
        alert("Invalid username or password.");
    }
});

// Function to set cookies with an expiration date
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Convert days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get cookies by name
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Handle the Sign Up form submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (username.length < 4) {
        alert("Username must be at least 4 characters long.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Clear the existing favorites (food list) in localStorage for the previous user
    localStorage.removeItem("favoriteslocal");
    localStorage.removeItem("favoritesglobal");

    // Store the username and password in cookies
    setCookie("storedUsername", username, 365);
    setCookie("storedPassword", password, 365);

    alert("Sign Up successful! Now you can login.");
    document.getElementById("signup-form").reset();
    document.getElementById("login-form").classList.add("active");
    document.getElementById("signup-form").classList.remove("active");
});


// Switch between Login and Sign Up forms
document.getElementById("show-signup").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
});

document.getElementById("show-login").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
});

function clearCookies() {
    setCookie("storedUsername", "", -1);
    setCookie("storedPassword", "", -1);
    setCookie("loggedInUser", "", -1);
    setCookie("rememberMe", "", -1);
}



