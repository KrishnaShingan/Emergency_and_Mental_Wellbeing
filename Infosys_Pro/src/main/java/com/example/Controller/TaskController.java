package com.example.Controller;

import com.example.dto.TaskDTO;
import com.example.Model.Task;
import com.example.service.EmailService;
import com.example.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final EmailService emailService;
    private final JavaMailSender mailSender;

    public TaskController(TaskService taskService,EmailService emailService , JavaMailSender mailSender) {  
        this.taskService = taskService;
        this.emailService = emailService;
        this.mailSender = mailSender;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDTO taskDTO) {
        Task savedTask = taskService.saveTask(taskDTO);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Task>> getTasksByEmail(@PathVariable String email) {
        List<Task> tasks = taskService.getTasksByEmail(email);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody TaskDTO taskDTO) {
        Task updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }


}
