package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class InfosysProApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfosysProApplication.class, args);
	}
}


@RestController
@RequestMapping("/")
class  Hello{
	@GetMapping
	public String home() {
		return "Hello";
	}
}