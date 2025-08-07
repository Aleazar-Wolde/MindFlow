// src/main/java/com/mindflow/backend/service/UserService.java
package com.mindflow.backend.service;

import com.mindflow.backend.domain.User;
import com.mindflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        // TODO: hash password before saving
        return userRepository.save(user);
    }

    public User updateUser(UUID id, User updated) {
        User user = getUserById(id);
        user.setName(updated.getName());
        user.setEmail(updated.getEmail());
        user.setPassword(updated.getPassword()); // TODO: re-hash if changed
        return userRepository.save(user);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}