package com.mindflow.backend.controller;

import com.mindflow.backend.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class Event {
    private final EventRepository repo;


    record EventDTO(UUID id, String title, Instant startAt, Instant endAt, String description, String source){}


    @PostMapping
    public EventDTO create(@RequestBody EventDTO dto){
        if(dto.title()==null || dto.title().isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "title required");
        if(dto.startAt()==null || dto.endAt()==null || !dto.endAt().isAfter(dto.startAt()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid time range");
        Event e = new Event();
        e.setTitle(dto.title()); e.setStartAt(dto.startAt()); e.setEndAt(dto.endAt()); e.setDescription(dto.description());
        e = repo.save(e);
        return new EventDTO(e.getId(), e.getTitle(), e.getStartAt(), e.getEndAt(), e.getDescription(), e.getSource().name());
    }


    @GetMapping
    public List<EventDTO> range(@RequestParam String from, @RequestParam String to){
        Instant f = Instant.parse(from); Instant t = Instant.parse(to);
        return repo.findOverlapping(f,t).stream()
                .map(e -> new EventDTO(e.getId(), e.getTitle(), e.getStartAt(), e.getEndAt(), e.getDescription(), e.getSource().name()))
                .toList();
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id){ repo.deleteById(id); }
}