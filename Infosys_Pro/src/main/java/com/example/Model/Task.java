package com.example.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String username;  // ✅ User identifier
    private String email;     // ✅ Email to send reminders
    private String title;
    private String priority;
    private String dueDate;
    private String reminder;

    // Constructors
    public Task() {}

    public Task(String username, String email, String title, String priority, String dueDate, String reminder) {
        this.username = username;
        this.email = email;
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.reminder = reminder;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public String getReminder() { return reminder; }
    public void setReminder(String reminder) { this.reminder = reminder; }
}
