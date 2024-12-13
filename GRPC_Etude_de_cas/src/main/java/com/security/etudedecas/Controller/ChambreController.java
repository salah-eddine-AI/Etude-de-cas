package com.security.etudedecas.Controller;

import com.security.etudedecas.entities.Chambre;
import com.security.etudedecas.service.ChambreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chambres")
public class ChambreController {

    @Autowired
    private ChambreService chambreService;

    // Créer une chambre
    @PostMapping
    public ResponseEntity<Chambre> createChambre(@RequestBody Chambre chambre) {
        return new ResponseEntity<>(chambreService.createChambre(chambre), HttpStatus.CREATED);
    }

    // Obtenir une chambre par ID
    @GetMapping("/{id}")
    public ResponseEntity<Chambre> getChambreById(@PathVariable Long id) {
        return ResponseEntity.ok(chambreService.getChambreById(id));
    }

    // Obtenir toutes les chambres
    @GetMapping
    public ResponseEntity<List<Chambre>> getAllChambres() {
        return ResponseEntity.ok(chambreService.getAllChambres());
    }

    // Mettre à jour une chambre
    @PutMapping("/{id}")
    public ResponseEntity<Chambre> updateChambre(@PathVariable Long id, @RequestBody Chambre chambre) {
        return ResponseEntity.ok(chambreService.updateChambre(id, chambre));
    }

    // Supprimer une chambre par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChambre(@PathVariable Long id) {
        chambreService.deleteChambre(id);
        return ResponseEntity.noContent().build();
    }
}
