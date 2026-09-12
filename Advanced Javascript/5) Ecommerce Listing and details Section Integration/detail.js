const detailContainer = document.querySelector(".detail-section");

const getProduct = async () => {
  const queryString = window.location.search;

  // 2. Parse the query string
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const data = await fetch(`https://dummyjson.com/products/${id}`);
  const item = await data.json();

  detailContainer.innerHTML = `<section class="detail-page">
        <!-- Product Image -->
        <div class="detail-image">
          <img
            src=${item.images[0]}
            alt=${item.title}
          />
        </div>

        <!-- Product Information -->
        <div class="detail-info">
          <span class="category">${item.category}</span>

          <h2>${item.title}</h2>

          <div class="rating">
            ★★★★★
            <span>${item.rating} (${item.reviews.length} Reviews)</span>
          </div>

          <p class="detail-price">$${item.price}</p>

          <p class="detail-description">
            ${item.description}
          </p>

          <div class="features">
            <p>
              <strong>Brand:</strong>
              ${item.brand}
            </p>

            <p>
              <strong>Shipping Details:</strong>
              ${item.shippingInformation}
            </p>


            <p>
              <strong>Warranty:</strong>
              ${item.warrantyInformation}
            </p>
          </div>

          <button class="buy-btn">Add to Cart</button>
        </div>
      </section>`;
};

getProduct();
