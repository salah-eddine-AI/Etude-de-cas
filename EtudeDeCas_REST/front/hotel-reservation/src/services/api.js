import axios from 'axios';

const API_BASE_URL = "http://localhost:8082/api"; // Update with your actual base URL

export const createReservation = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, data);
    return response;
  } catch (error) {
    console.error('Error creating reservation:', error.response || error);
    throw error; // Re-throw error to handle it in the component
  }
};

export const getReservations = () => axios.get(`${API_BASE_URL}/reservations`);
export const getReservationById = (id) => axios.get(`${API_BASE_URL}/reservations/${id}`);
export const updateReservation = (id, data) => axios.put(`${API_BASE_URL}/reservations/${id}`, data);
export const deleteReservation = (id) => axios.delete(`${API_BASE_URL}/reservations/${id}`);

