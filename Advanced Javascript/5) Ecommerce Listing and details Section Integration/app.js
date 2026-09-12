// Product Listing Should be Dynamic
// Product Detail Section Should be Dynamic

// We will do with the help of Async Await

const productContainer = document.querySelector(".products");

const getAllProducts = async () => {
  const data = await fetch("https://dummyjson.com/products");
  const convertData = await data.json();
  const allProducts = convertData.products;
  for (let i = 0; i < allProducts.length; i++) {
    const item = allProducts[i];
    
    productContainer.innerHTML += `<div class="product-card">
          <img
            src=${item.images[0]}
            alt=${item.title}
          />

          <div class="product-info">
            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <div class="price-row">
              <span class="price">$${item.price}</span>
            </div>
            <a href="details.html?id=${item.id}" class="btn"> View Details </a>
          </div>
        </div>`;
  }
};

getAllProducts();
