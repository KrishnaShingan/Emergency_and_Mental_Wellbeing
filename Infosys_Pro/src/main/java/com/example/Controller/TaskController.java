package com.example.Controller;

import com.example.Model.Task;
import com.example.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // ✅ Get tasks for a specific user
    @GetMapping("/{username}")
    public List<Task> getTasksByUser(@PathVariable String username) {
        List<Task> tasks = taskRepository.findByUsername(username);
        if (tasks.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No tasks found for user: " + username);
        }
        return tasks;
    }

    // ✅ Create a new task for a user
    @PostMapping("/{username}")
    public Task createTask(@PathVariable String username, @RequestBody Task task) {
        if (task.getTitle() == null || task.getDueDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task title and due date are required.");
        }
        task.setUsername(username);
        return taskRepository.save(task);
    }

    // ✅ Update a user's task
    @PutMapping("/{username}/{id}")
    public Task updateTask(@PathVariable String username, @PathVariable String id, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found.");
        }

        Task task = optionalTask.get();
        if (!task.getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to update this task.");
        }

        task.setTitle(updatedTask.getTitle());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setReminder(updatedTask.getReminder());

        return taskRepository.save(task);
    }

    // ✅ Delete a user's task
    @DeleteMapping("/{username}/{id}")
    public String deleteTask(@PathVariable String username, @PathVariable String id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found.");
        }

        Task task = optionalTask.get();
        if (!task.getUsername().equals(username)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to delete this task.");
        }

        taskRepository.deleteById(id);
        return "Task deleted successfully.";
    }
}
