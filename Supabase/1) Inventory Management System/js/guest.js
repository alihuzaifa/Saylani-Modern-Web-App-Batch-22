// Login, signup aur forgot password ke liye
// Agar user pehle se login hai to ye pages dikhane ki zaroorat nahi, seedha dashboard par bhej do.
// NOTE: reset-password.html par ye file import NAHI karni, kyun ke email wale link se
// aane par Supabase session bana deta hai aur user ko wahin rehna hai.

import supabase from "./credential.js";

// check hone tak page chhupa do
document.body.style.visibility = "hidden";

const redirectIfLoggedIn = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      window.location.replace("dashboard.html");
      return;
    }
  } catch (error) {}
  // login nahi hai -> page dikhao
  document.body.style.visibility = "visible";
};

redirectIfLoggedIn();
