import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NetBanking() {
    const navigate = useNavigate(); // Initialize navigation

    const features = [
        {
            title: 'Transfer Funds Easily',
            description: 'Send money to your friends, family, or businesses with just a few clicks.',
            icon: '💸',
            path: '/FundTransfer',
        },
        {
            title: 'View Transaction History',
            description: 'Check your past transactions, account balances, and download statements.',
            icon: '📜',
            path: '/transactionshistory',
        },
        {
            title: "Cross Border Payment",
            description: "Make secure international payments with competitive exchange rates and low fees.",
            icon: "🌍💸",
            path: "/CrossBorderPayment",
        },
        {
            title: 'Customer Support',
            description: 'Get support for any issues you may face through live chat or email.',
            icon: '📞',
            path: '/Help',
        },
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered index

    const containerStyle = {
        height: '100vh',
        padding: '2rem',
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
        gap: '1.5rem',
    };

    const cardStyle = {
        borderRadius: '8px',
        backgroundColor: 'rgba(29, 29, 29, 0.63)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: '0.3s all ease',
    };

    const cardHoverStyle = {
        scale: '1.1',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
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

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Net Banking</h1>
            <div style={gridStyle}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            ...cardStyle,
                            ...(hoveredIndex === index ? cardHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                        onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
                        onClick={() => navigate(feature.path)} // Navigate on click
                    >
                        <div style={iconStyle}>{feature.icon}</div>
                        <div style={titleStyle}>{feature.title}</div>
                        <div style={descriptionStyle}>{feature.description}</div>
                    </div>
                ))}
            </div>
            <footer style={footerStyle}>
                <p>&copy; 2024 Smart Banking Solution. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default NetBanking;
