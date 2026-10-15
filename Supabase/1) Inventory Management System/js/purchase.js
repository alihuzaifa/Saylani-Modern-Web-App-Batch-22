import { productValidation } from "./validation.js";

// Sidebar navigation is in common.js

// ================= Get elements =================
const purchaseProduct = document.getElementById("purchaseProduct");
const purchaseQty = document.getElementById("purchaseQty");
const purchasePrice = document.getElementById("purchasePrice");
const purchaseTotal = document.getElementById("purchaseTotal");
const purchaseClearBtn = document.getElementById("purchaseClearBtn");
const purchaseSaveBtn = document.getElementById("purchaseSaveBtn");

// ================= Total =================
// total user nahi likhta, quantity aur price se khud ban jata hai
const calculateTotal = () => {
  purchaseTotal.value = Number(purchaseQty.value) * Number(purchasePrice.value);
};

purchaseQty.oninput = calculateTotal;
purchasePrice.oninput = calculateTotal;

// ================= Reset =================
// har field ki value khali, total 0
const resetForm = () => {
  purchaseProduct.value = "";
  purchaseQty.value = "";
  purchasePrice.value = "";
  purchaseTotal.value = 0;
};

purchaseClearBtn.onclick = resetForm;

// ================= Save purchase =================
purchaseSaveBtn.onclick = () => {
  // click hote hi button ka text badlo aur disable kar do
  purchaseSaveBtn.innerHTML = "Saving...";
  purchaseSaveBtn.disabled = true;

  const validateForm = productValidation(
    purchaseProduct.value,
    purchaseQty.value,
    purchasePrice.value
  );

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    purchaseSaveBtn.innerHTML = "Save purchase";
    purchaseSaveBtn.disabled = false;
    return;
  }

  const purchase = {
    product_name: purchaseProduct.value,
    quantity: Number(purchaseQty.value),
    price: Number(purchasePrice.value),
    total: Number(purchaseTotal.value),
  };
  console.log("purchase", purchase);

  Swal.fire({
    icon: "success",
    title: "Done",
    text: "Purchase form is valid",
  });

  resetForm();

  // function ke akhir me button wapis theek
  purchaseSaveBtn.innerHTML = "Save purchase";
  purchaseSaveBtn.disabled = false;
};
