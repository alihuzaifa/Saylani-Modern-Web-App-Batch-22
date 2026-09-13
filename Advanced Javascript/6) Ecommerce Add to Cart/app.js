// Product Listing Should be Dynamic
// Every card has an "Add to Cart" button

const productContainer = document.querySelector(".products");

// We keep the products here so the Add to Cart button can find them again
let allProducts = [];

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

            <button class="cart-btn" data-id="${item.id}">Add to Cart</button>
          </div>
        </div>`;
  }
};

// The buttons are made by innerHTML, so we listen on the container.
// This is called event delegation.
productContainer.addEventListener("click", (event) => {
  const button = event.target;

  // We only care about the Add to Cart buttons
  if (!button.classList.contains("cart-btn")) {
    return;
  }

  const id = Number(button.dataset.id);
  const item = allProducts.find((product) => product.id === id);

  addToCart(item.id, item.title, item.price, item.images[0]);
});

getAllProducts();
