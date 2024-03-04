package com.waremaster.backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waremaster.backend.entity.ProductMovementRequest;
import com.waremaster.backend.repository.ProductMovementRequestRepository;
import com.waremaster.backend.services.ProductMovementRequestService;

@RestController
@RequestMapping(path="/api/productmovement", produces="application/json")
public class ProductMovementRequestController {

	@Autowired
	ProductMovementRequestRepository productMovementRequestRepository;
	
	@Autowired
	ProductMovementRequestService productMovementRequestService;

	@PostMapping(value="/save")
	public ProductMovementRequest save(@RequestBody ProductMovementRequest productMovementRequest) {
		
		return productMovementRequestService.handleRequest(productMovementRequest);
	}
}
