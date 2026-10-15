import { validation, productValidation, phoneValidation } from "./validation.js";


// ================= Get elements =================
const sellCustomer = document.getElementById("sellCustomer");
const sellPhone = document.getElementById("sellPhone");
const sellProduct = document.getElementById("sellProduct");
const sellQty = document.getElementById("sellQty");
const sellClearBtn = document.getElementById("sellClearBtn");
const sellSaveBtn = document.getElementById("sellSaveBtn");

const resetForm = () => {
  sellCustomer.value = "";
  sellPhone.value = "";
  sellProduct.value = "";
  sellQty.value = "";
};

sellClearBtn.onclick = resetForm;

// ================= Save sale =================
sellSaveBtn.onclick = () => {
  sellSaveBtn.innerHTML = "Saving...";
  sellSaveBtn.disabled = true;

  const validateCustomer = validation(sellCustomer.value, false, false, false);
  const validatePhone = validateCustomer && phoneValidation(sellPhone.value);
  const validateProduct =
    validatePhone && productValidation(sellProduct.value, sellQty.value, false);

  if (validateProduct === false) {
    sellSaveBtn.innerHTML = "Save sale";
    sellSaveBtn.disabled = false;
    return;
  }

  const sale = {
    customer_name: sellCustomer.value,
    phone: sellPhone.value,
    product_name: sellProduct.value,
    quantity: Number(sellQty.value),
  };
  console.log("sale", sale);

  Swal.fire({
    icon: "success",
    title: "Done",
    text: "Sale form is valid",
  });

  resetForm();

  // function ke akhir me button wapis theek
  sellSaveBtn.innerHTML = "Save sale";
  sellSaveBtn.disabled = false;
};
