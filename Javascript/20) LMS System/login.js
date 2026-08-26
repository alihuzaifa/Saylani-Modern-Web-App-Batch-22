var email = document.getElementById('email');
var password = document.getElementById('password');

function login() {
    var validateForm = validation(false, email.value, password.value, false)
    window.location.href = "index.html"
}
