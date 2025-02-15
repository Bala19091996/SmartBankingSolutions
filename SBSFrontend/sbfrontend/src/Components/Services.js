import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Services() {
    const navigate = useNavigate(); // Initialize the navigation hook

    const services = [
        {
            title: 'Online Payments',
            description: 'Easily make payments online using our secure platform.',
            icon: '💳',
            action: () => navigate('/FundTransfer'),
        },
        {
            title: 'Net Banking',
            description: 'Access your account anytime, anywhere with our net banking services.',
            icon: '🌐',
            action: () => navigate('/NetBanking'),
        },
        {
            title: 'Loan Options',
            description: 'Choose from a variety of loan options tailored to your needs.',
            icon: '🏦',
            action: () => navigate('/LoanOptions'),
        },
        {
            title: 'Account Management',
            description: 'Manage your accounts, check balances, and download statements.',
            icon: '📜',
            action: () => navigate('/AccountManagement'), // Navigate to AccountManagement page
        },
        // {
        //     title: 'Investments',
        //     description: 'Explore investment opportunities and grow your wealth.',
        //     icon: '📈',
        // },
        {
            title: 'Customer Support',
            description: '24/7 customer support to assist you with all your banking needs.',
            icon: '📞',
            action: () => navigate('/Help'),
        },
    ];

    const containerStyle = {
        height:'auto',
        padding: '1.5rem',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: 'rgba(25, 25, 25, 0.81)',
    };

    const headingStyle = {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: 'rgba(255, 255, 255, 0.75)',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '5rem',
        padding:'5rem',
    };

    const cardStyle = {
        // backgroundColor: '#fff',
        borderRadius: '8px',
        backgroundColor:'rgba(29, 29, 29, 0.63)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        height:'15rem',
        textAlign: 'center',
        // transition: 'transform 0.4s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    };

    const cardHoverStyle = {
        transition:'0.3s all ease',
        scale:'1.1',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Adding box-shadow on hover for more effect
    };

    const iconStyle = {
        fontSize: '3rem',
        color: '#007bff',
        marginBottom: '1rem',
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: 'rgba(255, 255, 255, 0.86)',
    };

    const descriptionStyle = {
        fontSize: '1rem',
        color: 'rgba(227, 227, 227, 0.63)',
    };
    const footerStyle = {
        textAlign: "center",
        marginTop: "2rem",
        color: "rgba(255, 255, 255, 0.6)",
    };

    // State to track the hover state for each service card
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        navigate("/");
      };

    return (
        <div style={containerStyle}>
            <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={handleLogout} style={styles.navItemStyle}>Logout</div>
      </div>
            <h1 style={headingStyle}>Our Services</h1>
            <div style={gridStyle}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        style={{
                            ...cardStyle,
                            ...(hoveredIndex === index ? cardHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                        onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
                        onClick={service.action} // Trigger the action (navigation) when clicked
                    >
                        <div style={iconStyle}>{service.icon}</div>
                        <div style={titleStyle}>{service.title}</div>
                        <div style={descriptionStyle}>{service.description}</div>
                    </div>
                ))}
            </div>
            <footer style={footerStyle}>
                <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Services;
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