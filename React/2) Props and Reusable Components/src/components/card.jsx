import "../styles/card.css";
const Card = ({ discount, image, name, category, reviewCount, price }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="discount">{discount}</span>
        <button className="wishlist">♡</button>

        <img
          src={image}
          alt="Nike Red Sneakers"
        />
      </div>

      <div className="product-info">
        <p className="category">{category}</p>

        <h2>{name}</h2>

        <div className="rating">
          ★★★★★ <span>({reviewCount} Reviews)</span>
        </div>

        <div className="price">
          <span className="new-price">${price}</span>
        </div>

        <button className="cart-btn">🛒 Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
