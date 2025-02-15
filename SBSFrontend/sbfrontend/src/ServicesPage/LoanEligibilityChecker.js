import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoanEligibilityChecker = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("7.0"); // Default interest rate
  const [tenure, setTenure] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [emiResult, setEmiResult] = useState(null);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const checkEligibility = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/loans/checkEligibility", {
        params: { userId, loanAmount },
      });
      setEligibilityResult(response.data);
    } catch (err) {
      setError("Failed to check eligibility.");
    }
  };

  const calculateEMI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/loans/calculateEMI", {
        params: { loanAmount, interestRate, tenure },
      });
      setEmiResult(response.data);
    } catch (err) {
      setError("Failed to calculate EMI.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <div style={styles.container}>
        <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={handleLogout} style={styles.navItemStyle}>Logout</div>
      </div>
      <h2 style={styles.header}>Loan Eligibility & EMI Calculator</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.formGroup}>
        <label style={styles.label}>Loan Amount ($):</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Tenure (Months):</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={checkEligibility} style={styles.button}>
        Check Eligibility
      </button>

      <button onClick={calculateEMI} style={styles.button}>
        Calculate EMI
      </button>

      {eligibilityResult && (
        <p style={styles.result}>
          {eligibilityResult.isEligible ? "✅ Eligible for Loan" : "❌ Not Eligible for Loan"}
        </p>
      )}

      {emiResult && (
        <p style={styles.result}>
          Estimated Monthly EMI: <strong>${emiResult.monthlyEMI.toFixed(2)}</strong>
        </p>
      )}
    </div>
  );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem",
        backgroundColor: "rgba(25, 25, 25, 0.81)",
        minHeight: "100vh",
        color: "rgba(255, 255, 255, 0.86)",
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
  header: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0.5rem",
  },
  result: {
    fontSize: "1.2rem",
    marginTop: "1rem",
  },
  error: {
    color: "#ff4d4d",
  },
};

export default LoanEligibilityChecker;
