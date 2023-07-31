package org.skynet.backend.persistence.repos;

import com.fasterxml.jackson.databind.JsonNode;
import org.skynet.backend.persistence.entities.Programme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgrammeRepo extends JpaRepository<Programme, Long> {

//    @Query("SELECT * FROM Programme LEFT JOIN Location ON Programme.id = Location.programmeID")
//    List<Programme> getAllProgrammesWithLocation();

//    @Query("SELECT * FROM Programme LEFT JOIN Location ON Programme.id = Location.programmeID")
//    Programme getAllProgrammesWithLocationById(Long id);

    //insert into channel values(1,'red','red channel','channel1’);
    //insert into programme values(1,1,'blah','30/7','31/7','blatitle’);
    //insert into location values(50.5,0.1,1,1,'london','blah’);


    //select * from programme inner join location on programme.id = location.programmeid
}
