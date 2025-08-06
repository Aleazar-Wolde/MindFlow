package com.mindflow.backend.controller;

import com.mindflow.backend.service.TaskSerivce;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost5173")
public class TaskController {
    private final TaskSerivce taskService;

    public TaskController(TaskSerivce taskService){
        this.taskService = taskService;
    }
    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }
    @GetMapping("/{id}")
    public Task getAllTasks(@PathVariable UUID id){
        return taskService.getTaskById(id);
    }
    @PostMapping
    public Task createTask(@PathVariable UUID id, @RequestBody Task task){
        return taskService.updateTask(id, task);
    }
    @DeleteMapping("/{id")
    public void deleteTask(@PathVariable UUID id){
        taskService.deleteTask(id);
    }
}
