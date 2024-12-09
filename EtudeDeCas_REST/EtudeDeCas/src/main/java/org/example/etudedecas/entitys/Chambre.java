package org.example.etudedecas.entitys;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Chambre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private double prix;
    private boolean disponible;


    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public double getPrix() {
        return prix;
    }

    public boolean isDisponible() {
        return disponible;
    }
}
