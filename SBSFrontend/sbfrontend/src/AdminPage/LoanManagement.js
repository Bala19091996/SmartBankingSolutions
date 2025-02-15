import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoanManagement() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Loans from Backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/loans", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setLoans(response.data);
      } catch (err) {
        setError("Failed to load loan requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);
 

  if (loading) return <p style={{ textAlign: "center" }}>Loading loans...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

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
      
      <h1 style={styles.header}>Loan Management</h1>

      {/* Loan Application Button */}
      <div style={styles.loanControls}>
        <button onClick={() => navigate("/loanApplication")} style={styles.addLoanBtn}>
          Loan Application
        </button>
        <button onClick={() => navigate("/loanstatus")} style={styles.addLoanBtn}>
          Loan Status
        </button>
      </div>
      {/* Loan Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeaderCell}>Loan ID</th>
            <th style={styles.tableHeaderCell}>User</th>
            <th style={styles.tableHeaderCell}>Amount</th>
            <th style={styles.tableHeaderCell}>Interest Rate</th>
            <th style={styles.tableHeaderCell}>Tenure (Months)</th>
            <th style={styles.tableHeaderCell}>Loan Type</th>
            <th style={styles.tableHeaderCell}>Status</th>
            <th style={styles.tableHeaderCell}>Application Date</th>
            <th style={styles.tableHeaderCell}>Approval Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.loanId}>
              <td style={styles.tableCell}>{loan.loanId}</td>
              <td style={styles.tableCell}>{loan.user.userName}</td>
              <td style={styles.tableCell}>${loan.loanAmount}</td>
              <td style={styles.tableCell}>{loan.interestRate}%</td>
              <td style={styles.tableCell}>{loan.tenureInMonths}</td>
              <td style={styles.tableCell}>{loan.loanType}</td>
              <td style={styles.tableCell}>{loan.status}</td>
              <td style={styles.tableCell}>{loan.applicationDate}</td>
              <td style={styles.tableCell}>{loan.approvalDate || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styles
const styles = {
  container: { fontFamily: "'Poppins', sans-serif", padding: "2rem", maxWidth: "1200px", margin: "auto", color: "#333" },
  header: { textAlign: "center", marginBottom: "2rem", color: "#0056b3" },
  navMenuStyle: { display: "flex", justifyContent: "space-between", marginBottom: "2rem", padding: "0.5rem 1rem", backgroundColor: "#0056b3", color: "#fff", borderRadius: "8px" },
  navItemStyle: { margin: "0 1rem", cursor: "pointer", textDecoration: "none", color: "#fff", fontWeight: "bold" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "2rem" },
  tableHeaderCell: { padding: "0.75rem", backgroundColor: "#f2f2f2", border: "1px solid #ddd", fontWeight: "bold", textAlign: "center" },
  tableCell: { padding: "0.75rem", border: "1px solid #ddd", textAlign: "center" },
  addLoanBtn: { backgroundColor: "#28a745", color: "#fff", padding: "0.75rem 1.5rem", border: "none", borderRadius: "4px", cursor: "pointer" },
  footerStyle: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#777",
  },
};

export default LoanManagement;
