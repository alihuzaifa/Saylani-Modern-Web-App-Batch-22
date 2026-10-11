import supabase from "./credential.js";
import { validation } from "./validation.js";

// ================= Get elements =================
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const goToSignup = document.getElementById("goToSignup");
const goToForgot = document.getElementById("goToForgot");

// ================= Login =================
loginBtn.onclick = async () => {
  // click hote hi button ka text badlo aur disable kar do
  loginBtn.innerHTML = "Logging in...";
  loginBtn.disabled = true;

  const validateForm = validation(false, loginEmail.value, loginPassword.value, false);

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    loginBtn.innerHTML = "Log in";
    loginBtn.disabled = false;
    return;
  }

  // Yahan Supabase ka login method aayega

  // function ke akhir me button wapis theek
  loginBtn.innerHTML = "Log in";
  loginBtn.disabled = false;
};

// ================= Navigation =================
goToSignup.onclick = (e) => {
  e.preventDefault();
  window.location.href = "signup.html";
};

goToForgot.onclick = (e) => {
  e.preventDefault();
  window.location.href = "forgot-password.html";
};
