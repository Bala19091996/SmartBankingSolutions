import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthenticatedUser } from "../utils/Auth";

const TransactionsHistory = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUser = getAuthenticatedUser();
  const userId = storedUser?.userId;
  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = getAuthenticatedUser();
      if (storedUser && storedUser.userId) {
        localStorage.setItem('userId', storedUser.userId);
        setUser(storedUser);
      } else {
        navigate("/RegistrationPage");
      }
    }, [navigate]);

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transactions/transactionHistory/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={(handleLogout)} style={styles.navItemStyle}>Logout</div>
      </div>

      {/* Header */}
      <h1 style={styles.header}>Welcome, {user?.userName || "User"}</h1>
      <h1 style={styles.header}>Transaction History</h1>
      <h2 style={styles.subHeader}>Your recent transactions</h2>

      {/* Transactions Table */}
      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Transaction ID</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Amount</th>
              <th style={styles.tableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td style={styles.tableCell}>{transaction.transactionId}</td>
                <td style={styles.tableCell}>{transaction.transactionType}</td>
                <td style={styles.tableCell}>{transaction.amount}</td>
                <td style={styles.tableCell}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
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
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "rgba(255, 255, 255, 0.75)",
  },
  subHeader: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "2rem",
    border: "1px solid #ddd",
    backgroundColor: "rgba(29, 29, 29, 0.63)",
  },
  tableHeaderCell: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    border: "1px solid #ddd",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  tableCell: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    textAlign: "center",
    color: "white",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default TransactionsHistory;