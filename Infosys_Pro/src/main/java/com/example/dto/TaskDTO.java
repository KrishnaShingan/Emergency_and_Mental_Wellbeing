package com.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class TaskDTO {
    private String email;
    private String title;
    private String priority;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reminder;

    public TaskDTO() {}

    public TaskDTO(String email, String title, String priority, LocalDateTime dueDate, LocalDateTime reminder) {
        this.email = email;
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.reminder = reminder;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

    public LocalDateTime getReminder() { return reminder; }
    public void setReminder(LocalDateTime reminder) { this.reminder = reminder; }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "email='" + email + '\'' +
                ", title='" + title + '\'' +
                ", priority='" + priority + '\'' +
                ", dueDate=" + dueDate +
                ", reminder=" + reminder +
                '}';
    }
}
