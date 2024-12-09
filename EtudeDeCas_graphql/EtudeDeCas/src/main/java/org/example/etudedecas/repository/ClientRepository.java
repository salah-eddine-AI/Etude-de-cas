package org.example.etudedecas.repository;

import org.example.etudedecas.entitys.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
