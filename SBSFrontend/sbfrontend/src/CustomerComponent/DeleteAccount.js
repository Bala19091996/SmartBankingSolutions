import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteAccount = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

    const handleDeleteAccount = async () => {
        if (!userId) {
            setError("User ID not found. Please log in again.");
            return;
        }

        if (!reason.trim()) {
            setError("Please provide a reason for deleting your account.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`http://localhost:8080/api/accounts/${userId}`, {
                data: { reason }, // Sending reason in request body
            });

            if (response.status === 200) {
                alert("Account deleted successfully.");
                localStorage.removeItem("user");
                localStorage.removeItem("userId");
                navigate("/"); // Redirect to home or login page
            } else {
                setError("Failed to delete the account. Please try again later.");
            }
        } catch (err) {
            setError("An error occurred while deleting your account.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.navMenu}>
                <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItem}>Dashboard</div>
                <div onClick={() => navigate("/transactionshistory")} style={styles.navItem}>Transactions</div>
                <div onClick={() => navigate("/AboutUs")} style={styles.navItem}>About</div>
                <div onClick={() => navigate("/Help")} style={styles.navItem}>Support</div>
                <div onClick={() => navigate("/")} style={styles.navItem}>Logout</div>
            </div>
            
            <h1 style={styles.header}>❌ Delete Account</h1>
            <p style={styles.warning}>
                Warning: Deleting your account is permanent and cannot be undone. Please provide a reason before proceeding.
            </p>

            {error && <p style={styles.error}>{error}</p>}

            <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter your reason for deleting the account..."
                style={styles.textarea}
            ></textarea>

            <button onClick={handleDeleteAccount} style={styles.deleteButton} disabled={loading}>
                {loading ? "Deleting..." : "Delete My Account"}
            </button>
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
    navMenu: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#0056b3",
        color: "#fff",
        borderRadius: "8px",
    },
    navItem: {
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
    warning: {
        textAlign: "center",
        fontSize: "1.1rem",
        color: "#ff4c4c",
        fontWeight: "bold",
        marginBottom: "1.5rem",
    },
    error: {
        textAlign: "center",
        color: "#ff4c4c",
        fontWeight: "bold",
        marginBottom: "1rem",
    },
    textarea: {
        width: "100%",
        height: "80px",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ff4c4c",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        resize: "none",
        marginBottom: "1rem",
    },
    deleteButton: {
        padding: "0.8rem",
        backgroundColor: "#ff4c4c",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default DeleteAccount;
