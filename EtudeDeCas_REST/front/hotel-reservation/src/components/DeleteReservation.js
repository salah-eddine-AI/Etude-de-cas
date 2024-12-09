import React from 'react';
import { deleteReservation } from '../services/api';

const DeleteReservation = ({ reservationId }) => {
  const handleDelete = async () => {
    try {
      await deleteReservation(reservationId);
      alert("Reservation deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete reservation.");
    }
  };

  return <button onClick={handleDelete}>Delete Reservation</button>;
};

export default DeleteReservation;
