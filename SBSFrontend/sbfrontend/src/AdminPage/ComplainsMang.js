import React, { useState, useEffect } from 'react';

function ComplainMang() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [response, setResponse] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Fetch complaints from the backend (replace with actual API)
    const fetchComplaints = async () => {
      const data = [
        { id: 1, user: 'John Doe', message: 'Unable to login', status: 'Pending' },
        { id: 2, user: 'Jane Smith', message: 'Transaction failed', status: 'Resolved' },
      ];
      setComplaints(data);
    };
    fetchComplaints();
  }, []);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleRespond = () => {
    if (!response) return;

    // Update complaint status (replace with actual API call)
    const updatedComplaints = complaints.map((c) =>
      c.id === selectedComplaint.id ? { ...c, status: 'Resolved' } : c
    );
    setComplaints(updatedComplaints);
    setResponse('');
    setSelectedComplaint(null);

    alert('Response sent successfully!');
  };

  const filteredComplaints =
    filterStatus === 'all'
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Complaint Management</h1>

      {/* Filter Options */}
      <div style={filterStyle}>
        <button
          style={filterButtonStyle(filterStatus === 'all')}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          style={filterButtonStyle(filterStatus === 'Pending')}
          onClick={() => handleFilterChange('Pending')}
        >
          Pending
        </button>
        <button
          style={filterButtonStyle(filterStatus === 'Resolved')}
          onClick={() => handleFilterChange('Resolved')}
        >
          Resolved
        </button>
      </div>

      {/* Complaints List */}
      <div style={listContainerStyle}>
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            style={complaintItemStyle(complaint.status === 'Resolved')}
            onClick={() => handleSelectComplaint(complaint)}
          >
            <p>
              <strong>User:</strong> {complaint.user}
            </p>
            <p>
              <strong>Message:</strong> {complaint.message}
            </p>
            <p>
              <strong>Status:</strong> {complaint.status}
            </p>
          </div>
        ))}
      </div>

      {/* Complaint Details and Response */}
      {selectedComplaint && (
        <div style={detailsContainerStyle}>
          <h2>Complaint Details</h2>
          <p>
            <strong>User:</strong> {selectedComplaint.user}
          </p>
          <p>
            <strong>Message:</strong> {selectedComplaint.message}
          </p>
          <p>
            <strong>Status:</strong> {selectedComplaint.status}
          </p>

          <textarea
            placeholder="Write your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            style={textAreaStyle}
          />
          <button style={respondButtonStyle} onClick={handleRespond}>
            Send Response
          </button>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: "'Poppins', sans-serif",
  padding: '2rem',
  maxWidth: '800px',
  margin: 'auto',
  color: '#333',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#0056b3',
};

const filterStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
};

const filterButtonStyle = (active) => ({
  padding: '0.5rem 1rem',
  margin: '0 0.5rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: active ? '#007bff' : '#f1f1f1',
  color: active ? '#fff' : '#333',
  fontWeight: active ? 'bold' : 'normal',
});

const listContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const complaintItemStyle = (resolved) => ({
  padding: '1rem',
  borderRadius: '8px',
  border: resolved ? '1px solid #28a745' : '1px solid #ffc107',
  backgroundColor: resolved ? '#eaf4ea' : '#fffbea',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const detailsContainerStyle = {
  marginTop: '2rem',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  backgroundColor: '#f8f9fa',
};

const textAreaStyle = {
  width: '100%',
  height: '100px',
  padding: '0.5rem',
  margin: '1rem 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const respondButtonStyle = {
  padding: '0.7rem 1.5rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ComplainMang;
