import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: "light",
    notification: true,
    language: "English",
  });

  const handleSaveSettings = () => {
    // Logic to save settings can be added here, e.g., make an API call to save settings
    alert("Settings saved successfully!");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Menu (same as Admin Dashboard) */}
      <div style={styles.navMenuStyle}>
        <div onClick={() => navigate("/AdminDashboard")} style={styles.navItemStyle}>
          Dashboard
        </div>
        <div onClick={() => navigate("/manageusers")} style={styles.navItemStyle}>
          Manage Users
        </div>
        <div onClick={() => navigate("/transactions")} style={styles.navItemStyle}>
          Transactions
        </div>
        <div onClick={() => navigate("/loanManagement")} style={styles.navItemStyle}>
          Loan Management
        </div>
        <div onClick={() => navigate("/clerkdashboard")} style={styles.navItemStyle}>
          Clerk Operations
        </div>
        <div onClick={() => navigate("/settings")} style={styles.navItemStyle}>
          Settings
        </div>
        <div onClick={() => navigate("/")} style={styles.navItemStyle}>
          Logout
        </div>
      </div>

      {/* Header */}
      <h1 style={styles.headerStyle}>Admin Settings</h1>

      {/* Settings Form */}
      <div style={styles.settingsContainer}>
        <div style={styles.settingCard}>
          <label style={styles.settingLabel}>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value })
            }
            style={styles.settingInput}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={styles.settingCard}>
          <label style={styles.settingLabel}>Notifications</label>
          <input
            type="checkbox"
            checked={settings.notification}
            onChange={(e) =>
              setSettings({ ...settings, notification: e.target.checked })
            }
            style={styles.settingCheckbox}
          />
        </div>

        <div style={styles.settingCard}>
          <label style={styles.settingLabel}>Language</label>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
            style={styles.settingInput}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <button
          onClick={handleSaveSettings}
          style={styles.saveButton}
        >
          Save Settings
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styles (shared with AdminDashboard)
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "auto",
    color: "#333",
  },
  headerStyle: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#0056b3",
  },
  settingsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  settingCard: {
    backgroundColor: "#f8f9fa",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  settingLabel: {
    fontSize: "1rem",
    color: "#333",
    marginBottom: "0.5rem",
  },
  settingInput: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  settingCheckbox: {
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  saveButton: {
    padding: "0.8rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
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
  footerStyle: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#777",
  },
};

export default AdminSettings;
