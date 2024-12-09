import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_RESERVATIONS = gql`
  query GetAllReservations {
    getAllReservations {
      id
      client {
        nom
        prenom
      }
      chambre {
        type
        prix
      }
      dateDebut
      dateFin
      preferences
    }
  }
`;

function ReservationList() {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Reservations</h2>
      <ul>
        {data.getAllReservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Client: {reservation.client.nom} {reservation.client.prenom}</p>
            <p>Chambre: {reservation.chambre.type} - ${reservation.chambre.prix}</p>
            <p>Date: {reservation.dateDebut} to {reservation.dateFin}</p>
            <p>Preferences: {reservation.preferences}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
