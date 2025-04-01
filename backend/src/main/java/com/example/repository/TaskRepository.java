package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Model.Task;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByEmail(String email);
}
