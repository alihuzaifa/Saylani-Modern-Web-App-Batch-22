// This page: pick which person (from the profiles table) this browser is, and remember it.
// chat.html reads that choice back out of localStorage.
import supabase from "./credential.js";
import Swal from "./alert.js";
import { DEMO_PEOPLE } from "./demo-data.js";

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "chatAppWhoAmI";

function initials(name) {
  name = name || "?";
  const words = name.trim().split(/\s+/);
  let result = "";
  for (let i = 0; i < words.length && i < 2; i++) {
    if (words[i]) result += words[i][0].toUpperCase();
  }
  return result;
}

function findPersonById(people, id) {
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === id) return people[i];
  }
  return null;
}

function renderList(people) {
  let html = "";
  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    html += `
      <button type="button" class="person" data-id="${p.id}">
        <span class="avatar">${initials(p.full_name)}</span>
        <span class="person-info"><b>${p.full_name || "(no name)"}</b><small>${p.email || ""}</small></span>
      </button>
    `;
  }
  if (people.length === 0) {
    html = `<p class="hint">Koi bhi nahi mila. Supabase: Table editor -> profiles me rows add karein.</p>`;
  }
  $("whoList").innerHTML = html;

  const buttons = $("whoList").querySelectorAll(".person");
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.onclick = () => {
      const person = findPersonById(people, btn.dataset.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(person));
      location.href = "chat.html";
    };
  }
}

async function loadPeople() {
  if (!supabase) {
    $("notConfigured").hidden = false;
    renderList(DEMO_PEOPLE);
    return;
  }
  const { data, error } = await supabase.from("profiles").select("id, full_name, email").order("full_name");
  if (error) {
    Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    return;
  }
  renderList(data || []);
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem(STORAGE_KEY)) {
    location.href = "chat.html";
    return;
  }
  loadPeople();
});
