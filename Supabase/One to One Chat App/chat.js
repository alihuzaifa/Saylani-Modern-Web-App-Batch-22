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

async function loadUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", myId);

    const other = await supabase.from("users").select("*").neq("id", myId);

    if (error) {
      window.location.href = "users.html";
      return false;
    } else {
      meName.innerHTML = data[0].name;
    }

    const otherUsers = other.data;

    otherList.innerHTML = "";
    for (let i = 0; i < otherUsers.length; i++) {
      otherList.innerHTML += `<li id="${otherUsers[i].id}">${otherUsers[i].name}</li>`;
    }
  } catch (err) {
    alert(err.message);
  }
}

async function openChat(e) {
  try {
    otherId = Number(e.target.id);
    chatWith.innerHTML = e.target.innerHTML;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${myId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${myId})`,
      );
    if (error) {
      return false;
    }

    messagesBox.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const m = data[i];
      const myMessage = m.sender_id == myId && m.receiver_id == otherId;
      const otherPersonMessage =
        m.sender_id == otherId && m.receiver_id == myId;
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
    alert("Please fill the input field");
    return false;
  } else if (!otherId) {
    alert("Pehle user select karein");
  } else {
    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: myId,
        receiver_id: otherId,
        content: textInput.value,
      });
      if (error) {
        alert(error.message);
        return false;
      } else {
        alert("Message Send Successfully");
        textInput.value = "";
      }
    } catch (err) {
      alert(err.message);
    }
  }
}

// naya message aaye to ye chalta hai
function onNewMessage(payload) {
  console.log("payload", payload);

  const m = payload.new;
  const myMessage = m.sender_id === myId && m.receiver_id === otherId;
  const otherPersonMessage = m.sender_id === otherId && m.receiver_id === myId;
  if (myMessage || otherPersonMessage) {
    const cls = myMessage ? "mine" : "";
    messagesBox.innerHTML += `<li class="${cls}">${m.content}</li>`;
  }
}

function listenMessages() {
  supabase
    .channel("chat")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      onNewMessage,
    )
    .subscribe();
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
