const cartContainer = document.querySelector(".cart-section");
const cartCount = document.querySelector(".cart-count");

// Get the cart from localStorage
const getCart = () => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];
};

// Show the total items on the cart button
const showCartCount = () => {
  const cart = getCart();
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity;
  }

  cartCount.innerText = total;
};

// Save the cart in localStorage
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  showCartCount();
  showCart();
};

// Plus and minus buttons
const changeQuantity = (id, change) => {
  const cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = cart[i].quantity + change;

      // Quantity is 0, so we remove the product
      if (cart[i].quantity < 1) {
        cart.splice(i, 1);
      }
    }
  }

  saveCart(cart);
};

// Remove button
const removeFromCart = (id) => {
  const cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart.splice(i, 1);
    }
  }

  saveCart(cart);
};

// Show the cart on the screen
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
  let total = 0;
  let items = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    total = total + item.price * item.quantity;
    items = items + item.quantity;

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
        <p>Total Items: <strong>${items}</strong></p>
        <p class="cart-total">Total: $${total.toFixed(2)}</p>
        <button class="buy-btn">Checkout</button>
      </div>`;
};

showCartCount();
showCart();
