import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthenticatedUser } from "../utils/Auth";

const HomeLoan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userId"),
        loanAmount: "",
        interestRate: "6.5", // Default interest rate
        tenureInMonths: "",
        loanType: "HOME", // Default loan type
    });
    
      useEffect(() => {
        const storedUser = getAuthenticatedUser();
        if (storedUser && storedUser.userId) {
          localStorage.setItem('userId', storedUser.userId);
        } else {
          navigate("/RegistrationPage");
        }
      }, [navigate]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoanApplication = async (e) => {
        e.preventDefault();
        if (!formData.userId) {
            setError("User ID not found. Please log in again.");
            return;
        }
        if (!formData.loanAmount || !formData.tenureInMonths) {
            setError("All fields are required.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:8080/api/loans/apply", formData);
            if (response.status === 200) {
                setSuccess("Home loan application submitted successfully! Our team will contact you soon.");
                setFormData({
                    userId: formData.userId,
                    loanAmount: "",
                    interestRate: "6.5",
                    tenureInMonths: "",
                    loanType: "HOME",
                });
            } else {
                setError("Failed to submit loan application. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while submitting the loan request.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        navigate("/");
      };

    return (
        <div style={styles.container}>
            <div style={styles.navMenu}>
                <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItem}>Dashboard</div>
                <div onClick={() => navigate("/transactions")} style={styles.navItem}>Transactions</div>
                <div onClick={() => navigate("/LoanOptions")} style={styles.navItem}>Loan Services</div>
                <div onClick={() => navigate("/support")} style={styles.navItem}>Support</div>
                <div onClick={handleLogout} style={styles.navItemStyle}>Logout</div>
            </div>

            <h1 style={styles.header}>🏡 Home Loan Application</h1>
            <p style={styles.info}>Apply for a home loan with flexible tenure and competitive interest rates.</p>

            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}

            <form onSubmit={handleLoanApplication} style={styles.form}>
                <label style={styles.label}>Loan Amount ($):</label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} style={styles.input} required />

                <label style={styles.label}>Tenure (Months):</label>
                <input type="number" name="tenureInMonths" value={formData.tenureInMonths} onChange={handleChange} style={styles.input} required />

                <label style={styles.label}>Interest Rate (%):</label>
                <input type="text" value={formData.interestRate} style={styles.input} disabled />

                <button type="submit" style={styles.button} disabled={loading}>{loading ? "Submitting..." : "Apply for Loan"}</button>
            </form>

            <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(25, 25, 25, 0.9)",
        color: "rgba(255, 255, 255, 0.86)",
        padding: "1rem",
    },
    navMenu: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        padding: "1rem",
        backgroundColor: "#0056b3",
        color: "#fff",
        borderRadius: "8px",
    },
    navItem: {
        cursor: "pointer",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "1.2rem",
    },
    header: {
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        color: "rgba(255, 255, 255, 0.85)",
    },
    error: {
        color: "red",
        textAlign: "center",
        fontWeight: "bold",
    },
    success: {
        color: "green",
        textAlign: "center",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "2rem",
        borderRadius: "10px",
    },
    label: {
        fontWeight: "bold",
    },
    input: {
        padding: "0.75rem",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        width: "100%",
    },
    button: {
        padding: "1rem",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "#fff",
        fontSize: "1.2rem",
        cursor: "pointer",
    }
};

export default HomeLoan;