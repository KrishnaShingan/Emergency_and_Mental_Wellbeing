package com.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Model.Mood;
import com.example.service.MoodService;

import java.util.List;

@RestController
@RequestMapping("/mood")
public class MoodController {
    @Autowired
    private MoodService moodService;

    @PostMapping("/save")
    public ResponseEntity<Mood> saveOrUpdateMood(@RequestBody Mood mood) {
        if (mood.getUsername() == null || mood.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().build(); // ✅ Validate username
        }
        Mood savedMood = moodService.saveOrUpdateMood(mood);
        return ResponseEntity.ok(savedMood);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Mood>> getUserMoodHistory(@RequestParam String username) {
        List<Mood> moods = moodService.getMoodHistory(username); // ✅ FIXED method call
        return ResponseEntity.ok(moods);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMood(@PathVariable String id) {
        moodService.deleteMood(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Mood> updateMood(@PathVariable String id, @RequestBody Mood mood) {
        mood.setId(id);
        Mood updatedMood = moodService.saveOrUpdateMood(mood);
        return ResponseEntity.ok(updatedMood);
    }
}
