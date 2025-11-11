//package com.mindflow.backend.service;
//
//import com.mindflow.backend.domain.Reflection;
//import com.mindflow.backend.repository.ReflectionRepository;
//import io.micrometer.common.lang.Nullable;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ReflectionService {
//    private final ReflectionRepository repo;
//
//
//    public Reflection upsert(LocalDate date, String content, @Nullable Mood mood){
//        Reflection r = repo.findByDate(date).orElseGet(Reflection::new);
//        r.setDate(date); r.setContent(content); r.setMood(mood); return repo.save(r);
//    }
//
//
//    public List<Reflection> list(LocalDate from, LocalDate to){
//        return repo.findByDateBetweenOrderByDateAsc(from, to);
//    }
//
//
//    public int currentStreak(LocalDate today){
//        int streak = 0; LocalDate d = today;
//        while(repo.findByDate(d).isPresent()){ streak++; d = d.minusDays(1); }
//        return streak;
//    }
//}