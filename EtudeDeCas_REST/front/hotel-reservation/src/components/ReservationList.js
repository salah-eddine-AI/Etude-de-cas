import React, { useState, useEffect } from 'react';
import { getReservations } from '../services/api';
import { useNavigate } from 'react-router-dom';
import DeleteReservation from './DeleteReservation';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  // Fetch reservations from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReservations();
        setReservations(response.data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };
    fetchData();
  }, []);

  // Navigate to view page
  const handleUpdate = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reservation List</h2>
      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Client</th>
              <th style={styles.th}>Chambre</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td style={styles.td}>{reservation.id}</td>
                <td style={styles.td}>{reservation.client.nom} {reservation.client.prenom}</td>
                <td style={styles.td}>{reservation.chambre.type}</td>
                <td style={styles.td}>{reservation.dateDebut}</td>
                <td style={styles.td}>{reservation.dateFin}</td>
                <td style={styles.td}>
                  <button
                    style={styles.updateButton}
                    onClick={() => handleUpdate(reservation.id)}
                  >
                    Update
                  </button>
                  <DeleteReservation
                    reservationId={reservation.id}
                    buttonStyle={styles.deleteButton}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    color: '#333',
    marginBottom: '30px',
    fontWeight: '600',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  updateButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ReservationList;
