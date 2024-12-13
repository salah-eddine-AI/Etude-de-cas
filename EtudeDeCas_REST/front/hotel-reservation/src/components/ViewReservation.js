import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReservationById, updateReservation } from '../services/api';

const ViewReservation = () => {
  const { reservationId } = useParams(); 
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [chambres, setChambres] = useState([]); 
  const [selectedChambre, setSelectedChambre] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await getReservationById(reservationId);
        setReservation(response.data);
        setSelectedChambre(response.data.chambre); 
      } catch (error) {
        console.error("Failed to fetch reservation details:", error);
      }
    };

    const fetchChambres = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/chambres');
        if (!response.ok) throw new Error('Failed to fetch chambres');
        const chambresData = await response.json();
        const availableChambres = chambresData.filter(chambre => chambre.disponible); 
        setChambres(availableChambres);
      } catch (error) {
        console.error("Failed to fetch available chambres:", error);
      }
    };

    fetchReservation();
    fetchChambres();
  }, [reservationId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleChambreChange = (e) => {
    const chambreId = e.target.value;
    const selectedChambre = chambres.find(chambre => chambre.id === parseInt(chambreId));
    setSelectedChambre(selectedChambre);
  };

  // Handle updating the reservation
  const handleUpdate = async () => {
    try {
      const updatedReservation = {
        ...reservation,
        chambre: { id: selectedChambre.id }, // Update chambre ID with selected chambre
      };
      await updateReservation(reservationId, updatedReservation);
      navigate('/reservations'); 
    } catch (error) {
      console.error("Failed to update reservation:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Reservation</h2>
      {reservation ? (
        <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Client ID:</label>
            <input
              type="text"
              name="clientId"
              value={reservation.client.id}
              onChange={handleChange}
              disabled
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Client Name:</label>
            <input
              type="text"
              name="clientName"
              value={`${reservation.client.email} ${reservation.client.prenom}`}
              onChange={handleChange}
              disabled
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Chambre:</label>
            <input
              type="text"
              value={`${selectedChambre.type} - ${selectedChambre.prix} per night`}
              disabled
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select a new Chambre:</label>
            <select
              name="chambreId"
              value={selectedChambre.id}
              onChange={handleChambreChange}
              style={styles.input}
            >
              {chambres.map((chambre) => (
                <option key={chambre.id} value={chambre.id}>
                  {chambre.type} - {chambre.prix} per night
                </option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Start Date:</label>
            <input
              type="date"
              name="dateDebut"
              value={reservation.dateDebut}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>End Date:</label>
            <input
              type="date"
              name="dateFin"
              value={reservation.dateFin}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Preferences:</label>
            <input
              type="text"
              name="preferences"
              value={reservation.preferences}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button style={styles.updateButton} onClick={handleUpdate}>
            Update Reservation
          </button>
        </form>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginTop: '5px',
  },
  updateButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    alignSelf: 'center',
  },
};

export default ViewReservation;
