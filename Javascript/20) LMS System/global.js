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


// Close modal when clicking outside
window.onclick = windowClick
