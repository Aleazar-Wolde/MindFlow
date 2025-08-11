package com.mindflow.backend.controller;

import com.mindflow.backend.domain.Task;
import com.mindflow.backend.domain.TaskStatus;
import com.mindflow.backend.service.TaskService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5175")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // CRUD Endpoints

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable UUID id) {
        return taskService.getTask(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable UUID id,
            @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
    }

    // Custom Endpoints

    /**
     * Get all tasks for a specific user
     */
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable UUID userId) {
        return taskService.getTasksByUser(userId);
    }

    /**
     * Get tasks for a user filtered by status
     */
    @GetMapping("/user/{userId}/status")
    public List<Task> getTasksByUserAndStatus(
            @PathVariable UUID userId,
            @RequestParam TaskStatus status) {
        return taskService.getTasksByUserAndStatus(userId, status);
    }

    /**
     * Get overdue tasks for a user (due before today)
     */
    @GetMapping("/user/{userId}/overdue")
    public List<Task> getOverdueTasks(@PathVariable UUID userId) {
        return taskService.getOverdueTasks(userId);
    }

    /**
     * Get tasks for a user in a specific date range
     */
    @GetMapping("/user/{userId}/range")
    public List<Task> getTasksInDateRange(
            @PathVariable UUID userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return taskService.getTasksInDateRange(userId, start, end);
    }

    /**
     * Get important tasks for a user (importance >= threshold)
     */
    @GetMapping("/user/{userId}/important")
    public List<Task> getImportantTasks(
            @PathVariable UUID userId,
            @RequestParam Integer threshold) {
        return taskService.getImportantTasks(userId, threshold);
    }
}
