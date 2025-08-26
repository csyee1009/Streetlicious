// Function to set cookies with an expiration date
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
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

// Function to delete a cookie
function deleteCookie(name) {
    setCookie(name, "", -1);  // Set the cookie's expiration date to a past date
}


document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = getCookie("loggedInUser");

    if (!loggedInUser) {
        // Show redirect message before redirecting
        const redirectMessage = document.createElement("div");
        redirectMessage.id = "redirect-message";
        redirectMessage.style.textAlign = "center";
        redirectMessage.style.padding = "20px";
        redirectMessage.style.fontSize = "18px";
        redirectMessage.innerHTML = `
            <p>You are not logged in. Please <a href="login.html" id="redirect-btn">click here to login</a>.</p>
            <p>If not redirected automatically, <strong>you will be redirected in 5 seconds...</strong></p>
        `;
        document.body.innerHTML = '';  // Clear body content to display the message
        document.body.appendChild(redirectMessage);

        // Redirect automatically after 5 seconds
        setTimeout(function () {
            window.location.href = "login.html"; // Redirect to login page
        }, 5000);
    } else {
        console.log(`${loggedInUser} is logged in.`);
        // Show logout button and hide login button
        document.getElementById("logout-btn").style.display = "inline-block";
    }
});

// Logout function
document.getElementById("logout-btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Clear the login session cookie
    deleteCookie("loggedInUser");

    // Redirect to login page after logging out
    window.location.href = "login.html";  // Redirect to login page after logout
});