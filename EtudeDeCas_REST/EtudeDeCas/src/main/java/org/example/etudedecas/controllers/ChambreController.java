package org.example.etudedecas.controllers;

import org.example.etudedecas.entitys.Chambre;
import org.example.etudedecas.services.ChambreService;
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

    @PostMapping
    public ResponseEntity<Chambre> createChambre(@RequestBody Chambre chambre) {
        return new ResponseEntity<>(chambreService.createChambre(chambre), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chambre> getChambreById(@PathVariable Long id) {
        return ResponseEntity.ok(chambreService.getChambreById(id));
    }

    @GetMapping
    public ResponseEntity<List<Chambre>> getAllChambres() {
        return ResponseEntity.ok(chambreService.getAllChambres());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chambre> updateChambre(@PathVariable Long id, @RequestBody Chambre chambre) {
        return ResponseEntity.ok(chambreService.updateChambre(id, chambre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChambre(@PathVariable Long id) {
        chambreService.deleteChambre(id);
        return ResponseEntity.noContent().build();
    }
}
