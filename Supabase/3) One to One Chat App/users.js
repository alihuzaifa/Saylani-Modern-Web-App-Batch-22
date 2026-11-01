import { supabase } from "./supabase.js";

const usersList = document.getElementById("users-list");

async function loadUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return false;
    }

    usersList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      usersList.innerHTML += `<li id="${element.id}">${element.name}</li>`;
    }
  } catch (err) {
    alert(err.message);
  }
}

function selectUser(e) {
  localStorage.setItem("userId", e.target.id);
  window.location.href = "chat.html";
}

loadUsers();
usersList.addEventListener("click", selectUser);
