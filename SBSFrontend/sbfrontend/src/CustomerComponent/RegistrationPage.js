import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhoneNo: "",
    userAdharNo: "",
    userPanNo: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const finalData = {
      ...formData,
      userPhoneNo: formData.userPhoneNo.toString(),
    };

    try {
      await axios.post("http://localhost:8080/api/addUser", finalData);
      alert("Registration successful!");
      navigate("/CustomerDashboard");
    } catch (error) {
      setError(error.response?.data || "Registration failed. Please try again.");
    }
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

      <div style={styles.formContainer}>
        <h1 style={styles.header}>Customer Registration</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="Full Name" required style={styles.input} onChange={handleInputChange} />
          <input type="email" name="userEmail" placeholder="Email" required style={styles.input} onChange={handleInputChange} />
          <input type="tel" name="userPhoneNo" placeholder="Phone Number" required style={styles.input} onChange={handleInputChange} />
          <input type="text" name="userAdharNo" placeholder="Aadhar Number" required style={styles.input} onChange={handleInputChange} />
          <input type="text" name="userPanNo" placeholder="PAN Number" required style={styles.input} onChange={handleInputChange} />

          <h2 style={styles.subHeader}>Address Details</h2>
          <input type="text" name="address.street" placeholder="Street" required style={styles.input} onChange={handleInputChange} />
          <input type="text" name="address.city" placeholder="City" required style={styles.input} onChange={handleInputChange} />
          <input type="text" name="address.state" placeholder="State" required style={styles.input} onChange={handleInputChange} />
          <input type="text" name="address.zipcode" placeholder="Zip Code" required style={styles.input} onChange={handleInputChange} />

          <input type="password" name="password" placeholder="Password" required style={styles.input} onChange={handleInputChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required style={styles.input} onChange={handleInputChange} />

          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

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
    cursor: "pointer",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "rgba(29, 29, 29, 0.63)",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.75)",
  },
  subHeader: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #555",
    fontSize: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
  },
  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default RegistrationPage;
