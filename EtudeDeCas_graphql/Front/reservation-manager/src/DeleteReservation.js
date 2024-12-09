import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_RESERVATION = gql`
  mutation DeleteReservation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

function DeleteReservation({ reservationId }) {
  const [deleteReservation] = useMutation(DELETE_RESERVATION);

  const handleDelete = async () => {
    try {
      await deleteReservation({ variables: { id: reservationId } });
      alert('Reservation deleted successfully');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteReservation;
