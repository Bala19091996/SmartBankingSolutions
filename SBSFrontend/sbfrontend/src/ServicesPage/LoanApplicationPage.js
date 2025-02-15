import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoanApplicationPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    loanAmount: "",
    interestRate: "",
    tenureInMonths: "",
    loanType: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const requestData = {
        userId: Number(formData.userId), // Ensure it's a number
        loanAmount: parseFloat(formData.loanAmount), // Convert to number
        interestRate: parseFloat(formData.interestRate), // Convert to double
        tenureInMonths: parseInt(formData.tenureInMonths, 10), // Convert to int
        loanType: formData.loanType,
      };

      const response = await axios.post("http://localhost:8080/api/loans/apply", requestData);
      setSuccess("Loan application submitted successfully!");
      console.log(response.data);
      navigate("/loanStatus");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Failed to apply for loan. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/AdminDashboard")} style={styles.navItemStyle}>
          Dashboard
        </div>
        <div onClick={() => navigate("/manageusers")} style={styles.navItemStyle}>
          Manage Users
        </div>
        <div onClick={() => navigate("/transactions")} style={styles.navItemStyle}>
          Transactions
        </div>
        <div onClick={() => navigate("/loanManagement")} style={styles.navItemStyle}>
          Loan Management
        </div>
        <div onClick={() => navigate("/clerkdashboard")} style={styles.navItemStyle}>
          Clerk Operations
        </div>
        <div onClick={() => navigate("/settings")} style={styles.navItemStyle}>
          Settings
        </div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>
          Logout
        </div>
      </div>
      <h1 style={styles.header}>Apply for a Loan</h1>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          required
          style={styles.input}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="loanAmount" // ✅ Corrected name
          placeholder="Loan Amount"
          required
          style={styles.input}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="interestRate"
          placeholder="Interest Rate (%)"
          required
          step="0.01"
          style={styles.input}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="tenureInMonths" // ✅ Corrected name
          placeholder="Tenure (in months)"
          required
          style={styles.input}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="loanType" // ✅ Corrected name
          placeholder="Loan Type"
          required
          style={styles.input}
          onChange={handleInputChange}
        />
        <button type="submit" style={styles.button}>Apply for Loan</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0056b3",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #555",
    fontSize: "1rem",
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
  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};

export default LoanApplicationPage;
