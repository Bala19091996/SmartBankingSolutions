import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navigation Menu */}
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>Logout</div>
      </div>

      {/* Header */}
      <h1 style={styles.header}>About Us</h1>
      <h2 style={styles.subHeader}>Welcome to Smart Banking Solution</h2>

      {/* Content Sections */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardHeader}>Our Vision</h2>
          <p style={styles.cardText}>
            Our vision is to create a seamless, inclusive, and innovative banking ecosystem where everyone has access to financial services that drive growth and prosperity.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardHeader}>Why Choose Us?</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}><b>Secure Banking:</b> Advanced security measures to protect your data.</li>
            <li style={styles.listItem}><b>24/7 Support:</b> Customer assistance whenever you need it.</li>
            <li style={styles.listItem}><b>Innovation:</b> Smart solutions for payments, savings, and loans.</li>
            <li style={styles.listItem}><b>Accessibility:</b> User-friendly platforms for all devices.</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardHeader}>Contact Us</h2>
          <p style={styles.cardText}>
            Have questions? Reach out to us at <a href="mailto:info@smartbanking.com" style={styles.link}>info@smartbanking.com</a> or call us at <b>+1-800-123-4567</b>. We are here to assist you.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

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
  cardText: {
    color: "rgba(227, 227, 227, 0.97)",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    color: "rgba(227, 227, 227, 0.97)",
  },
  listItem: {
    marginBottom: "0.5rem",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default AboutUs;
