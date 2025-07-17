package com.mindflow.backend.repository;

import com.mindflow.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<User, Long> {
}
