// ================= CART (Shared File) =================
// This file is used by index.html, details.html and cart.html
// The cart is saved in localStorage so it stays after page reload.

const CART_KEY = "watch-store-cart";

// Read the cart from localStorage
const getCart = () => {
  const savedCart = localStorage.getItem(CART_KEY);

  // First time there is nothing saved, so return an empty list
  if (!savedCart) {
    return [];
  }

  return JSON.parse(savedCart);
};

// Save the cart back to localStorage
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
};

// Add one product in the cart
const addToCart = (id, title, price, image) => {
  const cart = getCart();

  // Check the product is already in the cart or not
  const foundProduct = cart.find((item) => item.id === id);

  if (foundProduct) {
    // Already in cart, so only increase the quantity
    foundProduct.quantity = foundProduct.quantity + 1;
  } else {
    // New product, so push it in the cart
    cart.push({
      id: id,
      title: title,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  saveCart(cart);
  showMessage("Product added in your cart");
};

// Change quantity (+1 or -1). If quantity becomes 0, remove the product.
const changeQuantity = (id, change) => {
  const cart = getCart();
  const foundProduct = cart.find((item) => item.id === id);

  if (!foundProduct) {
    return;
  }

  foundProduct.quantity = foundProduct.quantity + change;

  if (foundProduct.quantity < 1) {
    removeFromCart(id);
    return;
  }

  saveCart(cart);
  showCart();
};

// Remove one product from the cart
const removeFromCart = (id) => {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== id);

  saveCart(newCart);
  showCart();
};

// Total items in the cart (2 watches + 3 watches = 5)
const getCartCount = () => {
  const cart = getCart();
  let count = 0;

  for (let i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }

  return count;
};

// Total price of the cart
const getCartTotal = () => {
  const cart = getCart();
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }

  return total;
};

// Show the number on the cart button in the header
const updateCartCount = () => {
  const countBox = document.querySelector(".cart-count");

  if (countBox) {
    countBox.innerText = getCartCount();
  }
};

// Small message on the top right side, made by SweetAlert
const showMessage = (text) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: text,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

// Run one time when the page opens
updateCartCount();
