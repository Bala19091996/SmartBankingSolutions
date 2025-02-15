import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminManage() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setAdmins(response.data);
      } catch (err) {
        setError("Failed to load admin data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleEdit = (adminId) => {
    navigate(`/adminedit/${adminId}`);
  };

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
      <h1 style={styles.headerStyle}>Admin Employee Management</h1>

      {/* Admin List Table */}
      <div style={styles.tableContainer}>
        <table style={styles.tableStyle}>
          <thead>
            <tr>
              <th style={styles.tableHeaderCell}>Admin ID</th>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Email</th>
              <th style={styles.tableHeaderCell}>Position</th>
              <th style={styles.tableHeaderCell}>Salary</th>
              <th style={styles.tableHeaderCell}>Phone Number</th>
              <th style={styles.tableHeaderCell}>Address</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No data available</td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.adminId}>
                  <td style={styles.tableCell}>{admin.adminId}</td>
                  <td style={styles.tableCell}>{admin.adminName}</td>
                  <td style={styles.tableCell}>{admin.adminEmail}</td>
                  <td style={styles.tableCell}>{admin.position || "N/A"}</td>
                  <td style={styles.tableCell}>{admin.salary ? `$${admin.salary}` : "N/A"}</td>
                  <td style={styles.tableCell}>{admin.phoneNo}</td>
                  <td style={styles.tableCell}>
                    {admin.address ? `${admin.address.street}, ${admin.address.city}, ${admin.address.state}, ${admin.address.zipcode}` : "N/A"}
                  </td>
                  <td style={styles.tableCell}>
                    <button onClick={() => handleEdit(admin.adminId)} style={styles.buttonStyle}>Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: "'Poppins', sans-serif", padding: "2rem", maxWidth: "1200px", margin: "auto", color: "#333" },
  headerStyle: { textAlign: "center", marginBottom: "2rem", color: "#0056b3" },
  tableContainer: { marginTop: "2rem", overflowX: "auto" },
  tableStyle: { width: "100%", borderCollapse: "collapse", marginBottom: "2rem", border: "1px solid #ddd" },
  tableHeaderCell: { padding: "1rem", backgroundColor: "#f2f2f2", border: "1px solid #ddd", textAlign: "center", fontWeight: "bold" },
  tableCell: { padding: "1rem", border: "1px solid #ddd", textAlign: "center" },
  buttonStyle: { padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "0.5rem" },
  navMenuStyle: { display: "flex", justifyContent: "space-between", marginBottom: "2rem", padding: "0.5rem 1rem", backgroundColor: "#0056b3", color: "#fff", borderRadius: "8px" },
  navItemStyle: { margin: "0 1rem", cursor: "pointer", textDecoration: "none", color: "#fff", fontWeight: "bold" },
  footerStyle: { textAlign: "center", marginTop: "2rem", color: "#777" },
};

export default AdminManage;
