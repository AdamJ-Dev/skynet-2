package org.skynet.backend.persistence.repos;

import org.skynet.backend.persistence.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegRepo extends JpaRepository<Flight.Leg, Long> {
}
