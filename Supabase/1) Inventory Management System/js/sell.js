import supabase from "./credential.js";
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

const showError = (text) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

// ================= Clear =================
sellClearBtn.onclick = () => {
  sellForm.reset();
};

// ================= Products dropdown =================
// products table se sab products uthao aur dropdown me daalo
const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    showError(error.message);
    return;
  }

  sellProduct.innerHTML = `<option value="">Select product</option>`;

  // for loop se har product ka ek option banao
  for (let i = 0; i < data.length; i++) {
    const product = data[i];

    // option ke text me quantity bhi dikhao, taake pata ho kitna bacha hai
    sellProduct.innerHTML += `
      <option value="${product.name}">${product.name} (${product.quantity} in stock)</option>
    `;
  }
};

// ================= Recent sales =================
const getSales = async () => {
  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    showError(error.message);
    return;
  }

  sellTableBody.innerHTML = "";

  if (data.length === 0) {
    sellTableBody.innerHTML = `<tr><td colspan="4">No sales yet</td></tr>`;
    return;
  }

  // for loop se har sale ki ek row banao
  for (let i = 0; i < data.length; i++) {
    const sale = data[i];

    sellTableBody.innerHTML += `
      <tr>
        <td>${sale.customer_name}</td>
        <td>${sale.phone}</td>
        <td>${sale.product_name}</td>
        <td>${sale.quantity}</td>
      </tr>
    `;
  }
};

// ================= Save sale =================
sellSaveBtn.onclick = async () => {
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

  // click hote hi button ka text badlo aur disable kar do
  sellSaveBtn.innerHTML = "Saving...";
  sellSaveBtn.disabled = true;

  const productName = sellProduct.value;
  const quantity = Number(sellQty.value);

  try {
    // 1) stock check karo: product hai bhi? aur itna bacha hai?
    const { data: product, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("name", productName)
      .maybeSingle();

    if (findError) {
      showError(findError.message);
    } else if (!product) {
      showError("This product is not in stock");
    } else if (product.quantity < quantity) {
      showError(`Only ${product.quantity} left in stock`);
    } else {
      // 2) sale likho
      const { error: saleError } = await supabase.from("sales").insert({
        customer_name: sellCustomer.value.trim(),
        phone: sellPhone.value.trim(),
        product_name: productName,
        quantity: quantity,
      });

      if (saleError) {
        showError(saleError.message);
      } else {
        // 3) stock se quantity kam karo
        const { error: updateError } = await supabase
          .from("products")
          .update({ quantity: product.quantity - quantity })
          .eq("id", product.id);

        if (updateError) {
          showError(updateError.message);
        }

        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Sale saved and stock updated",
        });

        sellForm.reset();
        getProducts();
        getSales();
      }
    }
  } catch (err) {
    // catch me sirf wo errors aati hain jo throw hon, jaise internet band ho
    console.log("catch error", err);
    showError(err.message);
  }

  // function ke akhir me button wapis theek
  sellSaveBtn.innerHTML = "Save sale";
  sellSaveBtn.disabled = false;
};

// page khulte hi dropdown aur purani sales bhar do
getProducts();
getSales();
