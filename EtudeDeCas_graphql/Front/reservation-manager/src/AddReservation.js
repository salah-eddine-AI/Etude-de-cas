import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_RESERVATION = gql`
  mutation CreateReservation($reservation: ReservationRequist!) {
    createReservation(reservation: $reservation) {
      id
      client {
        nom
        prenom
      }
    }
  }
`;

function AddReservation() {
  const [reservation, setReservation] = useState({
    clientId: '',
    chambreId: '',
    dateDebut: '',
    dateFin: '',
    preferences: '',
  });

  const [createReservation] = useMutation(CREATE_RESERVATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReservation({
        variables: {
          reservation: {
            client: { id: reservation.clientId },
            chambre: { id: reservation.chambreId },
            dateDebut: reservation.dateDebut,
            dateFin: reservation.dateFin,
            preferences: reservation.preferences,
          },
        },
      });
      alert('Reservation added successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Reservation</h2>
      <input
        type="text"
        placeholder="Client ID"
        value={reservation.clientId}
        onChange={(e) => setReservation({ ...reservation, clientId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Chambre ID"
        value={reservation.chambreId}
        onChange={(e) => setReservation({ ...reservation, chambreId: e.target.value })}
      />
      <input
        type="date"
        value={reservation.dateDebut}
        onChange={(e) => setReservation({ ...reservation, dateDebut: e.target.value })}
      />
      <input
        type="date"
        value={reservation.dateFin}
        onChange={(e) => setReservation({ ...reservation, dateFin: e.target.value })}
      />
      <textarea
        placeholder="Preferences"
        value={reservation.preferences}
        onChange={(e) => setReservation({ ...reservation, preferences: e.target.value })}
      />
      <button type="submit">Add Reservation</button>
    </form>
  );
}

export default AddReservation;
