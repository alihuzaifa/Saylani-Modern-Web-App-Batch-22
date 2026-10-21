import supabase from "./credential.js";
import Swal from "./alert.js";
import checkAuthentication from "./common.js";

checkAuthentication();

// ================= Get elements =================
const totalProducts = document.getElementById("totalProducts");
const lowStockCount = document.getElementById("lowStockCount");
const monthPurchases = document.getElementById("monthPurchases");
const monthSales = document.getElementById("monthSales");
const activityTableBody = document.getElementById("activityTableBody");

// itna ya is se kam stock ho to "low stock"
const LOW_STOCK = 5;

// 184500 -> "Rs 184,500"
const rupees = (amount) => `Rs ${amount.toLocaleString()}`;

// "2026-10-02T..." -> "02 Oct"
const shortDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

// is mahine ki pehli tareekh
const monthStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

// ================= Cards =================
const loadCards = async (purchases, sales) => {
  totalProducts.innerHTML = purchases.length;

  const lowStock = purchases.filter((item) => item.available_quantity <= LOW_STOCK);
  lowStockCount.innerHTML = lowStock.length;

  // sirf is mahine ki purchases aur sales ka total (quantity x price)
  let purchaseTotal = 0;
  for (let i = 0; i < purchases.length; i++) {
    if (new Date(purchases[i].created_at) >= monthStart()) {
      purchaseTotal += purchases[i].quantity * purchases[i].price;
    }
  }

  let saleTotal = 0;
  for (let i = 0; i < sales.length; i++) {
    if (new Date(sales[i].created_at) >= monthStart()) {
      saleTotal += sales[i].quantity * sales[i].price;
    }
  }

  monthPurchases.innerHTML = rupees(purchaseTotal);
  monthSales.innerHTML = rupees(saleTotal);
};

// ================= Recent activity =================
// purchases aur sales ko ek list me mila kar date ke hisaab se, sab se nayi upar
const loadActivity = (purchases, sales) => {
  const activity = [];

  for (let i = 0; i < purchases.length; i++) {
    activity.push({
      date: purchases[i].created_at,
      type: "Purchase",
      product: purchases[i].product_name,
      quantity: purchases[i].quantity,
      amount: purchases[i].quantity * purchases[i].price,
    });
  }

  for (let i = 0; i < sales.length; i++) {
    activity.push({
      date: sales[i].created_at,
      type: "Sell",
      product: sales[i].purchases.product_name,
      quantity: sales[i].quantity,
      amount: sales[i].quantity * sales[i].price,
    });
  }

  activity.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recent = activity.slice(0, 8);

  if (recent.length === 0) {
    activityTableBody.innerHTML = `<tr><td colspan="5">No activity yet</td></tr>`;
    return;
  }

  activityTableBody.innerHTML = "";
  for (let i = 0; i < recent.length; i++) {
    const item = recent[i];
    const tagClass = item.type === "Sell" ? "tag-sell" : "tag-buy";
    activityTableBody.innerHTML += `
      <tr>
        <td>${shortDate(item.date)}</td>
        <td><span class="tag ${tagClass}">${item.type}</span></td>
        <td>${item.product}</td>
        <td>${item.quantity}</td>
        <td>${rupees(item.amount)}</td>
      </tr>
    `;
  }
};

// ================= Load dashboard =================
const loadDashboard = async () => {
  try {
    // dono API calls ek saath chalao, ek ke khatam hone ka intezar na karo
    const [purchaseResult, saleResult] = await Promise.all([
      supabase.from("purchases").select(),
      supabase.from("sales").select("*, purchases(product_name)"),
    ]);

    const error = purchaseResult.error || saleResult.error;
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return;
    }

    loadCards(purchaseResult.data, saleResult.data);
    loadActivity(purchaseResult.data, saleResult.data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

loadDashboard();
