import { sellValidation } from "./validation.js";
import supabase from "./credential.js";
import Swal from "./alert.js";
import checkAuthentication from "./common.js";

checkAuthentication();

// ================= Get elements =================
const sellCustomer = document.getElementById("sellCustomer");
const sellProduct = document.getElementById("sellProduct");
const sellQty = document.getElementById("sellQty");
const sellPrice = document.getElementById("sellPrice");
const sellClearBtn = document.getElementById("sellClearBtn");
const sellTableBody = document.getElementById("sellTableBody");
const sellSaveBtn = document.getElementById("sellSaveBtn");

let allPurchases = [];
let allSales = [];
// edit mode me is me us sale ka object hota hai, warna null
let editingSale = null;

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

// ================= Reset =================
const resetForm = () => {
  sellCustomer.value = "";
  sellProduct.value = "";
  sellQty.value = "";
  sellPrice.value = "";
  editingSale = null;
  sellProduct.disabled = false;
  sellSaveBtn.innerHTML = "Save sale";
};

// stock ki halat badalne ke liye: purchase ki available_quantity set karo
const setAvailable = async (purchaseId, availableQuantity) => {
  return await supabase
    .from("purchases")
    .update({ available_quantity: availableQuantity })
    .eq("id", purchaseId);
};

// ================= Get all purchases (dropdown ke liye) =================
const getAllPurchases = async () => {
  try {
    const { data, error } = await supabase
      .from("purchases")
      .select()
      .order("product_name", { ascending: true });

    if (error) {
      showError(error.message);
      return;
    }

    allPurchases = data;
    sellProduct.innerHTML = `<option value="">Select product</option>`;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      sellProduct.innerHTML += `
        <option value="${element.id}">${element.product_name} ( ${element.available_quantity} )</option>
        `;
    }
  } catch (error) {
    showError(error.message);
  }
};

// ================= Get all sales =================
const getAllSales = async () => {
  try {
    const { data, error } = await supabase
      .from("sales")
      .select("*, purchases(product_name)")
      .order("created_at", { ascending: false });

    if (error) {
      showError(error.message);
      return;
    }

    allSales = data;
    sellTableBody.innerHTML = "";

    if (data.length === 0) {
      sellTableBody.innerHTML = `<tr><td colspan="6">No sales yet</td></tr>`;
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      sellTableBody.innerHTML += `
         <tr>
                <td>${element.customer_name}</td>
                <td>${element.purchases.product_name}</td>
                <td>${element.quantity}</td>
                <td>${element.price}</td>
                <td>${element.price * element.quantity}</td>
                <td class="action-btns">
                  <button class="btn-edit" onclick="editSale(${element.id})">Edit</button>
                  <button class="btn-delete" onclick="deleteSale(${element.id})">Delete</button>
                </td>
              </tr>
        `;
    }
  } catch (error) {
    showError(error.message);
  }
};

sellClearBtn.onclick = resetForm;

// ================= Save sale (add ya update) =================
sellSaveBtn.onclick = async () => {
  const buttonText = editingSale ? "Update sale" : "Save sale";

  sellSaveBtn.innerHTML = "Saving...";
  sellSaveBtn.disabled = true;

  const validateForm = sellValidation(
    sellCustomer.value,
    sellProduct.value,
    sellQty.value,
    sellPrice.value,
  );

  if (validateForm === false) {
    sellSaveBtn.innerHTML = buttonText;
    sellSaveBtn.disabled = false;
    return;
  }

  const sale = {
    customer_name: sellCustomer.value,
    purchase_id: Number(sellProduct.value),
    quantity: Number(sellQty.value),
    price: Number(sellPrice.value),
  };

  const findProduct = allPurchases.find((item) => {
    return item.id === sale.purchase_id;
  });

  // Edit me purani sale ka maal pehle stock me wapis gin lo, phir check karo
  const oldQty = editingSale ? editingSale.quantity : 0;
  const canSell = findProduct.available_quantity + oldQty;

  if (sale.quantity > canSell) {
    showError(`Only ${canSell} available in stock`);
    sellSaveBtn.innerHTML = buttonText;
    sellSaveBtn.disabled = false;
    return;
  }

  try {
    let result;

    if (editingSale) {
      result = await supabase.from("sales").update(sale).eq("id", editingSale.id);
    } else {
      result = await supabase.from("sales").insert(sale);
    }

    if (result.error) {
      showError(result.error.message);
    } else {
      // stock: jo pehle bika tha wo wapis, jo ab bika wo minus
      await setAvailable(sale.purchase_id, canSell - sale.quantity);

      Swal.fire({
        icon: "success",
        title: "Done",
        text: editingSale ? "Sale has been updated" : "Sale has been created",
      });
      resetForm();
      getAllPurchases();
      getAllSales();
    }
  } catch (error) {
    showError(error.message);
  }

  // function ke akhir me button wapis theek
  sellSaveBtn.innerHTML = editingSale ? "Update sale" : "Save sale";
  sellSaveBtn.disabled = false;
};

// ================= Edit =================
// type="module" wali file ke functions HTML ke onclick ko nazar nahi aate,
// is liye inhein window par rakhna parta hai
window.editSale = (id) => {
  const sale = allSales.find((item) => item.id === id);

  sellCustomer.value = sale.customer_name;
  sellProduct.value = sale.purchase_id;
  sellQty.value = sale.quantity;
  sellPrice.value = sale.price;

  // product badalne se do products ka stock badalna parta hai, simple rakhne ke liye
  // edit me product lock hai. Product ghalat ho to sale delete kar ke nayi banayein.
  sellProduct.disabled = true;

  editingSale = sale;
  sellSaveBtn.innerHTML = "Update sale";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ================= Delete =================
window.deleteSale = async (id) => {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Delete this sale?",
    text: "The quantity will go back to stock",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });

  if (!confirm.isConfirmed) {
    return;
  }

  const sale = allSales.find((item) => item.id === id);
  const product = allPurchases.find((item) => item.id === sale.purchase_id);

  try {
    const { error } = await supabase.from("sales").delete().eq("id", id);

    if (error) {
      showError(error.message);
      return;
    }

    // sale delete hui to us ka maal stock me wapis
    await setAvailable(product.id, product.available_quantity + sale.quantity);

    if (editingSale && editingSale.id === id) {
      resetForm();
    }

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Sale deleted",
    });
    getAllPurchases();
    getAllSales();
  } catch (error) {
    showError(error.message);
  }
};

getAllPurchases();
getAllSales();
