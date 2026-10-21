// Shared sidebar code for dashboard, purchase and sell pages

import supabase from "./credential.js";

// Login check hone tak page chhupa do, warna redirect se pehle
// ek pal ke liye dashboard nazar aa jata hai
document.body.style.visibility = "hidden";

// ================= Get elements =================
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const menuToggle = document.getElementById("menuToggle");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.querySelector(".topbar .user");

const navDashboard = document.getElementById("navDashboard");
const navPurchase = document.getElementById("navPurchase");
const navSell = document.getElementById("navSell");

// ================= Sidebar navigation =================
navDashboard.onclick = () => {
  window.location.href = "dashboard.html";
};

navPurchase.onclick = () => {
  window.location.href = "purchase.html";
};

navSell.onclick = () => {
  window.location.href = "sell.html";
};

logoutBtn.onclick = async () => {
  try {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  } catch (error) {}
};

// ================= Mobile sidebar =================
let isSidebarOpen = false;

const toggleSidebar = () => {
  isSidebarOpen = !isSidebarOpen;
  sidebar.classList.toggle("open", isSidebarOpen);
  sidebarOverlay.classList.toggle("show", isSidebarOpen);
};

menuToggle.onclick = toggleSidebar;
sidebarOverlay.onclick = toggleSidebar;

// ================= Login check =================
// Dashboard, purchase aur sell sirf logged in user dekh sakta hai.
// Login nahi hai to seedha login page par bhej do.
const checkAuthentication = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || data.user === null) {
      window.location.replace("login.html");
      return;
    }
    // login hai -> top bar me user ka email dikhao aur page show karo
    userName.innerHTML = data.user.email;
    document.body.style.visibility = "visible";
  } catch (error) {
    window.location.replace("login.html");
  }
};

export default checkAuthentication;
