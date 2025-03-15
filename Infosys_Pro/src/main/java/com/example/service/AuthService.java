package com.example.service;

import com.example.Model.User;
import com.example.repository.UserRepository;
import com.example.security.JwtTokenProvider; // ✅ Import JWT provider
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider; // ✅ Inject JWT Token Provider

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider; // ✅ Initialize JWT Provider
    }

    // ✅ Password Regex: At least 1 uppercase, 1 number, 1 special char, min 8 chars
    private static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists!";
        }

        if (!Pattern.matches(PASSWORD_REGEX, user.getPassword())) {
            return "Password must have at least 1 uppercase letter, 1 number, 1 special character, and be 8+ characters long.";
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        System.out.println("🔹 Storing Hashed Password for " + user.getEmail() + ": " + hashedPassword); // Debug Log

        User newUser = new User(user.getFirstName(), user.getLastName(), user.getEmail(), hashedPassword);
        userRepository.save(newUser);

        return "User registered successfully!";
    }

    public Map<String, String> loginUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            User dbUser = existingUser.get();
            System.out.println("🔹 User found: " + dbUser.getEmail());
            System.out.println("🔹 Stored Hashed Password: " + dbUser.getPassword());

            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) { // ✅ Compare hashed password
                String token = jwtTokenProvider.generateToken(dbUser.getEmail());  // ✅ Generate JWT token

                Map<String, String> response = new HashMap<>();
                response.put("username", dbUser.getEmail());
                response.put("token", token);  // ✅ Include token in response
                response.put("message", "Login successful!");
                return response;
            } else {
                System.out.println("❌ Passwords do not match!");
            }
        } else {
            System.out.println("❌ No user found with email: " + user.getEmail());
        }

        return null; // ❌ Return null if login fails
    }
}
