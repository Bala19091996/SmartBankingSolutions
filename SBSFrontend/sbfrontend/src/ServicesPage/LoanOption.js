import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoanOptions() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const loanOptions = [
    {
      title: "Personal Loan",
      description:
        "A loan that helps you meet personal expenses such as medical bills, home repairs, or travel.",
      interestRate: "8.5%",
      eligibility: "Minimum income of $30,000/year",
      path: "personalloan",
    },
    {
      title: "Home Loan",
      description: "Get financial support for purchasing or renovating a home.",
      interestRate: "6.5%",
      eligibility: "Good credit score, down payment of 20%",
      path: "homeloan",
    },
    {
      title: "Car Loan",
      description:
        "A loan to help you purchase a new or used car with flexible repayment options.",
      interestRate: "7.0%",
      eligibility: "Valid driver's license and minimum monthly income of $2,000",
      path: "carloan",
    },
    {
      title: "Education Loan",
      description:
        "A loan for students who wish to pursue higher education in local or international institutions.",
      interestRate: "5.5%",
      eligibility: "Accepted to an accredited educational institution.",
      path: "educationloan",
    },
  ];

  const handleCardClick = (path) => {
    navigate(`/loan/${path}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>Logout</div>
      </div>
      <h1 style={styles.heading}>Loan Options</h1>
      <div style={styles.grid}>
        {loanOptions.map((loan, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hoveredIndex === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(loan.path)}
          >
            <h2 style={styles.title}>{loan.title}</h2>
            <p style={styles.description}>{loan.description}</p>
            <p style={styles.details}><strong>Interest Rate:</strong> {loan.interestRate}</p>
            <p style={styles.details}><strong>Eligibility:</strong> {loan.eligibility}</p>
          </div>
        ))}
      </div>
      <footer style={styles.footer}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

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
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "rgba(255, 255, 255, 0.75)",
  },
  grid: {
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
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "1.2rem",
    color: "#007bff",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    color: "rgba(227, 227, 227, 0.63)",
  },
  details: {
    fontSize: "0.9rem",
    color: "rgba(227, 227, 227, 0.63)",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};

export default LoanOptions;
