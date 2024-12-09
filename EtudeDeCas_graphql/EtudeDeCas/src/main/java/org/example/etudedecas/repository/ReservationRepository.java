package org.example.etudedecas.repository;

import org.example.etudedecas.entitys.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
