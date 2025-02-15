import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BillPayments = () => {
    const navigate = useNavigate();
    const [billType, setBillType] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage

    const handleBillPayment = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError('User ID not found. Please log in again.');
            return;
        }

        if (!billType || !accountNumber || !amount || !paymentDate) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/bill-payments', {
                userId,
                billType,
                accountNumber,
                amount,
                paymentDate
            });

            if (response.status === 201) {
                setSuccessMessage('Bill payment successful!');
                setBillType('');
                setAccountNumber('');
                setAmount('');
                setPaymentDate('');
            } else {
                setError('Failed to process the payment. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while processing the payment.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Navigation Menu */}
            <div style={styles.navMenu}>
                <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItem}>Dashboard</div>
                <div onClick={() => navigate("/transactionshistory")} style={styles.navItem}>Transactions</div>
                <div onClick={() => navigate("/AboutUs")} style={styles.navItem}>About</div>
                <div onClick={() => navigate("/Help")} style={styles.navItem}>Support</div>
                <div onClick={() => navigate("/")} style={styles.navItem}>Logout</div>
            </div>

            <h1 style={styles.header}>Bill Payments</h1>

            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            <div style={styles.formContainer}>
                <form onSubmit={handleBillPayment} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Bill Type:</label>
                        <select value={billType} onChange={(e) => setBillType(e.target.value)} style={styles.input} required>
                            <option value="">Select Bill Type</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Water">Water</option>
                            <option value="Internet">Internet</option>
                            <option value="Gas">Gas</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Account Number:</label>
                        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Amount:</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Payment Date:</label>
                        <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} style={styles.input} required />
                    </div>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Bill'}
                    </button>
                </form>
            </div>
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
    formContainer: {
        maxWidth: "500px",
        margin: "auto",
        padding: "2rem",
        backgroundColor: "rgba(29, 29, 29, 0.63)",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
        color: "#ffffff",
    },
    input: {
        padding: "0.8rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        transition: "border-color 0.3s",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
    },
    button: {
        padding: "0.8rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    error: {
        color: "#d32f2f",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center",
    },
    success: {
        color: "#28a745",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center",
    },
};

export default BillPayments;
