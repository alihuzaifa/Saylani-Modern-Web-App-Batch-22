import supabase from "./credential.js";

// Sidebar navigation is in common.js

// ================= Get elements =================
const stockSearch = document.getElementById("stockSearch");
const stockFilter = document.getElementById("stockFilter");
const stockTableBody = document.getElementById("stockTableBody");

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

// sab products yahan rakhenge, taake search aur filter par dobara Supabase se na mangwana pare
let allProducts = [];

// 10 se kam ho to low, 0 ho to out
const getStatus = (quantity) => {
  if (quantity === 0) {
    return "out";
  }
  if (quantity < 10) {
    return "low";
  }
  return "ok";
};

const statusTag = {
  ok: `<span class="tag tag-ok">In stock</span>`,
  low: `<span class="tag tag-low">Low</span>`,
  out: `<span class="tag tag-out">Out</span>`,
};

// ================= Show stock =================
// search aur filter lagao, phir table banao
const renderStock = () => {
  const searchText = stockSearch.value.trim().toLowerCase();
  const filterValue = stockFilter.value;

  stockTableBody.innerHTML = "";

  // kitni rows bani, taake aakhir me pata ho kuch mila ya nahi
  let shown = 0;

  // for loop se har product check karo: filter aur search par poora utre to row banao
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    const status = getStatus(product.quantity);

    // filter "low" ya "out" ho aur product ka status wo na ho to ye product chhor do
    if (filterValue !== "all" && status !== filterValue) {
      continue;
    }

    // search ka text naam me na ho to ye product chhor do
    if (!product.name.toLowerCase().includes(searchText)) {
      continue;
    }

    stockTableBody.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>Rs ${product.price}</td>
        <td>${statusTag[status]}</td>
      </tr>
    `;
    shown++;
  }

  if (shown === 0) {
    stockTableBody.innerHTML = `<tr><td colspan="4">No products found</td></tr>`;
  }
};

stockSearch.oninput = renderStock;
stockFilter.onchange = renderStock;

// ================= Get stock =================
const getStock = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    showError(error.message);
    return;
  }

  allProducts = data;
  renderStock();
};

// page khulte hi stock dikhao
getStock();
