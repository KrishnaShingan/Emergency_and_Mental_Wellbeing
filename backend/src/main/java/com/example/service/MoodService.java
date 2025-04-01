package com.example.service;

import com.example.Model.Mood;
import com.example.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MoodService {
    @Autowired
    private MoodRepository moodRepository;

    public Mood saveOrUpdateMood(Mood mood) {
        // Ensure username is set before saving
        if (mood.getUsername() == null || mood.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }

        Optional<Mood> existingMood = moodRepository.findByUsernameAndDate(mood.getUsername(), mood.getDate());
        if (existingMood.isPresent()) {
            mood.setId(existingMood.get().getId());
        }
        return moodRepository.save(mood);
    }

    public List<Mood> getMoodHistory(String username) { // ✅ FIXED method name to match controller
        return moodRepository.findByUsername(username);
    }

    public void deleteMood(String id) {
        moodRepository.deleteById(id);
    }
}

