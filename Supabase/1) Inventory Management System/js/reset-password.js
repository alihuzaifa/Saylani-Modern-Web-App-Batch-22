import supabase from "./credential.js";
import { validation } from "./validation.js";

// ================= Get elements =================
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const resetBtn = document.getElementById("resetBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Reset password =================
resetBtn.onclick = async () => {
  // click hote hi button ka text badlo aur disable kar do
  resetBtn.innerHTML = "Resetting...";
  resetBtn.disabled = true;

  const validateForm = validation(false, false, newPassword.value, confirmNewPassword.value);

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    resetBtn.innerHTML = "Reset password";
    resetBtn.disabled = false;
    return;
  }

  // Yahan Supabase ka naya password set karne ka method aayega

  // function ke akhir me button wapis theek
  resetBtn.innerHTML = "Reset password";
  resetBtn.disabled = false;
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
