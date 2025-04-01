package com.example.repository;

import com.example.Model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MoodRepository extends MongoRepository<Mood, String> {
    Optional<Mood> findByUsernameAndDate(String username, String date);
    List<Mood> findByUsername(String username);
}

