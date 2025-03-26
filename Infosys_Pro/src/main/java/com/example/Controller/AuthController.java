package com.example.Controller;

import com.example.Model.User;
import com.example.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String result = authService.registerUser(user);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Map<String, String> result = authService.loginUser(user);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.status(401).body("Invalid email or password");
    }

    // 🔹 Step 1: User enters email, return the security question
    @PostMapping("/forgot-password")
    public ResponseEntity<?> getSecurityQuestion(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String question = authService.getSecurityQuestion(email);
        return question != null ? ResponseEntity.ok(Map.of("securityQuestion", question)) 
                                : ResponseEntity.status(404).body("User not found");
    }

    // 🔹 Step 2: User answers security question and resets password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String securityAnswer = request.get("securityAnswer");
        String newPassword = request.get("newPassword");

        String result = authService.resetPassword(email, securityAnswer, newPassword);
        return result.equals("Password reset successful") ? ResponseEntity.ok(result) 
                                                          : ResponseEntity.status(400).body(result);
    }
}
