import React, { useState, useEffect } from 'react';
import { createReservation } from '../services/api';

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    clientId: '',
    chambreId: '',
    dateDebut: '',
    dateFin: '',
    preferences: ''
  });

  const [chambres, setChambres] = useState([]);

  useEffect(() => {
    // Fetch available chambres (with 'disponible' set to true)
    const fetchChambres = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/chambres');
        const data = await response.json();
        // Filter chambres that are available
        const availableChambres = data.filter(chambre => chambre.disponible);
        setChambres(availableChambres);
      } catch (error) {
        console.error("Error fetching chambres:", error);
      }
    };

    fetchChambres();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the reservation data to match the expected structure
    const reservationData = {
      client: { id: formData.clientId },
      chambre: { id: formData.chambreId },
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      preferences: formData.preferences
    };

    try {
      await createReservation(reservationData);
      alert("Reservation created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create reservation.");
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#555',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input 
        name="clientId" 
        placeholder="Client ID" 
        value={formData.clientId} 
        onChange={handleChange} 
        style={inputStyle} 
      />
      <select
        name="chambreId"
        value={formData.chambreId}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select a chambre</option>
        {chambres.map((chambre) => (
          <option key={chambre.id} value={chambre.id}>
            {chambre.type} - ${chambre.prix} per night
          </option>
        ))}
      </select>
      <input 
        name="dateDebut" 
        placeholder="Start Date" 
        type="date" 
        value={formData.dateDebut} 
        onChange={handleChange} 
        style={inputStyle} 
      />
      <input 
        name="dateFin" 
        placeholder="End Date" 
        type="date" 
        value={formData.dateFin} 
        onChange={handleChange} 
        style={inputStyle} 
      />
      <textarea 
        name="preferences" 
        placeholder="Preferences" 
        value={formData.preferences} 
        onChange={handleChange} 
        style={{ ...inputStyle, height: '100px' }} 
      />
      <button 
        type="submit" 
        style={buttonStyle} 
        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} 
        onMouseLeave={(e) => e.target.style.backgroundColor = ''}
      >
        Create Reservation
      </button>
    </form>
  );
};

export default CreateReservation;
