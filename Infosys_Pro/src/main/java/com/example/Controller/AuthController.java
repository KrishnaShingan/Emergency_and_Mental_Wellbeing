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

    if (result != null) {
        return ResponseEntity.ok(result);  // ✅ Return JSON with token
    } else {
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}

}
