package com.mindflow.backend.service;

import com.mindflow.backend.domain.Task;
import com.mindflow.backend.domain.TaskStatus;
import com.mindflow.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Basic CRUD
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTask(UUID id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(UUID id, Task updatedTask) {
        Task task = getTask(id);
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setEstimatedMinutes(updatedTask.getEstimatedMinutes());
        task.setImportance(updatedTask.getImportance());
        task.setStatus(updatedTask.getStatus());
        return taskRepository.save(task);
    }

    public void deleteTask(UUID id) {
        taskRepository.deleteById(id);
    }

    // Custom queries

    /**
     * Get all tasks for a specific user
     */
    public List<Task> getTasksByUser(UUID userId) {
        return taskRepository.findByUserId(userId);
    }

    /**
     * Get tasks for a user filtered by status
     */
    public List<Task> getTasksByUserAndStatus(UUID userId, TaskStatus status) {
        return taskRepository.findByUserIdAndStatus(userId, status);
    }

    /**
     * Get overdue tasks for a user (due before today)
     */
    public List<Task> getOverdueTasks(UUID userId) {
        return taskRepository.findByUserIdAndDueDateBefore(userId, LocalDate.now());
    }

    /**
     * Get tasks for a user in a specific date range
     */
    public List<Task> getTasksInDateRange(UUID userId, LocalDate start, LocalDate end) {
        return taskRepository.findByUserIdAndDueDateBetween(userId, start, end);
    }

    /**
     * Get important tasks for a user (importance >= threshold)
     */
    public List<Task> getImportantTasks(UUID userId, Integer importanceThreshold) {
        return taskRepository.findByUserIdAndImportanceGreaterThanEqual(userId, importanceThreshold);
    }
}
