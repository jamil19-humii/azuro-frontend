import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false); // <-- new flag

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only redirect to cart if it's ACTUALLY empty AND we didn't just place an order
  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        product: item._id,
      }));

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems,
          shippingAddress: { fullName, address, city, phone },
          totalPrice: cartTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOrderPlaced(true); // <-- set BEFORE clearing cart
      clearCart();
      navigate("/account", { state: { orderPlaced: true, orderId: response.data._id } });
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong placing your order.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ...rest of the component (the return with the form) stays exactly the same

  return (
    <section className="checkoutSec">
      <div className="container">
        <h1 style={{ marginBottom: "30px" }}>Checkout</h1>

        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* Shipping Form */}
          <div style={{ flex: "2 1 500px" }}>
            <h3 style={{ marginBottom: "20px" }}>Shipping Details</h3>

            {error && (
              <p style={{ color: "#ea2b0f", marginBottom: "15px", fontSize: "14px" }}>{error}</p>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ height: "48px", background: "#000", color: "#fff", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer", marginTop: "10px" }}
              >
                {loading ? "Placing order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ flex: "1 1 300px" }}>
            <div className="cartSummary">
              <h4>Order Summary</h4>
              {cartItems.map((item) => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="totalRow">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;