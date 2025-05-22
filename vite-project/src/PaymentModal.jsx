import "./assets/PaymentModal.css";
import { useState , useEffect} from "react";

export default function CardPaymentForm() {
  
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      setForm({ ...form, [name]: cleaned });
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 3);
      setForm({ ...form, [name]: cleaned });
    } else if (name === "expiry") {
      let cleaned = value.replace(/\D/g, "").slice(0, 4);
      if (cleaned.length > 2) {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
      setForm({ ...form, [name]: cleaned });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Yes ✅");
  };

  return (
    <div className="payment-wrapper">
      <div className="card-payment-form">
        <h2>💳 Payment </h2>

        <form onSubmit={handleSubmit}>
          <label>Card Owner</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
            value={form.cardNumber}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <div>
              <label>Expired date</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="***"
                value={form.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
  );
}
