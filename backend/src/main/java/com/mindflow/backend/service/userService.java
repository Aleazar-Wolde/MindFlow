package com.mindflow.backend.service;

import org.apache.catalina.User;
import com.mindflow.backend.domain.User;
import java.util.Optional;

public class userService {
    User registerUser(User user) {
        return null;
    }

    Optional<User> getUserByEmail(String email) {
        return null;
    }

    boolean authenticateUser(String email, String password);
}
