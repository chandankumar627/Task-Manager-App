package com.Task_Manager.dto;

import com.Task_Manager.entity.TaskStage;

import lombok.Data;

@Data
public class TaskRequest {
	
	private String title;
	
	private String description;
	
	private TaskStage stage;

	

}
