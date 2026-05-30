package com.Task_Manager.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.Task_Manager.dto.AuthResponse;
import com.Task_Manager.dto.LoginRequest;
import com.Task_Manager.dto.RegisterRequest;
import com.Task_Manager.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request) {
    	
        return authService.register(request);
        
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request ) {
    	
        return authService.login(request);
        
    }
}