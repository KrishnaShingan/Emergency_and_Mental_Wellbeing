package com.example.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Mood Entity - Represents a user's mood entry in the database.
 */
@Document(collection = "moods")  // MongoDB collection name
public class Mood {
    
    @Id
    private String id;  // Unique identifier for the mood entry

    @NotBlank(message = "Username cannot be empty")
    private String username;  // Stores the username (email or unique ID)

    @NotNull(message = "Mood score is required")
    @Min(value = 1, message = "Mood score must be at least 1")
    @Max(value = 10, message = "Mood score cannot exceed 10")
    private int mood;  // Mood rating between 1-10

    private String description;  // Mood description (e.g., "Happy 😊", "Neutral 😐", etc.)

    @NotNull(message = "Sleep hours are required")
    @Min(value = 0, message = "Sleep hours cannot be negative")
    private int sleep;  // Hours of sleep

    @NotNull(message = "Water intake is required")
    @Min(value = 0, message = "Water intake cannot be negative")
    private int water;  // Water intake in milliliters

    @NotBlank(message = "Date is required")
    private String date;  // Date of the mood entry (Format: YYYY-MM-DD)

    // ✅ Default Constructor
    public Mood() {}

    // ✅ Parameterized Constructor
    public Mood(String username, int mood, String description, int sleep, int water, String date) {
        this.username = username;
        this.mood = mood;
        this.description = description;
        this.sleep = sleep;
        this.water = water;
        this.date = date;
    }

    // ✅ Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getMood() {
        return mood;
    }

    public void setMood(int mood) {
        this.mood = mood;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSleep() {
        return sleep;
    }

    public void setSleep(int sleep) {
        this.sleep = sleep;
    }

    public int getWater() {
        return water;
    }

    public void setWater(int water) {
        this.water = water;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    // ✅ Override `toString()` for debugging
    @Override
    public String toString() {
        return "Mood{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", mood=" + mood +
                ", description='" + description + '\'' +
                ", sleep=" + sleep +
                ", water=" + water +
                ", date='" + date + '\'' +
                '}';
    }
}
