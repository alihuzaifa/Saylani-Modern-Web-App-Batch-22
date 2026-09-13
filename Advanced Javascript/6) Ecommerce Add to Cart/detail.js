const detailContainer = document.querySelector(".detail-section");
const cartCount = document.querySelector(".cart-count");

// Here we keep the product that came from the API
let product = null;

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
};

// This runs when we click the Add to Cart button
const addToCart = () => {
  const cart = getCart();

  // Is this product already in the cart?
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
    }
  }

  // New product, so we put it in the cart
  if (found === false) {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
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

const getProduct = async () => {
  const queryString = window.location.search;

  // 2. Parse the query string
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const data = await fetch(`https://dummyjson.com/products/${id}`);
  product = await data.json();

  detailContainer.innerHTML = `<section class="detail-page">
        <!-- Product Image -->
        <div class="detail-image">
          <img
            src="${product.images[0]}"
            alt="${product.title}"
          />
        </div>

        <!-- Product Information -->
        <div class="detail-info">
          <span class="category">${product.category}</span>

          <h2>${product.title}</h2>

          <div class="rating">
            ★★★★★
            <span>${product.rating} (${product.reviews.length} Reviews)</span>
          </div>

          <p class="detail-price">$${product.price}</p>

          <p class="detail-description">
            ${product.description}
          </p>

          <div class="features">
            <p>
              <strong>Brand:</strong>
              ${product.brand}
            </p>

            <p>
              <strong>Shipping Details:</strong>
              ${product.shippingInformation}
            </p>


            <p>
              <strong>Warranty:</strong>
              ${product.warrantyInformation}
            </p>
          </div>

          <button class="buy-btn" onclick="addToCart()">Add to Cart</button>
        </div>
      </section>`;
};

showCartCount();
getProduct();
