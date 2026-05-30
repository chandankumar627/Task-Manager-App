package com.Task_Manager.service;

import com.Task_Manager.dto.AuthResponse;
import com.Task_Manager.dto.LoginRequest;
import com.Task_Manager.dto.RegisterRequest;

public interface AuthService {
	
	String register(RegisterRequest request);
	
	AuthResponse login(LoginRequest request);

}
