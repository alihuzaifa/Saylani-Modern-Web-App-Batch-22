var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

function resetPassword() {
    var validateForm = validation(false, false, password.value, confirmPassword.value)

    // validation false hui to yahin ruk jao
    if (validateForm === false) {
        return
    }

    window.location.href = "login.html"
}
