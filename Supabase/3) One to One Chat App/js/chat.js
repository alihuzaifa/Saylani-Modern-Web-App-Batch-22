// Sidebar (people list) + one-to-one chatbox. Everyone reads/writes the same two tables -
// profiles (everyone who has joined) and messages (sender_id, receiver_id, content).
import supabase from "./credential.js";
import Swal from "./alert.js";
import { DEMO_PEOPLE, DEMO_MESSAGES } from "./demo-data.js";

const $ = (id) => document.getElementById(id);

let me = null;
let people = [];
let selected = null;
let channel = null;

function initials(name) {
  name = name || "?";
  const words = name.trim().split(/\s+/);
  let result = "";
  for (let i = 0; i < words.length && i < 2; i++) {
    if (words[i]) result += words[i][0].toUpperCase();
  }
  return result;
}

function findPersonById(id) {
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === id) return people[i];
  }
  return null;
}

function renderPeople(filterText) {
  const q = (filterText || "").trim().toLowerCase();

  let html = "";
  let shownCount = 0;
  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    const name = (p.full_name || "").toLowerCase();
    const email = (p.email || "").toLowerCase();
    const matches = !q || name.includes(q) || email.includes(q);
    if (!matches) continue;

    shownCount++;
    const isSelected = selected && selected.id === p.id ? " on" : "";
    html += `
      <button type="button" class="person${isSelected}" data-id="${p.id}">
        <span class="avatar">${initials(p.full_name)}</span>
        <span class="person-info"><b>${p.full_name || "(no name)"}</b><small>${p.email || ""}</small></span>
      </button>
    `;
  }
  if (shownCount === 0) html = `<p class="hint">No one else has joined yet</p>`;

  $("peopleList").innerHTML = html;

  const buttons = $("peopleList").querySelectorAll(".person");
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    btn.onclick = () => openChat(findPersonById(btn.dataset.id));
  }
}

async function loadPeople() {
  if (!supabase) {
    people = [];
    for (let i = 0; i < DEMO_PEOPLE.length; i++) {
      if (DEMO_PEOPLE[i].id !== me.id) people.push(DEMO_PEOPLE[i]);
    }
    renderPeople($("searchInput").value);
    return;
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .neq("id", me.id)
    .order("full_name", { ascending: true });
  if (error) {
    Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    return;
  }
  people = data || [];
  renderPeople($("searchInput").value);
}

function escapeHtml(s) {
  let result = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "&") result += "&amp;";
    else if (ch === "<") result += "&lt;";
    else if (ch === ">") result += "&gt;";
    else if (ch === '"') result += "&quot;";
    else if (ch === "'") result += "&#39;";
    else result += ch;
  }
  return result;
}

function bubble(msg) {
  const mine = msg.from ? msg.from === "me" : msg.sender_id === me.id;
  return `<div class="bubble ${mine ? "mine" : "theirs"}">${escapeHtml(msg.content)}</div>`;
}

function bubblesHtml(messages) {
  let html = "";
  for (let i = 0; i < messages.length; i++) {
    html += bubble(messages[i]);
  }
  return html;
}

async function loadMessages() {
  if (!supabase) {
    $("messagesList").innerHTML = bubblesHtml(DEMO_MESSAGES[selected.id] || []);
    $("messagesList").scrollTop = $("messagesList").scrollHeight;
    return;
  }
  const { data, error } = await supabase
    .from("messages")
    .select("id, sender_id, receiver_id, content, created_at")
    .or(`and(sender_id.eq.${me.id},receiver_id.eq.${selected.id}),and(sender_id.eq.${selected.id},receiver_id.eq.${me.id})`)
    .order("created_at", { ascending: true });
  if (error) {
    Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    return;
  }
  $("messagesList").innerHTML = bubblesHtml(data);
  $("messagesList").scrollTop = $("messagesList").scrollHeight;
}

function openChat(person) {
  if (!person) return;
  selected = person;
  renderPeople($("searchInput").value);
  $("chatEmpty").hidden = true;
  $("chatOpen").hidden = false;
  $("chatWithName").textContent = person.full_name || person.email;
  $("chatSection").classList.add("open");
  loadMessages();
}

function closeChat() {
  $("chatSection").classList.remove("open");
}

async function sendMessage(text) {
  if (!text.trim() || !selected) return;
  if (!supabase) {
    const msg = { from: "me", content: text.trim() };
    if (!DEMO_MESSAGES[selected.id]) DEMO_MESSAGES[selected.id] = [];
    DEMO_MESSAGES[selected.id].push(msg);
    $("messagesList").insertAdjacentHTML("beforeend", bubble(msg));
    $("messagesList").scrollTop = $("messagesList").scrollHeight;
    return;
  }
  const { error } = await supabase.from("messages").insert({
    sender_id: me.id,
    receiver_id: selected.id,
    content: text.trim(),
  });
  if (error) Swal.fire({ icon: "error", title: "Oops...", text: error.message });
}

function subscribeRealtime() {
  if (!supabase) return;
  channel = supabase
    .channel("messages-changes")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
      const row = payload.new;
      const involvesMe = row.sender_id === me.id || row.receiver_id === me.id;
      if (!involvesMe) return;
      const inOpenConversation = selected && (
        (row.sender_id === me.id && row.receiver_id === selected.id) ||
        (row.sender_id === selected.id && row.receiver_id === me.id)
      );
      if (inOpenConversation) {
        $("messagesList").insertAdjacentHTML("beforeend", bubble(row));
        $("messagesList").scrollTop = $("messagesList").scrollHeight;
      }
    })
    .subscribe();
}

function initChat(currentUser) {
  me = currentUser;
  selected = null;
  $("chatEmpty").hidden = false;
  $("chatOpen").hidden = true;
  $("searchInput").value = "";
  $("searchInput").oninput = () => renderPeople($("searchInput").value);
  $("chatBack").onclick = closeChat;
  $("messageForm").onsubmit = (e) => {
    e.preventDefault();
    const input = $("messageInput");
    console.log("Message field:", input.value);
    sendMessage(input.value);
    input.value = "";
  };
  loadPeople();
  subscribeRealtime();
}

function stopChat() {
  if (channel) supabase.removeChannel(channel);
  channel = null;
  me = null;
  people = [];
  selected = null;
}

// This page: index.html already picked "who you are" and saved it to localStorage.
// No identity here -> back to index.html.
const STORAGE_KEY = "chatAppWhoAmI";

document.addEventListener("DOMContentLoaded", () => {
  let identity;
  try { identity = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { identity = null; }
  if (!identity) { location.href = "index.html"; return; }

  $("switchBtn").onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    stopChat();
    location.href = "index.html";
  };
  initChat(identity);
});
