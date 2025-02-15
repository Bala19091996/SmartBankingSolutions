import React, { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthenticatedUser } from "../utils/Auth";

const CrossBorderPayment = () => {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState({
        senderAccount: '',
        recipientAccount: '',
        amount: '',
        currency: '',
        exchangeRate: '',
        purpose: '',
        swiftCode: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
            const storedUser = getAuthenticatedUser();
            if (storedUser && storedUser.userId) {
              localStorage.setItem('userId', storedUser.userId);
            } else {
              navigate("/RegistrationPage");
            }
          }, [navigate]);
    // Fetch real-time exchange rate (Example: USD to user-selected currency)
    const fetchExchangeRate = async (currency) => {
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/315bf4849d0f116d9552f5b8/latest/USD`);
            return response.data.rates[currency] || 1; // Default to 1 if not found
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return 1; // Default exchange rate if API fails
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });

        if (name === 'currency') {
            const rate = await fetchExchangeRate(value);
            setPaymentData((prevData) => ({ ...prevData, exchangeRate: rate }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/transactions/transfer', {
                account: {
                    accountNumber: paymentData.senderAccount,
                },
                amount: paymentData.amount,
                currency: paymentData.currency,
                exchangeRate: paymentData.exchangeRate,
                transactionType: "CROSS_BORDER",
            });

            setMessage(`Payment Successful: Transaction ID ${response.data.transactionId}`);

            setPaymentData({
                senderAccount: '',
                recipientAccount: '',
                amount: '',
                currency: '',
                exchangeRate: '',
                purpose: '',
                swiftCode: '',
            });

        } catch (error) {
            setMessage('Payment failed. Please try again.');
            console.error('Error processing payment:', error);
        }

        setLoading(false);
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
                <div onClick={() => navigate("/transactionshistory")} style={styles.navItem}>Transactions</div>
                <div onClick={() => navigate("/AboutUs")} style={styles.navItem}>About</div>
                <div onClick={() => navigate("/Help")} style={styles.navItem}>Support</div>
                <div onClick={handleLogout} style={styles.navItemStyle}>Logout</div>
            </div>

            <h1 style={styles.header}>Cross Border Payment</h1>

            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Sender Account:</label>
                        <input type="text" name="senderAccount" value={paymentData.senderAccount} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Recipient Account:</label>
                        <input type="text" name="recipientAccount" value={paymentData.recipientAccount} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Amount:</label>
                        <input type="number" name="amount" value={paymentData.amount} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Currency:</label>
                        <input type="text" name="currency" value={paymentData.currency} onChange={handleChange} style={styles.input} placeholder="e.g., USD, EUR" required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Exchange Rate:</label>
                        <input type="text" name="exchangeRate" value={paymentData.exchangeRate} readOnly style={styles.inputDisabled} />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Payment Purpose:</label>
                        <input type="text" name="purpose" value={paymentData.purpose} onChange={handleChange} style={styles.input} required />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>SWIFT Code:</label>
                        <input type="text" name="swiftCode" value={paymentData.swiftCode} onChange={handleChange} style={styles.input} required />
                    </div>

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Processing...' : 'Send Payment'}
                    </button>
                </form>

                {message && <p style={styles.message}>{message}</p>}
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
    inputDisabled: {
        padding: "0.8rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: "#555",
        color: "#fff",
        cursor: "not-allowed",
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
    message: {
        textAlign: "center",
        marginTop: "1rem",
        fontWeight: "bold",
        color: "#28a745",
    },
};

export default CrossBorderPayment;
