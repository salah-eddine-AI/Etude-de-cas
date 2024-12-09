package org.example.etudedecas.controllers;

import org.example.etudedecas.entitys.Chambre;
import org.example.etudedecas.services.ChambreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class ChambreController {

    @Autowired
    private ChambreService chambreService;

    // Query for getting all chambres
    @QueryMapping
    public List<Chambre> getAllChambres() {
        return chambreService.getAllChambres();
    }

    // Query for getting chambre by ID
    @QueryMapping
    public Chambre getChambreById(@Argument Long id) {
        Chambre chambre = chambreService.getChambreById(id);  // Assuming this returns a Chambre or null
        if (chambre == null) {
            throw new RuntimeException(String.format("Chambre %s not found", id));
        }
        return chambre;
    }


    // Mutation for creating a new chambre
    @MutationMapping
    public Chambre createChambre(@Argument Chambre chambre) {
        return chambreService.createChambre(chambre);
    }

    // Mutation for updating an existing chambre
    @MutationMapping
    public Chambre updateChambre(@Argument Long id, @Argument Chambre chambre) {
        return chambreService.updateChambre(id, chambre);
    }

    // Mutation for deleting a chambre
    @MutationMapping
    public Boolean deleteChambre(@Argument Long id) {
        chambreService.deleteChambre(id);
        return true;
    }
}
