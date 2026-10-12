import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext";
import Button from "@mui/material/Button";
import { API_URL } from "../../config";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Product not found</h1>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <section className="homeProductsSec">
      <div className="container">
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "30px" }}>
          <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "4px" }} />
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <h1 style={{ marginBottom: "10px" }}>{product.name}</h1>
            <div className="priceBox" style={{ marginBottom: "20px" }}>
              {product.oldPrice && <span className="oldPrice">${product.oldPrice.toFixed(2)}</span>}
              <span className="newPrice" style={{ fontSize: "24px" }}>${product.price.toFixed(2)}</span>
            </div>
            <p style={{ marginBottom: "20px", color: "#555", lineHeight: "1.6" }}>
              This is a premium quality {product.name.toLowerCase()} perfect for any occasion.
              Crafted with care and designed for comfort. 100% satisfaction guaranteed.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
              <label style={{ fontWeight: "bold" }}>Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: "60px", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>

            <Button
              variant="contained"
              className="addToCartBtn"
              onClick={handleAddToCart}
              style={{ padding: "15px", fontSize: "16px" }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;