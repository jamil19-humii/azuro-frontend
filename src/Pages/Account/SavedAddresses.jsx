import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const API = "http://localhost:5000/api/users/addresses";

const SavedAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [label, setLabel] = useState("Home");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(API, config);
        setAddresses(res.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(API, { label, fullName, address, city, phone }, config);
      setAddresses(res.data);
      setShowForm(false);
      setLabel("Home");
      setFullName("");
      setAddress("");
      setCity("");
      setPhone("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save address.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/${id}`, config);
      setAddresses(res.data);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  if (loading) return <p className="accountEmptyState">Loading addresses...</p>;

  return (
    <div>
      <h3>Saved Addresses</h3>

      {addresses.length === 0 && !showForm && (
        <p className="accountEmptyState">No addresses saved yet.</p>
      )}

      <div className="addressList">
        {addresses.map((addr) => (
          <div key={addr._id} className="addressCard">
            <div>
              <p className="addressLabel">{addr.label}</p>
              <p>{addr.fullName}</p>
              <p>{addr.address}, {addr.city}</p>
              <p>{addr.phone}</p>
            </div>
            <button className="addressDeleteBtn" onClick={() => handleDelete(addr._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="addressForm">
          {error && <p className="addressError">{error}</p>}
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label (Home, Work...)" />
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" required />
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
          <div className="addressFormButtons">
            <button type="submit" className="addressSaveBtn">Save address</button>
            <button type="button" className="accountLinkBtn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="accountLinkBtn" onClick={() => setShowForm(true)}>
          + Add an address
        </button>
      )}
    </div>
  );
};

export default SavedAddresses;