package com.example.service;

import com.example.dto.TaskDTO;
import com.example.Model.Task;
import com.example.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // ✅ Save a new task for a user without overwriting previous tasks
    public Task saveTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setEmail(taskDTO.getEmail());
        task.setTitle(taskDTO.getTitle());
        task.setPriority(taskDTO.getPriority());
        task.setDueDate(taskDTO.getDueDate());
        task.setReminder(taskDTO.getReminder());
        return taskRepository.save(task);
    }

    // ✅ Get all tasks for a user
    public List<Task> getTasksByEmail(String email) {
        return taskRepository.findByEmail(email);
    }

    // ✅ Delete a task
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    // ✅ Update a specific task
    public Task updateTask(String id, TaskDTO taskDTO) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDTO.getTitle());
            task.setPriority(taskDTO.getPriority());
            task.setDueDate(taskDTO.getDueDate());
            task.setReminder(taskDTO.getReminder());
            return taskRepository.save(task);
        }
        throw new RuntimeException("Task not found.");
    }
}
