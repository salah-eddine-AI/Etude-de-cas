package com.security.etudedecas.service;


import com.security.etudedecas.entities.Chambre;
import com.security.etudedecas.repositories.ChambreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChambreService {

    @Autowired
    private ChambreRepository chambreRepository;

    // Méthode pour créer une chambre
    public Chambre createChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    // Méthode pour récupérer une chambre par ID
    public Chambre getChambreById(Long id) {
        return chambreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chambre not found with id: " + id));
    }

    // Méthode pour récupérer toutes les chambres
    public List<Chambre> getAllChambres() {
        return chambreRepository.findAll();
    }

    // Méthode pour mettre à jour une chambre
    public Chambre updateChambre(Long id, Chambre updatedChambre) {
        Chambre chambre = getChambreById(id);
        chambre.setType(updatedChambre.getType());
        chambre.setPrix(updatedChambre.getPrix());
        chambre.setDisponible(updatedChambre.isDisponible());
        return chambreRepository.save(chambre);
    }

    // Méthode pour supprimer une chambre par ID
    public void deleteChambre(Long id) {
        chambreRepository.deleteById(id);
    }
}
