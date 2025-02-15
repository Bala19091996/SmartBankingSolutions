import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClerkDashboard() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts/getallaccounts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setAccounts(response.data);
      setFilteredAccounts(response.data); // Initialize filtered accounts
    } catch (err) {
      setError("Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async () => {
    navigate('/AddAccount');
  };

  const handleTransaction = async (type) => {
    if (!selectedAccount || !amount) {
      alert("Select an account and enter an amount.");
      return;
    }

    try {
      const endpoint =
        type === "deposit"
          ? `http://localhost:8080/api/accounts/${selectedAccount}/deposit`
          : `http://localhost:8080/api/accounts/${selectedAccount}/withdraw`;

      const params = new URLSearchParams();
      params.append("amount", amount);

      await axios.post(endpoint, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      alert(`${type === "deposit" ? "Deposited" : "Withdrawn"} successfully!`);
      setAmount("");
      fetchAccounts();
    } catch (err) {
      setError(`Failed to ${type} money. Try again.`);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredAccounts(accounts); // Reset filter if empty
    } else {
      const filtered = accounts.filter((acc) =>
        acc.accountNumber.toString().includes(query)
      );
      setFilteredAccounts(filtered);
    }
  };

  return (
    <div style={styles.container}>
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

      <h1 style={styles.header}>Bank Clerk Dashboard</h1>

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleAddAccount} style={styles.addAccountBtn}>Add New Account</button>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Account Number"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchBox}
      />

      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.accountTable}>
            <thead>
              <tr>
                <th>Account No</th>
                <th>User Name</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr key={acc.accountNumber}>
                  <td>{acc.accountNumber}</td>
                  <td>{acc.user.userName}</td>
                  <td>${acc.balance.toFixed(2)}</td>
                  <td>
                    <button onClick={() => setSelectedAccount(acc.accountNumber)} style={styles.selectBtn}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedAccount && (
        <div style={styles.transactionContainer}>
          <h2>Selected Account: {selectedAccount}</h2>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.amountInput}
          />
          <button onClick={() => handleTransaction("deposit")} style={styles.depositBtn}>
            Deposit
          </button>
          <button onClick={() => handleTransaction("withdraw")} style={styles.withdrawBtn}>
            Withdraw
          </button>
        </div>
      )}
      <footer style={styles.footerStyle}>
        <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Styling object
const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem",
        maxWidth: "1200px",
        margin: "auto",
      },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    background: "#0056b3",
    padding: "10px",
    borderRadius: "8px",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "10px",
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
    color: "#0056b3",
    marginBottom: "20px",
  },
  footerStyle: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#777",
  },
  addAccountBtn: {
    display: "block",
    margin: "10px auto",
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  searchBox: {
    padding: "8px",
    width: "300px",
    margin: "15px auto",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
  },
  accountTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  selectBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  transactionContainer: {
    marginTop: "20px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  error: {
    color: "red",
  },
};

export default ClerkDashboard;
