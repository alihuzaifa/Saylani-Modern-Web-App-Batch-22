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

  const filtered = allProducts.filter((product) => {
    const status = getStatus(product.quantity);

    if (filterValue !== "all" && status !== filterValue) {
      return false;
    }

    return product.name.toLowerCase().includes(searchText);
  });

  stockTableBody.innerHTML = "";

  if (filtered.length === 0) {
    stockTableBody.innerHTML = `<tr><td colspan="4">No products found</td></tr>`;
    return;
  }

  filtered.forEach((product) => {
    const status = getStatus(product.quantity);

    stockTableBody.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>Rs ${product.price}</td>
        <td>${statusTag[status]}</td>
      </tr>
    `;
  });
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
