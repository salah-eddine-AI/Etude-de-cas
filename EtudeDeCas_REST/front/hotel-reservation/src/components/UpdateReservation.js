import React, { useState, useEffect } from 'react';

const UpdateReservation = ({ reservationId }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    chambreId: '',
    dateDebut: '',
    dateFin: '',
    preferences: ''
  });
  const [chambres, setChambres] = useState([]);
  const [reservation, setReservation] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const reservationResponse = await fetch(`http://localhost:8082/api/reservations/${reservationId}`);
        if (!reservationResponse.ok) {
          throw new Error("Failed to fetch reservation details");
        }
        const reservationData = await reservationResponse.json();
        setReservation(reservationData);

       
        setFormData({
          clientId: reservationData.client.id,
          chambreId: reservationData.chambre.id,
          dateDebut: reservationData.dateDebut,
          dateFin: reservationData.dateFin,
          preferences: reservationData.preferences,
        });

        
        const chambresResponse = await fetch('http://localhost:8082/api/chambres');
        if (!chambresResponse.ok) {
          throw new Error("Failed to fetch chambres");
        }
        const chambresData = await chambresResponse.json();
        const availableChambres = chambresData.filter(chambre => chambre.disponible);
        setChambres(availableChambres);

      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reservationId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReservationData = {
      client: { id: formData.clientId },
      chambre: { id: formData.chambreId },
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      preferences: formData.preferences
    };

    try {
      
      const response = await fetch(`http://localhost:8082/api/reservations/${reservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReservationData),
      });

      if (response.ok) {
        alert("Reservation updated successfully!");
      } else {
        throw new Error('Failed to update reservation');
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      alert("Failed to update reservation.");
    }
  };

  if (isLoading) {
    return <p>Loading reservation details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Client ID: </label>
        <input
          name="clientId"
          value={formData.clientId}
          readOnly
        />
      </div>
      <div>
        <label>Chambre: </label>
        <select
          name="chambreId"
          value={formData.chambreId}
          onChange={handleChange}
        >
          <option value="">Select a chambre</option>
          {chambres.map((chambre) => (
            <option key={chambre.id} value={chambre.id}>
              {chambre.type} - {chambre.prix}€/night
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Date: </label>
        <input
          name="dateDebut"
          type="date"
          value={formData.dateDebut}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          name="dateFin"
          type="date"
          value={formData.dateFin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Preferences: </label>
        <textarea
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Reservation</button>
    </form>
  );
};

export default UpdateReservation;
