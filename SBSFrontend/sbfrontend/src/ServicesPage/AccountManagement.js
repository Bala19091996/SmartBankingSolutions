import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../utils/Auth";

function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const storedUser = getAuthenticatedUser();
  const userId = storedUser?.userId;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/accounts/user/${userId}`)
        .then((response) => {
          setAccounts(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);
          setLoading(false);
        });
    } else {
      console.error("User ID not found in localStorage.");
      setLoading(false);
    }
  }, [userId]);
  
    useEffect(() => {
      const storedUser = getAuthenticatedUser();
      if (storedUser && storedUser.userId) {
        localStorage.setItem('userId', storedUser.userId);
      } else {
        navigate("/");
      }
    }, [navigate]);


  const handleDownloadStatement = () => {
    alert("Statement downloaded successfully!");
  };

  const handleUpdateSettings = () => {
    alert("Account settings updated successfully!");
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
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={handleLogout} style={styles.navItemStyle}>Logout</div>
      </div>

      {loading ? (
        <p style={styles.message}>Loading account information...</p>
      ) : accounts.length > 0 ? (
        accounts.map((account) => (
          <div key={account.accountId} style={styles.card}>
            <div style={styles.infoContainer}>
              {/* Account Information */}
              <div style={styles.infoBox}>
                <h2>Account Information</h2>
                <p><strong>Account ID:</strong> {account.accountId}</p>
                <p><strong>Account Number:</strong> {account.accountNumber}</p>
                <p><strong>Account Type:</strong> {account.accountType}</p>
                <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
                <p><strong>Active:</strong> {account.active ? "Yes" : "No"}</p>
                <p><strong>Created At:</strong> {new Date(account.createdAt).toLocaleString()}</p>
                <p><strong>Last Modified:</strong> {new Date(account.lastModifiedAt).toLocaleString()}</p>
              </div>

              {/* User Information */}
              {account.user && (
                <div style={styles.infoBox}>
                  <h2>User Information</h2>
                  <p><strong>User ID:</strong> {account.user.userId}</p>
                  <p><strong>Name:</strong> {account.user.userName}</p>
                  <p><strong>Email:</strong> {account.user.userEmail}</p>
                  <p><strong>Phone Number:</strong> {account.user.userPhoneNo}</p>
                  <p><strong>Approved:</strong> {account.user.approved ? "Yes" : "No"}</p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p style={styles.message}>No account data available.</p>
      )}

      {/* Action Buttons */}
      <div style={styles.actionContainer}>
        <h2 style={{ color: "rgba(255, 255, 255, 0.86)" }}>Actions</h2>
        <button style={styles.button} onClick={handleDownloadStatement}>
          Download Statement
        </button>
        <button style={styles.button} onClick={handleUpdateSettings}>
          Update Settings
        </button>
      </div>
      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styles Object
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "rgba(25, 25, 25, 0.81)",
    minHeight: "100vh",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
  navMenu: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#0056b3",
    color: "#fff",
    borderRadius: "8px",
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
  navItem: {
    margin: "0 1rem",
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    color: "rgba(255, 255, 255, 0.86)",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(29, 29, 29, 0.63)",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1rem",
    color: "rgba(255, 255, 255, 0.86)",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    flexWrap: "wrap",
  },
  infoBox: {
    flex: "1",
    minWidth: "300px",
    padding: "1rem",
    backgroundColor: "rgba(50, 50, 50, 0.8)",
    borderRadius: "8px",
  },
  actionContainer: {
    backgroundColor: "rgba(29, 29, 29, 0.63)",
    borderRadius: "8px",
    padding: "1.5rem",
    marginTop: "1rem",
  },
  button: {
    padding: "0.7rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginRight: "1rem",
  },
};

export default AccountManagement;
