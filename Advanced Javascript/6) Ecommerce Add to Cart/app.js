// Product Listing Should be Dynamic
// Every card has an "Add to Cart" button

const productContainer = document.querySelector(".products");
const cartCount = document.querySelector(".cart-count");

// Here we keep the products that came from the API
let allProducts = [];

// Get the cart from localStorage
const getCart = () => {
  const savedCart = localStorage.getItem("cart");

  // First time there is nothing saved, so we send an empty list
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
};

// This runs when we click the Add to Cart button
const addToCart = (id) => {
  const cart = getCart();

  // Is this product already in the cart?
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
    }
  }

  // New product, so we put it in the cart
  if (found === false) {
    for (let i = 0; i < allProducts.length; i++) {
      const item = allProducts[i];

      if (item.id === id) {
        cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.images[0],
          quantity: 1,
        });
      }
    }
  }

  saveCart(cart);

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Product added in your cart",
    showConfirmButton: false,
    timer: 2000,
  });
};

const getAllProducts = async () => {
  const data = await fetch("https://dummyjson.com/products");
  const convertData = await data.json();
  allProducts = convertData.products;

  for (let i = 0; i < allProducts.length; i++) {
    const item = allProducts[i];

    productContainer.innerHTML += `<div class="product-card">
          <img
            src="${item.images[0]}"
            alt="${item.title}"
          />

          <div class="product-info">
            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <div class="price-row">
              <span class="price">$${item.price}</span>
            </div>

            <a href="details.html?id=${item.id}" class="btn"> View Details </a>

            <button class="cart-btn" onclick="addToCart(${item.id})">
              Add to Cart
            </button>
          </div>
        </div>`;
  }
};

showCartCount();
getAllProducts();
