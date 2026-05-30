package com.Task_Manager.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Task_Manager.dto.TaskRequest;
import com.Task_Manager.dto.TaskResponse;
import com.Task_Manager.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {
	
	private final TaskService taskService;

	@GetMapping("/")
    public String home() {
        return "Task Manager Backend Running Successfully!";
    }
	
	@PostMapping
	public TaskResponse createdTask(@RequestBody TaskRequest request) {
		return taskService.createTAsk(request);
	}
	
	@GetMapping
	public List<TaskResponse> getAllTask(){
		return taskService.getAllTasks();
	}

	@GetMapping("/{id}")
	public TaskResponse getById(@PathVariable int id) {
		return taskService.getallTaskById(id);
		
	}
	
	@PutMapping("/{id}")
	public TaskResponse updatetask(@PathVariable int id, @RequestBody TaskRequest taskRequest) {
		return taskService.updateTask(id, taskRequest);
	}
	
	@DeleteMapping("/{id}")
	public String deleteById(@PathVariable int id) {
		taskService.deleteTask(id);
		
		return "Task Deleted Successfully";
	}
	
}
