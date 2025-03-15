package com.example.Controller;

import com.example.Model.Assessment;
import com.example.service.AssessmentService;
import com.example.dto.AssessmentRequest;
import com.example.repository.AssessmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "http://localhost:3000")  // Only allow requests from React frontend
public class AssessmentController {

    @Autowired
    private AssessmentService service;

    @SuppressWarnings("unused")
    @Autowired
    private AssessmentRepository assessmentRepository;

    // ✅ Submit Assessment
    @PostMapping
    public Assessment submitAssessment(@RequestBody AssessmentRequest request) {
        System.out.println("🔹 Received assessment: " + request);
        
        Assessment savedAssessment = service.saveAssessment(request.getUsername(), request.getResponses());
        
        if (savedAssessment.getId() == null) {
            System.err.println("❌ Error: Assessment ID is missing after save!");
        } else {
            System.out.println("✅ Successfully saved with ID: " + savedAssessment.getId());
        }
        
        return savedAssessment;
    }

    // ✅ Get Assessment History
    @GetMapping("/history")
    public List<Assessment> getHistory(@RequestParam String username) {
        System.out.println("🔍 Fetching history for: " + username); // ✅ Debug Log

        List<Assessment> history = service.getUserHistory(username);
        
        if (history.isEmpty()) {
            System.out.println("⚠️ No history found for: " + username);
        } else {
            System.out.println("✅ Found " + history.size() + " assessments for: " + username);
        }

        return history;
    }

    // ✅ Delete Assessment (Fix: Added `@DeleteMapping`)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssessment(@PathVariable String id) {
        service.deleteAssessment(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
    
    
    
}
