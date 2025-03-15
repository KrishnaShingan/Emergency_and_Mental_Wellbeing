package com.example.repository;

import com.example.Model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUsername(String username);  // ✅ Fetch tasks for a specific user
}
