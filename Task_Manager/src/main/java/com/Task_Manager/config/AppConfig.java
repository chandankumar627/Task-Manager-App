package com.Task_Manager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {
	
	public PasswordEncoder passwordEncoded() {
		return new BCryptPasswordEncoder();
	}

}
