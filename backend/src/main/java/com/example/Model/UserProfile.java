package com.example.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")  
public class UserProfile {
    @Id
    private String id;
    private String email;  // Unique identifier for each user
    private String name;
    private String phone;
    private String location;

    // Constructors
    public UserProfile() {}

    public UserProfile(String email, String name, String phone, String location) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.location = location;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getEmail() { return email; }  // ✅ Email should not be editable
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }

    public void setName(String name) { this.name = name; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setLocation(String location) { this.location = location; }
}
