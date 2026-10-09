import { Link } from "react-router-dom";
import { useCart } from "../../CartContext";
import Button from "@mui/material/Button";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();

  const discountPercent = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="productItemWrapper">
      <div className="productCard">
        <Link to={`/product/${product._id}`}>
          <div className="imgWrapper">
            <img src={product.image} alt={product.name} className="primaryImg" />
            <img src={product.hoverImage} alt={product.name} className="secondaryImg" />

            <div className="badgeList">
              {discountPercent && <span className="discountBadge">{discountPercent}%</span>}
              {product.trending && <span className="trendingBadge">TRENDING</span>}
            </div>
          </div>
        </Link>

        <div className="info">
          <div className="rating">
            <FaStar className="starIcon" />
            <span>{product.rating}</span>
          </div>
          <h4 className="title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h4>
          <div className="priceBox">
            {product.oldPrice && <span className="oldPrice">${product.oldPrice.toFixed(2)}</span>}
            <span className="newPrice">${product.price.toFixed(2)}</span>
          </div>

          {showAddToCart && (
            <Button onClick={() => addToCart(product)} fullWidth className="addToCartBtn">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;