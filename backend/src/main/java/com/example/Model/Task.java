package com.example.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {
    private String id;
    private String email;
    private String title;
    private String priority;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime reminder;

    private boolean emailSent = false;

    public Task() {}

    public Task(String id, String email, String title, String priority, LocalDateTime dueDate, LocalDateTime reminder) {
        this.id = id;
        this.email = email;
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.reminder = reminder;
        this.emailSent = false;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public Boolean getemailSent() { return emailSent; }
    public void setEmailSent(Boolean emailSent) { this.emailSent = emailSent; }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", title='" + title + '\'' +
                ", priority='" + priority + '\'' +
                ", dueDate=" + dueDate +
                ", reminder=" + reminder +
                '}';
    }

    public boolean isEmailSent() {
        return emailSent;
    }

    public void setEmailSent(boolean emailSent) {
        this.emailSent = emailSent;
    }
}
