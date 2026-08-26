var userName = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPassword = document.getElementById('confirm-password');

function signup() {
    var validateForm = validation(userName.value, email.value, password.value, confirmPassword.value)

    // validation false hui to yahin ruk jao
    if (validateForm === false) {
        return
    }

    window.location.href = "index.html"
}
