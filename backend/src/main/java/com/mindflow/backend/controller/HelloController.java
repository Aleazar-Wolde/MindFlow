package com.mindflow.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // GET http://localhost:8080/api/hello
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, MindFlow!";
    }
}
