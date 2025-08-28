package com.mindflow.backend.repository;

import com.mindflow.backend.domain.Reflection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReflectionRepository extends JpaRepository<Reflection, UUID> {
    Optional<Reflection> findByDate(LocalDate date);
    List<Reflection> findByDateBetweenOrderByDateAsc(LocalDate from, LocalDate to);
    long countByDateBetween(LocalDate from, LocalDate to);
}