package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.User;
import com.waremaster.backend.repository.UserRepository;

@RestController
@RequestMapping(path="/api/user", produces="application/json")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	public void saave(@RequestBody User user) {
		userRepository.save(user);
	}
}
