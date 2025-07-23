package com.mindflow.backend.service;

import org.apache.catalina.User;

import java.util.Optional;

public class userService {
    User registerUser(User user);

    Optional<User> getUserByEmail(String email);
}
