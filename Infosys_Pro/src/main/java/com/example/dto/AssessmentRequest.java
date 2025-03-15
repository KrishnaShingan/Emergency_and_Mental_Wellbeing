package com.example.dto;

import java.util.List;

public class AssessmentRequest {
    private String username;
    private List<Integer> responses;  // ✅ Ensure List<Integer> is expected

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<Integer> getResponses() { return responses; }
    public void setResponses(List<Integer> responses) { 
        System.out.println("✅ Received Responses: " + responses); // ✅ Debug Log
        this.responses = responses; 
    }
}
