package com.mindflow.backend.repository;

import com.mindflow.backend.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    @Query("select e from Event e where e.startAt < :to and e.endAt > :from order by e.startAt asc")
    List<Event> findOverlapping(@Param("from") Instant from, @Param("to") Instant to);
}