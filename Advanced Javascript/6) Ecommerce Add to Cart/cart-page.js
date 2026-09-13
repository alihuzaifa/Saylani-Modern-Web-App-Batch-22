// ================= CART PAGE =================
// This file only shows the cart on the screen.
// All the cart logic is in cart.js

const cartContainer = document.querySelector(".cart-section");

const showCart = () => {
  const cart = getCart();

  // Cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Go back and add some watches in your cart.</p>
        <a href="index.html" class="btn">See Products</a>
      </div>`;

    return;
  }

  let rows = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    rows += `<div class="cart-item">
        <img src="${item.image}" alt="${item.title}" />

        <div class="cart-item-info">
          <h3>${item.title}</h3>
          <p class="price">$${item.price}</p>
        </div>

        <div class="qty-box">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>

        <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>

        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          Remove
        </button>
      </div>`;
  }

  cartContainer.innerHTML = `${rows}

      <div class="cart-summary">
        <p>Total Items: <strong>${getCartCount()}</strong></p>
        <p class="cart-total">Total: $${getCartTotal().toFixed(2)}</p>
        <button class="buy-btn">Checkout</button>
      </div>`;
};

showCart();
