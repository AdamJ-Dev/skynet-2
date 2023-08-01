package org.skynet.backend.persistence.repos;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.persistence.entities.Programme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgrammeRepo extends JpaRepository<Programme, Long> {

}
