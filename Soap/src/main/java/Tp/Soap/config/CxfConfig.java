package Tp.Soap.config;

import Tp.Soap.WS.ChambreService;
import Tp.Soap.WS.ClientService;
import Tp.Soap.WS.ReservationService;
import lombok.AllArgsConstructor;
import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class CxfConfig {
    private ChambreService chambreService;
    private ClientService clientService;
    private ReservationService reservationService;
    private Bus bus;

    @Bean
    public EndpointImpl endpoint() {
        EndpointImpl endpoint = new EndpointImpl(bus, chambreService);
        endpoint.publish("/chambre");
        return endpoint;
    }
    @Bean
    public EndpointImpl endpoint2() {
        EndpointImpl endpoint = new EndpointImpl(bus, clientService);
        endpoint.publish("/client");
        return endpoint;
    }
    @Bean
    public EndpointImpl endpoint3() {
        EndpointImpl endpoint = new EndpointImpl(bus, reservationService);
        endpoint.publish("/reservation");
        return endpoint;
    }
}
