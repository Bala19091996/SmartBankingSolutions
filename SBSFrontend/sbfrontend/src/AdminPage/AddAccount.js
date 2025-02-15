import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    userEmail: "",
    userPhoneNo: "",
    userAdharNo: "",
    userPanNo: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handles input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/accounts/add", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });

      if (response.status === 201) {
        setSuccessMessage("Account successfully created!");
        setFormData({
          userName: "",
          password: "",
          userEmail: "",
          userPhoneNo: "",
          userAdharNo: "",
          userPanNo: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
        });
      }
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/AdminDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/manageusers")} style={styles.navItemStyle}>Manage Users</div>
        <div onClick={() => navigate("/transactions")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/loanManagement")} style={styles.navItemStyle}>Loan Management</div>
        <div onClick={() => navigate("/clerkdashboard")} style={styles.navItemStyle}>Clerk Operations</div>
        <div onClick={() => navigate("/settings")} style={styles.navItemStyle}>Settings</div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>Logout</div>
      </div>

      <h1 style={styles.header}>Add New Account</h1>

      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>User Name</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>Phone (10 digits)</label>
          <input type="text" name="userPhoneNo" value={formData.userPhoneNo} onChange={handleChange} pattern="^[0-9]{10}$" required />
        </div>

        <div style={styles.formGroup}>
          <label>Aadhaar No.</label>
          <input type="text" name="userAdharNo" value={formData.userAdharNo} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>PAN No.</label>
          <input type="text" name="userPanNo" value={formData.userPanNo} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>Street</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label>Zip Code</label>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
        </div>

        <button type="submit" style={styles.button}>Create Account</button>
      </form>
    </div>
  );
}

// Styles
const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem",
        maxWidth: "1200px",
        margin: "auto",
      },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#0056b3",
  },
  navMenuStyle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#0056b3",
    color: "#fff",
    borderRadius: "8px",
  },
  navItemStyle: {
    margin: "0 1rem",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    display: "grid",
    gap: "15px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
};

export default AddAccount;
