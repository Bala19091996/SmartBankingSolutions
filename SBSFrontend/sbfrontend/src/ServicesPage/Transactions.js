import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/transactions/${transactionId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setTransactions(transactions.map(tx => tx.transactionId === transactionId ? { ...tx, status: "APPROVED" } : tx));
    } catch (err) {
      alert("Failed to approve transaction");
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/transactions/${transactionId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setTransactions(transactions.map(tx => tx.transactionId === transactionId ? { ...tx, status: "REJECTED" } : tx));
    } catch (err) {
      alert("Failed to reject transaction");
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/AdminDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/manageusers")} style={styles.navItemStyle}>Manage Users</div>
        <div onClick={() => navigate("/transactions")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/loanManagement")} style={styles.navItemStyle}>Loan Management</div>
        <div onClick={() => navigate("/clerkdashboard")} style={styles.navItemStyle}>Clerk Operations</div>
        <div onClick={() => navigate("/settings")} style={styles.navItemStyle}>Settings</div>
        <div onClick={() => navigate("/logout")} style={styles.navItemStyle}>Logout</div>
      </div>

      <h1 style={styles.header}>Transaction Management</h1>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Transaction ID</th>
              <th style={styles.tableHeaderCell}>Account Number</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Amount</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td style={styles.tableCell}>{transaction.transactionId}</td>
                <td style={styles.tableCell}>{transaction.account.accountNumber}</td>
                <td style={styles.tableCell}>{transaction.transactionType}</td>
                <td style={styles.tableCell}>{transaction.amount}</td>
                <td style={styles.tableCell}>{transaction.status}</td>
                <td style={styles.tableCell}>
                  {transaction.status === "PENDING" && (
                    <>
                      <button onClick={() => handleApprove(transaction.transactionId)} style={styles.approveButton}>Approve</button>
                      <button onClick={() => handleReject(transaction.transactionId)} style={styles.rejectButton}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#0056b3",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    marginTop: "2rem",
    border: "1px solid #ddd",
  },
  tableHeaderCell: {
    padding: "0.75rem",
    backgroundColor: "#f2f2f2",
    border: "1px solid #ddd",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    padding: "0.75rem",
    border: "1px solid #ddd",
    textAlign: "center",
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
  approveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ManageTransactions;
