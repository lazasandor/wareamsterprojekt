package com.waremaster.backend.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.waremaster.backend.entity.ProductMovementRequest;
import com.waremaster.backend.entity.ProductToStorage;
import com.waremaster.backend.repository.ProductMovementRequestRepository;
import com.waremaster.backend.repository.ProductToStorageRepository;

@Service
public class ProductMovementRequestService {

	@Autowired
	ProductMovementRequestRepository productMovementRequestRepository;
	
	@Autowired
	ProductToStorageRepository productToStorageRepository;
	
	public ProductMovementRequest handleRequest(ProductMovementRequest pm) {
		
		ProductToStorage entity = productToStorageRepository.findByStorageAndProductId(pm.getFromStorage().getId(), 
				pm.getProduct().getId());
		
		if(entity.getQuantity() < pm.getQuantity()) {
			System.out.println("Failed!");
			return null;
		}
		
		pm.setMovementDate(LocalDateTime.now());
		pm.setStatus("In Progress...");
		
		productMovementRequestRepository.decreaseQuantity(pm.getFromStorage().getId(),
													   pm.getProduct().getId(), pm.getQuantity());
		
		productMovementRequestRepository.increaseQuantity(pm.getToStorage().getId(),
				   									   pm.getProduct().getId(), pm.getQuantity());
		
		return productMovementRequestRepository.save(pm);
	}
}
