import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../CartContext";
import { useAuth } from "../../AuthContext";
import { API_URL } from "../../config";

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
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("new");

  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/addresses`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSavedAddresses(res.data);

        if (res.data.length > 0) {
          const first = res.data[0];
          setSelectedAddressId(first._id);
          setFullName(first.fullName);
          setAddress(first.address);
          setCity(first.city);
          setPhone(first.phone);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };

    fetchAddresses();
  }, [user]);

  const handleSelectSaved = (addr) => {
    setSelectedAddressId(addr._id);
    setFullName(addr.fullName);
    setAddress(addr.address);
    setCity(addr.city);
    setPhone(addr.phone);
  };

  const handleUseNew = () => {
    setSelectedAddressId("new");
    setFullName("");
    setAddress("");
    setCity("");
    setPhone("");
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
        `${API_URL}/api/orders`,
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

      setOrderPlaced(true);
      clearCart();
      navigate("/account/orders", { state: { orderPlaced: true, orderId: response.data._id } });
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong placing your order.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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

            {savedAddresses.length > 0 && (
              <div className="checkoutAddressPicker">
                {savedAddresses.map((addr) => (
                 <label className={`checkoutAddressOption ${selectedAddressId === "new" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={selectedAddressId === addr._id}
                      onChange={() => handleSelectSaved(addr)}
                    />
                    <span>
                      <strong>{addr.label}</strong> · {addr.fullName}, {addr.address}, {addr.city}
                    </span>
                  </label>
                ))}
                <label className="checkoutAddressOption">
                  <input
                    type="radio"
                    name="savedAddress"
                    checked={selectedAddressId === "new"}
                    onChange={handleUseNew}
                  />
                  <span><b><strong>Use a new address</strong></b></span>
                </label>
              </div>
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

              <button type="submit" disabled={loading} className="placeOrderBtn">
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