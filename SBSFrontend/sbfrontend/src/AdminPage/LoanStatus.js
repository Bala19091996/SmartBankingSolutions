import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoanStatus() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/loans/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        
        setLoans(response.data);
      } catch (err) {
        setError("Failed to load loan applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/api/loans/approve/${loanId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setLoans(loans.map(loan => loan.loanId === loanId ? { ...loan, status: "APPROVED" } : loan));
    } catch (err) {
      setError("Failed to approve the loan. Please try again.");
    }
  };

  const handleReject = async (loanId) => {
    try {
      await axios.put(`http://localhost:8080/api/loans/reject/${loanId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setLoans(loans.map(loan => loan.loanId === loanId ? { ...loan, status: "REJECTED" } : loan));
    } catch (err) {
      setError("Failed to reject the loan. Please try again.");
    }
  };

  if (loading) return <p>Loading loans...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
      <h1 style={styles.header}>Loan Applications</h1>

      {loans.length === 0 ? (
        <p>No pending loan applications.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Loan ID</th>
              <th style={styles.tableHeaderCell}>User ID</th>
              <th style={styles.tableHeaderCell}>Amount</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.loanId}>
                <td style={styles.tableCell}>{loan.loanId}</td>
                <td style={styles.tableCell}>{loan.user.userId}</td>
                <td style={styles.tableCell}>{loan.loanAmount}</td>
                <td style={styles.tableCell}>{loan.loanType}</td>
                <td style={styles.tableCell}>{loan.status}</td>
                <td style={styles.tableCell}>
                  {loan.status === "PENDING" && (
                    <>
                      <button onClick={() => handleApprove(loan.loanId)} style={styles.approveButton}>Approve</button>
                      <button onClick={() => handleReject(loan.loanId)} style={styles.rejectButton}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: "'Poppins', sans-serif", padding: "2rem", maxWidth: "1200px", margin: "auto" },
  header: { textAlign: "center", marginBottom: "2rem", color: "#0056b3" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: "2rem", border: "1px solid #ddd" },
  tableHeaderCell: { padding: "0.75rem", backgroundColor: "#f2f2f2", border: "1px solid #ddd", fontWeight: "bold", textAlign: "center" },
  tableCell: { padding: "0.75rem", border: "1px solid #ddd", textAlign: "center" },
  navMenuStyle: { display: "flex", justifyContent: "space-between", marginBottom: "2rem", padding: "0.5rem 1rem", backgroundColor: "#0056b3", color: "#fff", borderRadius: "8px" },
  navItemStyle: { margin: "0 1rem", cursor: "pointer", textDecoration: "none", color: "#fff", fontWeight: "bold" },
  approveButton: { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", marginRight: "0.5rem" },
  rejectButton: { backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" },
  footerStyle: { textAlign: "center", marginTop: "2rem", color: "#777" },
};

export default LoanStatus;
