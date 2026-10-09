import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import Button from "@mui/material/Button";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <section className="cartPage">
        <div className="container text-center">
          <h1 style={{ marginBottom: "20px" }}>Your Cart is Empty</h1>
          <Link to="/shop">
            <Button variant="contained" className="addToCartBtn" style={{ padding: "10px 30px" }}>
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cartPage">
      <div className="container">
        <h1 style={{ marginBottom: "30px" }}>Shopping Cart</h1>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 600px" }}>
            <table className="cartTable">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="cartProduct">
                        <img src={item.image} alt={item.name} />
                        <h5>{item.name}</h5>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="qtyBox">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td><strong>${(item.price * item.quantity).toFixed(2)}</strong></td>
                    <td>
                      <button className="removeBtn" onClick={() => removeFromCart(item._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <div className="cartSummary">
              <h4>Order Summary</h4>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#888" }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="totalRow">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button
                variant="contained"
                fullWidth
                className="addToCartBtn"
                style={{ marginTop: "20px", padding: "15px" }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;