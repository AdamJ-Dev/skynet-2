package org.skynet.backend.persistence.repos;

import org.skynet.backend.persistence.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepo extends JpaRepository<Flight, Long> {
}
