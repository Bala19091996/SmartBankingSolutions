import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAccounts: 0,
    pendingRequests: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
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

      {/* Header */}
      <h1 style={styles.headerStyle}>Admin Dashboard</h1>

      {/* Key Statistics */}
      <div style={styles.cardContainerStyle}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Active Accounts" value={stats.activeAccounts} />
        <StatCard title="Pending Requests" value={stats.pendingRequests} />
        <StatCard title="Total Transactions" value={stats.totalTransactions} />
      </div>

      {/* Action Buttons */}
      <div style={styles.cardContainerStyle}>
        <div style={styles.cardStyle}>
          <h2 style={styles.cardHeaderStyle}>Manage Users</h2>
          <p>View, edit, or remove user accounts.</p>
          <button onClick={() => navigate("/manageusers")} style={styles.buttonStyle}>Go to Users</button>
        </div>
        <div style={styles.cardStyle}>
          <h2 style={styles.cardHeaderStyle}>Employee Manage</h2>
          <p>View, edit, or remove employees accounts.</p>
          <button onClick={() => navigate("/employeemanage")} style={styles.buttonStyle}>Go to Employee</button>
        </div>
        <div style={styles.cardStyle}>
          <h2 style={styles.cardHeaderStyle}>Transactions</h2>
          <p>Monitor and approve transactions.</p>
          <button onClick={() => navigate("/transactions")} style={styles.buttonStyle}>View Transactions</button>
        </div>
        <div style={styles.cardStyle}>
          <h2 style={styles.cardHeaderStyle}>Loan Management</h2>
          <p>Configure system settings according to preferences.</p>
          <button onClick={() => navigate("/loanManagement")} style={styles.buttonStyle}>Loans</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Reusable Stat Card Component
const StatCard = ({ title, value }) => (
  <div style={styles.cardStyle}>
    <h2 style={styles.cardHeaderStyle}>{title}</h2>
    <p style={styles.cardValueStyle}>{value}</p>
  </div>
);

// Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
    color: "#333",
  },
  headerStyle: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#0056b3",
  },
  cardContainerStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  cardStyle: {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardHeaderStyle: {
    fontSize: "1.2rem",
    color: "#0056b3",
    marginBottom: "0.5rem",
  },
  cardValueStyle: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  buttonStyle: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    marginTop: "1rem",
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
  footerStyle: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#777",
  },
};

export default AdminDashboard;
