//// AIController.java
//package com.mindflow.backend.controller;
//
//import com.mindflow.backend.service.AIService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/ai")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AIController {
//    private final AIService aiService;
//
//    public AIController(AIService aiService) {
//        this.aiService = aiService;
//    }
//
//    @GetMapping("/tips")
//    public List<String> getDailyTips() {
//        return aiService.getDailyTips();
//    }
//}
