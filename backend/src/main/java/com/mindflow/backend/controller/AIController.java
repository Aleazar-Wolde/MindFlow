// AIController.java
package com.mindflow.backend.controller;

import com.mindflow.backend.domain.Reflection;
import com.mindflow.backend.repository.ReflectionRepository;
import com.mindflow.backend.repository.TaskRepository;
import com.mindflow.backend.service.AIService;
import com.mindflow.backend.service.AiService;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService ai;
    private final TaskRepository tasks;
    private final ReflectionRepository reflections;


    @GetMapping("/top3")
    public List<Task> top3(){ // return full tasks so UI can render titles
        var ids = new HashSet<>(ai.suggestTop3());
        return tasks.findAllById(ids);
    }


    @GetMapping("/weekly-summary")
    public Map<String,Object> weekly(@RequestParam String from, @RequestParam String to){
        LocalDate f = LocalDate.parse(from); LocalDate t = LocalDate.parse(to);
// naive summary – upgrade later
        long completed = tasks.countCompletedBetween(f, t);
        long created = tasks.countCreatedBetween(f, t);
        List<Reflection> notes = reflections.findByDateBetweenOrderByDateAsc(f, t);
        int streak = notes.isEmpty() ? 0 : computeStreakUpTo(t);
        return Map.of(
                "range", Map.of("from", f, "to", t),
                "tasks", Map.of("created", created, "completed", completed),
                "reflections", Map.of("count", notes.size(), "streak", streak),
                "highlights", List.of(
                        created>completed? "You created more than you finished—trim tomorrow's list." : "Great momentum—keep batching similar tasks.",
                        streak>=3? "Reflection streak on—use it to set sharper Top 3." : "Start a reflection streak: 60 seconds nightly." )
        );
    }


    private int computeStreakUpTo(LocalDate day){
        int s=0; for(LocalDate d=day; reflections.findByDate(d).isPresent(); d=d.minusDays(1)) s++; return s;
    }
}
