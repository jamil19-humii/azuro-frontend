import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/contact`, {
        name,
        email,
        message,
      });
      setSuccess(res.data.message);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container contactSec">
      <h1>Contact us</h1>
      <p className="contactIntro">
        Have a question? Send us a message and we'll get back to you.
      </p>

      {success && <div className="contactSuccess">✅ {success}</div>}
      {error && <p className="contactError">{error}</p>}

      <form onSubmit={handleSubmit} className="contactForm">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="contactBtn">
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;