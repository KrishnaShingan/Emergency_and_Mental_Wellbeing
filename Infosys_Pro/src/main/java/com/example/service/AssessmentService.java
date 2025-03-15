package com.example.service;

import com.example.Model.Assessment;
import com.example.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssessmentService {
    @Autowired
    private AssessmentRepository repository;

    public Assessment saveAssessment(String username, List<Integer> responses) {
        @SuppressWarnings("unused")
        int score = responses.stream().mapToInt(Integer::intValue).sum();
        Assessment assessment = new Assessment(username, responses);
        
        Assessment savedAssessment = repository.save(assessment);
        System.out.println("✅ Saved Assessment ID: " + savedAssessment.getId()); // Debugging
        return savedAssessment;
    }
    

    public List<Assessment> getUserHistory(String username) {
        return repository.findByUsernameOrderByTimestampDesc(username);
    }

    public boolean deleteAssessment(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            System.out.println("✅ Deleted assessment with ID: " + id);
            return true;
        }
        System.out.println("⚠️ Assessment not found for ID: " + id);
        return false;
    }
    
}
