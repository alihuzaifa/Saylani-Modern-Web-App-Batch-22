import { productValidation } from "./validation.js";

// Sidebar navigation is in common.js

// ================= Get elements =================
const purchaseForm = document.getElementById("purchaseForm");
const purchaseProduct = document.getElementById("purchaseProduct");
const purchaseQty = document.getElementById("purchaseQty");
const purchasePrice = document.getElementById("purchasePrice");
const purchaseTotal = document.getElementById("purchaseTotal");
const purchaseClearBtn = document.getElementById("purchaseClearBtn");
const purchaseSaveBtn = document.getElementById("purchaseSaveBtn");
const purchaseTableBody = document.getElementById("purchaseTableBody");

// ================= Total =================
// total user nahi likhta, quantity aur price se khud ban jata hai
const calculateTotal = () => {
  const total = Number(purchaseQty.value) * Number(purchasePrice.value);
  purchaseTotal.value = total;
};

purchaseQty.oninput = calculateTotal;
purchasePrice.oninput = calculateTotal;

// ================= Clear =================
purchaseClearBtn.onclick = () => {
  purchaseForm.reset();
  purchaseTotal.value = 0;
};

// ================= Save purchase =================
purchaseSaveBtn.onclick = () => {
  // date is form me nahi hai, is liye false
  const validateProduct = productValidation(
    purchaseProduct.value,
    purchaseQty.value,
    purchasePrice.value,
    false
  );

  // validation false hui to yahin ruk jao
  if (validateProduct === false) {
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Done",
    text: "Purchase form is valid",
  });
};
