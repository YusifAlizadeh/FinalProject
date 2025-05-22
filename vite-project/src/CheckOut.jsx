"use client"

import { useSelector } from "react-redux"
import "./assets/Checkout.css"
import { FaCreditCard, FaMapMarkerAlt, FaCheckCircle, FaLock } from "react-icons/fa"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Checkout = () => {
  const items = useSelector((state) => state.cart)
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showCVV, setShowCVV] = useState(false)

  // Reset errors when form data changes
  useEffect(() => {
    if (submitted) validate()
  }, [formData, submitted])

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required"
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    // Validate expiry date
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format"
    } else {
      const [month, year] = formData.expiry.split("/").map(Number)

      // Check if month is valid (1-12)
      if (month < 1 || month > 12) {
        newErrors.expiry = "Month must be between 01 and 12"
      } else {
        const currentYear = new Date().getFullYear() % 100 // Get last 2 digits of year
        const currentMonth = new Date().getMonth() + 1 // Get current month (1-12)

        // Check if card is expired
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiry = "Card has expired"
        }
      }
    }

    // Validate CVV
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Special handling for different input types
    if (name === "cardNumber") {
      // Only allow digits and format with spaces
      const digits = value.replace(/\D/g, "").substring(0, 16)
      // Format with spaces every 4 digits
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ")
      setFormData({ ...formData, [name]: formatted })
    } else if (name === "expiry") {
      // Only allow digits and slash in MM/YY format
      const cleaned = value.replace(/[^\d/]/g, "")
      let formatted = cleaned

      // Auto-add slash after 2 digits if not already there
      if (cleaned.length === 2 && !cleaned.includes("/") && formData.expiry.length !== 3) {
        formatted = cleaned + "/"
      } else if (cleaned.length > 2 && !cleaned.includes("/")) {
        // Insert slash after first 2 digits
        formatted = cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
      }

      // Limit to MM/YY format (5 chars total)
      if (formatted.length <= 5) {
        setFormData({ ...formData, [name]: formatted })
      }
    } else if (name === "cvv") {
      // Only allow up to 3 digits
      const digits = value.replace(/\D/g, "").substring(0, 3)
      setFormData({ ...formData, [name]: digits })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    if (submitted) validate()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (validate()) {
      alert("Order confirmed!")
      // Here you can clear the cart and redirect
    }
  }

  // Format card number for display
  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  // Mask CVV for display
  const maskCVV = () => {
    return formData.cvv.replace(/./g, "•")
  }

  return (
    <motion.div
      className="checkout-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="checkout-title">
        <FaCreditCard /> Checkout
      </h1>

      <form className="checkout-form-all" onSubmit={handleSubmit}>
        <div className="checkout-section">
          <h2>
            <FaMapMarkerAlt /> Shipping Information
          </h2>
          <div className="checkout-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error-input" : ""}
            />
            {errors.address && <span className="error">{errors.address}</span>}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "error-input" : ""}
            />
            {errors.city && <span className="error">{errors.city}</span>}

            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              className={errors.zip ? "error-input" : ""}
            />
            {errors.zip && <span className="error">{errors.zip}</span>}

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "error-input" : ""}
            />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
        </div>

        <div className="checkout-section">
          <h2>
            <FaCreditCard /> Payment Details
          </h2>
          <div className="checkout-form">
            <input
              type="text"
              name="cardName"
              placeholder="Cardholder Name"
              value={formData.cardName}
              onChange={handleChange}
              className={errors.cardName ? "error-input" : ""}
            />
            {errors.cardName && <span className="error">{errors.cardName}</span>}

            <div className="card-input-container">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? "error-input" : ""}
                autoComplete="cc-number"
              />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>

            <div className="card-details-row">
              <div className="card-expiry-container">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  className={errors.expiry ? "error-input" : ""}
                  autoComplete="cc-exp"
                />
                {errors.expiry && <span className="error">{errors.expiry}</span>}
              </div>

              <div className="card-cvv-container">
                <div className="cvv-input-wrapper">
                  <input
                    type={showCVV ? "text" : "password"}
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={errors.cvv ? "error-input" : ""}
                    autoComplete="cc-csc"
                  />
                  <button type="button" className="toggle-cvv-btn" onClick={() => setShowCVV(!showCVV)}>
                    <FaLock />
                  </button>
                </div>
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Total: ${total.toFixed(2)}</h3>
          <motion.button
            className="checkout-confirm-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            <FaCheckCircle /> Confirm Order
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default Checkout
