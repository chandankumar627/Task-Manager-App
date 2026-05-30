package com.Task_Manager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Task_Manager.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}
