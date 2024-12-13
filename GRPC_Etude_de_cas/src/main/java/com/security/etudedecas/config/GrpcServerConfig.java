package com.security.etudedecas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import net.devh.boot.grpc.server.serverfactory.GrpcServerConfigurer;

@Configuration
public class GrpcServerConfig {

    @Bean
    public GrpcServerConfigurer grpcServerConfigurer() {
        return serverBuilder -> {
            // Ajouter ici des configurations spécifiques si nécessaire
        };
    }
}
