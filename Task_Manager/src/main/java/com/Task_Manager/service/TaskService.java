package com.Task_Manager.service;

import java.util.List;

import com.Task_Manager.dto.TaskRequest;
import com.Task_Manager.dto.TaskResponse;

public interface TaskService {

	TaskResponse createTAsk(TaskRequest request);
	
	List<TaskResponse> getAllTasks();
	
	TaskResponse getallTaskById(int id);
	
	TaskResponse updateTask(int id, TaskRequest request);
	
	void deleteTask(int id);
}
