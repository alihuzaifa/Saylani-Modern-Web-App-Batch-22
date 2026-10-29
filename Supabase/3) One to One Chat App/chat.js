import { supabase } from "./supabase.js";

const meName = document.getElementById("me-name");
const otherList = document.getElementById("other-list");
const chatWith = document.getElementById("chat-with");
const messagesBox = document.getElementById("messages");
const sendBtn = document.getElementById("send-btn");
const textInput = document.getElementById("text");

const myId = Number(localStorage.getItem("userId"));
if (!myId) {
  window.location.href = "users.html";
}

let otherId = null;

// apna naam + baqi users
async function loadUsers() {
  try {
    console.log("loadUsers: apna naam aur baqi users supabase se lao, myId =", myId);
    const me = { name: "" }; // supabase se apna user yahan aayega
    meName.innerHTML = "You: " + me.name;

    const data = []; // supabase se baqi users yahan aayenge

    otherList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      otherList.innerHTML += `<li id="${data[i].id}">${data[i].name}</li>`;
    }
  } catch (err) {
    alert(err.message);
  }
}

async function openChat(e) {
  try {
    otherId = Number(e.target.id);
    chatWith.innerHTML = e.target.innerHTML;

    console.log("openChat: messages supabase se lao, otherId =", otherId);
    const data = []; // supabase se messages yahan aayenge

    messagesBox.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const m = data[i];
      const myMessage = m.sender_id === myId && m.receiver_id === otherId;
      const otherPersonMessage = m.sender_id === otherId && m.receiver_id === myId;
      if (myMessage || otherPersonMessage) {
        const cls = myMessage ? "mine" : "";
        messagesBox.innerHTML += `<li class="${cls}">${m.content}</li>`;
      }
    }
  } catch (err) {
    alert(err.message);
  }
}

async function sendMessage() {
  if (textInput.value.trim() === "") {
    return false;
  } else if (!otherId) {
    alert("Pehle user select karein");
  } else {
    try {
      console.log("sendMessage: supabase mein insert karo", { sender_id: myId, receiver_id: otherId, content: textInput.value });
      textInput.value = "";
    } catch (err) {
      alert(err.message);
    }
  }
}

// naya message aaye to ye chalta hai
function onNewMessage(payload) {
  const m = payload.new;
  const myMessage = m.sender_id === myId && m.receiver_id === otherId;
  const otherPersonMessage = m.sender_id === otherId && m.receiver_id === myId;
  if (myMessage || otherPersonMessage) {
    const cls = myMessage ? "mine" : "";
    messagesBox.innerHTML += `<li class="${cls}">${m.content}</li>`;
  }
}

function listenMessages() {
  try {
  } catch (err) {
    alert(err.message);
  }
}

loadUsers();
listenMessages();
otherList.addEventListener("click", openChat);
sendBtn.addEventListener("click", sendMessage);
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
