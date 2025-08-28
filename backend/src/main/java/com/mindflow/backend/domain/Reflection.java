package com.mindflow.backend.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "reflections", uniqueConstraints = @UniqueConstraint(columnNames = {"date"}))
public class Reflection {
    @Id
    @GeneratedValue
    private UUID id;


    @Column(nullable=false)
    private LocalDate date; // YYYY-MM-DD, unique per day


    @Column(nullable=false, length=4000)
    private String content;


    @Enumerated(EnumType.STRING)
    @Column(nullable=true, length=16)
    private Mood mood; // OPTIONAL: HAPPY, NEUTRAL, TIRED, STRESSED


    @Column(nullable=false)
    private Instant createdAt = Instant.now();


    @Column(nullable=false)
    private Instant updatedAt = Instant.now();


    @PreUpdate void onUpdate(){ this.updatedAt = Instant.now(); }


    public enum Mood { HAPPY, NEUTRAL, TIRED, STRESSED }
}