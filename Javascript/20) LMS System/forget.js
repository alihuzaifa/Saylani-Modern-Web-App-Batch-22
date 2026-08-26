var email = document.getElementById('email');

function forget() {
    var validateForm = validation(false, email.value, false, false)
    window.location.href = "reset.html"
}
