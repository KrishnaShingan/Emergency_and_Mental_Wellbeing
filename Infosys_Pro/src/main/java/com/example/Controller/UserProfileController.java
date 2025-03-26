package com.example.Controller;

import com.example.Model.UserProfile;
import com.example.repository.UserProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    private final UserProfileRepository userProfileRepository;

    public UserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    // ✅ Fetch user profile based on email
    @GetMapping
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
    
        UserProfile profile = userProfileRepository.findByEmail(email);
    
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            UserProfile newProfile = new UserProfile(email, "", "", "");
            userProfileRepository.save(newProfile);
            return ResponseEntity.ok(newProfile);
        }
    }
    

    // ✅ Update user profile (but not email)
    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfile updatedProfile) {
        UserProfile existingProfile = userProfileRepository.findByEmail(updatedProfile.getEmail());

        if (existingProfile != null) {
            existingProfile.setName(updatedProfile.getName());
            existingProfile.setPhone(updatedProfile.getPhone());
            existingProfile.setLocation(updatedProfile.getLocation());

            userProfileRepository.save(existingProfile);
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.status(404).body("Profile not found");
        }
    }
}
