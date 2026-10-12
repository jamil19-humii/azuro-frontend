import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { API_URL } from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      login(response.data);
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "60px 0", maxWidth: "400px" }}>
      <h1 style={{ marginBottom: "20px" }}>Sign in</h1>

      {error && (
        <p style={{ color: "#ea2b0f", marginBottom: "15px", fontSize: "14px" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: 600 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", height: "44px", padding: "0 12px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ height: "44px", background: "#000", color: "#fff", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
};

export default Login;