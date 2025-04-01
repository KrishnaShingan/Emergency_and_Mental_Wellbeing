package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.Model.Task;
import com.example.repository.TaskRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TaskRepository taskRepository;

    public void sendTaskReminder(Task task) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(task.getEmail());
            message.setSubject("Task Reminder: " + task.getTitle());
            message.setText("Hello ,\n\n" +
                    "This is a reminder for your task: " + task.getTitle() +
                    "\nDue Date: " + task.getDueDate() +
                    "\nPriority: " + task.getPriority() +
                    "\n\nBest Regards,\nTask Manager");

            mailSender.send(message);
            task.setEmailSent(true);
            taskRepository.save(task);
            System.out.println("Email sent successfully to: " + task.getEmail());
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
    
    @Scheduled(fixedRate = 60000)
    public void checkAndSendReminders() {
        List<Task> tasks = taskRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (Task task : tasks) {
            if (!task.isEmailSent()) {
                // Check if current time is within 1 minute of reminder time
                long minutesDifference = ChronoUnit.MINUTES.between(now, task.getReminder());
                if (Math.abs(minutesDifference) <= 1) {  // Send if within 1 minute window
                    sendTaskReminder(task);
                }
            }
        }
    }
}