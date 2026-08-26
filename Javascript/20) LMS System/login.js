var email = document.getElementById('email');
var password = document.getElementById('password');

function login() {
    var validateForm = validation(false, email.value, password.value, false)

    // validation false hui to yahin ruk jao
    if (validateForm === false) {
        return
    }

    window.location.href = "index.html"
}
