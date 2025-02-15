import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthenticatedUser } from "../utils/Auth";

const FundTransfer = () => {
  const navigate = useNavigate();
  const [senderAccount, setSenderAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [note, setNote] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getAuthenticatedUser();
    if (storedUser && storedUser.userId) {
      localStorage.setItem("userId", storedUser.userId);
      setUser(storedUser);
    } else {
      navigate("/RegistrationPage");
    }
  }, [navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!senderAccount || !recipientAccount || !transferAmount || transferAmount <= 0) {
      setTransferStatus("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/transactions/transfer", {
        senderAccount,
        recipientAccount,
        amount: parseFloat(transferAmount),
        note,
      });

      setTransferStatus(response.data);
      setSenderAccount("");
      setRecipientAccount("");
      setTransferAmount("");
      setNote("");
    } catch (error) {
      setTransferStatus(error.response?.data || "Transfer failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItem}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItem}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItem}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItem}>Support</div>
        <div onClick={handleLogout} style={styles.navItem}>Logout</div>
      </div>

      {/* Header */}
      <h1 style={styles.header}>Welcome, {user?.userName || "User"}</h1>
      <h1 style={styles.header}>Fund Transfer</h1>

      {/* Form */}
      <div style={styles.formContainer}>
        <form onSubmit={handleTransfer} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sender Account</label>
            <input
              type="text"
              value={senderAccount}
              onChange={(e) => setSenderAccount(e.target.value)}
              placeholder="Enter your account number"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Recipient Account</label>
            <input
              type="text"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              placeholder="Enter recipient's account number"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount to transfer"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Note (Optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter a note for the transaction"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Transfer Funds</button>
        </form>

        {/* Transfer Status */}
        {transferStatus && <p style={styles.status}>{transferStatus}</p>}
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Styles
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
  navMenu: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    padding: "1rem",
    backgroundColor: "#0056b3",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  navItem: {
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background 0.3s",
  },
  navItemHover: {
    background: "#004494",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "rgba(255, 255, 255, 0.75)",
  },
  formContainer: {
    maxWidth: "500px",
    margin: "auto",
    padding: "2rem",
    backgroundColor: "rgba(29, 29, 29, 0.63)",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #666",
    outline: "none",
    transition: "border-color 0.3s",
    backgroundColor: "#222",
    color: "#fff",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  status: {
    marginTop: "1rem",
    fontSize: "1rem",
    textAlign: "center",
    color: "#28a745",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default FundTransfer;
