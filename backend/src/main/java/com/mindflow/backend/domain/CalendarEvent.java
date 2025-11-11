//package com.mindflow.backend.domain;
//
//import jakarta.persistence.*;
//
//import javax.xml.transform.Source;
//import java.time.Instant;
//import java.util.UUID;
//
//@Entity
//@Table(name="events")
//public class CalendarEvent {
//    @Id
//    @GeneratedValue
//    private UUID id;
//    @Column(nullable=false) private String title;
//    @Column(nullable=false) private Instant startAt;
//    @Column(nullable=false) private Instant endAt;
//    @Column(nullable=true, length=2000) private String description;
//    @Enumerated(EnumType.STRING) @Column(nullable=false)
//    private Source source = Source.LOCAL; // LOCAL, ICS, GOOGLE
//    @Column(nullable=true) private String externalId; // for future sync
//}