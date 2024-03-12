package com.waremaster.backend.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@PostMapping(value="/requestdone/{id}")
	public ProductMovementRequest requestDone(@PathVariable Long id) {
		return productMovementRequestService.requestDone(id);
	}
	
	@PostMapping(value="/requestcancel/{id}")
	public ProductMovementRequest requestCancel(@PathVariable Long id) {
		return productMovementRequestService.requestCancel(id);
	}
	
	@GetMapping(value="/find/{id}")
	Page<ProductMovementRequest> findAll(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size, @PathVariable Long id){
		
		return productMovementRequestRepository.findAllForUser(PageRequest.of(page, size, Sort.by("id").descending()), id);
	}
	
	@GetMapping(value="/getstatus/{id}")
	int[] getStatus(@PathVariable Long id){
		return productMovementRequestService.getStatus(id);
	}
	
	@GetMapping(value="/findbyid/{id}")
	public ProductMovementRequest findById(@PathVariable Long id) {
		Optional<ProductMovementRequest> ent = productMovementRequestRepository.findById(id);
		if(ent.isPresent()) {
			return ent.get();
		}
		return null;
	}
}
