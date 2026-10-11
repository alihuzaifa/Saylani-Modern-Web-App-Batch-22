import supabase from "./credential.js";
import { validation } from "./validation.js";

// ================= Get elements =================
const forgotEmail = document.getElementById("forgotEmail");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Send code =================
sendCodeBtn.onclick = async () => {
  // click hote hi button ka text badlo aur disable kar do
  sendCodeBtn.innerHTML = "Sending...";
  sendCodeBtn.disabled = true;

  const validateForm = validation(false, forgotEmail.value, false, false);

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    sendCodeBtn.innerHTML = "Send code";
    sendCodeBtn.disabled = false;
    return;
  }

  // Yahan Supabase ka forgot password (reset link bhejne) ka method aayega

  // function ke akhir me button wapis theek
  sendCodeBtn.innerHTML = "Send code";
  sendCodeBtn.disabled = false;
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
