// ReflectionController.java
package com.mindflow.backend.controller;

import com.mindflow.backend.domain.Reflection;
import com.mindflow.backend.service.ReflectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/reflections")
@RequiredArgsConstructor
public class ReflectionController {
    private final ReflectionService service;


    @PostMapping
    public Reflection createOrUpdate(@RequestBody Map<String,Object> body){
        LocalDate date = Optional.ofNullable((String) body.get("date"))
                .map(LocalDate::parse).orElse(LocalDate.now());
        String content = Objects.toString(body.get("content"), "").trim();
        Reflection.Mood mood = Optional.ofNullable((String) body.get("mood"))
                .map(s -> Reflection.Mood.valueOf(s.toUpperCase()))
                .orElse(null);
        if(content.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "content required");
        return service.upsert(date, content, mood);
    }


    @GetMapping
    public List<Reflection> list(@RequestParam String from, @RequestParam String to){
        return service.list(LocalDate.parse(from), LocalDate.parse(to));
    }


    @GetMapping("/streak")
    public Map<String,Integer> streak(){
        return Map.of("streak", service.currentStreak(LocalDate.now()));
    }
}