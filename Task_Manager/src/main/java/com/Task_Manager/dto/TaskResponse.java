package com.Task_Manager.dto;

import java.time.LocalDateTime;

import com.Task_Manager.entity.TaskStage;

import lombok.Builder;
import lombok.Data;

@Builder
@Data	
public class TaskResponse {
	
	private int id;
	private String title;
	private String description;
	private TaskStage stage;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
		

}
