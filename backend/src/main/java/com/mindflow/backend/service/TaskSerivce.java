package com.mindflow.backend.service;

import com.mindflow.backend.repository.TaskRepository;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskSerivce implements TaskRepository {
    private final TaskRepository taskRepository;

    public TaskSerivce(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task getTask(UUID id){
        return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("task not found"));
    }
    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(UUID id, Task updatedTask){
        Task task = getTask(id);

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(task);
    }

    public void deletTask(UUID id){
        taskRepository.deleteById(id);
    }
}
