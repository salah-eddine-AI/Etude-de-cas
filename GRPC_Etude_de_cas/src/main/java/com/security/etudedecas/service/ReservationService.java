package com.security.etudedecas.service;

import com.security.etudedecas.entities.Chambre;
import com.security.etudedecas.entities.Reservation;
import com.security.etudedecas.repositories.ReservationRepository;
import jakarta.persistence.EntityNotFoundException;
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

    // Créer une réservation
    public Reservation createReservation(Reservation reservation) {
        if (reservation.getChambre() == null) {
            throw new IllegalArgumentException("Chambre cannot be null");
        }
        Chambre chambre = chambreService.getChambreById(reservation.getChambre().getId());
        if (!chambre.isDisponible()) {
            throw new IllegalStateException("Chambre is not available");
        }
        chambre.setDisponible(false); // Marquer la chambre comme réservée
        chambreService.updateChambre(chambre.getId(), chambre);
        return reservationRepository.save(reservation);
    }

    // Obtenir une réservation par ID
    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + id));
    }

    // Obtenir toutes les réservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Mettre à jour une réservation
    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        Reservation reservation = getReservationById(id);

        // Vérifier si la chambre est modifiée
        if (!reservation.getChambre().getId().equals(updatedReservation.getChambre().getId())) {
            // Rendre la chambre actuelle disponible
            Chambre oldChambre = chambreService.getChambreById(reservation.getChambre().getId());
            oldChambre.setDisponible(true);
            chambreService.updateChambre(oldChambre.getId(), oldChambre);

            // Vérifier la disponibilité de la nouvelle chambre
            Chambre newChambre = chambreService.getChambreById(updatedReservation.getChambre().getId());
            if (!newChambre.isDisponible()) {
                throw new IllegalStateException("New chambre is not available");
            }

            // Marquer la nouvelle chambre comme réservée
            newChambre.setDisponible(false);
            chambreService.updateChambre(newChambre.getId(), newChambre);

            // Mettre à jour la chambre dans la réservation
            reservation.setChambre(newChambre);
        }

        // Mettre à jour les autres champs de la réservation
        reservation.setClient(updatedReservation.getClient());
        reservation.setDateDebut(updatedReservation.getDateDebut());
        reservation.setDateFin(updatedReservation.getDateFin());
        reservation.setPreferences(updatedReservation.getPreferences());

        return reservationRepository.save(reservation);
    }

    // Supprimer une réservation
    public void deleteReservation(Long id) {
        Reservation reservation = getReservationById(id);

        // Marquer la chambre comme disponible après suppression
        Chambre chambre = chambreService.getChambreById(reservation.getChambre().getId());
        chambre.setDisponible(true);
        chambreService.updateChambre(chambre.getId(), chambre);

        reservationRepository.deleteById(id);
    }
}
