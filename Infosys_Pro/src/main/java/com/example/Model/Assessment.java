package com.example.Model;  // ✅ Ensure this matches the package

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "assessment")
public class Assessment {
    @Id
    private String id; // ✅ MongoDB should auto-generate this

    private String username;
    private List<Integer> responses;
    private int score;
    private LocalDateTime timestamp;

    // ✅ Add a No-Args Constructor (MongoDB needs this)
    public Assessment() {}

    public Assessment(String username, List<Integer> responses) {
        this.username = username;
        this.responses = responses;
        this.score = responses.stream().mapToInt(Integer::intValue).sum();
        this.timestamp = LocalDateTime.now();
    }

    // ✅ Getters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public List<Integer> getResponses() { return responses; }
    public int getScore() { return score; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // ✅ Setter for ID (if needed)
    public void setId(String id) { this.id = id; }
}
