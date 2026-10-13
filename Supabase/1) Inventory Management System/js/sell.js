import { validation, productValidation, phoneValidation } from "./validation.js";

// Sidebar navigation is in common.js

// ================= Get elements =================
const sellForm = document.getElementById("sellForm");
const sellCustomer = document.getElementById("sellCustomer");
const sellPhone = document.getElementById("sellPhone");
const sellProduct = document.getElementById("sellProduct");
const sellQty = document.getElementById("sellQty");
const sellClearBtn = document.getElementById("sellClearBtn");
const sellSaveBtn = document.getElementById("sellSaveBtn");
const sellTableBody = document.getElementById("sellTableBody");

// ================= Clear =================
sellClearBtn.onclick = () => {
  sellForm.reset();
};

// ================= Save sale =================
sellSaveBtn.onclick = () => {
  // customer ka naam name field ki tarah check hoga
  const validateCustomer = validation(sellCustomer.value, false, false, false);
  if (validateCustomer === false) {
    return;
  }

  const validatePhone = phoneValidation(sellPhone.value);
  if (validatePhone === false) {
    return;
  }

  // price aur date is form me nahi hain, is liye false
  const validateProduct = productValidation(
    sellProduct.value,
    sellQty.value,
    false,
    false
  );

  // validation false hui to yahin ruk jao
  if (validateProduct === false) {
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Done",
    text: "Sale form is valid",
  });
};
