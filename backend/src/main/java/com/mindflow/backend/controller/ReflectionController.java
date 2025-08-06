// ReflectionController.java
package com.mindflow.backend.controller;

import com.mindflow.backend.domain.Reflection;
import com.mindflow.backend.service.ReflectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reflections")
@CrossOrigin(origins = "http://localhost:3000")
public class ReflectionController {
    private final ReflectionService reflectionService;

    public ReflectionController(ReflectionService reflectionService) {
        this.reflectionService = reflectionService;
    }

    @GetMapping
    public List<Reflection> getAllReflections() {
        return reflectionService.getAllReflections();
    }

    @GetMapping("/{id}")
    public Reflection getReflectionById(@PathVariable UUID id) {
        return reflectionService.getReflectionById(id);
    }

    @PostMapping
    public Reflection createReflection(@RequestBody Reflection reflection) {
        return reflectionService.createReflection(reflection);
    }

    @PutMapping("/{id}")
    public Reflection updateReflection(@PathVariable UUID id, @RequestBody Reflection reflection) {
        return reflectionService.updateReflection(id, reflection);
    }

    @DeleteMapping("/{id}")
    public void deleteReflection(@PathVariable UUID id) {
        reflectionService.deleteReflection(id);
    }
}
