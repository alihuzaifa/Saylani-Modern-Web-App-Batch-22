import supabase from "./credential.js";
import { validation } from "./validation.js";

// ================= Get elements =================
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const signupBtn = document.getElementById("signupBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Signup =================
signupBtn.onclick = async () => {
  // click hote hi button ka text badlo aur disable kar do
  signupBtn.innerHTML = "Signing up...";
  signupBtn.disabled = true;

  const validateForm = validation(
    signupName.value,
    signupEmail.value,
    signupPassword.value,
    signupConfirm.value,
  );

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    signupBtn.innerHTML = "Sign up";
    signupBtn.disabled = false;
    return;
  }

  // NOTE: "email rate limit exceeded" error
  // Supabase ki free built-in email service ek ghante mein sirf 2 emails bhejti hai.
  // Har signUp par confirmation email jati hai, is liye 2-3 signup ke baad ye error aata hai.
  // Testing ke liye: Dashboard -> Authentication -> Sign In / Providers -> Email -> "Confirm email" off kar dein.
  // Real app ke liye: Authentication -> SMTP Settings mein apna SMTP (jaise Resend) lagayein aur Confirm email on rakhein.
  // Yahan Supabase ka signup method aayega

  // function ke akhir me button wapis theek
  signupBtn.innerHTML = "Sign up";
  signupBtn.disabled = false;

  // window.location.href = "login.html";
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
