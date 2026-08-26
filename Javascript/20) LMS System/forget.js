var email = document.getElementById('email');

function forget() {
    var validateForm = validation(false, email.value, false, false)

    // validation false hui to yahin ruk jao
    if (validateForm === false) {
        return
    }

    window.location.href = "reset.html"
}
