package com.waremaster.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.waremaster.backend.repository.StorageRepository;

@Service
public class StorageService {
	
	@Autowired
	StorageRepository storageRepository;

	public int[] getSums() {
		int array[] = new int[8];
		for(int i = 0; i < 8; i++) {
			int sum = storageRepository.getSumById(i + 1);
			array[i] = sum; 
		}
		return array;
	}

}
