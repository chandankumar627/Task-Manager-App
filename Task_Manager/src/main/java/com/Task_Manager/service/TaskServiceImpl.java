package com.Task_Manager.service;

import java.net.Authenticator.RequestorType;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Task_Manager.dto.TaskRequest;
import com.Task_Manager.dto.TaskResponse;
import com.Task_Manager.entity.Task;
import com.Task_Manager.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService{
	
	@Autowired
	private TaskRepository taskRepository;

	@Override
	public TaskResponse createTAsk(TaskRequest request) {
		
	       Task task = Task.builder()
	    		   .title(request.getTitle())
	    		   .description(request.getDescription())
	    		   .stage(request.getStage())
	    		   .build();
	       Task saveTask = taskRepository.save(task);
	       
	       return mapToResponse(saveTask);
	    		   
	       
	}       
	       

	@Override
	public List<TaskResponse> getAllTasks() {
		return taskRepository.findAll()
				.stream()
				.map(this::mapToResponse)
				.toList();
	}

	@Override
	public TaskResponse getallTaskById(int id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Task Not Found"));
		
		return mapToResponse(task);
	}

	@Override
	public TaskResponse updateTask(int id, TaskRequest request) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Task not found"));
		
		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setStage(request.getStage());
		
		Task savedTask = taskRepository.save(task);
		return mapToResponse(savedTask);
		
	}	

	@Override
	public void deleteTask(int id) {
		Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
		taskRepository.delete(task);
		
	}
	
	private TaskResponse mapToResponse(Task task) {
		return TaskResponse.builder()
				.id(task.getId())
				.title(task.getTitle())
				.description(task.getDescription())
				.stage(task.getStage())
				.createdAt(task.getCreatedAt())
				.updatedAt(task.getUpdatedAt())
				.build();
				
	}
	
	

}
