import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: '',
  });
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Query:', formData);
    alert('Your query has been submitted. We will get back to you soon!');
    setFormData({ name: '', email: '', query: '' });
  };

  const containerStyle = {
    backgroundColor: 'rgba(25, 25, 25, 0.81)',
    fontFamily: "'Poppins', sans-serif",
    color: 'rgba(227, 227, 227, 0.97)',
    lineHeight: '1.6',
    padding: '2rem',
    width: '95vw',
    margin: 'auto',
    textAlign: 'justify',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.75)',
  };

  const sectionStyle = {
    marginBottom: '1.5rem',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    boxShadow: '0px 2px 8px rgba(255, 255, 255, 0.1)',
  };

  const highlightStyle = {
    color: 'rgba(0, 221, 255, 0.87)',
    fontWeight: 'bold',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid rgba(0, 221, 255, 0.87)',
    fontSize: '1rem',
    backgroundColor: '#222',
    color: '#fff',
  };

  const buttonStyle = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 221, 255, 0.87)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/CustomerDashboard")} style={styles.navItemStyle}>Dashboard</div>
        <div onClick={() => navigate("/transactionshistory")} style={styles.navItemStyle}>Transactions</div>
        <div onClick={() => navigate("/AboutUs")} style={styles.navItemStyle}>About</div>
        <div onClick={() => navigate("/Help")} style={styles.navItemStyle}>Support</div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>Logout</div>
      </div>
      <h1 style={headerStyle}>Help & Support</h1>

      {/* FAQ Section */}
      <div style={sectionStyle}>
        <h2 style={highlightStyle}>FAQs</h2>
        <p><span style={highlightStyle}>Q: How do I reset my password?</span></p>
        <p>A: Go to the login page, click on "Forgot Password," and follow the instructions.</p>

        <p><span style={highlightStyle}>Q: How can I update my contact details?</span></p>
        <p>A: Log in to your account, navigate to "Profile Settings," and update your details.</p>

        <p><span style={highlightStyle}>Q: What should I do if I suspect fraudulent activity?</span></p>
        <p>A: Contact our support team immediately at <span style={highlightStyle}>+1-800-123-4567</span> or email <a href="mailto:fraudsupport@smartbank.com" style={{ color: '#007bff' }}>fraudsupport@smartbank.com</a>.</p>
      </div>

      {/* Contact Support Section */}
      <div style={sectionStyle}>
        <h2 style={highlightStyle}>Contact Support</h2>
        <p>For any assistance, please contact us:</p>
        <ul>
          <li><strong>Phone:</strong> +1-800-123-4567</li>
          <li><strong>Email:</strong> <a href="mailto:support@smartbank.com" style={{ color: '#007bff' }}>support@smartbank.com</a></li>
          <li><strong>Live Chat:</strong> Available 24/7 on our website</li>
        </ul>
      </div>

      {/* Query Submission Form */}
      <div style={sectionStyle}>
        <h2 style={highlightStyle}>Submit a Query</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <textarea
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            placeholder="Your Query"
            rows="5"
            required
            style={inputStyle}
          ></textarea>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '2rem', color: '#777' }}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Help;

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