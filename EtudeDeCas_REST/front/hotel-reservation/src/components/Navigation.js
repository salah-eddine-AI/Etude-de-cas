import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const navStyle = {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#555',
  };

  return (
    <nav style={navStyle}>
      <Link 
        to="/create" 
        style={linkStyle} 
        onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} 
        onMouseLeave={(e) => e.target.style.backgroundColor = ''}
      >
        Create Reservation
      </Link>
      <Link 
        to="/reservations" 
        style={linkStyle} 
        onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} 
        onMouseLeave={(e) => e.target.style.backgroundColor = ''}
      >
        View Reservations
      </Link>
    </nav>
  );
};

export default Navigation;
