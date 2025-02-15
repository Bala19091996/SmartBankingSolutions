import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        
        // Filter users to include only those with PENDING account status
        const pendingUsers = response.data.filter(user => user.accountStatus === "PENDING");
        setUsers(pendingUsers);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
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

      <h1 style={styles.header}>User Approval Requests</h1>

      {users.length === 0 ? (
        <p>No pending user requests.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>User ID</th>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Email</th>
              <th style={styles.tableHeaderCell}>Phone</th>
              <th style={styles.tableHeaderCell}>Adhar No</th>
              <th style={styles.tableHeaderCell}>Pan No</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td style={styles.tableCell}>{user.userId}</td>
                <td style={styles.tableCell}>{user.userName}</td>
                <td style={styles.tableCell}>{user.userEmail}</td>
                <td style={styles.tableCell}>{user.userPhoneNo}</td>
                <td style={styles.tableCell}>{user.userAdharNo}</td>
                <td style={styles.tableCell}>{user.userPanNo}</td>
                <td style={styles.tableCell}>
                  <button onClick={() => navigate(`/userdetails/${user.userId}`)} style={styles.viewButton}>
                    Review
                  </button>
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
  viewButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footerStyle: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#777",
  },
};

export default ManageUsers;
