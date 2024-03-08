package com.waremaster.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.waremaster.backend.entity.User;
import com.waremaster.backend.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public User regUser(User user) {
		user.setRole("1");
		user.setUsername("un");
		return userRepository.save(user);
	}
}
