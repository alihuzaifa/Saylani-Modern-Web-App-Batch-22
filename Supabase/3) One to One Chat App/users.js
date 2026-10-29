import { supabase } from "./supabase.js";

const usersList = document.getElementById("users-list");

async function loadUsers() {
  try {
    console.log("loadUsers: yahan supabase se users lao");
    const data = []; // supabase ka data yahan aayega

    usersList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      usersList.innerHTML += `<li id="${data[i].id}">${data[i].name}</li>`;
    }
  } catch (err) {
    alert(err.message);
  }
}

function selectUser(e) {
  console.log("selected user id:", e.target.id);
  localStorage.setItem("userId", e.target.id);
  window.location.href = "chat.html";
}

loadUsers();
usersList.addEventListener("click", selectUser);
