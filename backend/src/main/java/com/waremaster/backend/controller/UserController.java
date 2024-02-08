package com.waremaster.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.User;
import com.waremaster.backend.repository.UserRepository;
import com.waremaster.backend.services.JwtTokenProvider;

@RestController
@CrossOrigin
@RequestMapping(path="/api/user", produces="application/json")
public class UserController {

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	UserRepository userRepository;

	public void save(@RequestBody User user) {
		userRepository.save(user);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path = "/find")
	public List<User> find() {
		return userRepository.findAll();
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/login")
	public String[] loginUser(@RequestBody User user) {

		User u = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (u==null) {
			return null;
		}
		System.out.println("Login called with: " + u.toString());
		return u.createUserToken(tokenProvider.createToken(""+u.getId()));
	}

	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/auth")
    public String authUser(@RequestHeader("Authorization") String token) {
        if (tokenProvider.validateToken(token)) {
        	return tokenProvider.getUsernameFromToken(token);
        } else {
            return null;
        }
    }
}
