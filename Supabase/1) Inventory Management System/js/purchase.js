import supabase from "./credential.js";
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

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

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

// ================= Recent purchases =================
// purchases table se aakhri 10 purchases uthao aur table me dikhao
const getPurchases = async () => {
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    showError(error.message);
    return;
  }

  purchaseTableBody.innerHTML = "";

  if (data.length === 0) {
    purchaseTableBody.innerHTML = `<tr><td colspan="4">No purchases yet</td></tr>`;
    return;
  }

  data.forEach((purchase) => {
    purchaseTableBody.innerHTML += `
      <tr>
        <td>${purchase.product_name}</td>
        <td>${purchase.quantity}</td>
        <td>Rs ${purchase.price}</td>
        <td>Rs ${purchase.total}</td>
      </tr>
    `;
  });
};

// ================= Save purchase =================
purchaseSaveBtn.onclick = async () => {
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

  // click hote hi button ka text badlo aur disable kar do
  purchaseSaveBtn.innerHTML = "Saving...";
  purchaseSaveBtn.disabled = true;

  const productName = purchaseProduct.value.trim();
  const quantity = Number(purchaseQty.value);
  const price = Number(purchasePrice.value);
  const total = quantity * price;

  try {
    // 1) purchase likho
    const { error: purchaseError } = await supabase.from("purchases").insert({
      product_name: productName,
      quantity: quantity,
      price: price,
      total: total,
    });

    // Supabase apni errors throw nahi karta, { error } me deta hai. Is liye yahan khud check karo.
    if (purchaseError) {
      showError(purchaseError.message);
    } else {
      // 2) stock update karo: product pehle se hai to quantity jama karo, nahi hai to naya banao
      const { data: product, error: findError } = await supabase
        .from("products")
        .select("*")
        .eq("name", productName)
        .maybeSingle();

      if (findError) {
        showError(findError.message);
      } else if (product) {
        // purana product -> quantity barhao aur nayi price rakho
        const { error: updateError } = await supabase
          .from("products")
          .update({ quantity: product.quantity + quantity, price: price })
          .eq("id", product.id);

        if (updateError) {
          showError(updateError.message);
        }
      } else {
        // naya product -> stock me daalo
        const { error: insertError } = await supabase.from("products").insert({
          name: productName,
          quantity: quantity,
          price: price,
        });

        if (insertError) {
          showError(insertError.message);
        }
      }

      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Purchase saved and stock updated",
      });

      purchaseForm.reset();
      purchaseTotal.value = 0;
      getPurchases();
    }
  } catch (err) {
    // catch me sirf wo errors aati hain jo throw hon, jaise internet band ho
    console.log("catch error", err);
    showError(err.message);
  }

  // function ke akhir me button wapis theek
  purchaseSaveBtn.innerHTML = "Save purchase";
  purchaseSaveBtn.disabled = false;
};

// page khulte hi purani purchases dikhao
getPurchases();
