package org.example.etudedecas.controllers;

import graphql.schema.DataFetcher;
import lombok.AllArgsConstructor;
import org.example.etudedecas.entitys.Chambre;
import org.example.etudedecas.entitys.Client;
import org.example.etudedecas.services.ClientService;
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
@AllArgsConstructor
public class ClientController {
    @Autowired
    private ClientService clientService;

    // Query for getting all clients
    @QueryMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    // Query for getting a client by ID
    @QueryMapping
    public Client getClientById(@Argument Long id) {
        Client client = clientService.getClientById(id);  // Assuming this returns a Chambre or null
        if (client == null) {
            throw new RuntimeException(String.format("client %s not found", id));
        }
        return client;
    }

    // Mutation for creating a new client
    @MutationMapping
    public Client createClient(@Argument Client client) {
        return clientService.createClient(client);
    }

    // Mutation for updating an existing client
    @MutationMapping
    public Client updateClient(@Argument Long id, @Argument Client client) {
        return clientService.updateClient(id, client);
    }

    // Mutation for deleting a client
    @MutationMapping
    public Boolean deleteClient(@Argument Long id) {
        clientService.deleteClient(id);
        return true;
    }
}