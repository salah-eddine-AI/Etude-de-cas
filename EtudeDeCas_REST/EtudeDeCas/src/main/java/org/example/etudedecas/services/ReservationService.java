package org.example.etudedecas.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.etudedecas.entitys.Chambre;
import org.example.etudedecas.entitys.Reservation;
import org.example.etudedecas.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ClientService clientService;

    @Autowired
    private ChambreService chambreService;

    public Reservation createReservation(Reservation reservation) {
        if (reservation.getChambre() == null) {
            throw new IllegalArgumentException("Chambre cannot be null");
        }
        Chambre chambre = chambreService.getChambreById(reservation.getChambre().getId());
        if (!chambre.isDisponible()) {
            throw new IllegalStateException("Chambre is not available");
        }
        chambre.setDisponible(false); // Mark the room as booked
        chambreService.updateChambre(chambre.getId(), chambre);
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + id));
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        // Retrieve the existing reservation
        Reservation reservation = getReservationById(id);

        // Check if the room is being changed
        if (!reservation.getChambre().getId().equals(updatedReservation.getChambre().getId())) {
            // Update the availability of the old room
            Chambre oldChambre = chambreService.getChambreById(reservation.getChambre().getId());
            oldChambre.setDisponible(true);
            chambreService.updateChambre(oldChambre.getId(), oldChambre);

            // Check the availability of the new room
            Chambre newChambre = chambreService.getChambreById(updatedReservation.getChambre().getId());
            if (!newChambre.isDisponible()) {
                throw new IllegalStateException("New chambre is not available");
            }

            // Mark the new room as unavailable
            newChambre.setDisponible(false);
            chambreService.updateChambre(newChambre.getId(), newChambre);

            // Update the room in the reservation
            reservation.setChambre(newChambre);
        }

        // Update other fields of the reservation
        reservation.setClient(updatedReservation.getClient());
        reservation.setDateDebut(updatedReservation.getDateDebut());
        reservation.setDateFin(updatedReservation.getDateFin());
        reservation.setPreferences(updatedReservation.getPreferences());

        // Save and return the updated reservation
        return reservationRepository.save(reservation);
    }


    public void deleteReservation(Long id) {
        Reservation reservation = getReservationById(id);

        // Mark the room as available upon deletion
        Chambre chambre = chambreService.getChambreById(reservation.getChambre().getId());
        chambre.setDisponible(true);
        chambreService.updateChambre(chambre.getId(), chambre);

        reservationRepository.deleteById(id);
    }
}
