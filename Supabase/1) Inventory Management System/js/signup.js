import supabase from "./credential.js";
import { validation } from "./validation.js";

console.log(supabase);

// ================= Get elements =================
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const signupBtn = document.getElementById("signupBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Signup =================
signupBtn.onclick = async () => {
  const validateForm = validation(
    signupName.value,
    signupEmail.value,
    signupPassword.value,
    signupConfirm.value,
  );

  // validation false hui to yahin ruk jao
  if (validateForm === false) {
    return;
  }

  // NOTE: "email rate limit exceeded" error
  // Supabase ki free built-in email service ek ghante mein sirf 2 emails bhejti hai.
  // Har signUp par confirmation email jati hai, is liye 2-3 signup ke baad ye error aata hai.
  // Testing ke liye: Dashboard -> Authentication -> Sign In / Providers -> Email -> "Confirm email" off kar dein.
  // Real app ke liye: Authentication -> SMTP Settings mein apna SMTP (jaise Resend) lagayein aur Confirm email on rakhein.
  const { data, error } = await supabase.auth.signUp({
    email: signupEmail.value,
    password: signupPassword.value,
  });

  console.log("data", data);

  // window.location.href = "login.html";
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
