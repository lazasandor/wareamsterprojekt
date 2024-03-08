package com.waremaster.backend.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

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
		
		pm.setMovementDate(ZonedDateTime.now( ZoneId.of( "Europe/Budapest" ) )
		         .truncatedTo( java.time.temporal.ChronoUnit.MINUTES )
		         .format( DateTimeFormatter.ofPattern( "MM/dd/uuuu HH:mm" , Locale.GERMANY ) ));
		
		pm.setStatus("In Progress...");

		return productMovementRequestRepository.save(pm);
	}

	public ProductMovementRequest requestDone(Long id) {
		Optional<ProductMovementRequest> pm = productMovementRequestRepository.findById(id);
		if(pm.isPresent()) {
			ProductMovementRequest p = pm.get();
			productMovementRequestRepository.decreaseQuantity(p.getFromStorage().getId(),
					   p.getProduct().getId(), p.getQuantity());

			productMovementRequestRepository.increaseQuantity(p.getToStorage().getId(),
					   p.getProduct().getId(), p.getQuantity());
			productMovementRequestRepository.setStatusDone(p.getId());
			
			return p;
		}
		return null;
	}
	
	public ProductMovementRequest requestCancel(Long id) {
		Optional<ProductMovementRequest> pm = productMovementRequestRepository.findById(id);
		if(pm.isPresent()) {
			ProductMovementRequest p = pm.get();
			
			productMovementRequestRepository.setStatusCancel(p.getId());
			
			return p;
		}
		return null;
	}
	
	public int[] getStatus() {
		List<ProductMovementRequest> all = productMovementRequestRepository.findAll();
		int array[] = new int[3];
		int progressSum = 0, doneSum = 0, cancelSum = 0;
		for(ProductMovementRequest p : all) {
			if(p.getStatus().equalsIgnoreCase("In Progress...")) {
				progressSum++;
			}
			if(p.getStatus().equalsIgnoreCase("Done")) {
				doneSum++;
			}
			if(p.getStatus().equalsIgnoreCase("Cancelled")) {
				cancelSum++;
			}
		}
		array[0] = progressSum;
		array[1] = doneSum;
		array[2] = cancelSum;
		return array;
	}

	
}
