package com.Task_Manager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Task_Manager.entity.Task;
import com.Task_Manager.entity.User;

public interface TaskRepository extends JpaRepository<Task, Integer>{
	
	List<Task> findByUser(User user);
	
}
