var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

function resetPassword() {
    var validateForm = validation(false, false, password.value, confirmPassword.value)
    window.location.href = "login.html"
}
