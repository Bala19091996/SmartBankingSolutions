import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthenticatedUser } from "../utils/Auth";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getAuthenticatedUser();
    if (storedUser && storedUser.userId) {
      localStorage.setItem('userId', storedUser.userId);
      setUser(storedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const services = [
    { id: 1, name: "Show Account Details", path: "/AccountManagement" },
    { id: 2, name: "Create New Bank Account", path: "/RegistrationPage" },
    { id: 3, name: "Cross Border Payment", path: "/CrossBorderPayment" },
    { id: 4, name: "Check Loan Eligibility", path: "/loaneligibilitychecker" },
    { id: 5, name: "Fund Transfer", path: "/FundTransfer" },
    { id: 6, name: "Bill Payments", path: "/BillPayments" },
    { id: 7, name: "Loan Services", path: "/LoanOptions" },
    { id: 8, name: "Support", path: "/Help" },
  ];

  // Logout function to clear localStorage and navigate to home page
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

      {/* Header */}
      <h1 style={styles.header}>Welcome, {user?.userName || "User"}</h1>
      <h2 style={styles.subHeader}>Customer Dashboard</h2>

      {/* Services Grid */}
      <div style={styles.cardContainer}>
        {services.map((service) => (
          <div key={service.id} style={styles.card}>
            <h2 style={styles.cardHeader}>{service.name}</h2>
            <button onClick={() => navigate(service.path)} style={styles.button}>
              Access
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
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
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "rgba(255, 255, 255, 0.75)",
  },
  subHeader: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "rgba(29, 29, 29, 0.63)",
    padding: "1.5rem",
    borderRadius: "8px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHeader: {
    fontSize: "1.2rem",
    color: "#007bff",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default CustomerDashboard;
