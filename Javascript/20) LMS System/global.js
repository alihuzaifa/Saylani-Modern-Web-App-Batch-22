function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function windowClick() {
    if (event.target === modal) {
        closeModal();
    }
}

function validation(name, email, password, confirmPass) {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    // it will check that form has name field or not
    if (name !== false) {
        if (name.length < 3) {
            // alert("Please enter a valid name")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid name",
            });
            return
        }
    }

    // it will check that form has name field or not
    if (email !== false) {
        if (emailRegex.test(email)) {

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please provide a valid email",
            });
            return
        }
    }


    if (password !== false) {
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please provide a strong password",
            });
            return
        }
    }


    if (confirmPass !== false) {
        if (confirmPass !== password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please provide a matching password",
            });
            return
        }
    }
}

// Close modal when clicking outside
window.onclick = windowClick
