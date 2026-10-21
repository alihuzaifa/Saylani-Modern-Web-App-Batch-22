import { productValidation } from "./validation.js";
import supabase from "./credential.js";
import Swal from "./alert.js";
import checkAuthentication from "./common.js";
// Sidebar navigation is in common.js
checkAuthentication();

// ================= Get elements =================
const purchaseProduct = document.getElementById("purchaseProduct");
const purchaseQty = document.getElementById("purchaseQty");
const purchasePrice = document.getElementById("purchasePrice");
const purchaseTotal = document.getElementById("purchaseTotal");
const purchaseClearBtn = document.getElementById("purchaseClearBtn");
const purchaseSaveBtn = document.getElementById("purchaseSaveBtn");
const purchaseTableBody = document.getElementById("purchaseTableBody");

let allPurchases = [];
// edit mode me is me us purchase ka object hota hai, warna null
let editingPurchase = null;

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

const totalPrice = () => purchaseQty.value * purchasePrice.value;

purchasePrice.oninput = () => {
  purchaseTotal.value = totalPrice();
};

purchaseQty.oninput = () => {
  purchaseTotal.value = totalPrice();
};

// ================= Reset =================
// har field ki value khali, total 0, aur edit mode khatam
const resetForm = () => {
  purchaseProduct.value = "";
  purchaseQty.value = "";
  purchasePrice.value = "";
  purchaseTotal.value = 0;
  editingPurchase = null;
  purchaseSaveBtn.innerHTML = "Save purchase";
};

// ================= Get all purchases =================
const getAllPurchases = async () => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      showError(error.message);
      return;
    }

    allPurchases = data;
    purchaseTableBody.innerHTML = "";

    if (data.length === 0) {
      purchaseTableBody.innerHTML = `<tr><td colspan="6">No purchases yet</td></tr>`;
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      purchaseTableBody.innerHTML += `<tr>
                <td>${element.product_name}</td>
                <td>${element.quantity}</td>
                <td>${element.available_quantity}</td>
                <td>${element.price}</td>
                <td>${element.price * element.quantity}</td>
                <td class="action-btns">
                  <button class="btn-edit" onclick="editPurchase(${element.id})">Edit</button>
                  <button class="btn-delete" onclick="deletePurchase(${element.id})">Delete</button>
                </td>
              </tr>`;
    }
  } catch (error) {
    showError(error.message);
  }
};

purchaseClearBtn.onclick = resetForm;

// ================= Save purchase (add ya update) =================
purchaseSaveBtn.onclick = async () => {
  const buttonText = editingPurchase ? "Update purchase" : "Save purchase";

  // click hote hi button ka text badlo aur disable kar do
  purchaseSaveBtn.innerHTML = "Saving...";
  purchaseSaveBtn.disabled = true;

  const validateForm = productValidation(
    purchaseProduct.value,
    purchaseQty.value,
    purchasePrice.value,
  );

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    purchaseSaveBtn.innerHTML = buttonText;
    purchaseSaveBtn.disabled = false;
    return;
  }

  const quantity = Number(purchaseQty.value);

  try {
    let result;

    if (editingPurchase) {
      // Edit: jitna maal bik chuka hai (quantity - available_quantity) wo wapis nahi aata.
      // Is liye nayi available = nayi quantity - bika hua maal
      const soldQty = editingPurchase.quantity - editingPurchase.available_quantity;

      if (quantity < soldQty) {
        showError(`${soldQty} already sold, quantity cannot be less than that`);
        purchaseSaveBtn.innerHTML = buttonText;
        purchaseSaveBtn.disabled = false;
        return;
      }

      result = await supabase
        .from("purchases")
        .update({
          product_name: purchaseProduct.value,
          quantity: quantity,
          available_quantity: quantity - soldQty,
          price: Number(purchasePrice.value),
        })
        .eq("id", editingPurchase.id);
    } else {
      // Add: naya maal aaya hai, sab ka sab available hai
      result = await supabase.from("purchases").insert({
        product_name: purchaseProduct.value,
        quantity: quantity,
        available_quantity: quantity,
        price: Number(purchasePrice.value),
      });
    }

    if (result.error) {
      showError(result.error.message);
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: editingPurchase ? "Purchase updated successfully" : "Purchase saved successfully",
      });
      resetForm();
      getAllPurchases();
    }
  } catch (error) {
    showError(error.message);
  }

  // function ke akhir me button wapis theek
  purchaseSaveBtn.innerHTML = editingPurchase ? "Update purchase" : "Save purchase";
  purchaseSaveBtn.disabled = false;
};

// ================= Edit =================
// type="module" wali file ke functions HTML ke onclick ko nazar nahi aate,
// is liye inhein window par rakhna parta hai
window.editPurchase = (id) => {
  const purchase = allPurchases.find((item) => item.id === id);

  // form me purani values bhar do
  purchaseProduct.value = purchase.product_name;
  purchaseQty.value = purchase.quantity;
  purchasePrice.value = purchase.price;
  purchaseTotal.value = totalPrice();

  editingPurchase = purchase;
  purchaseSaveBtn.innerHTML = "Update purchase";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ================= Delete =================
window.deletePurchase = async (id) => {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Delete this purchase?",
    text: "This cannot be undone",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });

  if (!confirm.isConfirmed) {
    return;
  }

  try {
    const { error } = await supabase.from("purchases").delete().eq("id", id);

    if (error) {
      // sales table purchases ko refer karti hai (purchase_id), is liye
      // jis product ki sale ho chuki ho wo delete nahi hota. Error code 23503 = foreign key
      if (error.code === "23503") {
        showError("This product has sales. Delete its sales first.");
      } else {
        showError(error.message);
      }
      return;
    }

    // jis purchase ko edit kar rahe the wohi delete ho gaya to form khali kar do
    if (editingPurchase && editingPurchase.id === id) {
      resetForm();
    }

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Purchase deleted",
    });
    getAllPurchases();
  } catch (error) {
    showError(error.message);
  }
};

getAllPurchases();
