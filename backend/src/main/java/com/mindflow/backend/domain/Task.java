package com.mindflow.backend.domain;

import java.time.LocalDate;

public class Task {
    private String title;
    private LocalDate dueDate;
    private int importance;

    public Task(String title, LocalDate dueDate, int importance){
        this.title = title;
        this.dueDate = dueDate;
        this.importance = importance;
    }

    // what the task can do
    public boolean isOverdue(){
        return dueDate.isBefore(LocalDate.now());
    }

    //Getter (to access the private fields)
    public String getTitle(){
        return title;
    }

    public LocalDate getDueDate(){
        return dueDate;
    }
    public int getImportance(){
        return importance;
    }
}
