package org.example.etudedecas.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.etudedecas.entitys.Chambre;
import org.example.etudedecas.repository.ChambreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChambreService {
    @Autowired
    private ChambreRepository chambreRepository;

    public Chambre createChambre(Chambre chambre) {
        return chambreRepository.save(chambre);
    }

    public Chambre getChambreById(Long id) {
        return chambreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chambre not found with id: " + id));
    }

    public List<Chambre> getAllChambres() {
        return chambreRepository.findAll();
    }

    public Chambre updateChambre(Long id, Chambre updatedChambre) {
        Chambre chambre = getChambreById(id);
        chambre.setType(updatedChambre.getType());
        chambre.setPrix(updatedChambre.getPrix());
        chambre.setDisponible(updatedChambre.isDisponible());
        return chambreRepository.save(chambre);
    }

    public void deleteChambre(Long id) {
        chambreRepository.deleteById(id);
    }
}
