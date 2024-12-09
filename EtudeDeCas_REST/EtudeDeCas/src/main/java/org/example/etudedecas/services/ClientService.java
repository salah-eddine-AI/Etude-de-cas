package org.example.etudedecas.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.etudedecas.entitys.Client;
import org.example.etudedecas.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id: " + id));
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client updateClient(Long id, Client updatedClient) {
        Client client = getClientById(id);
        client.setNom(updatedClient.getNom());
        client.setPrenom(updatedClient.getPrenom());
        client.setEmail(updatedClient.getEmail());
        client.setTelephone(updatedClient.getTelephone());
        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}
