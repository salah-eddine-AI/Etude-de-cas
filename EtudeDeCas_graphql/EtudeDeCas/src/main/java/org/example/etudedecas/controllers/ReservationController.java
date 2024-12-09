package org.example.etudedecas.controllers;

import graphql.schema.DataFetcher;
import org.example.etudedecas.entitys.Client;
import org.example.etudedecas.entitys.Reservation;
import org.example.etudedecas.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ReservationController {


    @Autowired
    private ReservationService reservationService;

    // Query to get all reservations
    @QueryMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    // Query to get a reservation by ID
    @QueryMapping
    public Reservation getReservationById(@Argument Long id) {
        Reservation reservation = reservationService.getReservationById(id);  // Assuming this returns a Chambre or null
        if (reservation == null) {
            throw new RuntimeException(String.format("reservation %s not found", id));
        }
        return reservation;
    }

    // Mutation to create a new reservation
    @MutationMapping
    public Reservation createReservation(@Argument Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    // Mutation to update an existing reservation
    @MutationMapping
    public Reservation updateReservation(@Argument Long id, @Argument Reservation reservation) {
        return reservationService.updateReservation(id, reservation);
    }

    // Mutation to delete a reservation
    @MutationMapping
    public Boolean deleteReservation(@Argument Long id) {
        reservationService.deleteReservation(id);
        return true;
    }
}