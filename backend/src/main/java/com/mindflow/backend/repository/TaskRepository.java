package com.mindflow.backend.repository;

import com.mindflow.backend.domain.Task;
import com.mindflow.backend.domain.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {

    // 1. All tasks for a specific user
    List<Task> findByUserId(UUID userId);

    // 2. All tasks for a user with a given status
    List<Task> findByUserIdAndStatus(UUID userId, TaskStatus status);

    // 3. All tasks for a user due before a certain date (overdue)
    List<Task> findByUserIdAndDueDateBefore(UUID userId, LocalDate date);

    // 4. Tasks for a user due in a date range
    List<Task> findByUserIdAndDueDateBetween(UUID userId, LocalDate start, LocalDate end);

    // 5. Optionally: important tasks (importance ≥ threshold)
    List<Task> findByUserIdAndImportanceGreaterThanEqual(UUID userId, Integer importanceThreshold);
}
