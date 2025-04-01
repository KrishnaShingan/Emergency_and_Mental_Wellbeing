package com.example.repository;

import com.example.Model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    UserProfile findByEmail(String email);  // ✅ Find user by email
}
