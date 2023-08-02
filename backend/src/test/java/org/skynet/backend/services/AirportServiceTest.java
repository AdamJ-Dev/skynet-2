package org.skynet.backend.services;

import com.amadeus.resources.Location;
import lombok.Data;
import org.junit.jupiter.api.Test;
import org.skynet.backend.rest.dtos.AirportDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AirportServiceTest {

    @Autowired
    private AirportService airportService;

    @Data
    private class TestLocation extends Location{
        private String name;
        private String iataCode;
        public TestLocation(String name, String iataCode){
            this.name = name;
            this.iataCode = iataCode;
        }
    }
    @Test
    void testAirportLocationToDTO() {
        Location[] locations = new Location[]{new TestLocation("HEATHROW","LHR")};
//        locations.add(new TestLocation("HEATHROW","LHR"));
        AirportDTO expectedDTO = new AirportDTO("HEATHROW","LHR");

        assertEquals(expectedDTO,this.airportService.airportLocationToDTO(locations));
    }
}
