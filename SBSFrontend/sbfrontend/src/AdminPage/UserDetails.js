import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editableUser, setEditableUser] = useState(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setEditableUser(response.data);
      } catch (err) {
        setError("Failed to load user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/update/${userId}`, editableUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      alert("User details updated successfully!");
      navigate("/manageusers");
    } catch (err) {
      setError("Failed to update user details. Please try again.");
    }
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/approve/${userId}?approved=true`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      alert("User approved successfully!");
      setEditableUser({ ...editableUser, accountStatus: "APPROVED" });
    } catch (err) {
      setError("Failed to approve user. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/approve/${userId}?approved=false`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      alert("User rejected successfully!");
      navigate("/manageusers");
    } catch (err) {
      setError("Failed to reject user. Please try again.");
    }
  };

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post(
        `http://localhost:8080/api/accounts/users/${userId}/create-account`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Account created successfully!");
  
        // Refresh user data to reflect new account
        const userResponse = await axios.get(
          `http://localhost:8080/api/admin/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        setEditableUser(userResponse.data);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      if (err.response) {
        // Handle specific backend errors
        setError(err.response.data || "Failed to create account. Please try again.");
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setIsCreatingAccount(false);
    }
  };
  

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

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

      <h1 style={styles.header}>User Details</h1>

      <div style={styles.detailsContainer}>
        <div style={styles.inputGroup}>
          <label>User ID</label>
          <input
            type="text"
            name="userId"
            value={editableUser.userId}
            disabled
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            name="userName"
            value={editableUser.userName}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            value={editableUser.userEmail}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Phone</label>
          <input
            type="text"
            name="userPhoneNo"
            value={editableUser.userPhoneNo}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Aadhar No</label>
          <input
            type="text"
            name="userAdharNo"
            value={editableUser.userAdharNo}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>PAN No</label>
          <input
            type="text"
            name="userPanNo"
            value={editableUser.userPanNo}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={editableUser.address?.street + ", " + editableUser.address?.city}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Account Status</label>
          <div style={styles.statusBadge(editableUser.accountStatus)}>
            {editableUser.accountStatus}
          </div>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={handleSaveChanges} style={styles.saveButton}>Save Changes</button>
        {editableUser.accountStatus !== 'APPROVED' && (
          <button onClick={handleApprove} style={styles.approveButton}>Approve</button>
        )}
        {editableUser.accountStatus !== 'REJECTED' && (
          <button onClick={handleReject} style={styles.rejectButton}>Reject</button>
        )}
        {editableUser.accountStatus === 'APPROVED' && !editableUser.hasAccount && (
          <button
            onClick={handleCreateAccount}
            disabled={isCreatingAccount}
            style={isCreatingAccount ? styles.createAccountDisabled : styles.createAccountButton}
          >
            {isCreatingAccount ? 'Creating Account...' : 'Create Account'}
          </button>
        )}
        <button onClick={() => navigate("/manageusers")} style={styles.backButton}>Back</button>
      </div>
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
  detailsContainer: {
    marginTop: "2rem",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
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
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  },
  saveButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  approveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  createAccountButton: {
    backgroundColor: "#6f42c1",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  createAccountDisabled: {
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
  backButton: {
    backgroundColor: "#f8f9fa",
    color: "#333",
    border: "1px solid #ccc",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  statusBadge: (status) => ({
    padding: "0.5rem",
    borderRadius: "4px",
    backgroundColor: status === 'APPROVED' ? "#28a745" : status === 'REJECTED' ? "#dc3545" : "#ffc107",
    color: "#fff",
  }),
};

export default UserDetails;
