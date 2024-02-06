package com.waremaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.ProductMovementRequest;
import com.waremaster.backend.repository.ProductMovementRequestRepository;

@RestController
@RequestMapping(path="/api/productmovement", produces="application/json")
public class ProductMovementRequestController {

	@Autowired
	ProductMovementRequestRepository productMovementRequestRepository;

	@PostMapping
	public void save(@RequestBody ProductMovementRequest productMovementRequest) {
		productMovementRequestRepository.save(productMovementRequest);
	}
}
