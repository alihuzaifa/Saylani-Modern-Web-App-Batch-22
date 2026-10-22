// import supabase from "./credential.js";   // uncomment when adding real Supabase

// ================= Mock in-memory store =================
// Replace this array + the SUPABASE_ functions below with real Supabase calls
let files = [];
let nextId = 1;

// ================= Get elements =================
const dropZone         = document.getElementById("dropZone");
const fileInput        = document.getElementById("fileInput");
const uploadQueue      = document.getElementById("uploadQueue");
const fileTableBody    = document.getElementById("fileTableBody");
const fileCount        = document.getElementById("fileCount");
const searchInput      = document.getElementById("searchInput");
const selectAll        = document.getElementById("selectAll");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const statTotal        = document.getElementById("statTotal");
const statSize         = document.getElementById("statSize");
const statImages       = document.getElementById("statImages");
const statDocs         = document.getElementById("statDocs");
const navFiles         = document.getElementById("navFiles");
const navImages        = document.getElementById("navImages");
const navDocs          = document.getElementById("navDocs");
const navVideos        = document.getElementById("navVideos");
const sidebar          = document.getElementById("sidebar");
const sidebarOverlay   = document.getElementById("sidebarOverlay");
const menuToggle       = document.getElementById("menuToggle");
const pageTitle        = document.getElementById("pageTitle");

// ================= Helpers =================
const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const shortDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const fileTypeCategory = (mime) => {
  if (mime.startsWith("image/"))  return "image";
  if (mime.startsWith("video/"))  return "video";
  if (mime.startsWith("audio/"))  return "audio";
  if (
    mime === "application/pdf" ||
    mime.includes("word") ||
    mime.includes("spreadsheet") ||
    mime.includes("presentation") ||
    mime.startsWith("text/")
  ) return "doc";
  return "other";
};

const fileIcon = (category) => {
  const icons = {
    image: "🖼️",
    video: "🎬",
    audio: "🎵",
    doc:   "📄",
    other: "📦",
  };
  return icons[category] || "📦";
};

const tagHtml = (category) => {
  const labels = { image: "Image", video: "Video", audio: "Audio", doc: "Document", other: "Other" };
  return `<span class="tag tag-${category === "doc" ? "doc" : category}">${labels[category]}</span>`;
};

// ================= Active filter =================
let activeFilter = "all"; // all | image | doc | video

const setFilter = (filter, label, btn) => {
  activeFilter = filter;
  pageTitle.textContent = label;
  document.querySelectorAll(".nav-link").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderTable();
};

navFiles.onclick   = () => setFilter("all",   "My Files",   navFiles);
navImages.onclick  = () => setFilter("image",  "Images",     navImages);
navDocs.onclick    = () => setFilter("doc",    "Documents",  navDocs);
navVideos.onclick  = () => setFilter("video",  "Videos",     navVideos);

// ================= Mobile sidebar =================
let sidebarOpen = false;
const toggleSidebar = () => {
  sidebarOpen = !sidebarOpen;
  sidebar.classList.toggle("open", sidebarOpen);
  sidebarOverlay.classList.toggle("show", sidebarOpen);
};
menuToggle.onclick       = toggleSidebar;
sidebarOverlay.onclick   = toggleSidebar;

// ================= Drag & drop =================
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  handleFiles(Array.from(e.dataTransfer.files));
});

dropZone.addEventListener("click", (e) => {
  // prevent double-trigger when clicking the label/button inside
  if (e.target.closest("label")) return;
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  handleFiles(Array.from(fileInput.files));
  fileInput.value = "";
});

// ================= Handle selected files =================
const handleFiles = (selectedFiles) => {
  if (!selectedFiles.length) return;
  uploadQueue.classList.remove("hidden");

  selectedFiles.forEach((file) => {
    const queueItem = addToQueue(file);
    uploadFile(file, queueItem);
  });
};

// ================= Upload queue UI =================
const addToQueue = (file) => {
  const category = fileTypeCategory(file.type);
  const div = document.createElement("div");
  div.className = "queue-item";
  div.innerHTML = `
    <div class="queue-icon">${fileIcon(category)}</div>
    <div class="queue-info">
      <div class="queue-name">${file.name}</div>
      <div class="queue-meta">${formatSize(file.size)} &bull; ${file.type || "unknown"}</div>
      <div class="queue-progress-wrap">
        <div class="queue-progress-bar"></div>
      </div>
    </div>
    <div class="queue-status uploading">Uploading…</div>
  `;
  uploadQueue.appendChild(div);
  return div;
};

const setQueueItemDone = (item, success) => {
  const bar    = item.querySelector(".queue-progress-bar");
  const status = item.querySelector(".queue-status");
  bar.style.width = success ? "100%" : "0%";
  status.textContent = success ? "Done ✓" : "Error ✗";
  status.className = `queue-status ${success ? "done" : "error"}`;
};

// ================= Upload a single file =================
const uploadFile = async (file, queueItem) => {
  const bar = queueItem.querySelector(".queue-progress-bar");

  // ------ Simulated progress (replace with real XHR or Supabase upload) ------
  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.random() * 18;
    if (progress > 90) progress = 90;
    bar.style.width = `${progress}%`;
  }, 120);

  try {
    // ============================================================
    // SUPABASE — replace the lines below with real storage upload
    // ============================================================
    // const filePath = `uploads/${Date.now()}_${file.name}`;
    // const { data, error } = await supabase.storage
    //   .from("files")
    //   .upload(filePath, file, { upsert: false });
    // if (error) throw error;
    //
    // const { data: urlData } = supabase.storage.from("files").getPublicUrl(filePath);
    // const publicUrl = urlData.publicUrl;
    //
    // const { error: dbError } = await supabase.from("uploaded_files").insert({
    //   name: file.name,
    //   size: file.size,
    //   mime: file.type,
    //   path: filePath,
    //   url:  publicUrl,
    // });
    // if (dbError) throw dbError;
    // ============================================================

    // Mock: simulate network delay
    await new Promise((res) => setTimeout(res, 1200));

    const publicUrl = URL.createObjectURL(file); // placeholder, will be a real URL from Supabase

    clearInterval(tick);
    bar.style.width = "100%";
    setQueueItemDone(queueItem, true);

    // Save to mock store
    const entry = {
      id:         nextId++,
      name:       file.name,
      size:       file.size,
      mime:       file.type || "application/octet-stream",
      category:   fileTypeCategory(file.type),
      uploadedAt: new Date().toISOString(),
      url:        publicUrl,
    };
    files.push(entry);

    console.log("[SUPABASE] File uploaded:", entry);

    updateStats();
    renderTable();

    // Remove queue item after 2 s
    setTimeout(() => {
      queueItem.remove();
      if (!uploadQueue.children.length) uploadQueue.classList.add("hidden");
    }, 2000);
  } catch (err) {
    clearInterval(tick);
    setQueueItemDone(queueItem, false);
    console.error("[SUPABASE] Upload error:", err);
  }
};

// ================= Stats =================
const updateStats = () => {
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  statTotal.textContent  = files.length;
  statSize.textContent   = formatSize(totalBytes);
  statImages.textContent = files.filter((f) => f.category === "image").length;
  statDocs.textContent   = files.filter((f) => f.category === "doc").length;
};

// ================= Render table =================
const renderTable = () => {
  const query = searchInput.value.trim().toLowerCase();

  const visible = files.filter((f) => {
    const matchesFilter =
      activeFilter === "all" || f.category === activeFilter;
    const matchesSearch =
      !query || f.name.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  fileCount.textContent = visible.length;

  if (!visible.length) {
    fileTableBody.innerHTML = `<tr><td colspan="6" class="empty-row">No files found.</td></tr>`;
    selectAll.checked = false;
    return;
  }

  fileTableBody.innerHTML = "";
  visible.forEach((f) => {
    const tr = document.createElement("tr");
    tr.dataset.id = f.id;
    tr.innerHTML = `
      <td><input type="checkbox" class="row-check" /></td>
      <td>
        <div class="file-name-cell">
          <span class="file-icon">${fileIcon(f.category)}</span>
          <span class="file-name-text" title="${f.name}">${f.name}</span>
        </div>
      </td>
      <td>${tagHtml(f.category)}</td>
      <td>${formatSize(f.size)}</td>
      <td>${shortDate(f.uploadedAt)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Download" data-action="download" data-id="${f.id}">⬇️</button>
          <button class="btn-icon" title="Copy link" data-action="copy" data-id="${f.id}">🔗</button>
          <button class="btn-icon danger" title="Delete" data-action="delete" data-id="${f.id}">🗑️</button>
        </div>
      </td>
    `;
    fileTableBody.appendChild(tr);
  });

  // Re-apply checkbox state from selectAll
  selectAll.checked = false;
  updateDeleteBtn();
};

// ================= Table actions =================
fileTableBody.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const id     = parseInt(btn.dataset.id);
  const action = btn.dataset.action;
  const file   = files.find((f) => f.id === id);
  if (!file) return;

  if (action === "download") {
    downloadFile(file);
  } else if (action === "copy") {
    copyLink(file);
  } else if (action === "delete") {
    deleteFile(id);
  }
});

// Checkbox row selection
fileTableBody.addEventListener("change", (e) => {
  if (!e.target.classList.contains("row-check")) return;
  const tr = e.target.closest("tr");
  tr.classList.toggle("selected", e.target.checked);
  updateDeleteBtn();
});

selectAll.addEventListener("change", () => {
  const checks = fileTableBody.querySelectorAll(".row-check");
  checks.forEach((c) => {
    c.checked = selectAll.checked;
    c.closest("tr").classList.toggle("selected", selectAll.checked);
  });
  updateDeleteBtn();
});

const updateDeleteBtn = () => {
  const anyChecked = !!fileTableBody.querySelector(".row-check:checked");
  deleteSelectedBtn.classList.toggle("hidden", !anyChecked);
};

deleteSelectedBtn.addEventListener("click", () => {
  const checked = fileTableBody.querySelectorAll(".row-check:checked");
  const ids = Array.from(checked).map((c) => parseInt(c.closest("tr").dataset.id));
  ids.forEach((id) => deleteFile(id, false));
  updateStats();
  renderTable();
});

// ================= File operations =================
const downloadFile = (file) => {
  // ============================================================
  // SUPABASE — replace with a signed URL download
  // ============================================================
  // const { data, error } = await supabase.storage
  //   .from("files")
  //   .download(file.path);
  // ============================================================

  console.log("[SUPABASE] Download:", file.name, file.url);

  const a = document.createElement("a");
  a.href     = file.url;
  a.download = file.name;
  a.click();
};

const copyLink = (file) => {
  // ============================================================
  // SUPABASE — public URL from storage
  // ============================================================
  // const { data } = supabase.storage.from("files").getPublicUrl(file.path);
  // navigator.clipboard.writeText(data.publicUrl);
  // ============================================================

  console.log("[SUPABASE] Copy link:", file.url);

  navigator.clipboard
    .writeText(file.url)
    .then(() => alert("Link copied!"))
    .catch(() => alert("Could not copy — check browser permissions."));
};

const deleteFile = (id, rerender = true) => {
  const file = files.find((f) => f.id === id);
  if (!file) return;

  // ============================================================
  // SUPABASE — delete from storage + database row
  // ============================================================
  // await supabase.storage.from("files").remove([file.path]);
  // await supabase.from("uploaded_files").delete().eq("id", id);
  // ============================================================

  console.log("[SUPABASE] Delete:", file.name);

  // Revoke the object URL to free memory
  if (file.url.startsWith("blob:")) URL.revokeObjectURL(file.url);

  files = files.filter((f) => f.id !== id);

  if (rerender) {
    updateStats();
    renderTable();
  }
};

// ================= Search =================
searchInput.addEventListener("input", renderTable);

// ================= Initial load =================
const loadFiles = async () => {
  // ============================================================
  // SUPABASE — load files list from database
  // ============================================================
  // const { data, error } = await supabase
  //   .from("uploaded_files")
  //   .select()
  //   .order("created_at", { ascending: false });
  // if (error) { console.error(error); return; }
  // files = data.map((row) => ({
  //   id:         row.id,
  //   name:       row.name,
  //   size:       row.size,
  //   mime:       row.mime,
  //   category:   fileTypeCategory(row.mime),
  //   uploadedAt: row.created_at,
  //   path:       row.path,
  //   url:        row.url,
  // }));
  // ============================================================

  console.log("[SUPABASE] loadFiles — add Supabase query here");

  updateStats();
  renderTable();
};

loadFiles();
