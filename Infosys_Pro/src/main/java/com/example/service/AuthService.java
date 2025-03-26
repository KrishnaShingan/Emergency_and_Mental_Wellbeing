package com.example.service;

import com.example.Model.User;
import com.example.security.JwtTokenProvider;   
import com.example.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtTokenProvider jwtTokenProvider) { 
        this.jwtTokenProvider = jwtTokenProvider;   
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        
    }

    private static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists!";
        }

        if (!Pattern.matches(PASSWORD_REGEX, user.getPassword())) {
            return "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be 8+ characters long.";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully!";
    }

    public String getSecurityQuestion(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(User::getSecurityQuestion).orElse(null);
    }

    public String resetPassword(String email, String securityAnswer, String newPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();

        if (!user.getSecurityAnswer().equalsIgnoreCase(securityAnswer.trim())) {
            return "Incorrect security answer!";
        }

        if (!Pattern.matches(PASSWORD_REGEX, newPassword)) {
            return "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be 8+ characters long.";
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "Password reset successful";
    }

        public Map<String, String> loginUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtTokenProvider.generateToken(user.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("username", user.getEmail());
            response.put("token", token);
            return response;
        }
        return null;
    }
}
