package com.mindflow.backend.controller;

import jakarta.websocket.OnClose;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plan")
public class PlanController {
/**
 * Stub endpoint for GET /api/plan/today
 * Returns a JSON structure matching our contract:
 * {
 *   "top_today": [],
 *   "later": [],
 *   "ai_notes": ["MVP stub — replace me"]
 * }
 */
    @GetMapping("/today")
    public String hello() {
        return "Hello, MindFlow!";
    }
//    public ResponseEntity<Map<String, Object>> getTodayPlan(){
//        Map<String, Object> payload = Map.of(
//                "top_today", List.of(),
//                "later", List.of(),
//                "ai_notes", List.of("Map stub - replace me")
//        );
//        return ResponseEntity.ok(payload);
//    }
}
