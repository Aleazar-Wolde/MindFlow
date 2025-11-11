//package com.mindflow.backend.service;
//
//import com.mindflow.backend.repository.TaskRepository;
//import org.springframework.scheduling.config.Task;
//import org.springframework.stereotype.Service;
//
//import java.util.Comparator;
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class AIService {
//    private final TaskRepository tasks; // existing repo
//
//
//    public List<UUID> suggestTop3(){
//// Pull open tasks
//        List<Task> open = tasks.findOpen(); // define a query or filter in memory
//// Score: dueSoon + priority + freshness + momentum
//        return open.stream()
//                .sorted(Comparator.comparingDouble(this::score).reversed())
//                .limit(3)
//                .map(Task::getId)
//                .toList();
//    }
//
//
//    private double score(Task t){
//        double s = 0;
//// due date urgency
//        if(t.getDueDate()!=null){
//            long days = ChronoUnit.DAYS.between(LocalDate.now(), t.getDueDate());
//            s += switch((int) Math.min(Math.max(days, -7), 14)){ // clamp
//                case Integer d when d<=0 -> 5; // overdue
//                case 1,2 -> 4; case 3,4 -> 3; case 5,6,7 -> 2; default -> 1;
//            };
//        }
//// status: prioritize PENDING over IN_PROGRESS over COMPLETED
//        s += switch(t.getStatus()){
//            case PENDING -> 2.5; case IN_PROGRESS -> 1.5; case COMPLETED -> -10; };
//// title hint (quick wins)
//        s += (t.getTitle()!=null && t.getTitle().toLowerCase().contains("read")) ? 0.3 : 0;
//// recency penalty to avoid stale forever
//        s += Math.max(0, 2.0 - daysSince(t.getCreatedAt())*0.05);
//        return s;
//    }
//
//
//    private long daysSince(Instant created){ return ChronoUnit.DAYS.between(created, Instant.now()); }
//}